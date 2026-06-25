class SessionDto {
  constructor(session) {
    this.id = session.id;
    this.userId = session.userId;

    this.refreshToken = session.refreshToken;
    this.refreshTokenExpiryAt = session.refreshTokenExpiryAt;

    this.ipAddress = session.ipAddress;
    this.userAgent = session.userAgent;

    this.revokedAt = session.revokedAt;
    this.replacedBy = session.replacedBy;
  }
}

export { SessionDto };
