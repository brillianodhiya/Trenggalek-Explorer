-- Seeding Wisata
INSERT INTO wisata (nama, deskripsi, kategori, kecamatan, latitude, longitude, foto, highlight, rating, tiket_masuk, jam_buka, fasilitas) VALUES 
('Pantai Prigi', 'Pantai populer di Trenggalek dengan fasilitas lengkap dan pelabuhan perikanan nusantara.', 'Pantai', 'Watulimo', -8.2872, 111.7208, '["https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?auto=format&fit=crop&q=80&w=1000"]', 1, 4.5, 'Rp 10.000', '24 Jam', '["Parkir", "Mushalla", "Toilet", "Warung Makan"]'),
('Pantai Pasir Putih', 'Pantai dengan pasir putih yang bersih dan ombak yang tenang, cocok untuk keluarga.', 'Pantai', 'Watulimo', -8.2917, 111.7375, '["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1000"]', 1, 4.7, 'Rp 15.000', '07:00 - 17:00', '["Sewa Kapal", "Snorkeling", "Kuliner Ikan Bakar"]'),
('Goa Lowo', 'Goa terpanjang dan terbesar di Asia Tenggara dengan stalaktit dan stalagmit yang indah.', 'Goa', 'Watulimo', -8.2567, 111.7125, '["https://images.unsplash.com/photo-1502759683299-cdcc57ee5df2?auto=format&fit=crop&q=80&w=1000"]', 1, 4.6, 'Rp 10.000', '08:00 - 16:30', '["Pemandu", "Lampu Penerangan", "Jembatan Pantau"]');

-- Seeding Galeri
INSERT INTO galeri (url, judul, lokasi, kategori) VALUES 
('https://images.unsplash.com/photo-1544550581-5f7ceaf7f992', 'Sunset di Prigi', 'Watulimo', 'Alam'),
('https://images.unsplash.com/photo-1507525428034-b723cf961d3e', 'Bibir Pantai Pasir Putih', 'Watulimo', 'Alam');

-- Seeding Statistik
INSERT INTO populasi (tahun, total, laki_laki, perempuan, pertumbuhan_persen) VALUES 
(2023, 750000, 374000, 376000, 0.5);

INSERT INTO kecamatan_data (nama, luas_km2, jumlah_penduduk, jumlah_desa, kepadatan_per_km2) VALUES 
('Trenggalek', 25.2, 65000, 13, 2579.3),
('Watulimo', 154.2, 72000, 12, 466.9),
('Panggul', 131.5, 78000, 17, 593.1);
