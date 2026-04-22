import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

export function getDb(d1: any) {
  if (!d1) {
    const isDev = process.env.NODE_ENV === "development";
    const msg = isDev 
      ? "D1 database binding 'DB' was not found in the Request Context. " + 
        "If you are running locally on Windows, ensure wrangler.toml is correct and " + 
        "that you've restarted 'pnpm dev' after config changes."
      : "D1 database binding is required. Pass it from getRequestContext().env.DB";
    throw new Error(msg);
  }
  return drizzle(d1, { schema });
}

export * from "./schema";
