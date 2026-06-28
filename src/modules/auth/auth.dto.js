class AuthDto {
  constructor(user, accessToken) {
    user = {
      email: user.email,
      emailVerifiedAt: user.emailVerifiedAt,

      username: user.username,

      role: user.role,
      status: user.status,
    };
    this.accessToken = accessToken;
  }
}

class AuthRefreshSessionDto {
  constructor(accessToken) {
    this.accessToken = accessToken;
  }
}

export { AuthDto, AuthRefreshSessionDto };
