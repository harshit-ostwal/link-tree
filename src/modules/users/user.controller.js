import ApiResponse from "../../core/http/api.response.js";
import asyncHandler from "../../core/middlewares/async-handler.middleware.js";
import { UserDto } from "./user.dto.js";
import { UserService } from "./user.service.js";

class UserController {
  #userService;

  constructor(service = new UserService()) {
    this.#userService = service;
  }

  getUserById = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const user = await this.#userService.getUserById(id);

    return ApiResponse.ok(
      new UserDto(user),
      "User retrieved successfully."
    ).send(res);
  });

  getUserByIdentifier = asyncHandler(async (req, res) => {
    const identifier = req.params.identifier;

    const user = await this.#userService.getUserByIdentifier(identifier);

    return ApiResponse.ok(
      new UserDto(user),
      "User retrieved successfully."
    ).send(res);
  });

  createUser = asyncHandler(async (req, res) => {
    const data = req.body;

    const user = await this.#userService.createUser(data);

    return ApiResponse.created(
      new UserDto(user),
      "User created successfully."
    ).send(res);
  });

  updateUser = asyncHandler(async (req, res) => {
    const id = req.user.id;
    const data = req.body;

    const user = await this.#userService.updateUser(id, data);

    return ApiResponse.ok(new UserDto(user), "User updated successfully.").send(
      res
    );
  });

  deleteUser = asyncHandler(async (req, res) => {
    const id = req.user.id;

    await this.#userService.deleteUser(id);

    return ApiResponse.noContent("User deleted successfully.").send(res);
  });
}

export default new UserController();
