/** biome-ignore-all lint/suspicious/noConsole: <> */
import PrismaService from "../../infrastructure/database/prisma.service.js";
import { TOKEN_TYPE } from "../../shared/constants/security.constants.js";
import { clearAuthCookies } from "../../shared/utils/cookie.utils.js";
import { createServices } from "../factories/service.factory.js";
import ApiError from "../http/api.error.js";
import { verifyToken } from "../security/jwt.security.js";
import asyncHandler from "./async-handler.middleware.js";

export const verifyAuthenticationJWT = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers?.authorization || "";
  const token = req.cookies?.accessToken || authHeader.replace("Bearer ", "");
  const userAgent = req.headers["user-agent"] || "unknown";
  const ipAddress = req.ip || req.connection?.remoteAddress || "unknown";

  if (!token) {
    throw ApiError.unauthorized("Unauthorized Request, Please Try Again Later");
  }

  let decodedToken;

  try {
    decodedToken = verifyToken(token, TOKEN_TYPE.ACCESS);
  } catch {
    clearAuthCookies(res);
    throw ApiError.unauthorized("Unauthorized Request, Please Try Again Later");
  }

  const { id: userId, sessionId, tokenVersion } = decodedToken;

  await PrismaService.transaction(async (prismaClient) => {
    const { userService, sessionService } = createServices(prismaClient);

    const user = await userService.findUserById(userId);
    const session = await sessionService.findSessionById(sessionId);

    if (!(user && session)) {
      clearAuthCookies(res);
      console.log(
        `Invalid session detected for user ${userId} from IP ${ipAddress} with user agent ${userAgent}`
      );
      throw ApiError.unauthorized(
        "Unauthorized Request, Please Try Again Later"
      );
    }

    if (session.userId !== userId) {
      clearAuthCookies(res);
      console.log(
        `Session-user mismatch detected for user ${userId} from IP ${ipAddress} with user agent ${userAgent}`
      );
      throw ApiError.unauthorized(
        "Unauthorized Request, Please Try Again Later"
      );
    }

    if (session.userAgent !== userAgent || session.ipAddress !== ipAddress) {
      clearAuthCookies(res);
      console.log(
        `Session hijacking attempt detected for user ${userId} from IP ${ipAddress} with user agent ${userAgent}`
      );
      throw ApiError.unauthorized(
        "Unauthorized Request, Please Try Again Later"
      );
    }

    if (new Date(session.refreshTokenExpiresAt) < new Date()) {
      clearAuthCookies(res);
      console.log(
        `Expired session detected for user ${userId} from IP ${ipAddress} with user agent ${userAgent}`
      );
      throw ApiError.unauthorized("Session expired, please log in again");
    }

    if (session.tokenVersion !== tokenVersion) {
      clearAuthCookies(res);
      console.log(
        `Token version mismatch detected for user ${userId} from IP ${ipAddress} with user agent ${userAgent}`
      );
      throw ApiError.unauthorized("Session invalidated, please log in again");
    }

    req.user = user;
    req.session = session;
  });

  next();
});
