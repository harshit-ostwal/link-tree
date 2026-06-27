import ApiError from "../../core/http/api.error.js";
import { generateAuthTokens } from "../../core/security/jwt.security.js";
import { MAX_DEVICE_LIMIT } from "../../shared/constants/api.constants.js";
import { getChangedFields } from "../../shared/utils/object.utils.js";
import generateUUID from "../../shared/utils/uuid.utils.js";
import SessionMessages from "./session.messages.js";
import { SessionRepository } from "./session.repository.js";

class SessionService {
  #sessionRepo;
  constructor(prismaClient) {
    this.#sessionRepo = new SessionRepository(prismaClient);
  }

  async findSessionById(id) {
    return await this.#sessionRepo.findById(id);
  }

  async getSessionById(id) {
    const session = await this.#sessionRepo.findById(id);

    if (!session) {
      throw ApiError.notFound(SessionMessages.Errors.NOT_FOUND);
    }

    return session;
  }

  async getSessionsByUserId(userId) {
    const sessions = await this.#sessionRepo.findByUserId(userId);

    if (!sessions || sessions.length === 0) {
      throw ApiError.notFound(SessionMessages.Errors.NOT_FOUND);
    }

    return sessions;
  }

  async createSessionByUserId(userId, data) {
    const existingSessions = await this.#sessionRepo.findByUserId(userId);

    const now = new Date();
    const activeSessions = existingSessions.filter(
      ({ refreshTokenExpiryAt }) => refreshTokenExpiryAt > now,
    );

    if (activeSessions.length >= MAX_DEVICE_LIMIT) {
      throw ApiError.forbidden(SessionMessages.Errors.MAX_DEVICE_LIMIT_REACHED);
    }

    const sessionId = generateUUID();

    const {
      accessToken,
      refreshToken,
      refreshTokenExpiryAt,
      hashedRefreshToken,
    } = generateAuthTokens({
      id: userId,
      sessionId,
      tokenVersion: 0,
    });

    const payload = {
      id: sessionId,
      refreshToken: hashedRefreshToken,
      refreshTokenExpiryAt,
      ...data,
    };

    const session = await this.#sessionRepo.create(userId, payload);

    if (!session) {
      throw ApiError.internalServerError(SessionMessages.Errors.CREATE_FAILED);
    }

    return {
      accessToken,
      refreshToken,
    };
  }

  async rotateSessionById(id) {
    const session = await this.getSessionById(id);

    if (session.refreshTokenExpiryAt < new Date()) {
      throw ApiError.unauthorized(SessionMessages.Errors.INVALID_REFRESH_TOKEN);
    }

    const {
      accessToken,
      refreshToken,
      hashedRefreshToken,
      refreshTokenExpiryAt,
    } = generateAuthTokens({
      id: session.userId,
      sessionId: session.id,
      tokenVersion: session.tokenVersion + 1,
    });

    const updatedSession = await this.#sessionRepo.update(id, {
      tokenVersion: session.tokenVersion + 1,
      refreshToken: hashedRefreshToken,
      refreshTokenExpiryAt,
    });

    if (!updatedSession) {
      throw ApiError.internalServerError(SessionMessages.Errors.UPDATE_FAILED);
    }

    return {
      accessToken,
      refreshToken,
    };
  }

  async updateSessionById(id, data) {
    const existingSession = await this.getSessionById(id);

    const changedFields = getChangedFields(existingSession, data);

    if (Object.keys(changedFields).length === 0) {
      return existingSession;
    }

    const session = await this.#sessionRepo.update(id, changedFields);

    if (!session) {
      throw ApiError.internalServerError(SessionMessages.Errors.UPDATE_FAILED);
    }

    return session;
  }

  async deleteSessionById(userId, id) {
    const existingSession = await this.getSessionById(id);

    if (existingSession.userId !== userId) {
      throw ApiError.forbidden(SessionMessages.Errors.FORBIDDEN);
    }

    const session = await this.#sessionRepo.delete(id);

    if (!session) {
      throw ApiError.internalServerError(SessionMessages.Errors.DELETE_FAILED);
    }

    return session;
  }

  async deleteSessionsByUserId(userId) {
    await this.getSessionsByUserId(userId);

    const sessions = await this.#sessionRepo.deleteByUserId(userId);

    if (!sessions) {
      throw ApiError.internalServerError(SessionMessages.Errors.DELETE_FAILED);
    }

    return sessions;
  }
}

export { SessionService };
