import ApiError from "../../../core/http/api.error.js";
import { CLOUDINARY_FOLDERS } from "./cloudinary.constants.js";
import CloudinaryService from "./cloudinary.service.js";
import { getUploadOptions, validateFile } from "./cloudinary.utils.js";

class CloudinaryManager {
  async uploadImage(file, folder = CLOUDINARY_FOLDERS.DEFAULT, options = {}) {
    if (!file) {
      throw ApiError.badRequest("No file provided for upload");
    }

    validateFile(file);
    const uploadOptions = getUploadOptions(options);
    return await CloudinaryService.upload(file, folder, uploadOptions);
  }

  async uploadImages(files, folder = CLOUDINARY_FOLDERS.DEFAULT, options = {}) {
    if (!files || files.length === 0) {
      throw ApiError.badRequest("No files provided for upload");
    }

    const uploadOptions = getUploadOptions(options);
    const images = await Promise.all(
      files.map(async (file) => {
        return await CloudinaryService.upload(file, folder, uploadOptions);
      })
    );
    return images;
  }

  async updateImage(
    publicId,
    file,
    folder = CLOUDINARY_FOLDERS.DEFAULT,
    options = {}
  ) {
    if (!publicId) {
      throw ApiError.badRequest("No public ID provided for update");
    }

    if (!file) {
      throw ApiError.badRequest("No file provided for update");
    }

    validateFile(file);

    const existingImage = await CloudinaryService.delete(publicId);
    if (!existingImage) {
      throw ApiError.notFound(
        `Image with public ID ${publicId} not found for update`
      );
    }

    const uploadOptions = getUploadOptions(options);
    return await CloudinaryService.upload(file, folder, uploadOptions);
  }

  async updateImages(
    publicIds,
    files,
    folder = CLOUDINARY_FOLDERS.DEFAULT,
    options = {}
  ) {
    if (!publicIds?.length) {
      throw ApiError.badRequest("No public IDs provided for update");
    }

    if (!files?.length) {
      throw ApiError.badRequest("No files provided for update");
    }

    if (publicIds.length !== files.length) {
      throw ApiError.badRequest(
        "Number of public IDs must match number of files"
      );
    }

    return await Promise.all(
      publicIds.map((publicId, index) =>
        this.updateImage(publicId, files[index], folder, options)
      )
    );
  }

  async deleteImage(publicId) {
    if (!publicId) {
      throw ApiError.badRequest("No public ID provided for deletion");
    }

    return await CloudinaryService.delete(publicId);
  }

  async deleteImages(publicIds) {
    if (!publicIds || publicIds.length === 0) {
      throw ApiError.badRequest("No public IDs provided for deletion");
    }

    return await CloudinaryService.deleteMany(publicIds);
  }
}

export default new CloudinaryManager();
