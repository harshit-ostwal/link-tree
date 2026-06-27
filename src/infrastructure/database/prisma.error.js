import ApiError from "../../core/http/api.error.js";
import DatabaseMessages from "../../core/messages/database.messages.js";
import { Prisma } from "./generated/prisma/index.js";

const mapPrismaError = (error) => {
  if (!(error instanceof Prisma.PrismaClientKnownRequestError)) {
    return null;
  }

  switch (error.code) {
    // Database connection errors
    case "P1001":
      return ApiError.serviceUnavailable(
        DatabaseMessages.Errors.CONNECTION_FAILED,
      );

    case "P1008":
      return ApiError.gatewayTimeout(DatabaseMessages.Errors.OPERATION_TIMEOUT);

    case "P1017":
      return ApiError.serviceUnavailable(
        DatabaseMessages.Errors.CONNECTION_CLOSED,
      );

    // Value too long
    case "P2000":
      return ApiError.validationError(
        DatabaseMessages.Errors.INVALID_FIELD_VALUE,
      );

    // Unique constraint
    case "P2002": {
      const errors =
        error.meta?.target?.map((field) => ({
          field,
          message: `${
            field.charAt(0).toUpperCase() + field.slice(1)
          } ${DatabaseMessages.Errors.UNIQUE_CONSTRAINT_VIOLATION}`,
        })) ?? [];

      return ApiError.conflict(
        DatabaseMessages.Errors.UNIQUE_CONSTRAINT_VIOLATION,
        errors,
      );
    }

    // Foreign key constraint
    case "P2003":
      return ApiError.badRequest(
        DatabaseMessages.Errors.FOREIGN_KEY_CONSTRAINT_VIOLATION,
      );

    // Invalid column value
    case "P2007": {
      const message = error.meta?.driverAdapterError?.cause?.originalMessage;

      if (message) {
        const enumMatch = message.match(/enum "(.*?)": "(.*?)"/);

        if (enumMatch) {
          const [, field, value] = enumMatch;

          return ApiError.badRequest(
            `${DatabaseMessages.Errors.INVALID_ENUM_VALUE}: '${value}' for ${field}.`,
          );
        }
      }

      return ApiError.badRequest(DatabaseMessages.Errors.INVALID_FIELD_VALUE);
    }

    // Null constraint violation
    case "P2011":
      return ApiError.validationError(DatabaseMessages.Errors.FIELD_REQUIRED);

    // Record not found
    case "P2025":
      return ApiError.notFound(DatabaseMessages.Errors.RECORD_NOT_FOUND);

    default:
      return ApiError.internalServerError(
        DatabaseMessages.Errors.OPERATION_FAILED,
      );
  }
};

export { mapPrismaError };
