const MAX_FILE_SIZE = 2 * 1024 * 1024;

const RESOURCE_TYPE = "image";
const ACCESS_MODE = "public";
const CHUNK_SIZE = 6000000;
const TYPE = "upload";
const FOLDER = "devhub";

const ALLOWED_IMAGE_FORMATS = ["jpg", "jpeg", "png", "webp"];

const CLOUDINARY_FOLDERS = {
  DEFAULT: "/assets",
  USER_AVATAR: "/users/avatar",
  USER_BANNER: "/users/banner",
};

export {
  ACCESS_MODE,
  ALLOWED_IMAGE_FORMATS,
  CHUNK_SIZE,
  CLOUDINARY_FOLDERS,
  FOLDER,
  MAX_FILE_SIZE,
  RESOURCE_TYPE,
  TYPE,
};
