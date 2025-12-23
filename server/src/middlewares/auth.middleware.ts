import { findUserByID } from "@/modules/auth/auth.repository";
import { COMMON_MESSAGES, HTTP_STATUS } from "@/utils/constants";
import { buildJsonRsp } from "@/utils/json";
import { checkTokens, setAuthCookies } from "@/utils/token";
import type { Request, Response, NextFunction } from "express";

/*
  TESTS, // TODO:
  1. either access token or refresh token not present 👉 return 401 unauthorized ✅
  2. access token expired 👉 set new refresh and access token to user cookies ✅
  3. refresh expired or signed with a different key 👉 return 401 unauthorized ✅
  4. both access and refresh token present and are not expired 👉 middleware sets req.user = userID ✅
*/

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
          message: "Can't perform this actions",
          statusCode: HTTP_STATUS.UNAUTHORIZED,
        })
      );
      return;
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
          message: "Can't perform this actions",
          statusCode: HTTP_STATUS.UNAUTHORIZED,
        })
      );
      return;
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
            message: "Can't perform this actions",
            statusCode: HTTP_STATUS.UNAUTHORIZED,
          })
        );
        return;
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
    return;
  }
  next();
};
