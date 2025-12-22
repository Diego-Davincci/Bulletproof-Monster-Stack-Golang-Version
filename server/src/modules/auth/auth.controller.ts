import { DbUSer } from "@/db/client";
import { getEnv } from "@/utils/env";
import { setAuthCookies } from "@/utils/token";
import type { Request, Response } from "express";
import { findUserByID } from "./auth.repository";
import { COMMON_MESSAGES, HTTP_STATUS } from "@/utils/constants";
import { buildJsonRsp } from "@/utils/json";

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

interface UserRsp {
  userID: number;
  email: string;
  username: string;
  picture: string | null;
}

export const me = async (req: Request, res: Response) => {
  try {
    const userID = req.user as number;

    const user = await findUserByID(userID);
    if (!user) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json(
        buildJsonRsp({
          data: null,
          message: "User not found",
          statusCode: HTTP_STATUS.UNAUTHORIZED,
        })
      );
      return;
    }

    const userRsp: UserRsp = {
      userID,
      username: user.username,
      email: user.email,
      picture: user.picture,
    };
    res
      .status(HTTP_STATUS.OK)
      .json(
        buildJsonRsp({ data: userRsp, message: "", statusCode: HTTP_STATUS.OK })
      );
  } catch (err) {
    console.error(`Error getting user: `, err);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json(
        buildJsonRsp({
          data: null,
          message: COMMON_MESSAGES.INTERNAL_SERVER_ERROR,
          statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
        })
      );
  }
};
