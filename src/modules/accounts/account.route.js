import createRouter from "../../core/factories/router.factory.js";
import { verifyAuthenticationJWT } from "../../core/middlewares/authentication.middleware.js";
import { requireActiveStatus } from "../../core/middlewares/status.authorization.js";
import validate from "../../core/middlewares/validate.middleware.js";
import ValidationSource from "../../shared/constants/validation.constants.js";
import accountController from "./account.controller.js";
import { createAccountSchema, providerParams } from "./account.schema.js";

const router = createRouter();

router.use(verifyAuthenticationJWT);
router.use(requireActiveStatus);

router
  .route("/")
  .post(validate(createAccountSchema), accountController.createAccountByUserId)
  .get(accountController.getAccountsByUserId);

router
  .route("/provider/:provider")
  .all(validate(providerParams, ValidationSource.PARAMS))
  .get(accountController.getAccountByUserIdAndProvider)
  .delete(accountController.deleteAccountByUserIdAndProvider);

export { router as accountRouter };
