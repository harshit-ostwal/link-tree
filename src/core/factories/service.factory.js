import { AccountService } from "../../modules/accounts/account.service.js";
import { ProfileService } from "../../modules/profile/profile.service.js";
import { SessionService } from "../../modules/sessions/session.service.js";
import { UserService } from "../../modules/users/user.service.js";

export function createServices(prismaClient) {
  const userService = new UserService(prismaClient);
  const accountService = new AccountService(prismaClient);
  const profileService = new ProfileService(prismaClient);
  const sessionService = new SessionService(prismaClient);

  return {
    userService,
    accountService,
    profileService,
    sessionService,
  };
}
