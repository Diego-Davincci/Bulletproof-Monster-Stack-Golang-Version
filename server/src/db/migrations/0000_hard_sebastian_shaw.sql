CREATE TABLE "auth_providers" (
	"user_id" bigint PRIMARY KEY NOT NULL,
	"social_id" text DEFAULT null,
	"provider" varchar NOT NULL,
	CONSTRAINT "auth_providers_social_id_unique" UNIQUE("social_id")
);

--> statement-breakpoint
CREATE TABLE "users" (
	"user_id" bigserial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"password" varchar DEFAULT null,
	"username" varchar NOT NULL,
	"picture" text DEFAULT null,
	"registered_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);

--> statement-breakpoint
ALTER TABLE "auth_providers" ADD CONSTRAINT "auth_providers_user_id_users_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("user_id") ON DELETE no action ON UPDATE no action;

-- *+Comments**
COMMENT ON COLUMN "users"."password" IS 'If user used username/password procedure this will value a value, otherwise this is just null';
COMMENT ON COLUMN "users"."picture" IS 'If user uses google auth they will have a picture, if they use username/password procedure, picture will be set to null or empty string as a default';

COMMENT ON COLUMN "auth_providers"."social_id" IS 'The unique ID provided by the external auth provider (NULL for internal)';
COMMENT ON COLUMN "auth_providers"."provider" IS 'The source of authentication. Allowed values: "google", "internal" (internal means user used username/password procedure)';
