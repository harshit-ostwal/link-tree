import createRouter from "../../core/factories/router.factory.js";
import { verifyAuthenticationJWT } from "../../core/middlewares/authentication.middleware.js";
import validate from "../../core/middlewares/validate.middleware.js";
import AuthController from "./auth.controller.js";
import { signInSchema, signUpSchema } from "./auth.schema.js";
import { authGuard } from "./guards/auth.guard.js";

const router = createRouter();

router.get(
  "/google",
  authGuard("google", {
    prompt: "consent",
  })
);

router.get(
  "/google/callback",
  authGuard("google"),
  AuthController.signInWithOAuth
);

router.get("/github", authGuard("github"));

router.get(
  "/github/callback",
  authGuard("github"),
  AuthController.signInWithOAuth
);

router.post(
  "/sign-up",
  validate(signUpSchema),
  AuthController.signUpWithCredentials
);

router.post(
  "/sign-in",
  validate(signInSchema),
  AuthController.signInWithCredentials
);

router.use(verifyAuthenticationJWT);

router.post("/sign-out", AuthController.signOut);

router.post("/sign-out/all", AuthController.signOutAllSessions);

export default router;
