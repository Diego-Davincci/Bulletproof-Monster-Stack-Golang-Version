import { sql } from "drizzle-orm";
import {
  bigserial,
  timestamp,
  pgTable,
  text,
  varchar,
  bigint,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  userID: bigserial("user_id", { mode: "number" }).primaryKey().notNull(),
  email: text("email").notNull(),
  /* If user used username/password procedure this will value a value, otherwise this is just null */
  password: varchar("password").default(sql`null`),
  username: varchar("username").notNull(),
  /* If user uses google auth they will have a picture, if they use username/password procedure, picture will be set to null or empty string as a default */
  picture: text("picture").default(sql`null`),
  registeredAt: timestamp("registered_at", { withTimezone: true, mode: "date" })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true, mode: "date" })
    .defaultNow()
    .notNull(),
});

export const authProvidersTable = pgTable("auth_providers", {
  userID: bigint("user_id", { mode: "number" })
    .notNull()
    .references(() => usersTable.userID)
    .primaryKey(),
  /* The unique ID provided by the external auth provider (NULL for internal) */
  socialID: text("social_id")
    .unique()
    .default(sql`null`),
  /* The source of authentication. Allowed values: "google", "internal" (internal means user used username/password procedure) */
  provider: varchar("provider").notNull(),
});
