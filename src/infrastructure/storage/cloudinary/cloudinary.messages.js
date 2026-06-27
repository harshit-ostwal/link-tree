import {
  ALLOWED_IMAGE_FORMATS,
  MAX_FILE_SIZE,
} from "./cloudinary.constants.js";

const MAX_FILE_SIZE_MB = MAX_FILE_SIZE / (1024 * 1024);
const ALLOWED_FORMATS_STR = ALLOWED_IMAGE_FORMATS.join(", ");

const CloudinaryMessages = {
  Errors: {
    NO_FILE_PROVIDED: "No file was provided for upload.",

    NO_FILES_PROVIDED: "No files were provided for upload.",

    INVALID_FILE_FORMAT: `Invalid file format. Only image files (${ALLOWED_FORMATS_STR}) are allowed.`,

    FILE_SIZE_EXCEEDED: `File size exceeds the maximum limit of ${MAX_FILE_SIZE_MB} MB.`,

    UPLOAD_FAILED: "Unable to upload the image at this time.",

    MULTIPLE_UPLOAD_FAILED: "Unable to upload one or more images at this time.",

    DELETE_FAILED: "Unable to delete the image at this time.",

    MULTIPLE_DELETE_FAILED: "Unable to delete one or more images at this time.",

    UPDATE_FAILED: "Unable to update the image at this time.",

    IMAGE_NOT_FOUND: "The requested image could not be found.",

    NO_PUBLIC_ID_PROVIDED: "No image identifier was provided.",

    PUBLIC_IDS_REQUIRED: "One or more image identifiers are required.",

    FILE_COUNT_MISMATCH:
      "The number of files must match the number of image identifiers.",
  },

  Responses: {
    UPLOADED: "Image uploaded successfully.",

    MULTIPLE_UPLOADED: "Images uploaded successfully.",

    UPDATED: "Image updated successfully.",

    MULTIPLE_UPDATED: "Images updated successfully.",

    DELETED: "Image deleted successfully.",

    MULTIPLE_DELETED: "Images deleted successfully.",
  },
};

export default CloudinaryMessages;
