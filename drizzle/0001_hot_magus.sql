ALTER TABLE "test_tb" RENAME TO "test_table";--> statement-breakpoint
ALTER TABLE "test_table" ADD COLUMN "col_1" varchar(255);--> statement-breakpoint
ALTER TABLE "test_table" ADD COLUMN "col_2" integer;--> statement-breakpoint
ALTER TABLE "test_table" ADD COLUMN "col_3" boolean;--> statement-breakpoint
ALTER TABLE "test_table" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "test_table" DROP COLUMN "full_name";--> statement-breakpoint
ALTER TABLE "test_table" DROP COLUMN "phone";