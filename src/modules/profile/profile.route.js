import createRouter from "../../core/factories/router.factory.js";
import { verifyAuthenticationJWT } from "../../core/middlewares/authentication.middleware.js";
import validate from "../../core/middlewares/validate.middleware.js";
import { upload } from "../../infrastructure/storage/multer/multer.middleware.js";
import ValidationSource from "../../shared/constants/validation.constants.js";
import { userIdParamSchema } from "../../shared/schemas/uuid.schema.js";
import profileController from "./profile.controller.js";
import { createProfileSchema, updateProfileSchema } from "./profile.schema.js";

const router = createRouter();

router.use(verifyAuthenticationJWT);

router.get(
  "/",
  validate(userIdParamSchema, ValidationSource.USER),
  profileController.getProfileByUserId
);

router.post(
  "/",
  upload.single("avatar"),
  validate(userIdParamSchema, ValidationSource.USER),
  validate(createProfileSchema),
  profileController.createProfile
);

router.patch(
  "/",
  upload.single("avatar"),
  validate(userIdParamSchema, ValidationSource.USER),
  validate(updateProfileSchema),
  profileController.updateProfile
);

export default router;
