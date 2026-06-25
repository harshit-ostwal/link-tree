import { PrismaClient } from "../../infrastructure/database/generated/prisma/index.js";
import generateUUID from "../../shared/utils/uuid.utils.js";
import AccountSelect from "./account.select.js";

class AccountRepository {
  #prisma;
  /**
   * @param {PrismaClient} prisma
   */
  constructor(prisma) {
    this.#prisma = prisma;
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

  async findByUserIdAndProvider(userId, provider) {
    return await this.#prisma.account.findUnique({
      where: {
        userId_provider: {
          userId,
          provider,
        },
      },
      select: AccountSelect,
    });
  }

  async create(userId, data) {
    const { id, ...rest } = data;
    return await this.#prisma.account.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        id: generateUUID(),
        ...rest,
      },
      select: AccountSelect,
    });
  }

  async update(id, data) {
    return await this.#prisma.account.update({
      where: {
        id,
      },
      data,
      select: AccountSelect,
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
