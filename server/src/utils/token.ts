/* Create utils for token management */
import jwt from "jsonwebtoken";
import type { Response } from "express";

import { DbUSer } from "@/db/client";
import { getEnv } from "./env";
import { authConfig } from "@/config/auth.config";

const env = getEnv();

export type TokenPayload = {
  userID: number;
};

/**
 * Create both refresh and access token
 *
 * @param user
 * @returns {Object} Both refresh and access tokens
 */
export const createTokens = (
  user: DbUSer
): { refreshToken: string; accessToken: string } => {
  // @ts-ignore
  const refreshToken = jwt.sign(
    { userID: user.userID } satisfies TokenPayload,
    env.REFRESH_TOKEN_KEY,
    {
      expiresIn: authConfig.tokens.refresh,
    }
  );

  // @ts-ignore
  const accessToken = jwt.sign(
    { userID: user.userID } satisfies TokenPayload,
    env.ACCESS_TOKEN_KEY,
    {
      expiresIn: authConfig.tokens.access,
    }
  );

  return { accessToken, refreshToken };
};

/**
 * Check both access and refresh token
 *
 * @param accessToken
 * @param refreshToken
 * @returns {{userID: number | undefined, authorized: boolean}} Object { userID: number | undefined, authorized: boolean }
 */
export const checkTokens = (
  accessToken: string,
  refreshToken: string
): { userID?: number; authorized: boolean } => {
  // Verify access token

  try {
    const accessTokenData = <TokenPayload>(
      jwt.verify(accessToken, env.ACCESS_TOKEN_KEY)
    );
    return {
      userID: accessTokenData.userID,
      authorized: true,
    };
  } catch {
    // Access token is either expired or signed with a different secret !
  }

  // Now check refresh token
  try {
    const refreshTokenData = <TokenPayload>(
      jwt.verify(refreshToken, env.REFRESH_TOKEN_KEY)
    );
    return {
      userID: refreshTokenData.userID,
      authorized: true,
    };
  } catch (err) {
    // Refresh token is either expired or signed with a different secret, throw the err !
    return {
      userID: undefined,
      authorized: false,
    };
  }
};

/**
 * Set both access and refresh tokens to user's browser
 *
 * @param res
 * @param user
 * @returns {void}
 */
export const setAuthCookies = (res: Response, user: DbUSer): void => {
  const { accessToken, refreshToken } = createTokens(user);
  res.cookie("accessID", accessToken, authConfig.cookieOptions);
  res.cookie("refreshID", refreshToken, authConfig.cookieOptions);
};

/**
 * Clear user auth cookies
 *
 * @param res
 * @returns {void}
 */
export const clearAuthCookies = (res: Response): void => {
  res.clearCookie("accessID", authConfig.cookieOptions);
  res.clearCookie("refreshID", authConfig.cookieOptions);
};
