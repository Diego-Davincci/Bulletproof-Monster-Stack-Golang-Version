import { HTTP_STATUS } from "@/utils/constants";
import { buildJsonRsp } from "@/utils/json";
import { checkTokens } from "@/utils/token";
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

    const { authorized, userID } = checkTokens(accessToken, refreshToken);
  } catch (err) {}
};
