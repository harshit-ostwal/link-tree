const UserMessages = {
  Errors: {
    NOT_FOUND: "Unable to find the requested user.",
    ALREADY_EXISTS: "A user with the provided details already exists.",

    ACCOUNT_SUSPENDED:
      "Your account has been suspended. Please contact support for assistance.",
    ACCOUNT_DELETED:
      "This account is no longer available. Please contact support for assistance.",
    ACCOUNT_BANNED:
      "Your account has been restricted. Please contact support for assistance.",

    FORBIDDEN: "You do not have permission to perform this action.",

    EMAIL_NOT_VERIFIED: "Please verify your email address before continuing.",

    INVALID_STATUS: "The account is currently unavailable.",

    CREATE_FAILED: "Unable to create user account at this time.",

    UPDATE_FAILED: "Unable to update user information at this time.",

    DELETE_FAILED: "Unable to delete the user at this time.",

    FETCH_FAILED: "Unable to retrieve user information at this time.",
  },

  Responses: {
    FETCHED: "User information retrieved successfully.",
    CREATED: "User account created successfully.",
    UPDATED: "User information updated successfully.",
    DELETED: "User account deleted successfully.",
  },
};

export default UserMessages;
