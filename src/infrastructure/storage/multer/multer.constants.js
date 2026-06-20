const MULTER_TEMP_DIR = "public/temp";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2 MB
const MAX_FILE_COUNT = 5;

const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

export { ALLOWED_MIME_TYPES, MAX_FILE_COUNT, MAX_FILE_SIZE, MULTER_TEMP_DIR };
