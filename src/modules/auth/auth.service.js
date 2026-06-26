import { createServices } from "../../core/factories/service.factory.js";
import ApiError from "../../core/http/api.error.js";
import { compareHash } from "../../core/security/hash.security.js";
import { AuthProvider } from "../../infrastructure/database/generated/prisma/index.js";
import prismaService from "../../infrastructure/database/prisma.service.js";
import { SessionService } from "../sessions/session.service.js";
import AuthMessages from "./auth.messages.js";

class AuthService {
  #sessionService;
  constructor(prismaClient) {
    this.#sessionService = new SessionService(prismaClient);
  }

  async signInWithOAuth(data) {
    return await prismaService.transaction(async (prismaClient) => {
      const { userService, profileService, accountService, sessionService } =
        createServices(prismaClient);

      const existingAccount =
        await accountService.getAccountByProviderAndProviderId(
          data.account.provider,
          data.account.providerId,
        );

      if (existingAccount) {
        const existingUser = await userService.getUserById(
          existingAccount.userId,
        );

        if (!existingUser) {
          const userData = {
            ...data.user,
            firstName: data.profile.firstName,
            lastName: data.profile.lastName,
          };
          const user = await userService.createUser(userData);
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

        await userService.updateUserById(existingUser.id, {
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

      const existingUser = await userService.getUserByEmail(data.user.email);

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

      const userData = {
        ...data.user,
        firstName: data.profile.firstName,
        lastName: data.profile.lastName,
      };
      const user = await userService.createUser(userData);
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

      const existingUser = await userService.getUserByEmail(data.user.email);

      if (existingUser) {
        throw ApiError.conflict(AuthMessages.Errors.ALREADY_CREDENTIAL_EXISTS);
      }

      data.account.provider = AuthProvider.CREDENTIALS;
      data.account.providerId = data.user.email;

      const userData = {
        ...data.user,
        firstName: data.profile.firstName,
        lastName: data.profile.lastName,
      };
      const user = await userService.createUser(userData);
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

      const existingUser = await userService.getUserByIdentifier(
        data.identifier,
      );

      if (existingUser.emailVerifiedAt === null) {
        throw ApiError.forbidden(AuthMessages.Errors.EMAIL_NOT_VERIFIED);
      }

      const existingAccount =
        await accountService.getAccountByUserIdAndProvider(
          existingUser.id,
          AuthProvider.CREDENTIALS,
        );

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
}

export { AuthService };
