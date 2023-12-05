import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import invariant from "tiny-invariant";
import { databaseAuthToken, databaseUrl } from "config";

const client = createClient({
  url: databaseUrl,
  authToken: databaseAuthToken,
});

const db = drizzle(client);

export { db };
