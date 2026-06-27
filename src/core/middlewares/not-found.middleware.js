import ApiError from "../http/api.error.js";
import HttpMessages from "../messages/http.messages.js";

const notFound = (_req, _res, next) => {
  return next(ApiError.notFound(HttpMessages.ClientErrors.NOT_FOUND));
};

export default notFound;
