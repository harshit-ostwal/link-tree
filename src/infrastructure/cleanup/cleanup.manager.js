import fs from "node:fs/promises";
import path from "node:path";
import loggerService from "../logger/logger.service.js";
import { MULTER_TEMP_DIR } from "../storage/multer/multer.constants.js";
import { FILE_AGE_LIMIT_MS } from "./cleanup.constants.js";

class CleanupManager {
  async deleteLocalFile(filePath) {
    if (!filePath) return false;

    try {
      await fs.unlink(filePath);
      loggerService.debug?.(`Deleted file: ${filePath}`);
      return true;
    } catch (error) {
      loggerService.error(`Failed to delete file: ${filePath}`, error);
      return false;
    }
  }

  async deleteLocalFiles(paths = []) {
    if (!Array.isArray(paths) || paths.length === 0) {
      return;
    }

    await Promise.all(paths.map((path) => this.deleteLocalFile(path)));
  }

  async clearLocalDirectory() {
    loggerService.info("Starting temp directory cleanup...");
    try {
      const files = await fs.readdir(MULTER_TEMP_DIR);

      if (files.length === 0) {
        loggerService.info("Temp directory is already empty.");
        return;
      }

      let deletedCount = 0;
      await Promise.all(
        files.map(async (file) => {
          const filePath = path.join(MULTER_TEMP_DIR, file);

          try {
            const stats = await fs.stat(filePath);
            if (!stats.isFile()) {
              return;
            }

            const age = Date.now() - stats.mtimeMs;
            if (age <= FILE_AGE_LIMIT_MS) {
              return;
            }

            const deleted = await this.deleteLocalFile(filePath);
            if (deleted) {
              deletedCount++;
            }
          } catch (error) {
            loggerService.error(`Failed processing file: ${filePath}`, error);
          }
        })
      );
      loggerService.info(
        `Temp directory cleanup completed. Deleted ${deletedCount} expired file(s).`
      );
    } catch (error) {
      loggerService.error("❌ Failed to clear temp directory.", error);
      throw error;
    }
  }
}

export default new CleanupManager();
