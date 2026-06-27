import ApiError from "../../core/http/api.error.js";
import { UserRole } from "../../infrastructure/database/generated/prisma/index.js";
import AuthorizationMessages from "../messages/authorization.messages.js";
import asyncHandler from "./async-handler.middleware.js";

const requireRole = (requiredRole) =>
  asyncHandler((req, _res, next) => {
    const user = req.user;

    if (!user) {
      throw ApiError.unauthorized(
        AuthorizationMessages.Errors.UNAUTHORIZED_ACCESS,
      );
    }

    if (user.role !== requiredRole) {
      throw ApiError.forbidden(AuthorizationMessages.Errors.ADMIN_ONLY);
    }

    next();
  });

const requireAdmin = asyncHandler((req, _res, next) => {
  const user = req.user;

  if (!user) {
    throw ApiError.unauthorized(
      AuthorizationMessages.Errors.UNAUTHORIZED_ACCESS,
    );
  }

  if (user.role !== UserRole.ADMIN) {
    throw ApiError.forbidden(AuthorizationMessages.Errors.ADMIN_ONLY);
  }

  next();
});

const requireAnyRole = (allowedRoles) =>
  asyncHandler((req, _res, next) => {
    const user = req.user;

    if (!user) {
      throw ApiError.unauthorized(
        AuthorizationMessages.Errors.UNAUTHORIZED_ACCESS,
      );
    }

    if (!allowedRoles.includes(user.role)) {
      throw ApiError.forbidden(AuthorizationMessages.Errors.INSUFFICIENT_ROLE);
    }

    next();
  });

const requireOwnerOrAdmin = (getResourceOwnerId) =>
  asyncHandler(async (req, _res, next) => {
    const user = req.user;

    if (!user) {
      throw ApiError.unauthorized(
        AuthorizationMessages.Errors.UNAUTHORIZED_ACCESS,
      );
    }

    if (user.role === UserRole.ADMIN) {
      return next();
    }

    const resourceOwnerId = await getResourceOwnerId(req);
    const isOwner = user.id === resourceOwnerId;

    if (!isOwner) {
      throw ApiError.forbidden(AuthorizationMessages.Errors.RESOURCE_FORBIDDEN);
    }

    next();
  });

const requireSelfOrAdmin = asyncHandler((req, _res, next) => {
  const user = req.user;
  const userId = req.params.id;

  if (!user) {
    throw ApiError.unauthorized(
      AuthorizationMessages.Errors.UNAUTHORIZED_ACCESS,
    );
  }

  const isSelf = user.id === userId;
  const isAdmin = user.role === UserRole.ADMIN;

  if (!isSelf && !isAdmin) {
    throw ApiError.forbidden(AuthorizationMessages.Errors.RESOURCE_FORBIDDEN);
  }

  next();
});

export {
  requireAdmin,
  requireAnyRole,
  requireOwnerOrAdmin,
  requireRole,
  requireSelfOrAdmin,
};
