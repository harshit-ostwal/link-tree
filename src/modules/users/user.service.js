import ApiError from "../../core/http/api.error.js";
import { getChangedFields } from "../../shared/utils/object.utils.js";
import UserMessages from "./user.messages.js";
import { UserRepository } from "./user.repository.js";

class UserService {
  #userRepo;
  /**
   * @param {UserRepository} userRepository
   */
  constructor(userRepository) {
    this.#userRepo = userRepository;
  }

  async findUserById(id) {
    const user = await this.#userRepo.findById(id);

    if (!user) {
      throw ApiError.notFound(UserMessages.Errors.NOT_FOUND);
    }

    return user;
  }

  async findUserByEmail(email) {
    const user = await this.#userRepo.findByEmail(email);

    if (!user) {
      throw ApiError.notFound(UserMessages.Errors.NOT_FOUND);
    }

    return user;
  }

  async findUserByUsername(username) {
    const user = await this.#userRepo.findByUsername(username);

    if (!user) {
      throw ApiError.notFound(UserMessages.Errors.NOT_FOUND);
    }

    return user;
  }

  async findUserByIdentifier(identifier) {
    const user = await this.#userRepo.findByIdentifier(identifier);

    if (!user) {
      throw ApiError.notFound(UserMessages.Errors.NOT_FOUND);
    }

    return user;
  }

  async createUser(data) {
    const existingUser = await this.#userRepo.findByEmailOrUsername(
      data.username,
      data.email
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
    const existingUser = await this.findUserById(id);

    if (!existingUser) {
      throw ApiError.notFound(UserMessages.Errors.NOT_FOUND);
    }

    const hasUpdates = getChangedFields(existingUser, data);

    const user = await this.#userRepo.update(id, hasUpdates);

    if (!user) {
      throw ApiError.internalServerError(UserMessages.Errors.UPDATE_FAILED);
    }

    return user;
  }

  async softDeleteUserById(id) {
    const existingUser = await this.findUserById(id);

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
    const existingUser = await this.findUserById(id);

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
