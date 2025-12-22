import { Router } from "express";
import passport from "passport";
import { googleCallback } from "./auth.controller";
import { auth } from "@/middlewares/auth.middleware";

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
  router.get("/me", auth);

  return router;
};
