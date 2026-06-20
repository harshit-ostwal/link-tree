import ApiError from "../../../core/http/api.error.js";
import cleanupManager from "../../cleanup/cleanup.manager.js";
import { cloudinary } from "./cloudinary.config.js";
import { CLOUDINARY_FOLDERS, FOLDER } from "./cloudinary.constants.js";

class CloudinaryService {
  #cloudinary;
  constructor(instance = cloudinary) {
    this.#cloudinary = instance;
  }

  async upload(file, folder = CLOUDINARY_FOLDERS.DEFAULT, options = {}) {
    try {
      const res = await this.#cloudinary.uploader.upload(file, {
        folder: `${FOLDER}${folder}`,
        ...options,
      });

      await cleanupManager.deleteLocalFile(file);

      return res;
    } catch (error) {
      await cleanupManager.deleteLocalFile(file);

      throw ApiError.internalServerError(
        "Failed to upload image to Cloudinary",
        error
      );
    }
  }

  async delete(publicId) {
    try {
      const res = await this.#cloudinary.uploader.destroy(publicId);
      return res;
    } catch (error) {
      throw ApiError.internalServerError(
        "Failed to delete image from Cloudinary",
        error
      );
    }
  }

  async deleteMany(publicIds = []) {
    try {
      const res = await this.#cloudinary.api.delete_resources(publicIds);
      return res;
    } catch (error) {
      throw ApiError.internalServerError(
        "Failed to delete images from Cloudinary",
        error
      );
    }
  }
}

export default new CloudinaryService();
