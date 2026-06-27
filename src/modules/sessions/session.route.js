import createRouter from "../../core/factories/router.factory.js";
import { verifyAuthenticationJWT } from "../../core/middlewares/authentication.middleware.js";
import { requireActiveStatus } from "../../core/middlewares/status.authorization.js";
import sessionController from "./session.controller.js";

const router = createRouter();

router.use(verifyAuthenticationJWT);
router.use(requireActiveStatus);

router
  .route("/")
  .get(sessionController.getSessionsByUserId)
  .delete(sessionController.deleteSessionsByUserId);

router
  .route("/:id")
  .get(sessionController.getSessionById)
  .delete(sessionController.deleteSessionById);

export { router as sessionRouter };
