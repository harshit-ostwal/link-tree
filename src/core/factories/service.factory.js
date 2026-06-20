import { UserService } from "../../modules/users/user.service.js";

export function createServices(prismaClient) {
  const userService = new UserService(prismaClient);

  return {
    userService,
  };
}
