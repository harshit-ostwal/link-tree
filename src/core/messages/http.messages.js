const HttpMessages = {
  Success: {
    OK: "Request successful",
    CREATED: "Resource created successfully",
    ACCEPTED: "Request accepted",
    NO_CONTENT: "No content",
    PARTIAL_CONTENT: "Partial content retrieved",
  },

  ClientErrors: {
    BAD_REQUEST: "Bad request. Please check your input.",
    UNAUTHORIZED: "You are not authorized to access this resource.",
    FORBIDDEN: "You do not have permission to access this resource.",
    NOT_FOUND: "The requested resource was not found.",
    METHOD_NOT_ALLOWED: "The HTTP method is not allowed for this resource.",
    NOT_ACCEPTABLE: "The request format is not acceptable.",
    REQUEST_TIMEOUT: "The request took too long to complete.",
    CONFLICT: "The request conflicts with existing data.",
    GONE: "The requested resource is no longer available.",
    PAYLOAD_TOO_LARGE: "The request payload is too large.",
    UNSUPPORTED_MEDIA_TYPE: "The media type is not supported.",
    UNPROCESSABLE_ENTITY: "Unable to process the request.",
    VALIDATION_ERROR: "Validation failed. Please check your input.",
    TOO_MANY_REQUESTS: "Too many requests. Please try again later.",
  },

  ServerErrors: {
    INTERNAL_SERVER_ERROR:
      "An internal server error occurred. Please try again later.",
    NOT_IMPLEMENTED: "This feature is not implemented yet.",
    BAD_GATEWAY: "Bad gateway. Please try again later.",
    SERVICE_UNAVAILABLE: "Service is temporarily unavailable.",
    GATEWAY_TIMEOUT: "Gateway timeout. Please try again later.",
    HTTP_VERSION_NOT_SUPPORTED: "HTTP version is not supported.",
  },

  Responses: {
    RESOURCE_CREATED: "Resource created successfully.",
    RESOURCE_UPDATED: "Resource updated successfully.",
    RESOURCE_DELETED: "Resource deleted successfully.",
    RESOURCE_FETCHED: "Resource retrieved successfully.",
    RESOURCES_FETCHED: "Resources retrieved successfully.",
    OPERATION_SUCCESSFUL: "Operation completed successfully.",
  },
};

export default HttpMessages;
