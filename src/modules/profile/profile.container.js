import { ProfileService } from "./profile.service.js";
import { ProfileController } from "./profle.controller.js";

const profileService = new ProfileService();
const profileController = new ProfileController(profileService);

export { profileController, profileService };
