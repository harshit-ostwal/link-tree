import z from "zod/v4";
import { AuthProvider } from "../../infrastructure/database/generated/prisma/index.js";
import {
  zEmail,
  zEnum,
  zPassword,
  zString,
} from "../../shared/utils/zod.utils.js";

const signUpSchema = z
  .strictObject({
    user: z.strictObject({
      email: zEmail(),
      username: zString("Username"),
    }),
    profile: z.strictObject({
      firstName: zString("First Name"),
      lastName: zString("Last Name"),
    }),
    account: z.strictObject({
      provider: zEnum("Provider", AuthProvider),
      password: zPassword(),
    }),
  })
  .strip();

const signInSchema = z
  .strictObject({
    identifier: zString("Identifier"),
    password: zPassword(),
  })
  .strip();

export { signInSchema, signUpSchema };
