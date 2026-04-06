import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

export function getDb(d1: any) {
  if (!d1) {
    throw new Error("D1 database binding is required. Pass it from getRequestContext().env.DB");
  }
  return drizzle(d1, { schema });
}

export * from "./schema";
