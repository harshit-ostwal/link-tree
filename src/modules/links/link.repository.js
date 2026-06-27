import prismaService from "../../infrastructure/database/prisma.service.js";

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
    });
  }
}

export { LinkRepository };
