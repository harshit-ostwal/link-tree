class AuthDto {
  constructor(user) {
    this.email = user.email;
    this.emailVerifiedAt = user.emailVerifiedAt;

    this.username = user.username;

    this.role = user.role;
    this.status = user.status;
  }
}

export { AuthDto };
