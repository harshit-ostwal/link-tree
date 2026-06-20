import generateUUID from "../../shared/utils/uuid.utils.js";

const requestIdMiddleware = (req, res, next) => {
  const incomingRequestId =
    req.headers.x_request_id || req.headers["x-request-id"];

  if (incomingRequestId) {
    req.id = incomingRequestId;
  } else {
    req.id = generateUUID();
  }

  res.setHeader("x-request-id", req.id);
  next();
};

export default requestIdMiddleware;
