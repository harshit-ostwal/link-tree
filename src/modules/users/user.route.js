import createRouter from "../../core/factories/router.factory.js";
import validate from "../../core/middlewares/validate.middleware.js";
import ValidationSource from "../../shared/constants/validation.constants.js";
import { idParamSchema } from "../../shared/schemas/uuid.schema.js";
import { requireSelfOrAdmin } from "./user.authoriztion.js";
import { userController } from "./user.container.js";
import {
  emailParamSchema,
  identifierParamSchema,
  updateUserSchema,
  usernameParamSchema,
} from "./user.schema.js";

const router = createRouter();

router.get(
  "/email/:email",
  validate(emailParamSchema, ValidationSource.PARAMS),
  userController.getUserByEmail
);
router.get(
  "/username/:username",
  validate(usernameParamSchema, ValidationSource.PARAMS),
  userController.getUserByUsername
);

router.get(
  "/identifier/:identifier",
  validate(identifierParamSchema, ValidationSource.PARAMS),
  userController.getUserByIdentifier
);

router
  .route("/:id")
  .all(validate(idParamSchema, ValidationSource.PARAMS))
  .get(userController.getUserById)
  .patch(
    requireSelfOrAdmin,
    validate(updateUserSchema),
    userController.updateUserById
  )
  .delete(requireSelfOrAdmin, userController.softDeleteUserById);

router.delete(
  "/:id/hard",
  validate(idParamSchema, ValidationSource.PARAMS),
  requireSelfOrAdmin,
  userController.hardDeleteUserById
);

export { router as userRouter };
