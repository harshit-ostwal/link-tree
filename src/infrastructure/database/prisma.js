import { PrismaPg } from "@prisma/adapter-pg";
import { DATABASE_URL } from "../../config/env.config.js";
import ApiError from "../../core/http/api.error.js";
import { PrismaClient } from "./generated/prisma/index.js";

if (!DATABASE_URL)
  throw ApiError.badGateway("Database connection string is not configured.");

const adapter = new PrismaPg({
  connectionString: DATABASE_URL,
});

const prisma = new PrismaClient({
  errorFormat: "pretty",
  adapter,
});

export default prisma;
