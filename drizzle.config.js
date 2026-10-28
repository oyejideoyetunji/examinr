import { defineConfig } from "drizzle-kit";
import { config } from "./src/shared/db";

export default defineConfig({
  schema: "src/shared/db/schema.ts",
  out: "src/shared/db",
  dialect: "postgresql",
  dbCredentials: {
    url: config.db.url,
  },
});
