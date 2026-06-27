import createRouter from "../../core/factories/router.factory.js";
import { verifyAuthenticationJWT } from "../../core/middlewares/authentication.middleware.js";
import { requireAdmin } from "../../core/middlewares/role.authorization.js";
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

router
  .route("/")
  .post(requireAdmin, validate(createUserSchema), userController.createUser)
  .get(requireActiveOrAdmin, userController.getUserById)
  .patch(
    validate(updateUserSchema),
    requireActiveStatus,
    userController.updateUserById,
  )
  .delete(requireActiveStatus, userController.softDeleteUserById);

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

router.delete(
  "/:id/hard",
  validate(idParamSchema, ValidationSource.PARAMS),
  requireAdmin,
  userController.hardDeleteUserById,
);

export { router as userRouter };
