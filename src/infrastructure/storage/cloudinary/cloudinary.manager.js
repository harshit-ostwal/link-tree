import ApiError from "../../../core/http/api.error.js";
import { CLOUDINARY_FOLDERS } from "./cloudinary.constants.js";
import CloudinaryMessages from "./cloudinary.messages.js";
import CloudinaryService from "./cloudinary.service.js";
import { getUploadOptions, validateFile } from "./cloudinary.utils.js";

class CloudinaryManager {
  async uploadImage(file, folder = CLOUDINARY_FOLDERS.DEFAULT, options = {}) {
    if (!file) {
      throw ApiError.badRequest(CloudinaryMessages.Errors.NO_FILE_PROVIDED);
    }

    validateFile(file);
    const uploadOptions = getUploadOptions(options);
    return await CloudinaryService.upload(file, folder, uploadOptions);
  }

  async uploadImages(files, folder = CLOUDINARY_FOLDERS.DEFAULT, options = {}) {
    if (!files || files.length === 0) {
      throw ApiError.badRequest(CloudinaryMessages.Errors.NO_FILES_PROVIDED);
    }

    const uploadOptions = getUploadOptions(options);
    const images = await Promise.all(
      files.map(async (file) => {
        return await CloudinaryService.upload(file, folder, uploadOptions);
      }),
    );
    return images;
  }

  async updateImage(
    publicId,
    file,
    folder = CLOUDINARY_FOLDERS.DEFAULT,
    options = {},
  ) {
    if (!publicId) {
      throw ApiError.badRequest(
        CloudinaryMessages.Errors.NO_PUBLIC_ID_PROVIDED,
      );
    }

    if (!file) {
      throw ApiError.badRequest(CloudinaryMessages.Errors.NO_FILE_PROVIDED);
    }

    validateFile(file);

    const existingImage = await CloudinaryService.delete(publicId);
    if (!existingImage) {
      throw ApiError.notFound(CloudinaryMessages.Errors.IMAGE_NOT_FOUND);
    }

    const uploadOptions = getUploadOptions(options);
    return await CloudinaryService.upload(file, folder, uploadOptions);
  }

  async updateImages(
    publicIds,
    files,
    folder = CLOUDINARY_FOLDERS.DEFAULT,
    options = {},
  ) {
    if (!publicIds?.length) {
      throw ApiError.badRequest(CloudinaryMessages.Errors.PUBLIC_IDS_REQUIRED);
    }

    if (!files?.length) {
      throw ApiError.badRequest(CloudinaryMessages.Errors.NO_FILES_PROVIDED);
    }

    if (publicIds.length !== files.length) {
      throw ApiError.badRequest(CloudinaryMessages.Errors.FILE_COUNT_MISMATCH);
    }

    return await Promise.all(
      publicIds.map((publicId, index) =>
        this.updateImage(publicId, files[index], folder, options),
      ),
    );
  }

  async deleteImage(publicId) {
    if (!publicId) {
      throw ApiError.badRequest(
        CloudinaryMessages.Errors.NO_PUBLIC_ID_PROVIDED,
      );
    }

    return await CloudinaryService.delete(publicId);
  }

  async deleteImages(publicIds) {
    if (!publicIds || publicIds.length === 0) {
      throw ApiError.badRequest(CloudinaryMessages.Errors.PUBLIC_IDS_REQUIRED);
    }

    return await CloudinaryService.deleteMany(publicIds);
  }
}

export default new CloudinaryManager();
