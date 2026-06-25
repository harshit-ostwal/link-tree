import z from "zod/v4";
import { AuthProvider } from "../../infrastructure/database/generated/prisma/index.js";
import { createUuidSchema } from "../../shared/schemas/uuid.schema.js";
import { zEnum, zPassword, zString } from "../../shared/utils/zod.utils.js";

const providerIdParams = createUuidSchema("providerId");
const providerParams = z.strictObject({
  provider: zEnum("Provider", AuthProvider),
});

const accountSchema = z
  .strictObject({
    provider: zEnum("Provider", AuthProvider),
    providerId: zString("Provider ID"),
    password: zPassword().optional(),
  })
  .strip();

const createAccountSchema = accountSchema.partial({
  password: false,
});
const updateAccountSchema = accountSchema.partial({
  password: false,
});

export {
  createAccountSchema,
  providerIdParams,
  providerParams,
  updateAccountSchema,
};
