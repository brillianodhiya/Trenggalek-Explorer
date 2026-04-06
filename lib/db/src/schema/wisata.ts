import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const wisataTable = sqliteTable("wisata", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  nama: text("nama").notNull(),
  deskripsi: text("deskripsi").notNull(),
  kategori: text("kategori").notNull(),
  kecamatan: text("kecamatan").notNull(),
  latitude: real("latitude").notNull(),
  longitude: real("longitude").notNull(),
  foto: text("foto", { mode: "json" }).$type<string[]>().notNull().default([]),
  highlight: integer("highlight", { mode: "boolean" }).notNull().default(false),
  rating: real("rating").notNull().default(4.0),
  tiketMasuk: text("tiket_masuk"),
  jamBuka: text("jam_buka"),
  fasilitas: text("fasilitas", { mode: "json" }).$type<string[]>().notNull().default([]),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().defaultNow(),
});

export const insertWisataSchema = createInsertSchema(wisataTable).omit({ id: true, createdAt: true });
export type InsertWisata = z.infer<typeof insertWisataSchema>;
export type Wisata = typeof wisataTable.$inferSelect;
