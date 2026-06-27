import ApiResponse from "../../core/http/api.response.js";
import asyncHandler from "../../core/middlewares/async-handler.middleware.js";
import UserDto from "./user.dto.js";
import UserMessages from "./user.messages.js";
import { UserService } from "./user.service.js";

class UserController {
  #userService;
  constructor() {
    this.#userService = new UserService();
  }

  getAllUsers = asyncHandler(async (_req, res) => {
    const users = await this.#userService.getAllUsers();

    return ApiResponse.ok(
      users.map((user) => new UserDto(user)),
      UserMessages.Responses.FETCHED,
    ).send(res);
  });

  getUserById = asyncHandler(async (req, res) => {
    const id = req.user.id;

    const user = await this.#userService.getUserById(id);

    return ApiResponse.ok(
      new UserDto(user),
      UserMessages.Responses.FETCHED,
    ).send(res);
  });

  getUserByEmail = asyncHandler(async (req, res) => {
    const email = req.params.email;

    const user = await this.#userService.getUserByEmail(email);

    return ApiResponse.ok(
      new UserDto(user),
      UserMessages.Responses.FETCHED,
    ).send(res);
  });

  getUserByUsername = asyncHandler(async (req, res) => {
    const username = req.params.username;

    const user = await this.#userService.getUserByUsername(username);

    return ApiResponse.ok(
      new UserDto(user),
      UserMessages.Responses.FETCHED,
    ).send(res);
  });

  getUserByIdentifier = asyncHandler(async (req, res) => {
    const identifier = req.params.identifier;

    const user = await this.#userService.getUserByIdentifier(identifier);

    return ApiResponse.ok(
      new UserDto(user),
      UserMessages.Responses.FETCHED,
    ).send(res);
  });

  createUser = asyncHandler(async (req, res) => {
    const data = req.body;

    const user = await this.#userService.createUser(data);

    return ApiResponse.created(
      new UserDto(user),
      UserMessages.Responses.CREATED,
    ).send(res);
  });

  updateUserById = asyncHandler(async (req, res) => {
    const id = req.user.id;
    const data = req.body;

    const user = await this.#userService.updateUserById(id, data);

    return ApiResponse.ok(
      new UserDto(user),
      UserMessages.Responses.UPDATED,
    ).send(res);
  });

  softDeleteUserById = asyncHandler(async (req, res) => {
    const id = req.user.id;

    const user = await this.#userService.softDeleteUserById(id);

    return ApiResponse.ok(
      new UserDto(user),
      UserMessages.Responses.DELETED,
    ).send(res);
  });

  hardDeleteUserById = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const user = await this.#userService.hardDeleteUserById(id);

    return ApiResponse.ok(
      new UserDto(user),
      UserMessages.Responses.DELETED,
    ).send(res);
  });
}

export default new UserController();
