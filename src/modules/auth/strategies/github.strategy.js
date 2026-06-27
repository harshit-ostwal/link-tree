import passport from "passport";
import { Strategy as GitHubProvider } from "passport-github2";
import ApiError from "../../../core/http/api.error.js";
import { AuthProvider } from "../../../infrastructure/database/generated/prisma/index.js";
import { getRequestInfo } from "../../../shared/utils/request.utils.js";
import AuthMessages from "../auth.messages.js";
import { AuthService } from "../auth.service.js";
import { oAuthConfig } from "../config/oauth.config.js";

const GitHubStrategy = () => {
  passport.use(
    new GitHubProvider(
      oAuthConfig.github,
      async (req, _, __, profile, done) => {
        try {
          const email = profile.emails[0].value || null;

          if (!email) {
            return done(
              ApiError.unauthorized(
                AuthMessages.Errors.OAUTH_EMAIL_NOT_VERIFIED_GITHUB,
              ),
            );
          }

          const { ipAddress, userAgent } = getRequestInfo(req);

          const data = {
            user: {
              email,
              emailVerifiedAt: email ? new Date() : null,
            },
            profile: {
              firstName: profile.displayName || null,
              lastName: null, // GitHub does not provide separate first and last name fields
              avatar: profile.photos?.[0]?.value || null,
            },
            account: {
              provider: AuthProvider.GITHUB,
              providerId: profile.id,
              lastLoginAt: new Date(),
            },
            session: {
              ipAddress,
              userAgent,
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

export default GitHubStrategy;
