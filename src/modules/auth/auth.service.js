import { createServices } from "../../core/factories/service.factory.js";
import ApiError from "../../core/http/api.error.js";
import { compareHash, hashToken } from "../../core/security/hash.security.js";
import { verifyToken } from "../../core/security/jwt.security.js";
import { AuthProvider } from "../../infrastructure/database/generated/prisma/index.js";
import prismaService from "../../infrastructure/database/prisma.service.js";
import { TOKEN_TYPE } from "../../shared/constants/security.constants.js";
import { SessionService } from "../sessions/session.service.js";
import { UserService } from "../users/user.service.js";
import AuthMessages from "./auth.messages.js";

class AuthService {
  #sessionService;
  #userService;
  constructor(prismaClient) {
    this.#sessionService = new SessionService(prismaClient);
    this.#userService = new UserService(prismaClient);
  }

  async signInWithOAuth(data) {
    return await prismaService.transaction(async (prismaClient) => {
      const { userService, profileService, accountService, sessionService } =
        createServices(prismaClient);

      const existingAccount =
        await accountService.findAccountByProviderAndProviderId(
          data.account.provider,
          data.account.providerId,
        );

      if (existingAccount) {
        const existingUser = await userService.findUserById(
          existingAccount.userId,
        );

        if (!existingUser) {
          const username = await userService.generateUniqueUsername(
            data.profile.firstName,
            data.profile.lastName,
          );

          data.user.username = username;

          const user = await userService.createUser(data.user);
          await accountService.createAccountByUserId(user.id, data.account);
          await profileService.upsertProfileByUserId(user.id, data.profile);
          const { accessToken, refreshToken } =
            await sessionService.createSessionByUserId(user.id, data.session);

          return {
            user,
            accessToken,
            refreshToken,
          };
        }

        await accountService.updateAccountById(existingAccount.id, {
          lastLoginAt: new Date(),
        });

        await profileService.upsertProfileByUserId(
          existingUser.id,
          data.profile,
        );

        const { accessToken, refreshToken } =
          await sessionService.createSessionByUserId(
            existingUser.id,
            data.session,
          );

        return {
          user: existingUser,
          accessToken,
          refreshToken,
        };
      }

      const existingUser = await userService.findUserByEmail(data.user.email);

      if (existingUser) {
        await accountService.createAccountByUserId(
          existingUser.id,
          data.account,
        );

        await profileService.upsertProfileByUserId(
          existingUser.id,
          data.profile,
        );

        const { accessToken, refreshToken } =
          await sessionService.createSessionByUserId(
            existingUser.id,
            data.session,
          );

        return {
          user: existingUser,
          accessToken,
          refreshToken,
        };
      }

      const username = await userService.generateUniqueUsername(
        data.profile.firstName,
        data.profile.lastName,
      );

      data.user.username = username;

      const user = await userService.createUser(data.user);
      await accountService.createAccountByUserId(user.id, data.account);
      await profileService.upsertProfileByUserId(user.id, data.profile);
      const { accessToken, refreshToken } =
        await sessionService.createSessionByUserId(user.id, data.session);

      return {
        user,
        accessToken,
        refreshToken,
      };
    });
  }

  async signUpWithCredentials(data) {
    return await prismaService.transaction(async (prismaClient) => {
      const { userService, profileService, accountService } =
        createServices(prismaClient);

      const existingUser = await userService.findUserByEmail(data.user.email);
      const existingUserByUsername = await userService.findUserByUsername(
        data.user.username,
      );

      if (existingUser || existingUserByUsername) {
        throw ApiError.conflict(AuthMessages.Errors.ALREADY_CREDENTIAL_EXISTS);
      }

      data.account.provider = AuthProvider.CREDENTIALS;
      data.account.providerId = data.user.email;

      const username = await userService.generateUniqueUsername(
        data.profile.firstName,
        data.profile.lastName,
      );

      data.user.username = username;
      const user = await userService.createUser(data.user);
      await profileService.upsertProfileByUserId(user.id, data.profile);
      await accountService.createAccountByUserId(user.id, data.account);

      // Create a verification for the user to verify their email and send email with the verification token

      return user;
    });
  }

  async signInWithCredentials(data) {
    return await prismaService.transaction(async (prismaClient) => {
      const { userService, accountService, sessionService } =
        createServices(prismaClient);

      const existingUser = await userService.findUserByIdentifier(
        data.identifier,
      );

      if (!existingUser) {
        throw ApiError.notFound(AuthMessages.Errors.INVALID_CREDENTIALS);
      }

      if (existingUser.emailVerifiedAt === null) {
        throw ApiError.forbidden(AuthMessages.Errors.EMAIL_NOT_VERIFIED);
      }

      const existingAccount =
        await accountService.findAccountByUserIdAndProvider(
          existingUser.id,
          AuthProvider.CREDENTIALS,
        );

      if (existingAccount === null) {
        throw ApiError.notFound(AuthMessages.Errors.INVALID_OAUTH_PROVIDER);
      }

      if (existingAccount.provider !== AuthProvider.CREDENTIALS) {
        throw ApiError.forbidden(AuthMessages.Errors.OAUTH_ACCOUNT_NOT_LINKED);
      }

      const isPasswordValid = await compareHash(
        data.password,
        existingAccount.password,
      );

      if (!isPasswordValid) {
        throw ApiError.unauthorized(AuthMessages.Errors.INVALID_CREDENTIALS);
      }

      await accountService.updateAccountById(existingAccount.id, {
        lastLoginAt: new Date(),
      });

      const { accessToken, refreshToken } =
        await sessionService.createSessionByUserId(
          existingUser.id,
          data.session,
        );

      return {
        user: existingUser,
        accessToken,
        refreshToken,
      };
    });
  }

  async signOut(userId, sessionId) {
    return await this.#sessionService.deleteSessionById(userId, sessionId);
  }

  async signOutAllSessions(userId) {
    return await this.#sessionService.deleteSessionsByUserId(userId);
  }

  async refreshSession(refreshToken) {
    if (!refreshToken) {
      throw ApiError.unauthorized(AuthMessages.Errors.MISSING_REFRESH_TOKEN);
    }

    let decodedToken;

    try {
      decodedToken = verifyToken(refreshToken, TOKEN_TYPE.REFRESH);
    } catch {
      throw ApiError.unauthorized(AuthMessages.Errors.INVALID_REFRESH_TOKEN);
    }

    return await prismaService.transaction(async (prismaClient) => {
      const { sessionService } = createServices(prismaClient);

      const existingSession = await sessionService.findSessionById(
        decodedToken.sessionId,
      );

      if (!existingSession || existingSession.userId !== decodedToken.id) {
        throw ApiError.unauthorized(AuthMessages.Errors.INVALID_REFRESH_TOKEN);
      }

      if (hashToken(refreshToken) !== existingSession.refreshToken) {
        throw ApiError.unauthorized(AuthMessages.Errors.INVALID_REFRESH_TOKEN);
      }

      if (existingSession.tokenVersion !== decodedToken.tokenVersion) {
        throw ApiError.unauthorized(AuthMessages.Errors.INVALID_REFRESH_TOKEN);
      }

      const { accessToken, refreshToken: newRefreshToken } =
        await sessionService.rotateSessionById(existingSession.id);

      return {
        accessToken,
        refreshToken: newRefreshToken,
      };
    });
  }

  async getMe(userId) {
    return await this.#userService.getUserById(userId);
  }
}

export { AuthService };
