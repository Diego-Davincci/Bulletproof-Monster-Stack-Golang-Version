import { DbUSer } from "@/db/client";
import { getEnv } from "@/utils/env";
import { setAuthCookies } from "@/utils/token";
import type { Request, Response } from "express";

const env = getEnv();

export const googleCallback = async (
  req: Request,
  res: Response
): Promise<void> => {
  const user = req.user as DbUSer;

  // Set Cookies
  setAuthCookies(res, user);

  // Redirect
  res.redirect(`${env.WEBSITE}/`);
};
