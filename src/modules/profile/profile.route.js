import createRouter from "../../core/factories/router.factory.js";
import validate from "../../core/middlewares/validate.middleware.js";
import { upload } from "../../infrastructure/storage/multer/multer.middleware.js";
import { profileController } from "./profile.container.js";
import { updateProfileSchema } from "./profile.schema.js";

const router = createRouter();

router
  .route("/")
  .all()
  .get(profileController.getProfileByUserId)
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
    profileController.upsertProfileByUserId
  )
  .delete(profileController.deleteProfileByUserId);

export { router as profileRouter };
