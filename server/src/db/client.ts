import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

import { getEnv } from "@/utils/env";
import { authProvidersTable, usersTable } from "./schema";

const env = getEnv();

const pool = new Pool({
  connectionString: env.DB_URL,
});

export type DbUSer = typeof usersTable.$inferSelect;
export type DbUserAuthProvider = typeof authProvidersTable.$inferSelect;

export const db = drizzle(pool, {
  schema: {
    users: usersTable,
    authProviders: authProvidersTable,
  },
});
