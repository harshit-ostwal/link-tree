import fs from "node:fs";
import path from "node:path";
import multer from "multer";
import ApiError from "../../../core/http/api.error.js";
import generateUUID from "../../../shared/utils/uuid.utils.js";
import { ALLOWED_MIME_TYPES, MULTER_TEMP_DIR } from "./multer.constants.js";

if (!fs.existsSync(MULTER_TEMP_DIR)) {
  fs.mkdirSync(MULTER_TEMP_DIR, {
    recursive: true,
  });
}

export const multerStorage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, MULTER_TEMP_DIR);
  },
  filename: (_req, file, cb) => {
    return cb(null, generateUUID() + path.extname(file.originalname));
  },
});

export const multerFileFilter = (_req, file, cb) => {
  if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    return cb(ApiError.badRequest("Only image files are allowed!"), false);
  }
  cb(null, true);
};
