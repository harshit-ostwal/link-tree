import compression from "compression";
import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import morgan from "morgan";
import { COOKIE_SECRET_KEY } from "../../config/env.config.js";
import compressionConfig from "../../config/security/compression.config.js";
import helmetConfig from "../../config/security/helmet.config.js";
import hppConfig from "../../config/security/hpp.config.js";
import logger from "../../infrastructure/logger/logger.js";
import { REQUEST_SIZE_LIMIT } from "../../shared/constants/security.constants.js";
import requestIdMiddleware from "./request-id.middleware.js";

const securityMiddleware = (app) => {
  // Morgan
  morgan.token("id", (req) => req.id || "N/A");

  app.use(requestIdMiddleware);

  app.use(
    morgan(":id - :method :url :status - :response-time ms", {
      stream: logger.stream,
    }),
  );

  app.use(helmet(helmetConfig));

  app.use(compression(compressionConfig));

  app.use(hpp(hppConfig));

  app.use(cookieParser(COOKIE_SECRET_KEY));

  app.use(
    express.json({
      limit: REQUEST_SIZE_LIMIT,
      strict: true,
      type: "application/json",
    }),
  );

  app.use(
    express.urlencoded({
      extended: true,
      limit: REQUEST_SIZE_LIMIT,
    }),
  );
};

export default securityMiddleware;
