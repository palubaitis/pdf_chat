import {
    sqliteTable,
    text,
    integer,
    uniqueIndex,
  } from "drizzle-orm/sqlite-core";
  
  export const users = sqliteTable(
    "users",
    {
      id: integer("id", { mode: "number" })
        .primaryKey({ autoIncrement: true })
        .notNull(),
      email: text("email").notNull().unique(),
      password: text("password").notNull(),
      verified_email: integer("verified_email", { mode: "boolean" })
        .default(false)
        .notNull(),
      subscription_id: text("subscription_id"),
      subscription_customer: text("subscription_customer"),
      subscription_price: integer("subscription_price", { mode: "number" }),
      subscription_will_renew: integer("subscription_will_renew", {
        mode: "boolean",
      }),
    },
    (users) => ({
      emailIdx: uniqueIndex("emailIdx").on(users.email),
    }),
  );