import { ProfileService } from "../../modules/profile/profile.service.js";
import { UserService } from "../../modules/users/user.service.js";
// import { AccountService } from "../../modules/accounts/account.service.js";
// import { LinkService } from "../../modules/links/link.serkvice.js";
// import { SessionService } from "../../modules/1/session.service.js";

export function createServices(prismaClient) {
  const userService = new UserService(prismaClient);
  // const linkService = new LinkService(prismaClient);
  // const accountService = new AccountService(prismaClient);
  const profileService = new ProfileService(prismaClient);
  // const sessionService = new SessionService(prismaClient);

  return {
    userService,
    // linkService,
    // accountService,
    profileService,
    // sessionService,
  };
}
