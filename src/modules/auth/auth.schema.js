import z from "zod/v4";
import { zEmail, zString } from "../../shared/utils/zod.utils.js";

const signUpSchema = z
  .strictObject({
    user: z.strictObject({
      email: zEmail(),
      username: zString("Username"),
      password: zString("Password"),
    }),
    profile: z.strictObject({
      firstName: zString("First Name"),
      lastName: zString("Last Name"),
    }),
  })
  .strip();

const signInSchema = z
  .strictObject({
    identifier: zString("Identifier"),
    password: zString("Password"),
  })
  .strip();

export { signInSchema, signUpSchema };
