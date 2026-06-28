import z from "zod/v4";
import { zCoerce, zString, zUrl } from "../../shared/utils/zod.utils.js";

const linkSchema = z
  .strictObject({
    title: zString("Title"),
    description: zString("Description").optional(),

    url: zUrl("Url"),
    color: zString("Color", 6, 6).optional(),

    position: zCoerce("Position", "number").optional(),

    isActive: zCoerce("Is Active", "boolean").optional(),
    isVisible: zCoerce("Is Visible", "boolean").optional(),
    isFeatured: zCoerce("Is Featured", "boolean").optional(),
  })
  .strip();

const createLinkSchema = linkSchema;
const updateLinkSchema = linkSchema
  .extend({
    title: zString("Title").optional(),
    url: zUrl("Url").optional(),
  })
  .partial();

export { createLinkSchema, updateLinkSchema };
