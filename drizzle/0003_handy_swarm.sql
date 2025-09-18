ALTER TABLE "transactions" RENAME TO "transaction";--> statement-breakpoint
ALTER TABLE "transaction" DROP CONSTRAINT "transactions_user_id_user_id_fk";
--> statement-breakpoint
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;