import { Router } from "express";
import passport from "passport";
import { googleCallback, me } from "./auth.controller";
import { auth } from "@/middlewares/auth.middleware";
import { getEnv } from "@/utils/env";

const env = getEnv();

export const authRoutes = (): Router => {
  const router = Router();

  // Google Oauth
  router.get(
    "/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
      failureRedirect: `${env.WEBSITE}/login?err="We're having problems with google login, please retry."`,
    })
  );
  router.get("/google/callback", googleCallback);

  // User info
  router.get("/me", auth, me);

  return router;
};
