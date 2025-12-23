import { Profile } from "passport";
import {
  createNewOauthUser,
  findUserByEmail,
  findUserByID,
} from "./auth.repository";
import { DbUSer } from "@/db/client";
import { ApiRsp } from "@/types";
import { HTTP_STATUS } from "@/utils/constants";

/**
 * Find or create a Oauth user (google flow)
 *
 * @param profile
 * @returns {}
 */
export const findOrCreateOauthUser = async (
  profile: Profile
): Promise<DbUSer> => {
  try {
    // See if user already exists
    const email = profile.emails![0].value;
    const user = await findUserByEmail(email);

    // If user exists, return it
    if (user) {
      return user;
    }

    // Create new user
    const username = profile.displayName;
    const picture = profile.photos![0].value;
    const socialID = profile.id;
    const newUser = await createNewOauthUser({
      email,
      username,
      picture,
      socialID,
    });

    return newUser;
  } catch (err) {
    throw err;
  }
};

interface UserRsp {
  userID: number;
  email: string;
  username: string;
  picture: string | null;
}

/**
 * Get user data
 *
 * @param userID
 * @returns {Object}
 */
export const getUserData = async (userID: number): Promise<ApiRsp> => {
  try {
    const user = await findUserByID(userID);
    if (!user) {
      return {
        data: null,
        message: "",
        statusCode: HTTP_STATUS.UNAUTHORIZED,
      };
    }

    const userRsp: UserRsp = {
      userID,
      username: user.username,
      email: user.email,
      picture: user.picture,
    };
    return {
      data: userRsp,
      message: "",
      statusCode: HTTP_STATUS.OK,
    };
  } catch (err) {
    throw err;
  }
};
