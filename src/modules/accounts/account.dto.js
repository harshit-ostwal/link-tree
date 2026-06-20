class AccountDto {
  constructor(data) {
    this.id = data.id;
    this.provider = data.provider;
    this.providerId = data.providerId;
    this.lastLoginAt = data.lastLoginAt;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.userId = data.userId;
  }
}

class AccountCreateDto {
  constructor(data) {
    this.id = data.id;
    this.provider = data.provider;
    this.providerId = data.providerId;
    this.createdAt = data.createdAt;
    this.userId = data.userId;
  }
}

export { AccountCreateDto, AccountDto };
