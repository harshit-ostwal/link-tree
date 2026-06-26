import ApiError from "../../core/http/api.error.js";
import { hashValue } from "../../core/security/hash.security.js";
import { VERIFICATION_LIMITS } from "./verification.constants.js";
import VerificationMessages from "./verification.messages.js";
import { VerificationRepository } from "./verification.repository.js";

class VerificationService {
  #verificationRepo;
  constructor(prismaClient) {
    this.#verificationRepo = new VerificationRepository(prismaClient);
  }

  async getVerificationByIdentifierAndType(identifier, type) {
    const verification = await this.#verificationRepo.findByIdentifierAndType(
      identifier,
      type,
    );

    if (!verification) {
      throw ApiError.notFound(VerificationMessages.Errors.NOT_FOUND);
    }

    return verification;
  }

  async generateVerification(identifier, type, token) {
    await this.#verificationRepo.deleteByIdentifierAndType(identifier, type);

    const payload = {
      identifier,
      type,
      token: await hashValue(token),
      expiryAt: new Date(Date.now() + VERIFICATION_EXPIRY[type] * 60 * 1000),
    };

    const verification = await this.#verificationRepo.create(payload);

    if (!verification) {
      throw ApiError.internalServerError(
        VerificationMessages.Errors.GENERATE_FAILED,
      );
    }

    return verification;
  }

  async verifyVerification(identifier, type, token) {
    const existingVerification = await this.getVerificationByIdentifierAndType(
      identifier,
      type,
    );

    if (!existingVerification) {
      throw ApiError.notFound(VerificationMessages.Errors.NOT_FOUND);
    }

    if (existingVerification.verifiedAt) {
      throw ApiError.forbidden(VerificationMessages.Errors.FORBIDDEN);
    }

    if (existingVerification.expiryAt < new Date()) {
      throw ApiError.badRequest(VerificationMessages.Errors.EXPIRED_TOKEN);
    }

    if (
      existingVerification.attempts >=
      VERIFICATION_LIMITS.MAX_VERIFICATION_ATTEMPTS
    ) {
      throw ApiError.forbidden(
        VerificationMessages.Errors.MAX_ATTEMPTS_REACHED,
      );
    }

    if ((await hashValue(token)) !== existingVerification.token) {
      await this.#verificationRepo.updateById(existingVerification.id, {
        attempts: existingVerification.attempts + 1,
      });

      throw ApiError.badRequest(VerificationMessages.Errors.INVALID_TOKEN);
    }

    const verification = await this.#verificationRepo.updateById(
      existingVerification.id,
      {
        verifiedAt: new Date(),
      },
    );

    if (!verification) {
      throw ApiError.internalServerError(
        VerificationMessages.Errors.VERIFY_FAILED,
      );
    }

    return verification;
  }
}

export { VerificationService };
