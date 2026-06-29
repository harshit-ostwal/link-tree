/** biome-ignore-all lint/suspicious/noConsole: This file uses console statements for logging environment loading status */
import fs from "node:fs";
import process from "node:process";
import { config } from "dotenv";
import z from "zod/v4";
import envSchema from "../shared/schemas/env.schema.js";

const envFile = `.env.${process.env.NODE_ENV || "development"}`;
const defaultEnvFile = ".env";

let path;
if (fs.existsSync(envFile)) {
  path = envFile;
  console.info(`\n 🌱 Loaded environment variables from: ${envFile} \n`);
} else if (fs.existsSync(defaultEnvFile)) {
  console.warn(
    `\n ⚠️ ${envFile} not found. Falling back to ${defaultEnvFile}. \n`,
  );
  path = defaultEnvFile;
  console.info(`\n 🌱 Loaded environment variables from: ${defaultEnvFile} \n`);
} else {
  console.error(
    `\n ❌ No environment file found. Please create either ${envFile} or ${defaultEnvFile}. \n`,
  );
}

config({
  path,
  debug: !!(
    process.env.DOTENV_DEBUG &&
    (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test")
  ),
  encoding: "utf8",
  override: false,
  quiet: !!(process.env.NODE_ENV === "production"),
});

const parsedEnv = envSchema.safeParse(process.env);
const env = parsedEnv.success ? parsedEnv.data : {};

if (!parsedEnv.success) {
  console.error(
    "❌ Invalid environment variables:",
    z.flattenError(parsedEnv.error).fieldErrors,
  );
}

export const {
  NODE_ENV,
  DOTENV_DEBUG,
  LOG_LEVEL,
  PORT,

  // CORS
  ALLOWED_ORIGINS,

  // URL's
  BACKEND_URL,
  FRONTEND_URL,

  // Database
  DATABASE_URL,

  // Cloudinary
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,

  // OAuth
  // 1. Google
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL,

  // 2. GitHub
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_CALLBACK_URL,

  // Cookies
  COOKIE_SECRET_KEY,

  // JWT
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY_MS,
} = env;
