import prisma from "../../infrastructure/database/prisma.js";
import ProfileSelect from "./profile.select.js";

class ProfileRepository {
  #prisma;
  constructor(prismaClient = prisma) {
    this.#prisma = prismaClient;
  }

  async findByUserId(userId) {
    return await this.#prisma.profile.findUnique({
      where: {
        userId,
      },
      select: ProfileSelect,
    });
  }

  async create(userId, data) {
    return await this.#prisma.profile.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        ...data,
      },
      select: ProfileSelect,
    });
  }

  async updateByUserId(userId, data) {
    return await this.#prisma.profile.update({
      where: {
        userId,
      },
      data,
      select: ProfileSelect,
    });
  }
}

export { ProfileRepository };
