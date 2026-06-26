import ApiError from "../../core/http/api.error.js";
import { CLOUDINARY_FOLDERS } from "../../infrastructure/storage/cloudinary/cloudinary.constants.js";
import CloudinaryManager from "../../infrastructure/storage/cloudinary/cloudinary.manager.js";
import { getChangedFields } from "../../shared/utils/object.utils.js";
import ProfileMessages from "./profile.messages.js";
import { ProfileRepository } from "./profile.repository.js";

class ProfileService {
  #profileRepo;
  constructor(prismaClient) {
    this.#profileRepo = new ProfileRepository(prismaClient);
  }

  async getProfileByUserId(userId) {
    const profile = await this.#profileRepo.findByUserId(userId);

    if (!profile) {
      throw ApiError.notFound(ProfileMessages.Errors.NOT_FOUND);
    }

    return profile;
  }

  async upsertProfileByUserId(userId, data, files) {
    const existingProfile = await this.#profileRepo.findByUserId(userId);

    if (files?.avatar?.[0] && !data.avatar) {
      const avatar = await CloudinaryManager.uploadImage(
        files.avatar[0].path,
        CLOUDINARY_FOLDERS.USER_AVATAR,
      );

      if (avatar?.secure_url) {
        data.avatar = avatar.secure_url;
        data.avatarPublicId = avatar.public_id;
      }
    }

    if (files?.banner?.[0] && !data.banner) {
      const banner = await CloudinaryManager.uploadImage(
        files.banner[0].path,
        CLOUDINARY_FOLDERS.USER_BANNER,
      );

      if (banner?.secure_url) {
        data.banner = banner.secure_url;
        data.bannerPublicId = banner.public_id;
      }
    }

    const changedFields = getChangedFields(existingProfile, data);

    if (!hasChanges(existingProfile, data)) {
      return existingProfile;
    }

    const profile = await this.#profileRepo.upsertByUserId(
      userId,
      changedFields,
    );

    if (!profile) {
      if (data.avatarPublicId) {
        await CloudinaryManager.deleteImage(data.avatarPublicId);
      }
      if (data.bannerPublicId) {
        await CloudinaryManager.deleteImage(data.bannerPublicId);
      }

      throw ApiError.internalServerError(ProfileMessages.Errors.UPDATE_FAILED);
    }

    if (existingProfile?.avatarPublicId && changedFields.avatarPublicId) {
      await CloudinaryManager.deleteImage(existingProfile.avatarPublicId);
    }
    if (existingProfile?.bannerPublicId && changedFields.bannerPublicId) {
      await CloudinaryManager.deleteImage(existingProfile.bannerPublicId);
    }

    return profile;
  }

  async deleteProfileByUserId(userId) {
    const existingProfile = await this.getProfileByUserId(userId);

    if (existingProfile.avatarPublicId) {
      await CloudinaryManager.deleteImage(existingProfile.avatarPublicId);
    }

    if (existingProfile.bannerPublicId) {
      await CloudinaryManager.deleteImage(existingProfile.bannerPublicId);
    }

    const profile = await this.#profileRepo.deleteByUserId(userId);

    if (!profile) {
      throw ApiError.internalServerError(ProfileMessages.Errors.DELETE_FAILED);
    }

    return profile;
  }
}

export { ProfileService };
