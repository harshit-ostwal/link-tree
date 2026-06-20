import prisma from "../../infrastructure/database/prisma.js";
import generateUUID from "../../shared/utils/uuid.utils.js";
import UserSelect from "./user.select.js";

class UserRepository {
  #prisma;
  constructor(prismaClient = prisma) {
    this.#prisma = prismaClient;
  }

  async findById(id) {
    return await this.#prisma.user.findUnique({
      where: {
        id,
      },
      select: UserSelect,
    });
  }

  async findByIdentifier(identifier) {
    return await this.#prisma.user.findUnique({
      where: {
        OR: [
          {
            email: identifier,
          },
          {
            username: identifier,
          },
        ],
      },
      select: UserSelect,
    });
  }

  async create(data) {
    return await this.#prisma.user.create({
      data: {
        id: generateUUID(),
        ...data,
      },
      select: UserSelect,
    });
  }

  async update(id, data) {
    return await this.#prisma.user.update({
      where: {
        id,
      },
      data,
      select: UserSelect,
    });
  }

  async delete(id) {
    return await this.#prisma.user.delete({
      where: {
        id,
      },
      select: UserSelect,
    });
  }
}

export { UserRepository };
