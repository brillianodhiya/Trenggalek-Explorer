import { sqliteTable, text, integer, timestamp } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const galeriTable = sqliteTable("galeri", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  url: text("url").notNull(),
  judul: text("judul").notNull(),
  lokasi: text("lokasi").notNull(),
  kategori: text("kategori").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().defaultNow(),
});

export const insertGaleriSchema = createInsertSchema(galeriTable).omit({ id: true, createdAt: true });
export type InsertGaleri = z.infer<typeof insertGaleriSchema>;
export type Galeri = typeof galeriTable.$inferSelect;
