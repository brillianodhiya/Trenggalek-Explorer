import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const populasiTable = sqliteTable("populasi", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  tahun: integer("tahun").notNull(),
  total: integer("total").notNull(),
  lakiLaki: integer("laki_laki").notNull(),
  perempuan: integer("perempuan").notNull(),
  pertumbuhanPersen: real("pertumbuhan_persen").notNull(),
});

export const pembangunanTable = sqliteTable("pembangunan", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  tahun: integer("tahun").notNull(),
  kategori: text("kategori").notNull(),
  nilai: real("nilai").notNull(),
  satuan: text("satuan").notNull(),
  keterangan: text("keterangan").notNull(),
});

export const anggaranTable = sqliteTable("anggaran", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  tahun: integer("tahun").notNull(),
  sektor: text("sektor").notNull(),
  alokasiMiliar: real("alokasi_miliar").notNull(),
  realisasiMiliar: real("realisasi_miliar").notNull(),
  persenRealisasi: real("persen_realisasi").notNull(),
});

export const kecamatanTable = sqliteTable("kecamatan_data", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  nama: text("nama").notNull(),
  luasKm2: real("luas_km2").notNull(),
  jumlahPenduduk: integer("jumlah_penduduk").notNull(),
  jumlahDesa: integer("jumlah_desa").notNull(),
  kepadatanPerKm2: real("kepadatan_per_km2").notNull(),
});

export const insertPopulasiSchema = createInsertSchema(populasiTable).omit({ id: true });
export type InsertPopulasi = z.infer<typeof insertPopulasiSchema>;
export type Populasi = typeof populasiTable.$inferSelect;

export const insertPembangunanSchema = createInsertSchema(pembangunanTable).omit({ id: true });
export type InsertPembangunan = z.infer<typeof insertPembangunanSchema>;
export type Pembangunan = typeof pembangunanTable.$inferSelect;

export const insertAnggaranSchema = createInsertSchema(anggaranTable).omit({ id: true });
export type InsertAnggaran = z.infer<typeof insertAnggaranSchema>;
export type Anggaran = typeof anggaranTable.$inferSelect;

export const insertKecamatanSchema = createInsertSchema(kecamatanTable).omit({ id: true });
export type InsertKecamatan = z.infer<typeof insertKecamatanSchema>;
export type KecamatanData = typeof kecamatanTable.$inferSelect;
