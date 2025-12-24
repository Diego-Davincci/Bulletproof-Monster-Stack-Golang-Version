import { findOrCreateOauthUser } from "@/modules/auth/auth.service";
import { getEnv } from "@/utils/env";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";

const env = getEnv();

passport.use(
  new GoogleStrategy(
    {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${env.API_URL}/auth/google/callback`,
      passReqToCallback: true,
    },
    async (_req, _accessToken, _refreshToken, profile, done) => {
      try {
        const user = await findOrCreateOauthUser(profile);

        return done(null, user);
      } catch (err) {
        console.error("Google flow error: ", err);
        return done(err, undefined);
      }
    }
  )
);

export { passport };
