import prisma from "../../infrastructure/database/prisma.js";
import { ProfileRepository } from "./profile.repository.js";
import { ProfileService } from "./profile.service.js";
import { ProfileController } from "./profle.controller.js";

const profileRepo = new ProfileRepository(prisma);
const profileService = new ProfileService(profileRepo);
const profileController = new ProfileController(profileService);

export { profileController, profileRepo, profileService };
