import { API_VERSION } from "../../shared/constants/api.constants.js";
import ApiError from "../http/api.error.js";

const notFound = (req, _res, next) => {
  return next(
    ApiError.notFound(
      `Route "${req.originalUrl}" was not found. See /api/${API_VERSION}/docs for available endpoints.`,
    ),
  );
};

export default notFound;
