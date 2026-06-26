const getRequestInfo = (req) => {
  return {
    userAgent: req.headers["user-agent"] || "unknown",
    ipAddress:
      req.ip ||
      req.connection?.remoteAddress ||
      req.socket?.remoteAddress ||
      req.headers["x-forwarded-for"] ||
      "unknown",
  };
};

export { getRequestInfo };
