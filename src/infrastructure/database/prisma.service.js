import loggerService from "../../infrastructure/logger/logger.service.js";
import prisma from "./prisma.js";

class PrismaService {
  #prisma;
  constructor(prismaClient = prisma) {
    this.#prisma = prismaClient;
  }

  async connect() {
    try {
      loggerService.info("Connecting to the database...");
      await this.#prisma.$connect();

      // Simple query to verify connection
      await this.healthCheck();

      loggerService.info("Successfully connected to the database.");
    } catch (error) {
      loggerService.error("Database connection failed.", error);
      throw error;
    }
  }

  async disconnect() {
    try {
      loggerService.info("Disconnecting from the database...");
      await this.#prisma.$disconnect();
      loggerService.info("Successfully disconnected from the database.");
    } catch (error) {
      loggerService.error("Database disconnection failed.", error);
      throw error;
    }
  }

  async healthCheck() {
    try {
      return await this.#prisma.$queryRaw`SELECT 1`;
    } catch (error) {
      loggerService.error("Database health check failed.", error);
      throw error;
    }
  }

  getClient() {
    return this.#prisma;
  }

  async transaction(callback) {
    try {
      return await this.#prisma.$transaction(callback);
    } catch (error) {
      loggerService.error("Database transaction failed.", error);
      throw error;
    }
  }
}

export default new PrismaService();
