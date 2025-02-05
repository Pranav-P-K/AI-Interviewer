import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/utils/schema.ts",
  dbCredentials: {
    url: "postgresql://neondb_owner:npg_lERi3cNu4DUj@ep-cold-bush-a1nk3iwf-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require",
  },
});
