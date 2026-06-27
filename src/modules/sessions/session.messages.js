const SessionMessages = {
  Errors: {
    NOT_FOUND: "Unable to find the requested session.",
    ALREADY_EXISTS: "A session with the provided details already exists.",
    MAX_DEVICE_LIMIT_REACHED:
      "You have reached the maximum number of allowed devices. Please log out from another device before creating a new session.",
    FORBIDDEN: "You do not have permission to perform this action.",
    INVALID_STATUS: "The session is currently unavailable.",
    UPDATE_FAILED: "Unable to update session information at this time.",
    DELETE_FAILED: "Unable to delete the session at this time.",
    FETCH_FAILED: "Unable to retrieve session information at this time.",
    EXPIRED: "The session has expired. Please log in again to continue.",
    INVALID_REFRESH_TOKEN:
      "The provided refresh token is invalid or has expired.",
  },

  Responses: {
    FETCHED: "Session information retrieved successfully.",
    FETCHED_ALL: "All sessions retrieved successfully.",
    CREATED: "Session created successfully.",
    UPDATED: "Session information updated successfully.",
    DELETED: "Session deleted successfully.",
    DELETED_ALL: "All sessions deleted successfully.",
  },
};

export default SessionMessages;
