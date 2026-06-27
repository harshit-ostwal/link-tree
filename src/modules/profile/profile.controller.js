import ApiResponse from "../../core/http/api.response.js";
import asyncHandler from "../../core/middlewares/async-handler.middleware.js";
import { ProfileDto } from "./profile.dto.js";
import ProfileMessages from "./profile.messages.js";
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
      ProfileMessages.Responses.FETCHED,
    ).send(res);
  });

  upsertProfileByUserId = asyncHandler(async (req, res) => {
    const userId = req.user.id;
    const data = req.body;
    const files = req.files;

    const profile = await this.#profileService.upsertProfileByUserId(
      userId,
      data,
      files,
    );

    return ApiResponse.ok(
      new ProfileDto(profile),
      ProfileMessages.Responses.UPDATED,
    ).send(res);
  });
}

export default new ProfileController();
