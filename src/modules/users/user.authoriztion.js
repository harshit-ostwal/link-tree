import ApiError from "../../core/http/api.error.js";
import { UserRole } from "../../infrastructure/database/generated/prisma/index.js";
import UserMessages from "./user.messages.js";

const requireSelfOrAdmin = (req, _, next) => {
  const user = req.user;
  const userId = req.params.id;

  if (!user) {
    throw ApiError.unauthorized(UserMessages.Errors.FORBIDDEN);
  }

  const isSelf = user.id === userId;
  const isAdmin = user.role === UserRole.ADMIN;

  if (!isSelf && !isAdmin) {
    throw ApiError.forbidden(UserMessages.Errors.FORBIDDEN);
  }

  next();
};

export { requireSelfOrAdmin };
