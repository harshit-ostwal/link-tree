import createRouter from "../../core/factories/router.factory.js";
import validate from "../../core/middlewares/validate.middleware.js";
import ValidationSource from "../../shared/constants/validation.constants.js";
import { idParamSchema } from "../../shared/schemas/uuid.schema.js";
import { authorizeUserOwner } from "./user.authorization.js";
import userController from "./user.controller.js";
import { emailParamSchema, updateUserSchema } from "./user.schema.js";

const router = createRouter();

router.patch(
  "/",
  validate(idParamSchema, ValidationSource.USER),
  authorizeUserOwner,
  validate(updateUserSchema),
  userController.updateUser
);

router.delete(
  "/",
  validate(idParamSchema, ValidationSource.USER),
  authorizeUserOwner,
  userController.deleteUser
);

router.get(
  "/:identifier",
  validate(emailParamSchema, ValidationSource.PARAMS),
  authorizeUserOwner,
  userController.getUserByIdentifier
);

router.get(
  "/:id",
  validate(idParamSchema, ValidationSource.PARAMS),
  authorizeUserOwner,
  userController.getUserById
);

export default router;
