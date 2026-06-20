import { ALLOWED_ORIGINS } from "../env.config.js";

const corsConfig = {
  origin: ALLOWED_ORIGINS
    ? ALLOWED_ORIGINS.split(",").map((origin) => origin.trim())
    : false,
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

export { corsConfig };
