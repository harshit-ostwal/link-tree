const ProfileMessages = {
  Errors: {
    NOT_FOUND: "Unable to find the requested profile.",
    ALREADY_EXISTS: "A profile with the provided details already exists.",

    FORBIDDEN: "You do not have permission to perform this action.",

    INVALID_STATUS: "The profile is currently unavailable.",

    UPDATE_FAILED: "Unable to update profile information at this time.",

    DELETE_FAILED: "Unable to delete the profile at this time.",

    FETCH_FAILED: "Unable to retrieve profile information at this time.",
  },

  Responses: {
    FETCHED: "Profile information retrieved successfully.",
    CREATED: "Profile created successfully.",
    UPDATED: "Profile information updated successfully.",
    DELETED: "Profile deleted successfully.",
  },
};

export default ProfileMessages;
