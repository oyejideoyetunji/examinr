ALTER TABLE "courses" RENAME COLUMN "ui" TO "id";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "ui" TO "id";--> statement-breakpoint
ALTER TABLE "courses" DROP CONSTRAINT "courses_created_by_users_ui_fk";
--> statement-breakpoint
ALTER TABLE "courses" DROP CONSTRAINT "courses_teacher_id_users_ui_fk";
--> statement-breakpoint
ALTER TABLE "courses" ADD CONSTRAINT "courses_created_by_users_id_fk" FOREIGN KEY ("created_by") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "courses" ADD CONSTRAINT "courses_teacher_id_users_id_fk" FOREIGN KEY ("teacher_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;