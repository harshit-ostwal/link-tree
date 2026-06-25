const AccountMessages = {
  Errors: {
    NOT_FOUND: "Unable to find the requested account.",
    ALREADY_EXISTS: "An account with the provided details already exists.",

    FORBIDDEN: "You do not have permission to perform this action.",

    INVALID_STATUS: "The account is currently unavailable.",

    UPDATE_FAILED: "Unable to update account information at this time.",

    DELETE_FAILED: "Unable to delete the account at this time.",

    FETCH_FAILED: "Unable to retrieve account information at this time.",
  },

  Responses: {
    FETCHED: "Account information retrieved successfully.",
    FETCHED_ALL: "All accounts retrieved successfully.",
    CREATED: "Account created successfully.",
    UPDATED: "Account information updated successfully.",
    DELETED: "Account deleted successfully.",
    DELETED_ALL: "All accounts deleted successfully.",
  },
};

export default AccountMessages;
