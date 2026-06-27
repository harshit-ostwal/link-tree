import fs from "node:fs";
import path from "node:path";
import ApiError from "../../../core/http/api.error.js";
import cleanupManager from "../../cleanup/cleanup.manager.js";
import {
  ACCESS_MODE,
  ALLOWED_IMAGE_FORMATS,
  CHUNK_SIZE,
  MAX_FILE_SIZE,
  RESOURCE_TYPE,
  TYPE,
} from "./cloudinary.constants.js";
import CloudinaryMessages from "./cloudinary.messages.js";

export const getUploadOptions = (options = {}) => ({
  resource_type: RESOURCE_TYPE,
  access_mode: ACCESS_MODE,
  allowed_formats: ALLOWED_IMAGE_FORMATS,
  chunk_size: CHUNK_SIZE,
  type: TYPE,
  ...options,
});

export const validateFile = async (file) => {
  if (!file) {
    throw ApiError.badRequest(CloudinaryMessages.Errors.NO_FILE_PROVIDED);
  }

  const extension = path.extname(file).replace(".", "").toLowerCase();

  if (!ALLOWED_IMAGE_FORMATS.includes(extension)) {
    await cleanupManager.deleteLocalFile(file);

    throw ApiError.badRequest(CloudinaryMessages.Errors.INVALID_FILE_FORMAT);
  }

  const stats = fs.statSync(file);

  if (stats.size > MAX_FILE_SIZE) {
    await cleanupManager.deleteLocalFile(file);

    throw ApiError.badRequest(CloudinaryMessages.Errors.FILE_SIZE_EXCEEDED);
  }
};
