import { FRONTEND_URL } from "../../config/env.config.js";
import ApiResponse from "../../core/http/api.response.js";
import asyncHandler from "../../core/middlewares/async-handler.middleware.js";
import {
  clearAuthCookies,
  setAuthCookies,
} from "../../shared/utils/cookie.utils.js";
import { getRequestInfo } from "../../shared/utils/request.utils.js";
import { AuthDto, AuthRefreshSessionDto } from "./auth.dto.js";
import AuthMessages from "./auth.messages.js";
import { AuthService } from "./auth.service.js";

class AuthController {
  #authService;
  constructor() {
    this.#authService = new AuthService();
  }

  signInWithOAuth = asyncHandler(async (req, res) => {
    const user = req.user;

    setAuthCookies(res, user.refreshToken);

    return ApiResponse.redirect(res, FRONTEND_URL).send(res);
  });

  signUpWithCredentials = asyncHandler(async (req, res) => {
    const data = req.body;

    const user = await this.#authService.signUpWithCredentials(data);

    return ApiResponse.created(
      new AuthDto(user),
      AuthMessages.Responses.SIGN_UP_SUCCESS,
    ).send(res);
  });

  signInWithCredentials = asyncHandler(async (req, res) => {
    const data = req.body;
    const { ipAddress, userAgent } = getRequestInfo(req);

    data.session = {
      ipAddress,
      userAgent,
    };

    const { user, accessToken, refreshToken } =
      await this.#authService.signInWithCredentials(data);

    setAuthCookies(res, refreshToken);

    return ApiResponse.ok(
      new AuthDto(user, accessToken),
      AuthMessages.Responses.SIGN_IN_SUCCESS,
    ).send(res);
  });

  signOut = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const sessionId = req.session.id;

    await this.#authService.signOut(userId, sessionId);

    clearAuthCookies(res);

    return ApiResponse.noContent(
      null,
      AuthMessages.Responses.SIGN_OUT_SUCCESS,
    ).send(res);
  });

  signOutAllSessions = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    await this.#authService.signOutAllSessions(userId);

    clearAuthCookies(res);

    return ApiResponse.noContent(
      null,
      AuthMessages.Responses.SIGN_OUT_ALL_SESSIONS_SUCCESS,
    ).send(res);
  });

  refreshSession = asyncHandler(async (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    const { accessToken, refreshToken: newRefreshToken } =
      await this.#authService.refreshSession(refreshToken);

    setAuthCookies(res, newRefreshToken);

    return ApiResponse.ok(
      new AuthRefreshSessionDto(accessToken),
      AuthMessages.Responses.REFRESH_SESSION_SUCCESS,
    ).send(res);
  });

  getMe = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const user = await this.#authService.getMe(userId);

    return ApiResponse.ok(
      new AuthDto(user),
      AuthMessages.Responses.FETCHED_USER_SUCCESS,
    ).send(res);
  });
}

export default new AuthController();
