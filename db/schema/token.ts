import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";

export const tokens = sqliteTable("tokens", {
  id: text("id")
    .$defaultFn(() => createId())
    .primaryKey()
    .unique()
    .notNull(),
  type: text("text", { enum: ["reset", "verify"] }).notNull(),
  user_id: integer("id", { mode: "number" }).notNull(),
  timestamp: text("timestamp").default(sql`CURRENT_TIMESTAMP`),
});