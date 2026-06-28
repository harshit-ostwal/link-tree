import prismaService from "../../infrastructure/database/prisma.service.js";
import generateUUID from "../../shared/utils/uuid.utils.js";
import LinkSelect from "./link.select.js";

class LinkRepository {
  #prisma;
  constructor(prismaClient = prismaService.getClient()) {
    this.#prisma = prismaClient;
  }

  async findById(id) {
    return await this.#prisma.link.findUnique({
      where: {
        id,
      },
      select: LinkSelect,
    });
  }

  async findByUserId(userId) {
    return await this.#prisma.link.findMany({
      where: {
        userId,
      },
      select: LinkSelect,
    });
  }

  findByUserIdAndUrl(userId, url) {
    return this.#prisma.link.findUnique({
      where: {
        userId_url: {
          userId,
          url,
        },
      },
      select: LinkSelect,
    });
  }

  async create(userId, data) {
    const { id, ...rest } = data;
    return await this.#prisma.link.create({
      data: {
        id: generateUUID(),
        ...rest,
        userId,
      },
      select: LinkSelect,
    });
  }

  async update(id, data) {
    return await this.#prisma.link.update({
      where: {
        id,
      },
      data,
      select: LinkSelect,
    });
  }

  async updateByUserId(userId, data) {
    return await this.#prisma.link.updateMany({
      where: {
        userId,
      },
      data,
    });
  }

  async delete(id) {
    return await this.#prisma.link.delete({
      where: {
        id,
      },
      select: LinkSelect,
    });
  }

  async deleteByUserId(userId) {
    return await this.#prisma.link.deleteMany({
      where: {
        userId,
      },
    });
  }
}

export { LinkRepository };
