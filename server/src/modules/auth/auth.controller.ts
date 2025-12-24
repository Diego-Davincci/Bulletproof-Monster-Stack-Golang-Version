import type { NextFunction, Request, Response } from "express";

import { DbUSer } from "@/db/client";
import { getEnv } from "@/utils/env";
import { setAuthCookies } from "@/utils/token";
import { COMMON_MESSAGES, HTTP_STATUS } from "@/utils/constants";
import { buildJsonRsp } from "@/utils/json";
import { getUserData } from "./auth.service";
import passport from "passport";

const env = getEnv();

export const googleCallback = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate(
    "google",
    {
      session: false,
      failureRedirect: `${env.WEBSITE}/login?err="We're having problems with google login, please retry"`,
    },
    (err, user) => {
      if (err) {
        return res.redirect(
          `${env.WEBSITE}/login?err="We're having problems with google login, please retry"`
        );
      }

      if (!user) {
        return res.redirect(
          `${env.WEBSITE}/login?err="We're having problems with google login, please retry."`
        );
      }

      // success
      setAuthCookies(res, user);
      return res.redirect(`${env.WEBSITE}/`);
    }
  )(req, res, next);
};

export const me = async (req: Request, res: Response) => {
  try {
    const userID = req.user as number;

    const userRsp = await getUserData(userID);

    res.status(userRsp.statusCode).json(userRsp);
  } catch (err) {
    console.error(`Error getting user: `, err);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
      buildJsonRsp({
        data: null,
        message: COMMON_MESSAGES.INTERNAL_SERVER_ERROR,
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      })
    );
  }
};
