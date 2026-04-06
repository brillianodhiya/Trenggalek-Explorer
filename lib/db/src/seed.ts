import { getDb } from "./index";
import { wisataTable, galeriTable, populasiTable, kecamatanTable } from "./schema";

export async function seed(d1: D1Database) {
  const db = getDb(d1);

  console.log("Seeding Wisata...");
  await db.insert(wisataTable).values([
    {
      nama: "Pantai Prigi",
      deskripsi: "Pantai populer di Trenggalek dengan fasilitas lengkap dan pelabuhan perikanan nusantara.",
      kategori: "Pantai",
      kecamatan: "Watulimo",
      latitude: -8.2872,
      longitude: 111.7208,
      foto: ["https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1000"],
      highlight: true,
      rating: 4.5,
      tiketMasuk: "Rp 10.000",
      jamBuka: "24 Jam",
      fasilitas: ["Parkir", "Mushalla", "Toilet", "Warung Makan"],
    },
    {
      nama: "Pantai Pasir Putih",
      deskripsi: "Pantai dengan pasir putih yang bersih dan ombak yang tenang, cocok untuk keluarga.",
      kategori: "Pantai",
      kecamatan: "Watulimo",
      latitude: -8.2917,
      longitude: 111.7375,
      foto: ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1000"],
      highlight: true,
      rating: 4.7,
      tiketMasuk: "Rp 15.000",
      jamBuka: "07:00 - 17:00",
      fasilitas: ["Sewa Kapal", "Snorkeling", "Kuliner Ikan Bakar"],
    },
    {
      nama: "Goa Lowo",
      deskripsi: "Goa terpanjang dan terbesar di Asia Tenggara dengan stalaktit dan stalagmit yang indah.",
      kategori: "Goa",
      kecamatan: "Watulimo",
      latitude: -8.2567,
      longitude: 111.7125,
      foto: ["https://images.unsplash.com/photo-1502759683299-cdcc57ee5df2?auto=format&fit=crop&q=80&w=1000"],
      highlight: true,
      rating: 4.6,
      tiketMasuk: "Rp 10.000",
      jamBuka: "08:00 - 16:30",
      fasilitas: ["Pemandu", "Lampu Penerangan", "Jembatan Pantau"],
    },
  ]);

  console.log("Seeding Galeri...");
  await db.insert(galeriTable).values([
    {
      url: "https://images.unsplash.com/photo-1544550581-5f7ceaf7f992",
      judul: "Sunset di Prigi",
      lokasi: "Watulimo",
      kategori: "Alam",
    },
    {
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      judul: "Bibir Pantai Pasir Putih",
      lokasi: "Watulimo",
      kategori: "Alam",
    },
  ]);

  console.log("Seeding Statistik...");
  await db.insert(populasiTable).values([
    { tahun: 2023, total: 750000, lakiLaki: 374000, perempuan: 376000, pertumbuhanPersen: 0.5 },
  ]);

  await db.insert(kecamatanTable).values([
    { nama: "Trenggalek", luasKm2: 25.2, jumlahPenduduk: 65000, jumlahDesa: 13, kepadatanPerKm2: 2579.3 },
    { nama: "Watulimo", luasKm2: 154.2, jumlahPenduduk: 72000, jumlahDesa: 12, kepadatanPerKm2: 466.9 },
    { nama: "Panggul", luasKm2: 131.5, jumlahPenduduk: 78000, jumlahDesa: 17, kepadatanPerKm2: 593.1 },
  ]);

  console.log("Seed completed!");
}
