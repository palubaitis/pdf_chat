import {
  sqliteTable,
  text,
  integer,
  SQLiteTimestamp,
} from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";
import { sql } from "drizzle-orm";

export const chats = sqliteTable("chats", {
  id: text("id").primaryKey(),
  pdf_name: text("pdf_name").notNull(),
  pdf_url: text("pdf_url").notNull(),
  timestamp: text("timestamp").default(sql`CURRENT_TIMESTAMP`),
  user_id: text("user_id").notNull(),
  file_key: text("file_key").notNull(),
});

export const messages = sqliteTable("messages", {
  id: text("id").primaryKey(),
  chat_id: integer("chat_id")
    .references(() => chats.id)
    .notNull(),
  content: text("content").notNull(),
  timestamp: text("timestamp").default(sql`CURRENT_TIMESTAMP`),
  sender: text("sender", {
    enum: ["ai", "chatter", "creator"],
  }).notNull(),
});
