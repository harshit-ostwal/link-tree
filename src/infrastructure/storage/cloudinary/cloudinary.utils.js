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
    throw ApiError.badRequest("No file provided for upload");
  }

  const extension = path.extname(file).replace(".", "").toLowerCase();

  if (!ALLOWED_IMAGE_FORMATS.includes(extension)) {
    await cleanupManager.deleteLocalFile(file);

    throw ApiError.badRequest(
      `Invalid file format: ${extension}. Allowed formats are: ${ALLOWED_IMAGE_FORMATS.join(", ")}`
    );
  }

  const stats = fs.statSync(file);

  if (stats.size > MAX_FILE_SIZE) {
    await cleanupManager.deleteLocalFile(file);

    throw ApiError.badRequest(
      `File size exceeds the maximum limit of ${MAX_FILE_SIZE / (1024 * 1024)} MB`
    );
  }
};
