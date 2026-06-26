const MiddlewareMessages = {
  Errors: {
    // Request ID Middleware
    REQUEST_ID_MISSING: "Request ID could not be generated.",

    // Authentication Middleware
    TOKEN_MISSING: "Authentication token is missing.",
    TOKEN_INVALID: "Authentication token is invalid.",
    TOKEN_EXPIRED: "Authentication token has expired.",

    // Authorization Middleware
    PERMISSION_DENIED: "You do not have permission to perform this action.",
    ROLE_NOT_ALLOWED: "Your role is not allowed to access this resource.",
    STATUS_NOT_ALLOWED:
      "Your account status does not allow this action. Please contact support.",

    // Validation Middleware
    INVALID_REQUEST_FORMAT: "Request format is invalid.",
    MISSING_REQUIRED_FIELDS: "Required fields are missing.",

    // CORS Middleware
    CORS_NOT_ALLOWED: "Cross-origin request is not allowed.",

    // Security Middleware
    SUSPICIOUS_ACTIVITY: "Suspicious activity detected. Request blocked.",
    RATE_LIMIT_EXCEEDED: "Rate limit exceeded. Please try again later.",
    MALFORMED_REQUEST: "Request is malformed or contains invalid data.",

    // Static Files Middleware
    FILE_NOT_FOUND: "The requested file was not found.",
    FILE_ACCESS_DENIED: "Access to the requested file is denied.",

    // Not Found Middleware
    ROUTE_NOT_FOUND: "The requested route does not exist.",
    ENDPOINT_NOT_FOUND: "The requested endpoint was not found.",
  },

  Responses: {
    REQUEST_VALIDATED: "Request validation passed.",
    AUTHENTICATION_SUCCESSFUL: "Authentication successful.",
    AUTHORIZATION_SUCCESSFUL: "Authorization check passed.",
    MIDDLEWARE_PROCESSED: "Middleware processing completed.",
  },
};

export default MiddlewareMessages;
