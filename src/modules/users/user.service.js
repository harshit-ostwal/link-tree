import ApiError from "../../core/http/api.error.js";
import { getChangedFields } from "../../shared/utils/object.utils.js";
import { UserRepository } from "./user.repository.js";

class UserService {
  #userRepo;

  constructor(prismaClient) {
    this.#userRepo = new UserRepository(prismaClient);
  }

  async getUserById(id) {
    const user = await this.#userRepo.findById(id);

    if (!user) {
      throw ApiError.notFound("User not found. Please try again later.");
    }

    return user;
  }

  async findUserById(id) {
    return await this.#userRepo.findById(id);
  }

  async getUserByIdentifier(identifier) {
    const user = await this.#userRepo.findByIdentifier(identifier);

    if (!user) {
      throw ApiError.notFound("User not found. Please try again later.");
    }

    return user;
  }

  async findUserByIdentifier(identifier) {
    return await this.#userRepo.findByIdentifier(identifier);
  }

  async createUser(data) {
    const existingUser = await this.findUserByIdentifier(
      data.email || data.username
    );

    if (existingUser) {
      throw ApiError.conflict(
        "Email or username already exists. Please try again later."
      );
    }

    return await this.#userRepo.create(data);
  }

  async updateUser(id, data) {
    const existingUser = await this.getUserById(id);

    const hasUpdates = getChangedFields(existingUser, data);
    return await this.#userRepo.update(id, hasUpdates);
  }

  async deleteUser(id) {
    await this.getUserById(id);
    return await this.#userRepo.delete(id);
  }
}

export { UserService };
