const DatabaseMessages = {
  Errors: {
    CONNECTION_FAILED: "Unable to connect to the database.",
    CONNECTION_TIMEOUT: "Database connection timed out.",
    CONNECTION_CLOSED: "Database connection was closed.",

    OPERATION_TIMEOUT: "Database operation timed out.",
    OPERATION_FAILED: "Database operation failed. Please try again.",

    UNIQUE_CONSTRAINT_VIOLATION: "This value already exists in the database.",
    FOREIGN_KEY_CONSTRAINT_VIOLATION: "Invalid reference to related resource.",
    INVALID_ENUM_VALUE: "Invalid value for the field.",

    RECORD_NOT_FOUND: "The requested record was not found.",
    MULTIPLE_RECORDS_FOUND: "Multiple records found when one was expected.",

    INVALID_DATA_TYPE: "Invalid data type provided.",
    INVALID_FIELD_VALUE: "Invalid value for the field.",
    FIELD_REQUIRED: "This field is required.",

    TRANSACTION_FAILED: "Database transaction failed.",
    TRANSACTION_TIMEOUT: "Database transaction timed out.",

    MIGRATION_PENDING: "Database migrations are pending.",
    MIGRATION_FAILED: "Database migration failed.",

    PRISMA_ERROR: "A database error occurred. Please try again.",
  },

  Responses: {
    QUERY_SUCCESSFUL: "Database query completed successfully.",
    INSERT_SUCCESSFUL: "Record inserted successfully.",
    UPDATE_SUCCESSFUL: "Record updated successfully.",
    DELETE_SUCCESSFUL: "Record deleted successfully.",
  },
};

export default DatabaseMessages;
