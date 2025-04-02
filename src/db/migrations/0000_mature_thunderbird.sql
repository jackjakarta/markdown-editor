CREATE SCHEMA "app";
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "app"."token_action" AS ENUM('verify-email', 'reset-password');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app"."action_token" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"action" "app"."token_action" NOT NULL,
	"token" text NOT NULL,
	"email" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "action_token_email_action_unique" UNIQUE("email","action")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "app"."user_entity" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"password_hash" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_entity_email_unique" UNIQUE("email")
);
