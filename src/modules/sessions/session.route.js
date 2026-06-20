import createRouter from "../../core/factories/router.factory.js";
import { verifyAuthenticationJWT } from "../../core/middlewares/authentication.middleware.js";
import validate from "../../core/middlewares/validate.middleware.js";
import ValidationSource from "../../shared/constants/validation.constants.js";
import { idParamSchema } from "../../shared/schemas/uuid.schema.js";
import { authorizeSessionOwner } from "./session.authorization.js";
import SessionController from "./session.controller.js";
import { createSessionSchema } from "./session.schema.js";

const router = createRouter();

router.post(
  "/",
  validate(createSessionSchema),
  SessionController.createSession
);

router.use(verifyAuthenticationJWT);

router.get(
  "/user",
  authorizeSessionOwner,
  SessionController.getSessionsByUserId
);

router.delete(
  "/user",
  authorizeSessionOwner,
  SessionController.deleteSessionsByUserId
);

router.get(
  "/:id",
  validate(idParamSchema, ValidationSource.PARAMS),
  authorizeSessionOwner,
  SessionController.getSessionById
);

router.patch(
  "/:id",
  validate(idParamSchema, ValidationSource.PARAMS),
  authorizeSessionOwner,
  SessionController.updateSession
);

router.delete(
  "/:id",
  validate(idParamSchema, ValidationSource.PARAMS),
  authorizeSessionOwner,
  SessionController.deleteSession
);

export default router;
