import prisma from "../../infrastructure/database/prisma.js";
import ProfileSelect from "./profile.select.js";

class ProfileRepository {
  #prisma;
  constructor(prismaClient = prisma) {
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
        user: {
          connect: {
            id: userId,
          },
        },
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
