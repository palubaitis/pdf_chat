import { migrate } from "drizzle-orm/libsql/migrator";
import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import "dotenv/config";
import { databaseAuthToken, databaseUrl } from "../config";

export const client = createClient({
  url: databaseUrl,
  authToken: databaseAuthToken,
});

export const db = drizzle(client);

async function main() {
  try {
    await migrate(db, {
      migrationsFolder: "db/migrations",
    });
    console.log("Tables migrated!");
    process.exit(0);
  } catch (error) {
    console.error("Error performing migration: ", error);
    process.exit(1);
  }
}

main();