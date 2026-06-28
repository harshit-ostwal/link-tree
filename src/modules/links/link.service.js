import ApiError from "../../core/http/api.error.js";
import { CLOUDINARY_FOLDERS } from "../../infrastructure/storage/cloudinary/cloudinary.constants.js";
import CloudinaryManager from "../../infrastructure/storage/cloudinary/cloudinary.manager.js";
import { getChangedFields } from "../../shared/utils/object.utils.js";
import LinkMessages from "./link.messages.js";
import { LinkRepository } from "./link.repository.js";

class LinkService {
  #linkRepo;
  constructor() {
    this.#linkRepo = new LinkRepository();
  }

  async getLinkById(id) {
    const link = await this.#linkRepo.findById(id);

    if (!link) {
      throw ApiError.notFound(LinkMessages.Errors.NOT_FOUND);
    }

    return link;
  }

  async getLinksByUserId(userId) {
    const links = await this.#linkRepo.findByUserId(userId);

    if (!links || links.length === 0) {
      throw ApiError.notFound(LinkMessages.Errors.NOT_FOUND);
    }

    return links;
  }

  async createLink(userId, data, files) {
    const existingLink = await this.#linkRepo.findByUserIdAndUrl(
      userId,
      data.url,
    );

    if (existingLink) {
      throw ApiError.conflict(LinkMessages.Errors.ALREADY_EXISTS);
    }

    if (files?.logo?.[0] && !data.logo) {
      const logo = await CloudinaryManager.uploadImage(
        files.logo[0].path,
        CLOUDINARY_FOLDERS.LINK_LOGO,
      );

      if (logo?.secure_url) {
        data.logo = logo.secure_url;
        data.logoPublicId = logo.public_id;
      }
    }

    if (files?.thumbnail?.[0] && !data.thumbnail) {
      const thumbnail = await CloudinaryManager.uploadImage(
        files.thumbnail[0].path,
        CLOUDINARY_FOLDERS.LINK_THUMBNAIL,
      );

      if (thumbnail?.secure_url) {
        data.thumbnail = thumbnail.secure_url;
        data.thumbnailPublicId = thumbnail.public_id;
      }
    }

    const link = await this.#linkRepo.create(userId, data);

    if (!link) {
      const publicIds = [];

      if (data.logoPublicId) {
        publicIds.push(data.logoPublicId);
      }

      if (data.thumbnailPublicId) {
        publicIds.push(data.thumbnailPublicId);
      }

      if (publicIds.length) {
        await CloudinaryManager.deleteImages(publicIds);
      }

      throw ApiError.internalServerError(LinkMessages.Errors.CREATE_FAILED);
    }

    return link;
  }

  async updateLink(id, data, files) {
    const existingLink = await this.getLinkById(id);

    if (data.url && data.url !== existingLink.url) {
      const duplicate = await this.#linkRepo.findByUserIdAndUrl(
        existingLink.userId,
        data.url,
      );

      if (duplicate && duplicate.id !== id) {
        throw ApiError.conflict(LinkMessages.Errors.ALREADY_EXISTS);
      }
    }

    const uploadedPublicIds = [];

    if (files?.logo?.[0]) {
      const logo = existingLink.logoPublicId
        ? await CloudinaryManager.updateImage(
            existingLink.logoPublicId,
            files.logo[0].path,
            CLOUDINARY_FOLDERS.LINK_LOGO,
          )
        : await CloudinaryManager.uploadImage(
            files.logo[0].path,
            CLOUDINARY_FOLDERS.LINK_LOGO,
          );

      if (logo?.secure_url) {
        data.logo = logo.secure_url;
        data.logoPublicId = logo.public_id;
        uploadedPublicIds.push(logo.public_id);
      }
    }

    if (files?.thumbnail?.[0]) {
      const thumbnail = existingLink.thumbnailPublicId
        ? await CloudinaryManager.updateImage(
            existingLink.thumbnailPublicId,
            files.thumbnail[0].path,
            CLOUDINARY_FOLDERS.LINK_THUMBNAIL,
          )
        : await CloudinaryManager.uploadImage(
            files.thumbnail[0].path,
            CLOUDINARY_FOLDERS.LINK_THUMBNAIL,
          );

      if (thumbnail?.secure_url) {
        data.thumbnail = thumbnail.secure_url;
        data.thumbnailPublicId = thumbnail.public_id;
        uploadedPublicIds.push(thumbnail.public_id);
      }
    }

    const changedFields = getChangedFields(existingLink, data);

    if (Object.keys(changedFields).length === 0) {
      return existingLink;
    }

    const link = await this.#linkRepo.update(id, changedFields);

    if (!link) {
      if (uploadedPublicIds.length) {
        await CloudinaryManager.deleteImages(uploadedPublicIds);
      }

      throw ApiError.internalServerError(LinkMessages.Errors.UPDATE_FAILED);
    }

    const publicIdsToDelete = [];

    if (existingLink.logoPublicId && changedFields.logoPublicId) {
      publicIdsToDelete.push(existingLink.logoPublicId);
    }

    if (existingLink.thumbnailPublicId && changedFields.thumbnailPublicId) {
      publicIdsToDelete.push(existingLink.thumbnailPublicId);
    }

    if (publicIdsToDelete.length) {
      await CloudinaryManager.deleteImages(publicIdsToDelete);
    }

    return link;
  }

  async updateLinksByUserId(userId, data) {
    const existingLinks = await this.getLinksByUserId(userId);

    const changedFields = getChangedFields(existingLinks, data);

    if (Object.keys(changedFields).length === 0) {
      return existingLinks;
    }

    const links = await this.#linkRepo.updateByUserId(userId, changedFields);

    if (!links || links.length === 0) {
      throw ApiError.internalServerError(LinkMessages.Errors.UPDATE_FAILED);
    }

    return links;
  }

  async deleteLink(id) {
    const existingLink = await this.getLinkById(id);

    const link = await this.#linkRepo.delete(id);

    if (!link) {
      throw ApiError.internalServerError(LinkMessages.Errors.DELETE_FAILED);
    }

    const publicIds = [];

    if (existingLink.logoPublicId) {
      publicIds.push(existingLink.logoPublicId);
    }

    if (existingLink.thumbnailPublicId) {
      publicIds.push(existingLink.thumbnailPublicId);
    }

    if (publicIds.length) {
      await CloudinaryManager.deleteImages(publicIds);
    }

    return link;
  }

  async deleteLinksByUserId(userId) {
    const existingLinks = await this.getLinksByUserId(userId);

    const links = await this.#linkRepo.deleteByUserId(userId);

    if (!links || links.length === 0) {
      throw ApiError.internalServerError(LinkMessages.Errors.DELETE_FAILED);
    }

    const publicIds = [];

    for (const link of existingLinks) {
      if (link.logoPublicId) {
        publicIds.push(link.logoPublicId);
      }

      if (link.thumbnailPublicId) {
        publicIds.push(link.thumbnailPublicId);
      }
    }

    if (publicIds.length) {
      await CloudinaryManager.deleteImages(publicIds);
    }

    return links;
  }
}

export { LinkService };
