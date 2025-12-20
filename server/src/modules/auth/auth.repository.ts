import { DbUSer, db } from "@/db/client";
import { authProvidersTable, usersTable } from "@/db/schema";
import { eq } from "drizzle-orm";

/**
 * Find user by email
 *
 *
 * @param email
 * @returns {Object | undefined}
 */
export const findUserByEmail = async (
  email: string
): Promise<DbUSer | undefined> => {
  try {
    return await db.query.users.findFirst({
      where: eq(usersTable.email, email),
    });
  } catch (err) {
    console.error("Error finding user by email: ", err);
    throw new Error(`Error finding user by email: ${err}`);
  }
};

/**
 * Find user by id
 *
 *
 * @param userID
 * @returns {Object | undefined}
 */
export const findUserByID = async (
  userID: number
): Promise<DbUSer | undefined> => {
  try {
    return await db.query.users.findFirst({
      where: eq(usersTable.userID, userID),
    });
  } catch (err) {
    console.error("Error finding user by ID: ", err);
    throw new Error(`Error finding user by ID: ${err}`);
  }
};

/**
 * Create new Oauth user
 *
 * @param {{email: string, username: string, picture: string, socialID: string}} config - Config object
 * @returns {void}
 */
export const createNewOauthUser = async ({
  email,
  username,
  picture,
  socialID,
}: {
  email: string;
  username: string;
  picture: string;
  socialID: string;
}): Promise<DbUSer> => {
  try {
    const [newUser] = await db
      .insert(usersTable)
      .values({
        email,
        username,
        picture,
      })
      .returning();

    await db.insert(authProvidersTable).values({
      provider: "google",
      userID: newUser.userID,
      socialID,
    });

    return newUser;
  } catch (err) {
    console.error("Error creating new Oauth user: ", err);
    throw new Error(`Error creating new Oauth user: ${err}`);
  }
};
