import createRouter from "../../core/factories/router.factory.js";
import validate from "../../core/middlewares/validate.middleware.js";
import ValidationSource from "../../shared/constants/validation.constants.js";
import {
  idParamSchema,
  userIdParamSchema,
} from "../../shared/schemas/uuid.schema.js";
import accountController from "./account.controller.js";
import {
  createAccountSchema,
  providerIdParams,
  providerParams,
  updateAccountSchema,
} from "./account.schema.js";

const router = createRouter();

router
  .route("/")
  .post(validate(createAccountSchema), accountController.createAccountByUserId)
  .get(accountController.getAccountsByUserId)
  .delete(accountController.deleteAccountsByUserId);

router.get(
  "/user/:provider",
  validate(userIdParamSchema, ValidationSource.PARAMS),
  validate(providerParams, ValidationSource.PARAMS),
  accountController.getAccountByUserIdAndProvider,
);

router.get(
  "/provider/:provider/:providerId",
  validate(providerParams, ValidationSource.PARAMS),
  validate(providerIdParams, ValidationSource.PARAMS),
  accountController.getAccountByProviderAndProviderId,
);

router
  .route("/:id")
  .all(validate(idParamSchema, ValidationSource.PARAMS))
  .get(accountController.getAccountById)
  .patch(validate(updateAccountSchema), accountController.updateAccountById)
  .delete(accountController.deleteAccountById);

export { router as accountRouter };
