import ApiError from "../../core/http/api.error.js";
import {
  UserRole,
  UserStatus,
} from "../../infrastructure/database/generated/prisma/index.js";
import UserMessages from "../../modules/users/user.messages.js";
import AuthorizationMessages from "../messages/authorization.messages.js";
import asyncHandler from "./async-handler.middleware.js";

const requireStatus = (requiredStatus) =>
  asyncHandler((req, _res, next) => {
    const user = req.user;

    if (!user) {
      throw ApiError.unauthorized(
        AuthorizationMessages.Errors.UNAUTHORIZED_ACCESS,
      );
    }

    if (user.status !== requiredStatus) {
      throw ApiError.forbidden(AuthorizationMessages.Errors.ACCOUNT_SUSPENDED);
    }

    next();
  });

const requireActiveStatus = asyncHandler((req, _res, next) => {
  const user = req.user;

  if (!user) {
    throw ApiError.unauthorized(UserMessages.Errors.FORBIDDEN);
  }

  switch (user.status) {
    case UserStatus.ACTIVE:
      return next();
    case UserStatus.BANNED:
      throw ApiError.forbidden(UserMessages.Errors.ACCOUNT_BANNED);
    case UserStatus.SUSPENDED:
      throw ApiError.forbidden(UserMessages.Errors.ACCOUNT_SUSPENDED);
    case UserStatus.DELETED:
      throw ApiError.forbidden(UserMessages.Errors.ACCOUNT_DELETED);
    default:
      throw ApiError.forbidden(UserMessages.Errors.INVALID_STATUS);
  }
});

const requireAnyStatus = (allowedStatuses) =>
  asyncHandler((req, _res, next) => {
    const user = req.user;

    if (!user) {
      throw ApiError.unauthorized(
        AuthorizationMessages.Errors.UNAUTHORIZED_ACCESS,
      );
    }

    if (!allowedStatuses.includes(user.status)) {
      throw ApiError.forbidden(AuthorizationMessages.Errors.ACCOUNT_SUSPENDED);
    }

    next();
  });

const requireActiveOrAdmin = asyncHandler((req, _res, next) => {
  const user = req.user;

  if (!user) {
    throw ApiError.unauthorized(UserMessages.Errors.FORBIDDEN);
  }

  if (user.role === UserRole.ADMIN) {
    return next();
  }

  switch (user.status) {
    case UserStatus.ACTIVE:
      return next();
    case UserStatus.BANNED:
      throw ApiError.forbidden(UserMessages.Errors.ACCOUNT_BANNED);
    case UserStatus.SUSPENDED:
      throw ApiError.forbidden(UserMessages.Errors.ACCOUNT_SUSPENDED);
    case UserStatus.DELETED:
      throw ApiError.forbidden(UserMessages.Errors.ACCOUNT_DELETED);
    default:
      throw ApiError.forbidden(UserMessages.Errors.INVALID_STATUS);
  }
});

export {
  requireActiveOrAdmin,
  requireActiveStatus,
  requireAnyStatus,
  requireStatus,
};
