import ApiError from "../../core/http/api.error.js";
import asyncHandler from "../../core/middlewares/async-handler.middleware.js";
import { ProfileService } from "./profile.service.js";

const authorizeProfileOwner = asyncHandler(async (req, _res, next) => {
  const profile = await new ProfileService().getProfileByUserId(req.user.id);

  if (profile.userId !== req.user.id) {
    throw ApiError.forbidden("You are not authorized to access this profile.");
  }

  req.profile = profile;
  next();
});

export { authorizeProfileOwner };
