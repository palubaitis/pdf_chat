import { Config } from "drizzle-kit";

export default {
  schema: [
    "./db/schema/schema.ts",
    "./db/schema/user.ts",
    "./db/schema/token.ts",
  ],
  driver: "turso",
  dbCredentials: {
    url: "libsql://steady-scream-palubaitis.turso.io",
    authToken:
      "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOiIyMDIzLTEyLTA5VDA3OjU0OjMwLjc5OTQzNjk1WiIsImlkIjoiYWRjNWIyMDQtOTY2Ny0xMWVlLTlmNDctMWFmN2QwZmE4ZTBiIn0.UCjhnoBqbAswmkh3Ibv5U79rronZ1m1L-XPhXcwnc-anJyTAciE7rYIxsBkW8xsxPqqculRVHpsA1wV6kB7cAw",
  },
} satisfies Config;
