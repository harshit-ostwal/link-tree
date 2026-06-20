import logger from "./logger.js";

class LoggerService {
  info(message, meta = {}) {
    logger.info(message, meta);
  }

  warn(message, meta = {}) {
    logger.warn(message, meta);
  }

  error(message, meta = {}) {
    logger.error(message, meta);
  }

  debug(message, meta = {}) {
    logger.debug(message, meta);
  }
}

export default new LoggerService();
