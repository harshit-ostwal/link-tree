const StorageMessages = {
  Errors: {
    // File Upload Errors
    FILE_UPLOAD_FAILED: "File upload failed. Please try again.",
    FILE_TOO_LARGE: "File is too large. Please choose a smaller file.",
    FILE_TOO_SMALL: "File is too small. Please choose a larger file.",
    INVALID_FILE_TYPE: "Invalid file type. Please upload a supported format.",
    INVALID_FILE_FORMAT: "Invalid file format.",

    // File Processing Errors
    FILE_PROCESSING_FAILED: "File processing failed. Please try again.",
    FILE_CONVERSION_FAILED: "Unable to convert file format.",
    FILE_COMPRESSION_FAILED: "Unable to compress file.",

    // Storage Errors
    STORAGE_UNAVAILABLE: "Storage service is unavailable.",
    STORAGE_QUOTA_EXCEEDED: "Storage quota exceeded.",
    STORAGE_ACCESS_DENIED: "Unable to access storage.",

    // Cloud Storage (Cloudinary, S3, etc.)
    CLOUD_UPLOAD_FAILED: "Cloud upload failed. Please try again.",
    CLOUD_DELETION_FAILED: "Unable to delete file from cloud storage.",
    CLOUD_SERVICE_ERROR: "Cloud storage service error.",

    // File Operations
    FILE_NOT_FOUND: "File not found.",
    FILE_ALREADY_EXISTS: "File already exists.",
    FILE_MOVE_FAILED: "Unable to move file.",
    FILE_COPY_FAILED: "Unable to copy file.",
    FILE_DELETE_FAILED: "Unable to delete file.",
    FILE_RENAME_FAILED: "Unable to rename file.",

    // Permissions
    INSUFFICIENT_PERMISSIONS: "Insufficient permissions for this operation.",
    WRITE_ACCESS_DENIED: "Write access denied.",
    READ_ACCESS_DENIED: "Read access denied.",
  },

  Responses: {
    FILE_UPLOADED: "File uploaded successfully.",
    FILE_DELETED: "File deleted successfully.",
    FILE_MOVED: "File moved successfully.",
    FILE_COPIED: "File copied successfully.",
    FILE_RENAMED: "File renamed successfully.",
    UPLOAD_SUCCESSFUL: "Upload completed successfully.",
    FILE_PROCESSED: "File processed successfully.",
  },
};

export default StorageMessages;
