import createRouter from "../core/factories/router.factory.js";
import ApiResponse from "../core/http/api.response.js";
import PrismaConnection from "../infrastructure/database/prisma.service.js";

const router = createRouter();

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Health Check
 *     description: Check if the API is healthy and responsive
 *     tags:
 *       - System
 *     responses:
 *       200:
 *         description: API is healthy
 *         content:
 *           application/json:
 *             example:
 *               status: success
 *               message: API is healthy
 *               data: null
 */
router.get("/", (_, res) => {
  return ApiResponse.ok(null, "API is healthy").send(res);
});

router.get("/db", async (_, res) => {
  await PrismaConnection.healthCheck();
  return ApiResponse.ok(null, "Database connection is healthy").send(res);
});

export default router;
