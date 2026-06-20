import { NODE_ENV } from "../../config/env.config.js";
import loggerService from "../../infrastructure/logger/logger.service.js";
import ApiError from "../http/api.error.js";

const errorHandler = (err, req, res, _next) => {
  const error = ApiError.from(err);
  const statusCode = error.statusCode || 500;

  const isProduction = NODE_ENV === "production";

  if (error.isOperational) {
    loggerService.warn({
      message: error.message,
      statusCode,
      method: req.method,
      url: req.originalUrl,
      ip: req.ip,
    });
  } else {
    loggerService.error({
      message: error.message,
      stack: error.stack,
      method: req.method,
      url: req.originalUrl,
      ip: req.ip,
    });
  }

  const body =
    isProduction && !error.isOperational
      ? {
          success: false,
          message: "Something went wrong",
        }
      : {
          ...error.toJSON(),
          ...(NODE_ENV === "development" && { stack: error.stack }),
        };

  res.status(statusCode).json(body);
};

export default errorHandler;
