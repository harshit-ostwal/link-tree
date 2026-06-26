import prisma from "../../infrastructure/database/prisma.js";
import { SessionSelect } from "./session.select.js";

class SessionRepository {
  #prisma;
  constructor(prismaClient = prisma) {
    this.#prisma = prismaClient;
  }

  async findById(id) {
    return await this.#prisma.session.findUnique({
      where: {
        id,
      },
      select: SessionSelect,
    });
  }

  async findByUserId(userId) {
    return await this.#prisma.session.findMany({
      where: {
        userId,
      },
      select: SessionSelect,
    });
  }

  async create(userId, data) {
    return await this.#prisma.session.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        ...data,
      },
      select: SessionSelect,
    });
  }

  async update(id, data) {
    return await this.#prisma.session.update({
      where: {
        id,
      },
      data,
      select: SessionSelect,
    });
  }

  async delete(id) {
    return await this.#prisma.session.delete({
      where: {
        id,
      },
      select: SessionSelect,
    });
  }

  async deleteByUserId(userId) {
    return await this.#prisma.session.deleteMany({
      where: {
        userId,
      },
      limit: 5,
    });
  }
}

export { SessionRepository };
