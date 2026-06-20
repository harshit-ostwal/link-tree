import z from "zod/v4";
import { zEmail, zPassword, zString } from "../../shared/utils/zod.utils.js";

const signUpSchema = z.strictObject({
  user: z.strictObject({
    email: zEmail(),
    username: zString("Username"),
  }),
  account: z.strictObject({
    password: zPassword(),
  }),
  profile: z.strictObject({
    firstName: zString("First Name"),
    lastName: zString("Last Name"),
  }),
});

const signInSchema = z.strictObject({
  email: zEmail().optional(),
  username: zString("Username").optional(),
  password: zPassword(),
});

export { signInSchema, signUpSchema };
