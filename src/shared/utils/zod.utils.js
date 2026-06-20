import { z } from "zod";
import ApiError from "../../core/http/api.error.js";
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
      message: `${fieldName} must be at least ${minLength} characters long`,
    })
    .max(maxLength, {
      message: `${fieldName} must be at most ${maxLength} characters long`,
    });
};

const zEmail = (minLength = 2) => {
  return z
    .string()
    .email({ message: "Invalid email address" })
    .toLowerCase()
    .trim()
    .min(minLength, {
      message: `Email must be at least ${minLength} characters long`,
    })
    .max(255, { message: "Email must be at most 255 characters long" });
};

const zCoerce = (fieldName, type, options = {}) => {
  const { min, max, int = true, positive = true } = options;

  switch (type) {
    case "number": {
      let schema = z.coerce.number({ error: `Invalid ${fieldName}` });

      if (int) {
        schema = schema.int({ message: `${fieldName} must be an integer` });
      }

      if (positive) {
        schema = schema.positive({
          message: `${fieldName} must be a positive number`,
        });
      }

      if (typeof min === "number") {
        schema = schema.min(min, `${fieldName} must be at least ${min}`);
      }

      if (typeof max === "number") {
        schema = schema.max(max, `${fieldName} must be at most ${max}`);
      }

      return schema;
    }

    case "boolean":
      return z.coerce.boolean({ error: `Invalid ${fieldName}` });

    case "date":
      return z.coerce.date({ error: `Invalid ${fieldName}` });

    default:
      throw ApiError.internalServerError(
        `Unsupported zCoerce type "${type}" for field "${fieldName}"`
      );
  }
};

const zUUID = (fieldName) => {
  return z
    .string()
    .uuid({ message: `Invalid ${fieldName} format` })
    .min(36, `${fieldName} must be at least 36 characters long`)
    .max(36, `${fieldName} must be at most 36 characters long`);
};

const zPassword = (fieldName = "Password") => {
  return z
    .string({ error: `Invalid ${fieldName}` })
    .min(6, { message: `${fieldName} must be at least 6 characters long` })
    .max(128, { message: `${fieldName} must be at most 128 characters long` })
    .regex(REGEX_LOWERCASE, {
      message: `${fieldName} must contain at least one lowercase letter`,
    })
    .regex(REGEX_UPPERCASE, {
      message: `${fieldName} must contain at least one uppercase letter`,
    })
    .regex(REGEX_NUMBER, {
      message: `${fieldName} must contain at least one number`,
    })
    .regex(REGEX_SPECIAL_CHAR, {
      message: `${fieldName} must contain at least one special character`,
    });
};

const zToken = (fieldName) => {
  return z.string({ message: `Invalid ${fieldName}` });
};

const zArray = (
  fieldName,
  itemSchema = z.any(),
  minLength = 1,
  maxLength = 100,
  defaultValue = []
) => {
  return z
    .array(itemSchema, { error: `Invalid ${fieldName}` })
    .min(minLength, {
      message: `${fieldName} must contain at least ${minLength} items`,
    })
    .max(maxLength, {
      message: `${fieldName} must contain at most ${maxLength} items`,
    })
    .default(defaultValue);
};

const zTimeStamp = (fieldName) => {
  return z.string().datetime({ message: `Invalid ${fieldName}` });
};

const zUrl = (fieldName, minLength = 2, maxLength = 255) => {
  return z
    .url({ message: `Invalid ${fieldName}` })
    .min(minLength, {
      message: `${fieldName} must be at least ${minLength} characters long`,
    })
    .max(maxLength, {
      message: `${fieldName} must be at most ${maxLength} characters long`,
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
