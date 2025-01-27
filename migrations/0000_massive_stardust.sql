CREATE TABLE IF NOT EXISTS "ai_predictions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"prediction_type" text NOT NULL,
	"content" text NOT NULL,
	"planetary_context" jsonb NOT NULL,
	"accuracy" numeric DEFAULT '0.0',
	"user_feedback" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"valid_until" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "aspects" (
	"id" serial PRIMARY KEY NOT NULL,
	"birth_chart_id" integer NOT NULL,
	"planet1" text NOT NULL,
	"planet2" text NOT NULL,
	"aspect_type" text NOT NULL,
	"orb" numeric NOT NULL,
	"nature" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "astrologers" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"specialty" text NOT NULL,
	"experience" integer NOT NULL,
	"rating" numeric NOT NULL,
	"reviews" integer NOT NULL,
	"languages" text NOT NULL,
	"price" integer NOT NULL,
	"image_url" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "birth_charts" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"birth_date" timestamp NOT NULL,
	"birth_time" text NOT NULL,
	"birth_place" text NOT NULL,
	"latitude" numeric NOT NULL,
	"longitude" numeric NOT NULL,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bookings" (
	"id" serial PRIMARY KEY NOT NULL,
	"astrologer_id" integer NOT NULL,
	"customer_name" text NOT NULL,
	"customer_email" text NOT NULL,
	"booking_date" timestamp NOT NULL,
	"status" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "chat_messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"consultation_id" integer NOT NULL,
	"sender_id" integer NOT NULL,
	"message" text NOT NULL,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "compatibility_scores" (
	"id" serial PRIMARY KEY NOT NULL,
	"person1_chart_id" integer NOT NULL,
	"person2_chart_id" integer NOT NULL,
	"overall_score" numeric NOT NULL,
	"aspect_scores" jsonb NOT NULL,
	"relationship_type" text NOT NULL,
	"synastry_details" jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "consultations" (
	"id" serial PRIMARY KEY NOT NULL,
	"astrologer_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"start_time" timestamp NOT NULL,
	"end_time" timestamp,
	"status" text NOT NULL,
	"consultation_type" text NOT NULL,
	"room_id" text NOT NULL,
	"created_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "horoscopes" (
	"id" serial PRIMARY KEY NOT NULL,
	"zodiac_sign" text NOT NULL,
	"daily_reading" text NOT NULL,
	"date" timestamp DEFAULT now() NOT NULL,
	"mood" text DEFAULT 'Positive' NOT NULL,
	"color" text DEFAULT 'Purple' NOT NULL,
	"lucky_number" integer DEFAULT 7 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "houses" (
	"id" serial PRIMARY KEY NOT NULL,
	"birth_chart_id" integer NOT NULL,
	"house_number" integer NOT NULL,
	"zodiac_sign" text NOT NULL,
	"degree" numeric NOT NULL,
	"longitude" numeric NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "planetary_alignments" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" timestamp NOT NULL,
	"planets" text[] NOT NULL,
	"alignment_type" text NOT NULL,
	"degree" numeric NOT NULL,
	"influence" text NOT NULL,
	"start_time" timestamp NOT NULL,
	"peak_time" timestamp NOT NULL,
	"end_time" timestamp NOT NULL,
	"significance" numeric NOT NULL,
	"aspect_type" text DEFAULT 'conjunction' NOT NULL,
	"energy_quality" text DEFAULT 'neutral' NOT NULL,
	"life_spheres" text[] DEFAULT '{"general"}' NOT NULL,
	"suggested_actions" jsonb DEFAULT '{"actions":[]}'::jsonb NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "planetary_positions" (
	"id" serial PRIMARY KEY NOT NULL,
	"birth_chart_id" integer NOT NULL,
	"planet" text NOT NULL,
	"zodiac_sign" text NOT NULL,
	"degree" numeric NOT NULL,
	"house" integer NOT NULL,
	"retrograde" boolean NOT NULL,
	"dignity" text NOT NULL,
	"longitude" numeric NOT NULL,
	"celestial_latitude" numeric NOT NULL,
	"speed" numeric NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text NOT NULL,
	"price" integer NOT NULL,
	"image_url" text NOT NULL,
	"category" text NOT NULL,
	"rating" numeric DEFAULT '4.5' NOT NULL,
	"reviews" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_preferences" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"notification_preferences" jsonb NOT NULL,
	"focus_areas" text[] NOT NULL,
	"preferred_reading_style" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
