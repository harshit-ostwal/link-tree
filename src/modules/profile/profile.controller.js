import ApiResponse from "../../core/http/api.response.js";
import asyncHandler from "../../core/middlewares/async-handler.middleware.js";
import { ProfileDto } from "./profile.dto.js";
import { ProfileService } from "./profile.service.js";

class ProfileController {
  #profileService;

  constructor() {
    this.#profileService = new ProfileService();
  }

  getProfileByUserId = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const profile = await this.#profileService.getProfileByUserId(userId);

    return ApiResponse.ok(
      new ProfileDto(profile),
      "Profile retrieved successfully."
    ).send(res);
  });

  createProfile = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const data = req.body;
    const avatarLocalFile = req.file?.path || null;

    const profile = await this.#profileService.createProfile(
      userId,
      data,
      avatarLocalFile
    );

    return ApiResponse.created(
      new ProfileDto(profile),
      "Profile created successfully."
    ).send(res);
  });

  updateProfile = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const data = req.body;
    const avatarLocalFile = req.file?.path || null;

    const profile = await this.#profileService.updateProfile(
      userId,
      data,
      avatarLocalFile
    );

    return ApiResponse.ok(
      new ProfileDto(profile),
      "Profile updated successfully."
    ).send(res);
  });
}

export default new ProfileController();
