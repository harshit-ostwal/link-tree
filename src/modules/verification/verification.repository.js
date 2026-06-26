import prismaService from "../../infrastructure/database/prisma.service.js";
import generateUUID from "../../shared/utils/uuid.utils.js";
import VerificationSelect from "./verification.select.js";

class VerificationRepository {
  #prisma;
  constructor(prismaClient = prismaService.getClient()) {
    this.#prisma = prismaClient;
  }

  async findByIdentifierAndType(identifier, type) {
    return await this.#prisma.verification.findUnique({
      where: {
        identifier,
        type,
      },
      select: VerificationSelect,
    });
  }

  async create(data) {
    const { id, ...rest } = data;
    return await this.#prisma.verification.create({
      data: {
        id: generateUUID(),
        ...rest,
      },
      select: VerificationSelect,
    });
  }

  async updateById(id, data) {
    return await this.#prisma.verification.update({
      where: {
        id,
      },
      data,
      select: VerificationSelect,
    });
  }

  async deleteById(id) {
    return await this.#prisma.verification.delete({
      where: {
        id,
      },
      select: VerificationSelect,
    });
  }

  async deleteByIdentifierAndType(identifier, type) {
    return await this.#prisma.verification.deleteMany({
      where: {
        identifier,
        type,
        verifiedAt: null,
      },
    });
  }
}

export { VerificationRepository };
