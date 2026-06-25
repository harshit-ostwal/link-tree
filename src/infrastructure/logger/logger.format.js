import winston from "winston";
import { NODE_ENV } from "../../config/env.config.js";

const { combine, timestamp, errors, printf, prettyPrint } = winston.format;

const isProduction = NODE_ENV === "production";

export const logFormat = printf(({ timestamp, level, message, stack }) => {
  return `\n[${timestamp}] \n ${level} :- ${
    !isProduction && stack ? stack : message
  }`;
});

export const loggerFormat = combine(
  timestamp({
    format: "YYYY-MM-DD HH:mm:ss",
  }),
  errors({
    stack: !isProduction,
  }),
  logFormat,
  prettyPrint(),
);
