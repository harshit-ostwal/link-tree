import { specs, swaggerUi, theme } from "../config/swagger.config.js";
import createRouter from "../core/factories/router.factory.js";
import ApiResponse from "../core/http/api.response.js";
import { APP_NAME } from "../shared/constants/app.constants.js";
import healthRoute from "./health.route.js";

const router = createRouter();

// Swagger UI for API documentation
router.use("/docs", swaggerUi.serve, swaggerUi.setup(specs, theme));

/**
 * @route GET /
 * @desc  Welcome message for the API
 * @access Public
 */
router.get("/", (_, res) => {
  return ApiResponse.ok(null, `Welcome to the ${APP_NAME} API Service`).send(
    res,
  );
});

/**
 * @route GET /health *
 * @desc  Health check endpoint
 * @access Public
 */
router.use("/health", healthRoute);

router.use(
  "/users",
  (await import("../modules/users/user.route.js")).userRouter,
);

router.use(
  "/profile",
  (await import("../modules/profile/profile.route.js")).profileRouter,
);

router.use(
  "/accounts",
  (await import("../modules/accounts/account.route.js")).default,
);

router.use(
  "/sessions",
  (await import("../modules/sessions/session.route.js")).default,
);

export default router;
