import ApiError from "../../core/http/api.error.js";
import { UserStatus } from "../../infrastructure/database/generated/prisma/index.js";
import UserMessages from "./user.messages.js";

const requireActiveStatus = (req, _, next) => {
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
};

export { requireActiveStatus };
