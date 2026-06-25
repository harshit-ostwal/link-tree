import process from "node:process";
import app from "./app.js";
import { NODE_ENV, PORT } from "./config/env.config.js";
import PrismaService from "./infrastructure/database/prisma.service.js";
import { startJobs } from "./infrastructure/jobs/index.js";
import loggerService from "./infrastructure/logger/logger.service.js";

async function startServer() {
  try {
    await PrismaService.connect();

    startJobs();

    const server = app.listen(Number(PORT), () => {
      loggerService.info(
        `Server started successfully on port ${PORT} in ${NODE_ENV} mode.`,
      );
    });

    server.on("error", (error) => {
      if (error.code === "EADDRINUSE") {
        loggerService.error(`Port ${PORT} is already in use.`);
      } else {
        loggerService.error("Server error:", error);
      }

      gracefulShutdown("serverError");
    });

    function gracefulShutdown(signal) {
      loggerService.warn(`Shutdown initiated due to: ${signal}`);
      server.close(async () => {
        try {
          await PrismaService.disconnect();
          loggerService.info("Graceful shutdown completed.");
          loggerService.info("Server stopped successfully.");
          process.exit(0);
        } catch (error) {
          loggerService.error("sError during shutdown:", error);
          process.exit(1);
        }
      });
    }

    /**
     * Process Signals
     */
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));
    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));

    /**
     * Critical Failures
     */
    process.on("uncaughtException", (error) => {
      loggerService.error("Uncaught Exception:", error);
      gracefulShutdown("uncaughtException");
    });

    process.on("unhandledRejection", (reason) => {
      loggerService.error("Unhandled Rejection:", reason);
      gracefulShutdown("unhandledRejection");
    });
  } catch (error) {
    loggerService.error("Failed to start server:", error);
    process.exit(1);
  }
}

void startServer();
