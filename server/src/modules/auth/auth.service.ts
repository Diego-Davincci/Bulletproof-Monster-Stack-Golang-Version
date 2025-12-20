import { Profile } from "passport";
import { createNewOauthUser, findUserByEmail } from "./auth.repository";
import { DbUSer } from "@/db/client";

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
    console.error("Problems with findOrCreateOauthUser fn: ", err);
    throw new Error(`Problems with findOrCreateOauthUser fn: ${err}`);
  }
};
