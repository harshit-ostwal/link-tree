import { VerificationType } from "../../infrastructure/database/generated/prisma/index.js";

const VERIFICATION_EXPIRY = {
  [VerificationType.EMAIL_VERIFY_LINK]: 15,
  [VerificationType.EMAIL_VERIFY_OTP]: 15,
  [VerificationType.LOGIN_OTP]: 15,
  [VerificationType.MAGIC_LOGIN]: 15,
  [VerificationType.PASSWORD_RESET_LINK]: 15,
  [VerificationType.PASSWORD_RESET_OTP]: 15,
};

const VERIFICATION_LIMITS = {
  MAX_VERIFICATION_ATTEMPTS: 5,
  MAX_RESEND_ATTEMPTS: 5,
  RESEND_COOLDOWN_SECONDS: 60,
};

export { VERIFICATION_EXPIRY, VERIFICATION_LIMITS };
