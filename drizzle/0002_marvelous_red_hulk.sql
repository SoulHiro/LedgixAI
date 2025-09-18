ALTER TABLE "transaction" RENAME TO "transactions";--> statement-breakpoint
ALTER TABLE "transactions" DROP CONSTRAINT "transaction_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "transactions" ADD CONSTRAINT "transactions_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;