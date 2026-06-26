const AuthMessages = {
  Errors: {
    ALREADY_CREDENTIAL_EXISTS:
      "A user with the provided credentials already exists.",
    EMAIL_NOT_VERIFIED:
      "Email not verified. Please verify your email before signing in.",
    INVALID_CREDENTIALS:
      "Invalid credentials. Please check your email/username and password.",
  },

  Responses: {
    SIGN_UP_SUCCESS:
      "User signed up successfully. Please verify your email to complete the registration.",
    SIGN_IN_SUCCESS: "User signed in successfully.",
    SIGN_OUT_SUCCESS:
      "User signed out successfully. Please sign in again to continue.",
    SIGN_OUT_ALL_SESSIONS_SUCCESS:
      "User signed out from all sessions successfully. Please sign in again to continue.",

    SIGN_IN_WITH_OAUTH_SUCCESS:
      "User signed in with OAuth successfully. Please complete your profile to continue.",
  },
};

export default AuthMessages;
