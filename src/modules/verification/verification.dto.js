class VerificationDto {
  constructor(verification) {
    this.id = verification.id;

    this.identifier = verification.identifier;
    this.token = verification.token;
    this.type = verification.type;

    this.attempts = verification.attempts;

    this.expiresAt = verification.expiresAt;
    this.verifiedAt = verification.verifiedAt;

    this.createdAt = verification.createdAt;
    this.updatedAt = verification.updatedAt;
  }
}

export { VerificationDto };
