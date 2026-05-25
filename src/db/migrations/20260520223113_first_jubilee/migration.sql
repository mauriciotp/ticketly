CREATE TYPE "role" AS ENUM('organizer', 'attendee');--> statement-breakpoint
CREATE TYPE "ticket_status" AS ENUM('valid', 'used', 'cancelled');--> statement-breakpoint
CREATE TABLE "events" (
	"id" text PRIMARY KEY,
	"organizer_id" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"date" timestamp NOT NULL,
	"capacity" integer NOT NULL,
	"tickets_sold" integer DEFAULT 0 NOT NULL,
	"price_in_cents" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tickets" (
	"id" text PRIMARY KEY,
	"event_id" text NOT NULL,
	"user_id" text NOT NULL,
	"qr_code" varchar(21) NOT NULL UNIQUE,
	"status" "ticket_status" DEFAULT 'valid'::"ticket_status" NOT NULL,
	"check_in_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" text PRIMARY KEY,
	"name" text NOT NULL,
	"email" text NOT NULL UNIQUE,
	"password_hash" text NOT NULL,
	"role" "role" DEFAULT 'attendee'::"role" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_organizer_id_users_id_fkey" FOREIGN KEY ("organizer_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_event_id_events_id_fkey" FOREIGN KEY ("event_id") REFERENCES "events"("id");--> statement-breakpoint
ALTER TABLE "tickets" ADD CONSTRAINT "tickets_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id");