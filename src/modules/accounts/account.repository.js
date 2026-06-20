import prisma from "../../infrastructure/database/prisma.js";
import generateUUID from "../../shared/utils/uuid.utils.js";
import {
  AccountCreateSelect,
  AccountSelect,
  AccountWithCredentialsSelect,
} from "./account.select.js";

class AccountRepository {
  #prisma;

  constructor(client = prisma) {
    this.#prisma = client;
  }

  async findById(id) {
    return await this.#prisma.account.findUnique({
      where: {
        id,
      },
      select: AccountSelect,
    });
  }

  async findByUserId(userId) {
    return await this.#prisma.account.findMany({
      where: {
        userId,
      },
      select: AccountSelect,
    });
  }

  async findByProviderAndUserId(provider, userId) {
    return await this.#prisma.account.findUnique({
      where: {
        provider_userId: {
          provider,
          userId,
        },
      },
      select: AccountWithCredentialsSelect,
    });
  }

  async findByProviderAndProviderId(provider, providerId) {
    return await this.#prisma.account.findUnique({
      where: {
        provider_providerId: {
          provider,
          providerId,
        },
      },
      select: AccountSelect,
    });
  }

  async create(userId, data) {
    return await this.#prisma.account.create({
      data: {
        id: generateUUID(),
        user: {
          connect: {
            id: userId,
          },
        },
        ...data,
      },
      select: AccountCreateSelect,
    });
  }

  async delete(id) {
    return await this.#prisma.account.delete({
      where: {
        id,
      },
      select: AccountSelect,
    });
  }

  async deleteByUserId(userId) {
    return await this.#prisma.account.deleteMany({
      where: {
        userId,
      },
    });
  }
}

export { AccountRepository };
