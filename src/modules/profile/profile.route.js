import createRouter from "../../core/factories/router.factory.js";
import { verifyAuthenticationJWT } from "../../core/middlewares/authentication.middleware.js";
import {
  requireActiveOrAdmin,
  requireActiveStatus,
} from "../../core/middlewares/status.authorization.js";
import validate from "../../core/middlewares/validate.middleware.js";
import { upload } from "../../infrastructure/storage/multer/multer.middleware.js";
import profileController from "./profile.controller.js";
import { updateProfileSchema } from "./profile.schema.js";

const router = createRouter();

router.use(verifyAuthenticationJWT);

router
  .route("/")
  .get(requireActiveOrAdmin, profileController.getProfileByUserId)
  .patch(
    upload.fields([
      {
        name: "avatar",
        maxCount: 1,
      },
      {
        name: "banner",
        maxCount: 1,
      },
    ]),
    validate(updateProfileSchema),
    requireActiveStatus,
    profileController.upsertProfileByUserId,
  )
  .delete(requireActiveStatus, profileController.deleteProfileByUserId);

export { router as profileRouter };
