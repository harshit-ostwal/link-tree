import z from "zod/v4";
import { zString, zUrl } from "../../shared/utils/zod.utils.js";

const profileSchema = z
  .strictObject({
    firstName: zString("First Name"),
    lastName: zString("Last Name"),
    avatar: zUrl("Avatar").optional(),
    bio: zString("Bio").optional(),
    mobileNo: zString("Mobile Number").optional(),
  })
  .strip();

const createProfileSchema = profileSchema;
const updateProfileSchema = profileSchema
  .extend({
    firstName: zString("First Name").optional(),
    lastName: zString("Last Name").optional(),
  })
  .partial();

export { createProfileSchema, updateProfileSchema };
