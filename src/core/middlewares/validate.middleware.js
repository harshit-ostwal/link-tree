import { ZodError } from "zod/v4";
import ValidationSource from "../../shared/constants/validation.constants.js";
import ApiError from "../http/api.error.js";

const validate =
  (schema, source = ValidationSource.BODY) =>
  async (req, _res, next) => {
    try {
      const result = await schema.safeParseAsync(req[source]);

      if (!result.success) {
        const flattenError = result.error.flatten();
        return next(
          ApiError.validationError("Validation Error", [flattenError])
        );
      }

      return next();
    } catch (error) {
      if (error instanceof ZodError) {
        const flattenError = error.flatten();
        return next(
          ApiError.validationError("Validation Error", [flattenError])
        );
      }

      return next(ApiError.from(error));
    }
  };

export default validate;
