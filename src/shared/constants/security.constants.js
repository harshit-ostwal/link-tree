import {
  ACCESS_TOKEN_EXPIRY,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY,
  REFRESH_TOKEN_SECRET,
} from "../../config/env.config.js";

const RATE_LIMIT = Object.freeze({
  WINDOW_MS: 60 * 60 * 1000,
  MAX_REQUESTS: 500,
});

const SALT_ROUNDS = 10;

const TOKEN_TYPE = Object.freeze({
  ACCESS: "access",
  REFRESH: "refresh",
});

const TOKEN_CONFIG = {
  [TOKEN_TYPE.ACCESS]: {
    secret: ACCESS_TOKEN_SECRET,
    expiry: ACCESS_TOKEN_EXPIRY,
    hash: false,
  },

  [TOKEN_TYPE.REFRESH]: {
    secret: REFRESH_TOKEN_SECRET,
    expiry: REFRESH_TOKEN_EXPIRY,
    hash: true,
  },
};

const JWT_ALGORITHM = "HS256";

const COMPRESSION_LEVEL = 6;
const COMPRESSION_THRESHOLD = "1kb";

const REQUEST_SIZE_LIMIT = "10mb";

export {
  COMPRESSION_LEVEL,
  COMPRESSION_THRESHOLD,
  JWT_ALGORITHM,
  RATE_LIMIT,
  REQUEST_SIZE_LIMIT,
  SALT_ROUNDS,
  TOKEN_CONFIG,
  TOKEN_TYPE,
};
