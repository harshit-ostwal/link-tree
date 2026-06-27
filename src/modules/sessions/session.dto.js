class SessionDto {
  constructor(session) {
    this.id = session.id;
    this.userId = session.userId;

    this.ipAddress = session.ipAddress;
    this.userAgent = session.userAgent;

    this.revokedAt = session.revokedAt;
    this.replacedBy = session.replacedBy;
  }
}

export { SessionDto };
