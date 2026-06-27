import createRouter from "../../core/factories/router.factory.js";
import { verifyAuthenticationJWT } from "../../core/middlewares/authentication.middleware.js";
import {
  requireAdmin,
  requireSelfOrAdmin,
} from "../../core/middlewares/role.authorization.js";
import {
  requireActiveOrAdmin,
  requireActiveStatus,
} from "../../core/middlewares/status.authorization.js";
import validate from "../../core/middlewares/validate.middleware.js";
import ValidationSource from "../../shared/constants/validation.constants.js";
import { idParamSchema } from "../../shared/schemas/uuid.schema.js";
import userController from "./user.controller.js";
import {
  createUserSchema,
  emailParamSchema,
  identifierParamSchema,
  updateUserSchema,
  usernameParamSchema,
} from "./user.schema.js";

const router = createRouter();

router.get(
  "/username/:username",
  validate(usernameParamSchema, ValidationSource.PARAMS),
  userController.getUserByUsername,
);

router.use(verifyAuthenticationJWT);

router.get(
  "/email/:email",
  requireAdmin,
  validate(emailParamSchema, ValidationSource.PARAMS),
  userController.getUserByEmail,
);

router.get(
  "/identifier/:identifier",
  requireAdmin,
  validate(identifierParamSchema, ValidationSource.PARAMS),
  userController.getUserByIdentifier,
);

router.post(
  "/",
  requireAdmin,
  validate(createUserSchema),
  userController.createUser,
);

router
  .route("/:id")
  .get(
    validate(idParamSchema, ValidationSource.PARAMS),
    requireActiveOrAdmin,
    requireSelfOrAdmin,
    userController.getUserById,
  )
  .patch(
    validate(idParamSchema, ValidationSource.PARAMS),
    validate(updateUserSchema),
    requireActiveStatus,
    requireSelfOrAdmin,
    userController.updateUserById,
  )
  .delete(
    validate(idParamSchema, ValidationSource.PARAMS),
    requireActiveStatus,
    requireSelfOrAdmin,
    userController.softDeleteUserById,
  );

router.delete(
  "/:id/hard",
  validate(idParamSchema, ValidationSource.PARAMS),
  requireAdmin,
  userController.hardDeleteUserById,
);

export { router as userRouter };
