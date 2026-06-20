import ApiError from "../../core/http/api.error.js";
import { CLOUDINARY_FOLDERS } from "../../infrastructure/storage/cloudinary/cloudinary.constants.js";
import CloudinaryManager from "../../infrastructure/storage/cloudinary/cloudinary.manager.js";
import { getChangedFields } from "../../shared/utils/object.utils.js";
import { ProfileRepository } from "./profile.repository.js";

class ProfileService {
  #profileRepo;

  constructor(prismaClient) {
    this.#profileRepo = new ProfileRepository(prismaClient);
  }

  async getProfileByUserId(userId) {
    const profile = await this.#profileRepo.findByUserId(userId);

    if (!profile) {
      throw ApiError.notFound("Profile not found. Please try again later.");
    }

    return profile;
  }

  async findProfileByUserId(userId) {
    return await this.#profileRepo.findByUserId(userId);
  }

  async createProfile(userId, data, avatarLocalFile) {
    const existingProfile = await this.findProfileByUserId(userId);

    if (existingProfile) {
      throw ApiError.conflict(
        "Profile already exists. Please try again later."
      );
    }

    if (avatarLocalFile && !data.avatar) {
      const avatar = await CloudinaryManager.uploadImage(
        avatarLocalFile,
        CLOUDINARY_FOLDERS.USER_AVATAR
      );

      if (avatar?.secure_url) {
        data.avatar = avatar.secure_url;
        data.avatarPublicId = avatar.public_id;
      }
    }

    const profile = await this.#profileRepo.create(userId, data);

    if (!profile) {
      if (data.avatarPublicId) {
        await CloudinaryManager.deleteImage(data.avatarPublicId);
      }
    }

    return profile;
  }

  async updateProfile(userId, data, avatarLocalFile) {
    const existingProfile = await this.getProfileByUserId(userId);

    const hasUpdates = getChangedFields(existingProfile, data);

    if (avatarLocalFile) {
      const avatar = await CloudinaryManager.uploadImage(
        avatarLocalFile,
        CLOUDINARY_FOLDERS.USER_AVATAR
      );

      if (avatar?.secure_url) {
        hasUpdates.avatar = avatar.secure_url;
        hasUpdates.avatarPublicId = avatar.public_id;
      }
    }

    const profile = await this.#profileRepo.updateByUserId(userId, hasUpdates);

    if (!profile) {
      if (hasUpdates.avatarPublicId) {
        await CloudinaryManager.deleteImage(hasUpdates.avatarPublicId);
      }
    }

    return profile;
  }
}

export { ProfileService };
