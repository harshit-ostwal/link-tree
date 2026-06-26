const VerificationMessages = {
  Errors: {
    NOT_FOUND: "Unable to find the requested verification.",
    ALREADY_EXISTS:
      "A verification request with the provided details already exists.",

    INVALID_TOKEN: "The provided verification token is invalid.",

    EXPIRED_TOKEN:
      "The verification token has expired. Please request a new one.",

    MAX_ATTEMPTS_REACHED:
      "Maximum verification attempts reached. Please request a new verification code.",

    FORBIDDEN: "You do not have permission to perform this action.",

    INVALID_STATUS: "The verification is currently unavailable.",

    GENERATE_FAILED: "Failed to generate a new verification request.",

    VERIFY_FAILED: "Failed to verify the provided verification request.",
  },

  Responses: {
    FETCHED: "Verification information retrieved successfully.",
    FETCHED_ALL: "All verifications retrieved successfully.",
    CREATED: "Verification created successfully.",
    UPDATED: "Verification information updated successfully.",
    DELETED: "Verification deleted successfully.",
    DELETED_ALL: "All verifications deleted successfully.",
    VERIFIED: "Verification completed successfully.",
  },
};

export default VerificationMessages;
