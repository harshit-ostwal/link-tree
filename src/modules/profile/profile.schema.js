import z from "zod/v4";
import { zString } from "../../shared/utils/zod.utils.js";

const profileSchema = z
  .strictObject({
    firstName: zString("First Name"),
    lastName: zString("Last Name"),
    avatar: zString("Avatar").optional(),
    banner: zString("Banner").optional(),
    bio: zString("Bio").optional(),
  })
  .strip();

const updateProfileSchema = profileSchema
  .extend({
    firstName: zString("First Name").optional(),
    lastName: zString("Last Name").optional(),
  })
  .partial();

export { updateProfileSchema };
