CREATE TYPE "public"."user_role" AS ENUM('student', 'teacher', 'admin');--> statement-breakpoint
CREATE TABLE "courses" (
	"ui" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_by" uuid NOT NULL,
	"teacher_id" uuid,
	"title" varchar(256) NOT NULL,
	"description" varchar(256) NOT NULL,
	CONSTRAINT "courses_title_unique" UNIQUE("title"),
	CONSTRAINT "courses_description_unique" UNIQUE("description")
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" "user_role" DEFAULT 'student' NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" ADD CONSTRAINT "courses_created_by_users_ui_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("ui") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "courses" ADD CONSTRAINT "courses_teacher_id_users_ui_fk" FOREIGN KEY ("teacher_id") REFERENCES "public"."users"("ui") ON DELETE set null ON UPDATE no action;