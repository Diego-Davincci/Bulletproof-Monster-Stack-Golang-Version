/* Create utils for token management */
import jwt from "jsonwebtoken";

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
