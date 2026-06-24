import { PrismaClient } from "../../infrastructure/database/generated/prisma/index.js";
import ProfileSelect from "./profile.select.js";

class ProfileRepository {
  #prisma;
  /**
   * @param {PrismaClient} prismaClient
   */
  constructor(prismaClient) {
    this.#prisma = prismaClient;
  }

  async findByUserId(userId) {
    return await this.#prisma.profile.findFirst({
      where: {
        userId,
      },
      select: ProfileSelect,
    });
  }

  async upsertByUserId(userId, data) {
    return await this.#prisma.profile.upsert({
      where: {
        userId,
      },
      create: {
        ...data,
      },
      update: {
        ...data,
      },
      select: ProfileSelect,
    });
  }

  async deleteByUserId(userId) {
    return await this.#prisma.profile.delete({
      where: {
        userId,
      },
      select: ProfileSelect,
    });
  }
}

export { ProfileRepository };
