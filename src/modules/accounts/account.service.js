import ApiError from "../../core/http/api.error.js";
import { hashValue } from "../../core/security/hash.security.js";
import { AuthProvider } from "../../infrastructure/database/generated/prisma/index.js";
import {
  getChangedFields,
  hasChanges,
} from "../../shared/utils/object.utils.js";
import AccountMessages from "./account.messages.js";
import { AccountRepository } from "./account.repository.js";

class AccountService {
  #accountRepo;
  constructor(prismaClient) {
    this.#accountRepo = new AccountRepository(prismaClient);
  }

  async getAccountById(id) {
    const account = await this.#accountRepo.findById(id);

    if (!account) {
      throw ApiError.notFound(AccountMessages.Errors.NOT_FOUND);
    }

    return account;
  }

  async getAccountsByUserId(userId) {
    const accounts = await this.#accountRepo.findByUserId(userId);

    if (!accounts || accounts.length === 0) {
      throw ApiError.notFound(AccountMessages.Errors.NOT_FOUND);
    }

    return accounts;
  }

  async findAccountByProviderAndProviderId(provider, providerId) {
    return await this.#accountRepo.findByProviderAndProviderId(
      provider,
      providerId,
    );
  }

  async findAccountByUserIdAndProvider(userId, provider) {
    return await this.#accountRepo.findByUserIdAndProvider(userId, provider);
  }

  async getAccountByUserIdAndProvider(userId, provider) {
    const account = await this.#accountRepo.findByUserIdAndProvider(
      userId,
      provider,
    );

    if (!account) {
      throw ApiError.notFound(AccountMessages.Errors.NOT_FOUND);
    }

    return account;
  }

  async createAccountByUserId(userId, data) {
    const existingAccount = await this.findAccountByUserIdAndProvider(
      userId,
      data.provider,
    );

    if (existingAccount) {
      throw ApiError.conflict(AccountMessages.Errors.ALREADY_EXISTS);
    }

    if (data.password && data.provider === AuthProvider.CREDENTIALS) {
      const hashedPassword = await hashValue(data.password);
      data.password = hashedPassword;
    }

    const account = await this.#accountRepo.create(userId, data);

    if (!account) {
      throw ApiError.internalServerError(AccountMessages.Errors.CREATE_FAILED);
    }

    return account;
  }

  async updateAccountById(id, data) {
    const existingAccount = await this.getAccountById(id);

    const changedFields = getChangedFields(existingAccount, data);

    if (!hasChanges(existingAccount, data)) {
      return existingAccount;
    }

    if (data.password && data.provider === AuthProvider.CREDENTIALS) {
      const hashedPassword = await hashValue(data.password);
      changedFields.password = hashedPassword;
    }

    const account = await this.#accountRepo.update(id, changedFields);

    if (!account) {
      throw ApiError.internalServerError(AccountMessages.Errors.UPDATE_FAILED);
    }

    return account;
  }

  async deleteAccountByUserIdAndProvider(userId, provider) {
    const existingAccount = await this.getAccountByUserIdAndProvider(
      userId,
      provider,
    );

    if (!existingAccount) {
      throw ApiError.notFound(AccountMessages.Errors.NOT_FOUND);
    }

    const account = await this.#accountRepo.deleteByUserIdAndProvider(
      userId,
      provider,
    );

    if (!account) {
      throw ApiError.internalServerError(AccountMessages.Errors.DELETE_FAILED);
    }

    return account;
  }
}

export { AccountService };
