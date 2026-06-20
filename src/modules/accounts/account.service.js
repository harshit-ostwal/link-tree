import ApiError from "../../core/http/api.error.js";
import { hashValue } from "../../core/security/hash.security.js";
import { AuthProvider } from "../../infrastructure/database/generated/prisma/index.js";
import { AccountRepository } from "./account.repository.js";

class AccountService {
  #accountRepository;

  constructor(prisma) {
    this.#accountRepository = new AccountRepository(prisma);
  }

  async getAccountById(id) {
    const account = await this.#accountRepository.findById(id);

    if (!account) {
      throw ApiError.notFound("Account not found. Please try again later.");
    }

    return account;
  }

  async getAccountsByUserId(userId) {
    const accounts = await this.#accountRepository.findByUserId(userId);

    if (!accounts || accounts.length === 0) {
      throw ApiError.notFound("Accounts not found. Please try again later.");
    }

    return accounts;
  }

  async getAccountByProviderAndUserId(provider, userId) {
    const account = await this.#accountRepository.findByProviderAndUserId(
      provider,
      userId
    );

    if (!account) {
      throw ApiError.notFound("Account not found. Please try again later.");
    }

    return account;
  }

  async findAccountByProviderAndUserId(provider, userId) {
    return await this.#accountRepository.findByProviderAndUserId(
      provider,
      userId
    );
  }

  async getAccountByProviderAndProviderId(provider, providerId) {
    const account = await this.#accountRepository.findByProviderAndProviderId(
      provider,
      providerId
    );

    if (!account) {
      throw ApiError.notFound("Account not found. Please try again later.");
    }

    return account;
  }

  async findAccountByProviderAndProviderId(provider, providerId) {
    return await this.#accountRepository.findByProviderAndProviderId(
      provider,
      providerId
    );
  }

  async createAccount(userId, data) {
    const existingAccount = await this.findAccountByProviderAndUserId(
      data.provider || AuthProvider.CREDENTIALS,
      userId
    );

    if (existingAccount) {
      throw ApiError.conflict(
        "Account already exists for this provider. Please try again later."
      );
    }

    if (data.password) {
      const hashedPassword = await hashValue(data.password);
      data.password = hashedPassword;
    }

    return await this.#accountRepository.create(userId, data);
  }

  async deleteAccount(id) {
    await this.getAccountById(id);
    return await this.#accountRepository.delete(id);
  }

  async deleteAccountsByUserId(userId) {
    await this.getAccountsByUserId(userId);
    return await this.#accountRepository.deleteByUserId(userId);
  }
}

export { AccountService };
