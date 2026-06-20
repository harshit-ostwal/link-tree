import ApiError from "../../core/http/api.error.js";
import asyncHandler from "../../core/middlewares/async-handler.middleware.js";
import { SessionService } from "./session.service.js";

const authorizeSessionOwner = asyncHandler(async (req, _res, next) => {
  const session = await new SessionService().getSessionById(req.session.id);

  if (session.userId !== req.user.id) {
    throw ApiError.forbidden("You are not authorized to access this session.");
  }

  req.session = session;
  next();
});

export { authorizeSessionOwner };
