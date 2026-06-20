import ApiError from "../../core/http/api.error.js";
import { generateAuthTokens } from "../../core/security/jwt.security.js";
import { MAX_DEVICE_LIMIT } from "../../shared/constants/api.constants.js";
import { getChangedFields } from "../../shared/utils/object.utils.js";
import generateUUID from "../../shared/utils/uuid.utils.js";
import { SessionRepository } from "./session.repository.js";

class SessionService {
  #sessionRepo;
  constructor(prismaClient) {
    this.#sessionRepo = new SessionRepository(prismaClient);
  }

  async getSessionById(id) {
    const session = await this.#sessionRepo.findById(id);

    if (!session) {
      throw ApiError.notFound("Session not found. Please try again later.");
    }

    return session;
  }

  async findSessionById(id) {
    return await this.#sessionRepo.findById(id);
  }

  async getSessionsByUserId(userId) {
    const sessions = await this.#sessionRepo.findByUserId(userId);

    if (!sessions || sessions.length === 0) {
      throw ApiError.notFound(
        "Sessions not found for this user. Please try again later."
      );
    }

    return sessions;
  }

  async findSessionsByUserId(userId) {
    return await this.#sessionRepo.findByUserId(userId);
  }

  async createSession(userId, data) {
    const existingSessions = await this.findSessionsByUserId(userId);

    if (existingSessions && existingSessions.length >= MAX_DEVICE_LIMIT) {
      throw ApiError.badRequest(
        "Maximum session limit reached. Please log out from other devices or contact support."
      );
    }

    const sessionId = generateUUID();

    const {
      accessToken,
      refreshToken,
      hashedRefreshToken,
      refreshTokenExpiresAt,
    } = generateAuthTokens({ id: userId, sessionId, tokenVersion: 0 });

    const sessionData = {
      id: sessionId,
      ...data,
      refreshToken: hashedRefreshToken,
      refreshTokenExpiresAt,
    };

    const session = await this.#sessionRepo.create(userId, sessionData);

    return { session, accessToken, refreshToken };
  }

  async updateSession(id, data) {
    const existingSession = await this.getSessionById(id);

    const hasUpdates = getChangedFields(existingSession, data);
    return await this.#sessionRepo.update(id, hasUpdates);
  }

  async deleteSession(userId, sessionId) {
    const existingSession = await this.getSessionById(sessionId);

    if (!existingSession || existingSession.userId !== userId) {
      throw ApiError.notFound(
        "Session not found for this user. Please try again later."
      );
    }

    return await this.#sessionRepo.delete(sessionId);
  }

  async deleteSessionsByUserId(userId) {
    await this.getSessionsByUserId(userId);
    return await this.#sessionRepo.deleteByUserId(userId);
  }
}

export { SessionService };
