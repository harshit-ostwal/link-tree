import passport from "passport";
import { FRONTEND_URL } from "../../../config/env.config.js";

export const authGuard = (provider, options = {}) => {
  return passport.authenticate(provider, {
    failureRedirect: FRONTEND_URL,
    session: false,
    ...options,
  });
};
