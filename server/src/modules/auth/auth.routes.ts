import { Router } from "express";
import passport from "passport";
import { googleCallback } from "./auth.controller";

export const authRoutes = (): Router => {
  const router = Router();

  // Google Oauth
  router.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );
  router.get(
    "/google/callback",
    passport.authenticate("google", { session: false }),
    googleCallback
  );

  // User info
  router.get("/me");

  return router;
};
