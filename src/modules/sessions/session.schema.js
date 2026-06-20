import z from "zod/v4";
import { zCoerce, zString, zToken } from "../../shared/utils/zod.utils.js";

const sessionSchema = z
  .strictObject({
    refreshToken: zToken("Refresh Token"),
    refreshTokenExpiresAt: zCoerce("Refresh Token Expiration Date", "date"),
    ipAddress: zString("IP Address").optional(),
    userAgent: zString("User Agent").optional(),
  })
  .strip();

const createSessionSchema = sessionSchema;
const updateSessionSchema = sessionSchema.partial();

export { createSessionSchema, updateSessionSchema };
