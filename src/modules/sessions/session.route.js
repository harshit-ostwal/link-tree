import createRouter from "../../core/factories/router.factory.js";
import validate from "../../core/middlewares/validate.middleware.js";
import { sessionController } from "./session.container.js";
import { updateSessionSchema } from "./session.schema.js";

const router = createRouter();

router
  .route("/")
  .get(sessionController.getSessionsByUserId)
  .delete(sessionController.deleteSessionsByUserId);

router
  .route("/:id")
  .get(sessionController.getSessionById)
  .patch(validate(updateSessionSchema), sessionController.updateSessionById)
  .delete(sessionController.deleteSessionById);

export { router as sessionRouter };
