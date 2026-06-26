const AuthenticationMessages = {
  Errors: {
    // Token Errors
    TOKEN_EXPIRED: "Your session has expired. Please log in again.",
    TOKEN_INVALID: "Invalid authentication token.",
    TOKEN_MALFORMED: "Token format is invalid.",
    TOKEN_MISSING: "Authentication token is required.",
    TOKEN_VERIFICATION_FAILED: "Token verification failed.",

    // JWT Errors
    JWT_DECODE_FAILED: "Unable to decode JWT token.",
    JWT_SIGNATURE_INVALID: "JWT signature is invalid.",
    JWT_AUDIENCE_INVALID: "JWT audience is invalid.",
    JWT_ISSUER_INVALID: "JWT issuer is invalid.",

    // Refresh Token Errors
    REFRESH_TOKEN_EXPIRED: "Refresh token has expired. Please log in again.",
    REFRESH_TOKEN_INVALID: "Invalid refresh token.",
    REFRESH_TOKEN_MISSING: "Refresh token is required.",

    // Session Errors
    SESSION_EXPIRED: "Your session has expired. Please log in again.",
    SESSION_INVALIDATED:
      "Your session is no longer valid. Please log in again.",
    SESSION_NOT_FOUND: "Session not found.",
    SESSION_HIJACKING_DETECTED:
      "Suspicious activity detected. Please log in again.",
    SESSION_DEVICE_MISMATCH: "Device mismatch detected. Please log in again.",
    SESSION_IP_MISMATCH: "IP address mismatch detected. Please log in again.",
    SESSION_USER_AGENT_MISMATCH:
      "User agent mismatch detected. Please log in again.",

    // OAuth Errors
    OAUTH_PROVIDER_ERROR: "OAuth provider returned an error.",
    OAUTH_INVALID_CODE: "Invalid OAuth authorization code.",
    OAUTH_CALLBACK_ERROR: "OAuth callback failed.",
    OAUTH_PROFILE_FETCH_FAILED: "Unable to fetch profile from OAuth provider.",

    // Authentication General
    AUTHENTICATION_FAILED: "Authentication failed. Please try again.",
    CREDENTIALS_INVALID: "Invalid credentials provided.",
    UNAUTHORIZED_REQUEST: "Unauthorized request.",
  },

  Responses: {
    LOGIN_SUCCESSFUL: "Login successful.",
    LOGOUT_SUCCESSFUL: "Logout successful.",
    TOKEN_REFRESHED: "Token refreshed successfully.",
    TOKEN_GENERATED: "Token generated successfully.",
    SESSION_CREATED: "Session created successfully.",
    AUTHENTICATION_SUCCESSFUL: "Authentication completed successfully.",
  },
};

export default AuthenticationMessages;
