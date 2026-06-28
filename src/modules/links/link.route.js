import createRouter from "../../core/factories/router.factory.js";
import { verifyAuthenticationJWT } from "../../core/middlewares/authentication.middleware.js";
import validate from "../../core/middlewares/validate.middleware.js";
import { upload } from "../../infrastructure/storage/multer/multer.middleware.js";
import ValidationSource from "../../shared/constants/validation.constants.js";
import { idParamSchema } from "../../shared/schemas/uuid.schema.js";
import linkController from "./link.controller.js";
import { createLinkSchema, updateLinkSchema } from "./link.schema.js";

const router = createRouter();

router.use(verifyAuthenticationJWT);

router
  .route("/")
  .post(
    upload.fields([
      {
        name: "logo",
        maxCount: 1,
      },
      {
        name: "thumbnail",
        maxCount: 1,
      },
    ]),
    validate(createLinkSchema),
    linkController.createLink,
  )
  .get(linkController.getLinksByUserId)
  .patch(validate(updateLinkSchema), linkController.updateLinksByUserId)
  .delete(linkController.deleteLinksByUserId);

router
  .route("/:id")
  .all(validate(idParamSchema, ValidationSource.PARAMS))
  .get(linkController.getLinkById)
  .patch(
    upload.fields([
      {
        name: "logo",
        maxCount: 1,
      },
      {
        name: "thumbnail",
        maxCount: 1,
      },
    ]),
    validate(updateLinkSchema),
    linkController.updateLink,
  )
  .delete(linkController.deleteLink);

export { router as linkRouter };
