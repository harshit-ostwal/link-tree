const CommonMessages = {
  Success: {
    OPERATION_SUCCESSFUL: "Operation completed successfully.",
    DATA_RETRIEVED: "Data retrieved successfully.",
    DATA_CREATED: "Data created successfully.",
    DATA_UPDATED: "Data updated successfully.",
    DATA_DELETED: "Data deleted successfully.",
    CHANGES_SAVED: "Changes saved successfully.",
  },

  Errors: {
    INTERNAL_ERROR: "An internal error occurred. Please try again.",
    SOMETHING_WENT_WRONG: "Something went wrong. Please try again.",
    OPERATION_FAILED: "Operation failed. Please try again.",
    UNKNOWN_ERROR: "An unknown error occurred.",
    PLEASE_TRY_AGAIN: "Please try again later.",

    // Network/Connectivity
    NETWORK_ERROR: "Network error. Please check your connection.",
    SERVER_UNREACHABLE: "Server is unreachable. Please try again later.",
    CONNECTION_LOST: "Connection lost. Please try again.",

    // Timeout
    REQUEST_TIMEOUT: "Request timed out. Please try again.",
    OPERATION_TIMEOUT: "Operation timed out. Please try again.",

    // Rate Limiting
    RATE_LIMIT_EXCEEDED: "Too many requests. Please try again later.",
    REQUEST_LIMIT_REACHED: "Request limit reached. Please try again later.",

    // Resource Not Found
    NOT_FOUND: "The requested resource was not found.",
    DATA_NOT_FOUND: "The requested data was not found.",
    RECORD_NOT_FOUND: "The requested record was not found.",

    // Conflict
    DUPLICATE_ENTRY: "This entry already exists.",
    ALREADY_EXISTS: "The resource already exists.",

    // Validation
    VALIDATION_FAILED: "Validation failed. Please check your input.",
    INVALID_INPUT: "Invalid input provided.",
    MISSING_INFORMATION: "Required information is missing.",

    // Access Control
    ACCESS_DENIED: "Access denied.",
    FORBIDDEN: "This action is forbidden.",
  },

  Info: {
    PROCESSING: "Processing your request...",
    LOADING: "Loading...",
    PLEASE_WAIT: "Please wait...",
    REDIRECTING: "Redirecting...",
  },

  Warnings: {
    UNSAVED_CHANGES: "You have unsaved changes.",
    CONFIRM_ACTION: "Please confirm this action.",
    IRREVERSIBLE_ACTION: "This action cannot be undone.",
  },
};

export default CommonMessages;
