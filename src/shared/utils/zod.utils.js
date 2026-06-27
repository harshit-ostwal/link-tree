import { z } from "zod/v4";
import ApiError from "../../core/http/api.error.js";
import CommonMessages from "../../core/messages/common.messages.js";
import {
  REGEX_LOWERCASE,
  REGEX_NUMBER,
  REGEX_SPECIAL_CHAR,
  REGEX_UPPERCASE,
} from "../constants/regex.constants.js";

const zString = (fieldName, minLength = 2, maxLength = 255) => {
  return z
    .string({ error: "Invalid string" })
    .min(minLength, {
      error: `${fieldName} must be at least ${minLength} characters long`,
    })
    .max(maxLength, {
      error: `${fieldName} must be at most ${maxLength} characters long`,
    });
};

const zEmail = (minLength = 2) => {
  return z
    .email({ error: "Invalid email address" })
    .toLowerCase()
    .trim()
    .min(minLength, {
      error: `Email must be at least ${minLength} characters long`,
    })
    .max(255, { error: "Email must be at most 255 characters long" });
};

const zCoerce = (fieldName, type, options = {}) => {
  const { min, max, int = true, positive = true } = options;

  switch (type) {
    case "number": {
      let schema = z.coerce.number({ error: `Invalid ${fieldName}` });

      if (int) {
        schema = schema.int({ error: `${fieldName} must be an integer` });
      }

      if (positive) {
        schema = schema.positive({
          error: `${fieldName} must be a positive number`,
        });
      }

      if (typeof min === "number") {
        schema = schema.min(min, {
          error: `${fieldName} must be at least ${min}`,
        });
      }

      if (typeof max === "number") {
        schema = schema.max(max, {
          error: `${fieldName} must be at most ${max}`,
        });
      }

      return schema;
    }

    case "boolean":
      return z.coerce.boolean({ error: `Invalid ${fieldName}` });

    case "date":
      return z.coerce.date({ error: `Invalid ${fieldName}` });

    default:
      throw ApiError.internalServerError(CommonMessages.Errors.INTERNAL_ERROR);
  }
};

const zUUID = (fieldName) => {
  return z
    .uuid({ error: `Invalid ${fieldName} format` })
    .min(36, { error: `${fieldName} must be at least 36 characters long` })
    .max(36, { error: `${fieldName} must be at most 36 characters long` });
};

const zPassword = (fieldName = "Password") => {
  return z
    .string({ error: `Invalid ${fieldName}` })
    .min(6, { error: `${fieldName} must be at least 6 characters long` })
    .max(128, { error: `${fieldName} must be at most 128 characters long` })
    .regex(REGEX_LOWERCASE, {
      error: `${fieldName} must contain at least one lowercase letter`,
    })
    .regex(REGEX_UPPERCASE, {
      error: `${fieldName} must contain at least one uppercase letter`,
    })
    .regex(REGEX_NUMBER, {
      error: `${fieldName} must contain at least one number`,
    })
    .regex(REGEX_SPECIAL_CHAR, {
      error: `${fieldName} must contain at least one special character`,
    });
};

const zToken = (fieldName) => {
  return z.string({ error: `Invalid ${fieldName}` });
};

const zArray = (
  fieldName,
  itemSchema = z.any(),
  minLength = 1,
  maxLength = 100,
  defaultValue = [],
) => {
  return z
    .array(itemSchema, { error: `Invalid ${fieldName}` })
    .min(minLength, {
      error: `${fieldName} must contain at least ${minLength} items`,
    })
    .max(maxLength, {
      error: `${fieldName} must contain at most ${maxLength} items`,
    })
    .default(defaultValue);
};

const zTimeStamp = (fieldName) => {
  return z.iso.datetime({ error: `Invalid ${fieldName}` });
};

const zUrl = (fieldName, minLength = 2, maxLength = 255) => {
  return z
    .url({ error: `Invalid ${fieldName}` })
    .min(minLength, {
      error: `${fieldName} must be at least ${minLength} characters long`,
    })
    .max(maxLength, {
      error: `${fieldName} must be at most ${maxLength} characters long`,
    });
};

const zEnum = (fieldName, values) => {
  return z.enum(values, { error: `Invalid ${fieldName}.` });
};

export {
  zArray,
  zCoerce,
  zEmail,
  zEnum,
  zPassword,
  zString,
  zTimeStamp,
  zToken,
  zUrl,
  zUUID,
};
