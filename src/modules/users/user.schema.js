import z from "zod/v4";
import {
  Role,
  UserStatus,
} from "../../infrastructure/database/generated/prisma/index.js";
import { zEmail, zEnum, zString } from "../../shared/utils/zod.utils.js";

const emailParamSchema = z.strictObject({
  email: zEmail(),
});

const userSchema = z
  .strictObject({
    email: zEmail(),
    username: zString("Username"),
    status: zEnum("Status", UserStatus).optional(),
    role: zEnum("Role", Role).optional(),
  })
  .strip();

const createUserSchema = userSchema;
const updateUserSchema = userSchema.partial();

export { createUserSchema, emailParamSchema, updateUserSchema };
