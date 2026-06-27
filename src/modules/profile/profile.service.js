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

    if (files?.avatar?.[0]) {
      if (existingProfile?.avatarPublicId) {
        const avatar = await CloudinaryManager.updateImage(
          existingProfile.avatarPublicId,
          files.avatar[0].path,
          CLOUDINARY_FOLDERS.USER_AVATAR,
        );

        if (avatar?.secure_url) {
          data.avatar = avatar.secure_url;
          data.avatarPublicId = avatar.public_id;
        }
      } else {
        const avatar = await CloudinaryManager.uploadImage(
          files.avatar[0].path,
          CLOUDINARY_FOLDERS.USER_AVATAR,
        );

        if (avatar?.secure_url) {
          data.avatar = avatar.secure_url;
          data.avatarPublicId = avatar.public_id;
        }
      }
    }

    if (files?.banner?.[0]) {
      if (existingProfile?.bannerPublicId) {
        const banner = await CloudinaryManager.updateImage(
          existingProfile.bannerPublicId,
          files.banner[0].path,
          CLOUDINARY_FOLDERS.USER_BANNER,
        );

        if (banner?.secure_url) {
          data.banner = banner.secure_url;
          data.bannerPublicId = banner.public_id;
        }
      } else {
        const banner = await CloudinaryManager.uploadImage(
          files.banner[0].path,
          CLOUDINARY_FOLDERS.USER_BANNER,
        );

        if (banner?.secure_url) {
          data.banner = banner.secure_url;
          data.bannerPublicId = banner.public_id;
        }
      }
    }

    if (!existingProfile) {
      const profile = await this.#profileRepo.upsertByUserId(userId, data);
      return profile;
    }

    const changedFields = getChangedFields(existingProfile, data);

    if (Object.keys(changedFields).length === 0) {
      return existingProfile;
    }

    const profile = await this.#profileRepo.upsertByUserId(
      userId,
      changedFields,
    );

    const publicIdsToDelete = [];
    if (existingProfile.avatarPublicId && changedFields.avatarPublicId) {
      publicIdsToDelete.push(existingProfile.avatarPublicId);
    }

    if (existingProfile.bannerPublicId && changedFields.bannerPublicId) {
      publicIdsToDelete.push(existingProfile.bannerPublicId);
    }

    if (publicIdsToDelete.length > 0) {
      await CloudinaryManager.deleteImages(publicIdsToDelete);
    }

    return profile;
  }

  async deleteProfileByUserId(userId) {
    const existingProfile = await this.getProfileByUserId(userId);

    const publicIdsToDelete = [];
    if (existingProfile.avatarPublicId) {
      publicIdsToDelete.push(existingProfile.avatarPublicId);
    }

    if (existingProfile.bannerPublicId) {
      publicIdsToDelete.push(existingProfile.bannerPublicId);
    }

    if (publicIdsToDelete.length > 0) {
      await CloudinaryManager.deleteImages(publicIdsToDelete);
    }

    const profile = await this.#profileRepo.deleteByUserId(userId);

    if (!profile) {
      throw ApiError.internalServerError(ProfileMessages.Errors.DELETE_FAILED);
    }

    return profile;
  }
}

export { ProfileService };
