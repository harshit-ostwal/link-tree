import winston from "winston";
import { LOGGER_COLORS } from "./logger.constants.js";
import { logFormat } from "./logger.format.js";

const { combine, colorize } = winston.format;

export const loggerTransports = [
  new winston.transports.Console({
    handleExceptions: true,
    handleRejections: true,
    format: combine(
      colorize({
        all: true,
        message: true,
        level: true,
        colors: LOGGER_COLORS,
      }),
      logFormat
    ),
  }),
];
