import createRouter from "../../core/factories/router.factory.js";
import { verifyAuthenticationJWT } from "../../core/middlewares/authentication.middleware.js";
import validate from "../../core/middlewares/validate.middleware.js";
import authController from "./auth.controller.js";
import { signInSchema, signUpSchema } from "./auth.schema.js";
import { authGuard } from "./guards/auth.guard.js";

const router = createRouter();

router.post("/refresh-session", authController.refreshSession);

router.get(
  "/google",
  authGuard("google", {
    prompt: "consent",
  }),
);

router.get(
  "/google/callback",
  authGuard("google"),
  authController.signInWithOAuth,
);

router.get("/github", authGuard("github"));

router.get(
  "/github/callback",
  authGuard("github"),
  authController.signInWithOAuth,
);

router.post(
  "/sign-up",
  validate(signUpSchema),
  authController.signUpWithCredentials,
);

router.post(
  "/sign-in",
  validate(signInSchema),
  authController.signInWithCredentials,
);

router.use(verifyAuthenticationJWT);

router.get("/me", authController.getMe);

router.delete("/sign-out", authController.signOut);

router.delete("/sign-out/all", authController.signOutAllSessions);

export { router as authRouter };
