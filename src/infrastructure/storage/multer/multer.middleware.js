import multer from "multer";
import { multerFileFilter, multerStorage } from "./multer.config.js";
import { MAX_FILE_COUNT, MAX_FILE_SIZE } from "./multer.constants.js";

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFileFilter,
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: MAX_FILE_COUNT,
  },
});

export { upload };
