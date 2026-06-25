import ApiError from "../../core/http/api.error.js";
import { Prisma } from "./generated/prisma/index.js";

const mapPrismaError = (error) => {
  if (!(error instanceof Prisma.PrismaClientKnownRequestError)) {
    return null;
  }

  switch (error.code) {
    // Database connection errors
    case "P1001":
      return ApiError.serviceUnavailable("Unable to connect to the database.");

    case "P1008":
      return ApiError.gatewayTimeout("Database operation timed out.");

    case "P1017":
      return ApiError.serviceUnavailable("Database connection was closed.");

    // Value too long
    case "P2000":
      return ApiError.validationError(
        "Input value exceeds the allowed length.",
      );

    // Unique constraint
    case "P2002": {
      const errors =
        error.meta?.target?.map((field) => ({
          field,
          message: `${
            field.charAt(0).toUpperCase() + field.slice(1)
          } already exists.`,
        })) ?? [];

      return ApiError.conflict("Validation failed.", errors);
    }

    // Foreign key constraint
    case "P2003":
      return ApiError.badRequest("Invalid relation reference.");

    // Invalid column value
    case "P2007": {
      const message = error.meta?.driverAdapterError?.cause?.originalMessage;

      if (message) {
        const enumMatch = message.match(/enum "(.*?)": "(.*?)"/);

        if (enumMatch) {
          const [, field, value] = enumMatch;

          return ApiError.badRequest(`Invalid value '${value}' for ${field}.`);
        }
      }

      return ApiError.badRequest("One or more values are invalid.");
    }

    // Null constraint violation
    case "P2011":
      return ApiError.validationError("A required field is missing.");

    // Record not found
    case "P2025":
      return ApiError.notFound("Requested resource not found.");

    default:
      return ApiError.internalServerError("Database operation failed.");
  }
};

export { mapPrismaError };
