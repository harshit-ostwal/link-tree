import ApiError from "../../core/http/api.error.js";
import {
  getChangedFields,
  hasChanges,
} from "../../shared/utils/object.utils.js";
import UserMessages from "./user.messages.js";
import { UserRepository } from "./user.repository.js";

class UserService {
  #userRepo;
  /**
   * @param {PrismaClient} [prismaClient]
   */
  constructor(prismaClient) {
    this.#userRepo = new UserRepository(prismaClient);
  }

  async getAllUsers() {
    const users = await this.#userRepo.findAll();

    if (!users || users.length === 0) {
      throw ApiError.notFound(UserMessages.Errors.NOT_FOUND);
    }

    return users;
  }

  async getUserById(id) {
    const user = await this.#userRepo.findById(id);

    if (!user) {
      throw ApiError.notFound(UserMessages.Errors.NOT_FOUND);
    }

    return user;
  }

  async getUserByEmail(email) {
    const user = await this.#userRepo.findByEmail(email);

    if (!user) {
      throw ApiError.notFound(UserMessages.Errors.NOT_FOUND);
    }

    return user;
  }

  async getUserByUsername(username) {
    const user = await this.#userRepo.findByUsername(username);

    if (!user) {
      throw ApiError.notFound(UserMessages.Errors.NOT_FOUND);
    }

    return user;
  }

  async getUserByIdentifier(identifier) {
    const user = await this.#userRepo.findByIdentifier(identifier);

    if (!user) {
      throw ApiError.notFound(UserMessages.Errors.NOT_FOUND);
    }

    return user;
  }

  async createUser(data) {
    const existingUser = await this.#userRepo.findByEmailOrUsername(
      data.username,
      data.email,
    );

    if (existingUser) {
      throw ApiError.conflict(UserMessages.Errors.ALREADY_EXISTS);
    }

    const user = await this.#userRepo.create(data);

    if (!user) {
      throw ApiError.internalServerError(UserMessages.Errors.CREATE_FAILED);
    }

    return user;
  }

  async updateUserById(id, data) {
    const existingUser = await this.getUserById(id);

    if (!existingUser) {
      throw ApiError.notFound(UserMessages.Errors.NOT_FOUND);
    }

    const changedFields = getChangedFields(existingUser, data);

    if (!hasChanges(existingUser, data)) {
      return existingUser;
    }

    const user = await this.#userRepo.update(id, changedFields);

    if (!user) {
      throw ApiError.internalServerError(UserMessages.Errors.UPDATE_FAILED);
    }

    return user;
  }

  async softDeleteUserById(id) {
    const existingUser = await this.getUserById(id);

    if (!existingUser) {
      throw ApiError.notFound(UserMessages.Errors.NOT_FOUND);
    }

    const user = await this.#userRepo.softDelete(id);

    if (!user) {
      throw ApiError.internalServerError(UserMessages.Errors.DELETE_FAILED);
    }

    return user;
  }

  async hardDeleteUserById(id) {
    const existingUser = await this.getUserById(id);

    if (!existingUser) {
      throw ApiError.notFound(UserMessages.Errors.NOT_FOUND);
    }

    const user = await this.#userRepo.hardDelete(id);

    if (!user) {
      throw ApiError.internalServerError(UserMessages.Errors.DELETE_FAILED);
    }

    return user;
  }
}

export { UserService };
