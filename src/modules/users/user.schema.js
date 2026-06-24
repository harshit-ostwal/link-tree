import z from "zod/v4";
import { zEmail, zString } from "../../shared/utils/zod.utils.js";

const emailParamSchema = z.strictObject({
  email: zEmail(),
});

const usernameParamSchema = z.strictObject({
  username: zString("Username"),
});

const identifierParamSchema = z.strictObject({
  identifier: zString("Identifier"),
});

const userSchema = z
  .strictObject({
    email: zEmail(),
    username: zString("Username"),
  })
  .strip();

const createUserSchema = userSchema;
const updateUserSchema = userSchema.partial();

export {
  createUserSchema,
  emailParamSchema,
  identifierParamSchema,
  updateUserSchema,
  usernameParamSchema,
};
