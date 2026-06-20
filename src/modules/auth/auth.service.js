import { createServices } from "../../core/factories/service.factory.js";
import ApiError from "../../core/http/api.error.js";
import { compareHash } from "../../core/security/hash.security.js";
import { AuthProvider } from "../../infrastructure/database/generated/prisma/index.js";
import PrismaService from "../../infrastructure/database/prisma.service.js";
import { SessionService } from "../sessions/session.service.js";

class AuthService {
  #sessionService;
  constructor(prismaClient) {
    this.#sessionService = new SessionService(prismaClient);
  }

  async signInWithOAuth(data) {
    const user = await PrismaService.transaction(async (prismaClient) => {
      const { accountService, profileService, userService, sessionService } =
        createServices(prismaClient);

      const exisitingAccount =
        await accountService.findAccountByProviderAndProviderId(
          data.account.provider,
          data.account.providerId
        );

      if (exisitingAccount) {
        const existingUser = await userService.findUserById(
          exisitingAccount.userId
        );

        if (!existingUser) {
          const user = await userService.createUser(data.user);
          await accountService.createAccount(user.id, data.account);
          await profileService.createProfile(user.id, data.profile);
          const { accessToken, refreshToken } =
            await sessionService.createSession(user.id, data.session);

          return { user, accessToken, refreshToken };
        }

        await accountService.updateAccount(exisitingAccount.id, {
          lastLoginAt: new Date(),
        });
        await profileService.updateProfile(existingUser.id, data.profile);
        const { accessToken, refreshToken } =
          await sessionService.createSession(existingUser.id, data.session);

        return {
          user: existingUser,
          accessToken,
          refreshToken,
        };
      }

      const existingUser = await userService.findUserByEmail(data.user.email);

      if (existingUser) {
        await accountService.createAccount(existingUser.id, data.account);
        await profileService.updateProfile(existingUser.id, data.profile);
        const { accessToken, refreshToken } =
          await sessionService.createSession(existingUser.id, data.session);

        return {
          user: existingUser,
          accessToken,
          refreshToken,
        };
      }

      const user = await userService.createUser(data.user);
      await accountService.createAccount(user.id, data.account);
      await profileService.createProfile(user.id, data.profile);
      const { accessToken, refreshToken } = await sessionService.createSession(
        user.id,
        data.session
      );

      return {
        user,
        accessToken,
        refreshToken,
      };
    });

    return user;
  }

  async signUpWithCredentials(data) {
    return await PrismaService.transaction(async (prismaClient) => {
      const { userService, profileService, accountService } =
        createServices(prismaClient);

      const existingUser = await userService.findUserByIdentifier(
        data.user.email || data.user.username
      );

      if (existingUser) {
        throw ApiError.conflict(
          "User already exists with this email. Please sign in instead."
        );
      }

      data.account.provider = AuthProvider.CREDENTIALS;

      const user = await userService.createUser(data.user);
      await profileService.createProfile(user.id, data.profile);
      await accountService.createAccount(user.id, data.account);

      return user;
    });
  }

  async signInWithCredentials(data) {
    return await PrismaService.transaction(async (prismaClient) => {
      const { userService, accountService, sessionService } =
        createServices(prismaClient);

      const existingUser = await userService.findUserByIdentifier(
        data.email || data.username
      );

      if (!existingUser) {
        throw ApiError.notFound("User not found. Please sign up instead.");
      }

      const account = await accountService.findAccountByProviderAndUserId(
        AuthProvider.CREDENTIALS,
        existingUser.id
      );

      if (!account) {
        throw ApiError.notFound(
          "Account not found for this user. Please sign up instead."
        );
      }

      const isPasswordValid = await compareHash(
        data.password,
        account.password
      );

      if (!isPasswordValid) {
        throw ApiError.unauthorized("Invalid credentials. Please try again.");
      }

      await accountService.updateAccount(account.id, {
        lastLoginAt: new Date(),
      });

      const { accessToken, refreshToken } = await sessionService.createSession(
        existingUser.id,
        data.session
      );

      return {
        user: existingUser,
        accessToken,
        refreshToken,
      };
    });
  }

  async signOut(userId, sessionId) {
    return await this.#sessionService.deleteSession(userId, sessionId);
  }

  async signOutAllSessions(userId) {
    return await this.#sessionService.deleteSessionsByUserId(userId);
  }
}

export { AuthService };
