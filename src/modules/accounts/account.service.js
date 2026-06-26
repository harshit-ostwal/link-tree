import ApiError from "../../core/http/api.error.js";
import { hashValue } from "../../core/security/hash.security.js";
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
      throw ApiError(AccountMessages.Errors.NOT_FOUND);
    }

    return account;
  }

  async getAccountsByUserId(userId) {
    const accounts = await this.#accountRepo.findByUserId(userId);

    if (!accounts || accounts.length === 0) {
      throw ApiError(AccountMessages.Errors.NOT_FOUND);
    }

    return accounts;
  }

  async getAccountByProviderAndProviderId(provider, providerId) {
    const account = await this.#accountRepo.findByProviderAndProviderId(
      provider,
      providerId,
    );

    if (!account) {
      throw ApiError(AccountMessages.Errors.NOT_FOUND);
    }

    return account;
  }

  async getAccountByUserIdAndProvider(userId, provider) {
    const account = await this.#accountRepo.findByUserIdAndProvider(
      userId,
      provider,
    );

    if (!account) {
      throw ApiError(AccountMessages.Errors.NOT_FOUND);
    }

    return account;
  }

  async createAccountByUserId(userId, data) {
    const existingAccount = await this.#accountRepo.findByUserIdAndProvider(
      userId,
      data.provider,
    );

    if (existingAccount) {
      throw ApiError(AccountMessages.Errors.ALREADY_EXISTS);
    }

    if (data.password) {
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

    if (data.password) {
      const hashedPassword = await hashValue(data.password);
      changedFields.password = hashedPassword;
    }

    const account = await this.#accountRepo.update(id, changedFields);

    if (!account) {
      throw ApiError.internalServerError(AccountMessages.Errors.UPDATE_FAILED);
    }

    return account;
  }

  async deleteAccountById(id) {
    await this.getAccountById(id);

    const account = await this.#accountRepo.delete(id);

    if (!account) {
      throw ApiError.internalServerError(AccountMessages.Errors.DELETE_FAILED);
    }

    return account;
  }

  async deleteAccountsByUserId(userId) {
    await this.getAccountsByUserId(userId);

    const accounts = await this.#accountRepo.deleteByUserId(userId);

    if (!accounts) {
      throw ApiError.internalServerError(AccountMessages.Errors.DELETE_FAILED);
    }

    return accounts;
  }
}

export { AccountService };
