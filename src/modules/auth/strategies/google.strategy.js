import passport from "passport";
import { Strategy as GoogleProvider } from "passport-google-oauth20";
import ApiError from "../../../core/http/api.error.js";
import { AuthProvider } from "../../../infrastructure/database/generated/prisma/index.js";
import { AuthService } from "../auth.service.js";
import { oAuthConfig } from "../config/oauth.config.js";

const GoogleStrategy = () => {
  passport.use(
    new GoogleProvider(
      oAuthConfig.google,
      async (req, _, __, profile, done) => {
        try {
          const email = profile.emails?.[0]?.verified
            ? profile.emails[0].value
            : null;

          if (!email) {
            return done(
              ApiError.unauthorized(
                "Google account does not have a verified email address associated with it. Please ensure your Google account has a verified email address.",
              ),
            );
          }

          const data = {
            user: {
              email,
              emailVerifiedAt: profile.emails[0].verified ? new Date() : null,
            },
            profile: {
              firstName: profile.name?.givenName || null,
              lastName: profile.name?.familyName || null,
              avatar: profile.photos?.[0]?.value || null,
            },
            account: {
              provider: AuthProvider.GOOGLE,
              providerId: profile.id,
              lastLoginAt: new Date(),
            },
            session: {
              ipAddress:
                req.ip ||
                req.connection.remoteAddress ||
                req.headers["x-forwarded-for"] ||
                null,
              userAgent: req.headers["user-agent"] || null,
            },
          };

          const user = await new AuthService().signInWithOAuth(data);

          return done(null, user);
        } catch (error) {
          done(error, null);
        }
      },
    ),
  );
};

export default GoogleStrategy;
