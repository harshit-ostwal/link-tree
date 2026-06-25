class AccountDto {
  constructor(account) {
    this.provider = account.provider;
    this.providerId = account.providerId;
    this.lastLoginAt = account.lastLoginAt;
  }
}

export { AccountDto };
