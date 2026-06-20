export const loggerStream = (logger) => ({
  write: (message) => {
    logger.info(JSON.stringify(message.trim(), null, 2));
  },
});
