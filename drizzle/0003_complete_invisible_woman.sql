ALTER TABLE "advocate_specialties" DROP CONSTRAINT "advocate_specialties_advocate_id_specialty_id_pk";--> statement-breakpoint
ALTER TABLE "advocates" ALTER COLUMN "first_name" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "advocates" ALTER COLUMN "last_name" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "advocates" ALTER COLUMN "city" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "advocates" ALTER COLUMN "degree" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "advocates" ALTER COLUMN "phone_number" SET DATA TYPE varchar(20);--> statement-breakpoint
ALTER TABLE "advocates" ALTER COLUMN "created_at" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "advocates" ALTER COLUMN "created_at" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "specialties" ALTER COLUMN "name" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "advocate_specialties" ADD COLUMN "id" serial PRIMARY KEY NOT NULL;--> statement-breakpoint
CREATE INDEX "advocate_id_idx" ON "advocate_specialties" USING btree ("advocate_id");--> statement-breakpoint
CREATE INDEX "specialty_id_idx" ON "advocate_specialties" USING btree ("specialty_id");--> statement-breakpoint
CREATE INDEX "first_name_idx" ON "advocates" USING btree ("first_name");--> statement-breakpoint
CREATE INDEX "last_name_idx" ON "advocates" USING btree ("last_name");--> statement-breakpoint
CREATE INDEX "city_idx" ON "advocates" USING btree ("city");--> statement-breakpoint
CREATE INDEX "degree_idx" ON "advocates" USING btree ("degree");--> statement-breakpoint
CREATE INDEX "specialty_name_idx" ON "specialties" USING btree ("name");