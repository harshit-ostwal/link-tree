import { FRONTEND_URL } from "../../config/env.config.js";
import ApiResponse from "../../core/http/api.response.js";
import asyncHandler from "../../core/middlewares/async-handler.middleware.js";
import {
  clearAuthCookies,
  setAuthCookies,
} from "../../shared/utils/cookie.utils.js";
import { AuthService } from "./auth.service.js";

class AuthController {
  #authService;
  constructor() {
    this.#authService = new AuthService();
  }

  signInWithOAuth = asyncHandler(async (req, res) => {
    const user = req.user;

    setAuthCookies(res, user.accessToken, user.refreshToken);

    return ApiResponse.redirect(res, FRONTEND_URL);
  });

  signUpWithCredentials = asyncHandler(async (req, res) => {
    const data = req.body;

    const user = await this.#authService.signUpWithCredentials(data);

    return ApiResponse.created(
      user,
      "Successfully signed up with credentials."
    ).send(res);
  });

  verifyEmail = asyncHandler(async (req, res) => {
    const token = req.query.token;

    await this.#authService.verifyEmail(token);
    return ApiResponse.redirect(res, `${FRONTEND_URL}/auth/sign-in`);
  });

  resendVerificationEmail = asyncHandler(async (req, res) => {
    const email = req.body.email;

    const token = await this.#authService.resendVerificationEmail(email);

    return ApiResponse.ok(
      token,
      "Verification email has been resent successfully."
    ).send(res);
  });

  signInWithCredentials = asyncHandler(async (req, res) => {
    const data = req.body;
    const ipAddress = req.ip;
    const userAgent = req.get("User-Agent") || "Unknown";

    data.session = {
      ipAddress,
      userAgent,
    };

    const { user, accessToken, refreshToken } =
      await this.#authService.signInWithCredentials(data);

    setAuthCookies(res, accessToken, refreshToken);

    return ApiResponse.ok(
      user,
      "Successfully signed in with credentials."
    ).send(res);
  });

  signOut = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const sessionId = req.session.id;

    await this.#authService.signOut(userId, sessionId);

    clearAuthCookies(res);

    return ApiResponse.ok(null, "Successfully signed out.").send(res);
  });

  signOutAllSessions = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    await this.#authService.signOutAllSessions(userId);

    clearAuthCookies(res);

    return ApiResponse.ok(
      null,
      "Successfully signed out from all sessions."
    ).send(res);
  });
}

export default new AuthController();
