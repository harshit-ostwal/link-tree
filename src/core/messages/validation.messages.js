const ValidationMessages = {
  Errors: {
    INVALID_REQUEST_BODY: "Invalid request body. Please check your input.",
    INVALID_REQUEST_QUERY: "Invalid query parameters. Please check your input.",
    INVALID_REQUEST_PARAMS: "Invalid URL parameters. Please check your input.",
    INVALID_REQUEST_HEADERS:
      "Invalid request headers. Please check your input.",

    REQUIRED_FIELD_MISSING: "Required field is missing.",
    INVALID_EMAIL_FORMAT: "Please provide a valid email address.",
    INVALID_USERNAME_FORMAT:
      "Username must be 3-30 characters, alphanumeric and hyphens only.",
    INVALID_PASSWORD_FORMAT:
      "Password must be at least 8 characters with uppercase, lowercase, number and special character.",
    INVALID_URL_FORMAT: "Please provide a valid URL.",
    INVALID_PHONE_FORMAT: "Please provide a valid phone number.",
    INVALID_DATE_FORMAT: "Please provide a valid date.",
    INVALID_UUID_FORMAT: "Invalid identifier format.",

    VALUE_TOO_LONG: "Input value exceeds the maximum allowed length.",
    VALUE_TOO_SHORT: "Input value is too short.",
    VALUE_OUT_OF_RANGE: "Input value is out of acceptable range.",

    ENUM_INVALID_VALUE:
      "Please provide a valid value from the allowed options.",
    INVALID_ARRAY_VALUE: "Invalid array value provided.",
    INVALID_OBJECT_VALUE: "Invalid object structure provided.",

    DUPLICATE_FIELD:
      "This value is already in use. Please choose a different one.",
  },

  Responses: {
    VALIDATION_PASSED: "All validations passed successfully.",
  },
};

export default ValidationMessages;
