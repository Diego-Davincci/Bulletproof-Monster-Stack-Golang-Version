/* Useful configuration for auth related stuff, cookies, token expiry time, etc... */

import { __prod__ } from "@/utils/constants";
import { getEnv } from "@/utils/env";

const env = getEnv();

export const authConfig = {
  // Cookies config
  cookieOptions: {
    httpOnly: true,
    secure: __prod__,
    sameSite: "lax",
    path: "/",
    domain: __prod__ ? env.DOMAIN : "localhost",
  },

  // Tokens expiry time
  tokens: {
    access: "15min",
    refresh: "30d",
  },

  // OAUTH providers credentials
  oauth: {
    google: {
      clientID: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${env.API_URL}/auth/google/callback`,
    },
  },
};
