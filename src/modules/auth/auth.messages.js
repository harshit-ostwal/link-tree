const AuthMessages = {
  Errors: {
    ALREADY_CREDENTIAL_EXISTS:
      "A user with the provided credentials already exists.",
    EMAIL_NOT_VERIFIED:
      "Email not verified. Please verify your email before signing in.",
    INVALID_CREDENTIALS:
      "Invalid credentials. Please check your email/username and password.",
    INVALID_OAUTH_PROVIDER:
      "Invalid OAuth provider. Please use a valid provider to sign in.",
    OAUTH_ACCOUNT_NOT_LINKED:
      "OAuth account not linked. Please sign in with your credentials first.",
    OAUTH_EMAIL_NOT_VERIFIED_GOOGLE:
      "Google account does not have a verified email address associated with it. Please ensure your Google account has a verified email address.",
    OAUTH_EMAIL_NOT_VERIFIED_GITHUB:
      "GitHub account does not have an email address associated with it. Please ensure your GitHub account has a verified email address.",
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
