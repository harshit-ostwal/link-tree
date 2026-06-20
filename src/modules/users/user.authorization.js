import ApiError from "../../core/http/api.error.js";

const authorizeUserOwner = (paramKey = "id") => {
  return (req, _res, next) => {
    if (req.user.id !== req.params[paramKey]) {
      return next(
        ApiError.forbidden("You are not authorized to access this user.")
      );
    }

    next();
  };
};

export { authorizeUserOwner };
