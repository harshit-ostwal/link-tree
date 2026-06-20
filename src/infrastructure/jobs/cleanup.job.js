import cron from "node-cron";
import { CRON_SCHEDULE } from "../cleanup/cleanup.constants.js";
import cleanupManager from "../cleanup/cleanup.manager.js";

const cleanupJob = cron.schedule(CRON_SCHEDULE, async () => {
  await cleanupManager.clearLocalDirectory();
});

export { cleanupJob };
