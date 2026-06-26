const AuthorizationMessages = {
  Errors: {
    // Role-Based Access Control
    INSUFFICIENT_ROLE: "Your role does not have the required permissions.",
    ROLE_REQUIRED: "A specific role is required to perform this action.",
    ROLE_NOT_FOUND: "The specified role does not exist.",

    // Permission-Based Access Control
    INSUFFICIENT_PERMISSIONS: "You do not have the required permissions.",
    PERMISSION_DENIED: "Permission denied for this resource.",
    PERMISSION_NOT_FOUND: "The specified permission does not exist.",

    // Resource-Level Authorization
    RESOURCE_FORBIDDEN: "You do not have access to this resource.",
    RESOURCE_OWNER_ONLY: "Only the resource owner can perform this action.",
    ADMIN_ONLY: "This action can only be performed by administrators.",

    // User Status Authorization
    ACCOUNT_SUSPENDED:
      "Your account has been suspended. Please contact support.",
    ACCOUNT_BANNED: "Your account has been restricted. Please contact support.",
    ACCOUNT_DELETED:
      "This account is no longer available. Please contact support.",
    ACCOUNT_INACTIVE: "Your account is not active. Please verify your email.",
    ACCOUNT_LOCKED: "Your account has been locked. Please contact support.",

    // Subscription/Plan Authorization
    PLAN_UPGRADE_REQUIRED: "Your plan does not include this feature.",
    SUBSCRIPTION_EXPIRED:
      "Your subscription has expired. Please renew to continue.",
    FEATURE_NOT_AVAILABLE: "This feature is not available in your plan.",

    // General Authorization
    FORBIDDEN_ACTION: "This action is not allowed.",
    UNAUTHORIZED_ACCESS: "Unauthorized access to this resource.",
  },

  Responses: {
    AUTHORIZATION_SUCCESSFUL: "Authorization check passed.",
    PERMISSION_GRANTED: "Permission granted for this action.",
    ROLE_VERIFIED: "Role verification successful.",
    ACCESS_GRANTED: "Access granted to the resource.",
  },
};

export default AuthorizationMessages;
