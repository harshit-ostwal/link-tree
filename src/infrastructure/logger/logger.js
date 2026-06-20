import winston from "winston";
import loggerConfig from "./logger.config.js";
import { loggerFormat } from "./logger.format.js";
import { loggerStream } from "./logger.stream.js";
import { loggerTransports } from "./logger.transports.js";

const logger = winston.createLogger({
  ...loggerConfig,
  format: loggerFormat,
  transports: loggerTransports,
});

logger.stream = loggerStream(logger);

export default logger;
