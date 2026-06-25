import {
  PrismaClient,
  UserStatus,
} from "../../infrastructure/database/generated/prisma/index.js";
import generateUUID from "../../shared/utils/uuid.utils.js";
import UserSelect from "./user.select.js";

class UserRepository {
  #prisma;
  /**
   * @param {PrismaClient} prismaClient
   */
  constructor(prismaClient) {
    this.#prisma = prismaClient;
  }

  async findAll() {
    return await this.#prisma.user.findMany({
      select: UserSelect,
    });
  }

  async findById(id) {
    return await this.#prisma.user.findFirst({
      where: {
        id,
        status: UserStatus.ACTIVE,
      },
      select: UserSelect,
    });
  }

  async findByEmail(email) {
    return await this.#prisma.user.findFirst({
      where: {
        email,
        status: UserStatus.ACTIVE,
      },
      select: UserSelect,
    });
  }

  async findByUsername(username) {
    return await this.#prisma.user.findFirst({
      where: {
        username,
        status: UserStatus.ACTIVE,
      },
      select: UserSelect,
    });
  }

  async findByIdentifier(identifier) {
    return await this.#prisma.user.findFirst({
      where: {
        OR: [
          {
            email: identifier,
          },
          {
            username: identifier,
          },
        ],
        status: UserStatus.ACTIVE,
      },
      select: UserSelect,
    });
  }

  async findByEmailOrUsername(username, email) {
    return await this.#prisma.user.findFirst({
      where: {
        OR: [
          {
            email,
          },
          {
            username,
          },
        ],
      },
      select: UserSelect,
    });
  }

  async create(data) {
    const { id, ...rest } = data;
    return await this.#prisma.user.create({
      data: {
        id: generateUUID(),
        ...rest,
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

  async softDelete(id) {
    return await this.#prisma.user.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
        status: UserStatus.DELETED,
      },
      select: UserSelect,
    });
  }

  async hardDelete(id) {
    return await this.#prisma.user.delete({
      where: {
        id,
      },
      select: UserSelect,
    });
  }
}

export { UserRepository };
