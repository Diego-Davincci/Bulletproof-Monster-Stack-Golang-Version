import { findUserByID } from "@/modules/auth/auth.repository";
import { COMMON_MESSAGES, HTTP_STATUS } from "@/utils/constants";
import { buildJsonRsp } from "@/utils/json";
import { checkTokens, setAuthCookies } from "@/utils/token";
import type { Request, Response, NextFunction } from "express";

export const auth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const accessToken = req.cookies.accessID;
    const refreshToken = req.cookies.refreshID;

    // Check if access and refresh tokens are present
    if (!accessToken || !refreshToken) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json(
        buildJsonRsp({
          data: null,
          message: "Unauthorized",
          statusCode: HTTP_STATUS.UNAUTHORIZED,
        })
      );
    }

    // Check both tokens, we need to know wether they are valid/expired
    const { authorized, userID, updateAccessToken } = checkTokens(
      accessToken,
      refreshToken
    );

    // If req is unauthorized
    if (!authorized) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json(
        buildJsonRsp({
          data: null,
          message: "Unauthorized",
          statusCode: HTTP_STATUS.UNAUTHORIZED,
        })
      );
    }

    // If req is authorized and a userID is available, set it to the "req" object
    if (authorized && userID) {
      req.user = userID;
    }

    // If we need to update access token, first let's find the user, then create the new tokens and set them to cookies
    if (updateAccessToken && userID) {
      const user = await findUserByID(userID);
      if (user) {
        setAuthCookies(res, user);
      } else {
        res.status(HTTP_STATUS.UNAUTHORIZED).json(
          buildJsonRsp({
            data: null,
            message: "Unauthorized",
            statusCode: HTTP_STATUS.UNAUTHORIZED,
          })
        );
      }
    }
  } catch (err) {
    console.error(`Middleware failed to get user by id: `, err);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(
      buildJsonRsp({
        data: null,
        message: COMMON_MESSAGES.INTERNAL_SERVER_ERROR,
        statusCode: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      })
    );
  }
  next();
};
