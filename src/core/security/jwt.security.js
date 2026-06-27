import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import { REFRESH_TOKEN_EXPIRY_MS } from "../../config/env.config.js";
import {
  APP_NAME,
  DEVELOPER_NAME,
} from "../../shared/constants/app.constants.js";
import {
  JWT_ALGORITHM,
  TOKEN_CONFIG,
  TOKEN_TYPE,
} from "../../shared/constants/security.constants.js";
import ApiError from "../http/api.error.js";
import SecurityMessages from "../messages/security.messages.js";
import { hashToken } from "./hash.security.js";

const generateToken = (user, type) => {
  const config = TOKEN_CONFIG[type];

  if (!config) {
    throw ApiError.internalServerError(
      `Invalid token type: ${type}. ${SecurityMessages.Errors.UNAUTHORIZED}`,
    );
  }

  const token = jwt.sign(user, config.secret, {
    algorithm: JWT_ALGORITHM,
    expiresIn: config.expiry,
    issuer: `${APP_NAME} - ${DEVELOPER_NAME}`,
    audience: `${APP_NAME} - Users`,
    jwtid: crypto.randomUUID(),
  });

  return {
    token,
    ...(config.hash && {
      hashedToken: hashToken(token),
    }),
  };
};

const verifyToken = (token, type) => {
  try {
    const config = TOKEN_CONFIG[type];

    if (!config) {
      throw ApiError.internalServerError(
        `Invalid token type: ${type}. ${SecurityMessages.Errors.UNAUTHORIZED}`,
      );
    }

    return jwt.verify(token, config.secret, {
      algorithms: [JWT_ALGORITHM],
      issuer: `${APP_NAME} - ${DEVELOPER_NAME}`,
      audience: `${APP_NAME} - Users`,
    });
  } catch (error) {
    throw error.name === "TokenExpiredError"
      ? ApiError.unauthorized(SecurityMessages.Errors.SESSION_EXPIRED, error)
      : ApiError.unauthorized(SecurityMessages.Errors.UNAUTHORIZED, error);
  }
};

const generateAuthTokens = (user) => {
  const accessToken = generateToken(user, TOKEN_TYPE.ACCESS);
  const refreshToken = generateToken(user, TOKEN_TYPE.REFRESH);

  return {
    accessToken: accessToken.token,
    refreshToken: refreshToken.token,

    hashedRefreshToken: refreshToken.hashedToken,
    refreshTokenExpiryAt: new Date(
      Date.now() + parseInt(REFRESH_TOKEN_EXPIRY_MS, 10),
    ),
  };
};

export { generateAuthTokens, generateToken, verifyToken };
