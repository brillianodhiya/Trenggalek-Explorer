import fs from 'fs';
import path from 'path';

const DATA_SOURCES = [
  { kecamatan: "Tugu", url: "https://satudata.trenggalekkab.go.id/json/570?tahun=2026" },
  { kecamatan: "Panggul", url: "https://satudata.trenggalekkab.go.id/json/574?tahun=2026" },
  { kecamatan: "Dongko", url: "https://satudata.trenggalekkab.go.id/json/688?tahun=2026" },
  { kecamatan: "Bendungan", url: "https://satudata.trenggalekkab.go.id/json/712?tahun=2026" },
  { kecamatan: "Suruh", url: "https://satudata.trenggalekkab.go.id/json/715?tahun=2026" },
  { kecamatan: "Watulimo", url: "https://satudata.trenggalekkab.go.id/json/767?tahun=2026" },
  { kecamatan: "Pule", url: "https://satudata.trenggalekkab.go.id/json/771?tahun=2026" },
  { kecamatan: "Kampak", url: "https://satudata.trenggalekkab.go.id/json/778?tahun=2026" },
  { kecamatan: "Pogalan", url: "https://satudata.trenggalekkab.go.id/json/867?tahun=2026" },
];

const OLLAMA_ENDPOINT = "http://localhost:11434/api/generate";
const MODEL_NAME = "gemma4";

async function generateDescription(name: string, location: string) {
  try {
    const response = await fetch(OLLAMA_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify({
        model: MODEL_NAME,
        prompt: `Tulis deskripsi singkat (maksimal 2 kalimat) yang menarik dan puitis dalam Bahasa Indonesia untuk tempat wisata bernama "${name}" yang berlokasi di ${location}, Trenggalek. Jangan berikan teks pembuka, langsung ke deskripsinya.`,
        stream: false
      }),
    });
    const result: any = await response.json();
    return result.response.trim();
  } catch (error) {
    return `Destinasi wisata menarik yang terletak di ${location}, Kabupaten Trenggalek.`;
  }
}

async function sync() {
  let allSql = "-- Generated Sync SQL\n\n";
  
  for (const source of DATA_SOURCES) {
    console.log(`[Fetch] Mengambil data Pariwisata Kec. ${source.kecamatan}...`);
    try {
      const response = await fetch(source.url);
      const json: any = await response.json();
      
      if (json.status === "OK" && json.data) {
        for (const item of json.data) {
          // Deteksi nama kolom secara dinamis karena API tidak konsisten
          const name = (item.nama_pariwisata || item.nama || item.pariwisata || "").trim();
          const addr = (item.alamat || item.lokasi || "").trim();
          const lat = item.lattitude || item.latitude || item.lat || "0";
          const lng = item.longitude || item.longtitude || item.lng || "0";
          
          if (!name) continue; // Skip jika tidak ada nama

          const category = name.toLowerCase().includes('pantai') ? 'Pantai' : 
                           name.toLowerCase().includes('goa') ? 'Goa' : 
                           name.toLowerCase().includes('hutan') ? 'Hutan' : 'Alam';
          
          const description = await generateDescription(name, source.kecamatan);
          const photoUrl = `https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=1000&auto=format&fit=crop&sig=${encodeURIComponent(name)}`;
          
          const sql = `INSERT OR REPLACE INTO wisata (nama, deskripsi, kategori, kecamatan, latitude, longitude, foto, highlight, rating) VALUES 
('${name.replace(/'/g, "''")}', '${description.replace(/'/g, "''")}', '${category}', '${source.kecamatan}', ${lat}, ${lng}, '["${photoUrl}"]', 0, 4.0);\n`;
          
          allSql += sql;
        }
        console.log(`[Success] Berhasil memproses ${json.data.length} data dari ${source.kecamatan}`);
      }
    } catch (err) {
      console.error(`[Error] Gagal mengambil data ${source.kecamatan}:`, err);
    }
  }

  const outputPath = path.join(process.cwd(), 'lib/db/src/seed_sync.sql');
  fs.writeFileSync(outputPath, allSql);
  console.log(`\n[Done] File SQL berhasil dibuat di: ${outputPath}`);
  console.log(`Silakan jalankan: npx wrangler d1 execute trenggalek_db --local --file=./lib/db/src/seed_sync.sql`);
}

sync();
