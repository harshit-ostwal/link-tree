import {
  GITHUB_CALLBACK_URL,
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from "../../../config/env.config.js";

export const oAuthConfig = {
  google: {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: GOOGLE_CALLBACK_URL,

    scope: ["profile", "email"],
    prompt: "select_account",

    passReqToCallback: true,
    state: false,
  },
  github: {
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: GITHUB_CALLBACK_URL,

    scope: ["user:email"],
    prompt: "select_account",

    passReqToCallback: true,
    state: false,
  },
};
