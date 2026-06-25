import loggerService from "../logger/logger.service.js";
import { cleanupJob } from "./cleanup.job.js";

export const startJobs = () => {
  loggerService.info("Starting scheduled jobs...");
  cleanupJob.execute();
  loggerService.info("Scheduled jobs started successfully.");
};
