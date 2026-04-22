import { getRequestContext } from "@cloudflare/next-on-pages";
import { getDb, kecamatanTable, wisataTable } from "@workspace/db";
import { sql } from "drizzle-orm";

export const runtime = "edge";

export async function GET() {
  const { env } = getRequestContext();
  const db = getDb(env.DB);

  try {
    // Menggunakan kecamatanTable untuk data penduduk dan luas sesuai skema
    const stats = await db.select({ 
      totalPenduduk: sql<number>`sum(${kecamatanTable.jumlahPenduduk})`,
      totalLuas: sql<number>`sum(${kecamatanTable.luasKm2})`,
      totalKecamatan: sql<number>`count(*)`
    }).from(kecamatanTable);

    const totalWisata = await db.select({ 
      count: sql<number>`count(*)` 
    }).from(wisataTable);

    return Response.json({
      total_penduduk: Number(stats[0]?.totalPenduduk || 0),
      total_kecamatan: Number(stats[0]?.totalKecamatan || 0),
      luas_wilayah_km2: Number(stats[0]?.totalLuas || 0),
      total_wisata: Number(totalWisata[0]?.count || 0)
    });
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
