import createRouter from "../../core/factories/router.factory.js";
import { verifyAuthenticationJWT } from "../../core/middlewares/authentication.middleware.js";
import validate from "../../core/middlewares/validate.middleware.js";
import ValidationSource from "../../shared/constants/validation.constants.js";
import { idParamSchema } from "../../shared/schemas/uuid.schema.js";
import accountController from "./account.controller.js";
import {
  createAccountSchema,
  providerIdParams,
  providerParams,
} from "./account.schema.js";

const router = createRouter();

router.use(verifyAuthenticationJWT);

router.post(
  "/",
  validate(createAccountSchema),
  accountController.createAccount
);

router.get("/user", accountController.getAccountsByUserId);

router.get(
  "/provider/:provider/:providerId",
  validate(providerParams, ValidationSource.PARAMS),
  validate(providerIdParams, ValidationSource.PARAMS),
  accountController.getAccountByProviderAndProviderId
);

router.get(
  "/:id",
  validate(idParamSchema, ValidationSource.PARAMS),
  accountController.getAccountById
);

router.delete(
  "/:id",
  validate(idParamSchema, ValidationSource.PARAMS),
  accountController.deleteAccount
);

export default router;
