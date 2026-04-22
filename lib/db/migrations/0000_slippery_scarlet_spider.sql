CREATE TABLE `wisata` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`nama` text NOT NULL,
	`deskripsi` text NOT NULL,
	`kategori` text NOT NULL,
	`kecamatan` text NOT NULL,
	`latitude` real NOT NULL,
	`longitude` real NOT NULL,
	`foto` text DEFAULT '[]' NOT NULL,
	`highlight` integer DEFAULT false NOT NULL,
	`rating` real DEFAULT 4 NOT NULL,
	`tiket_masuk` text,
	`jam_buka` text,
	`fasilitas` text DEFAULT '[]' NOT NULL,
	`created_at` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `galeri` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`url` text NOT NULL,
	`judul` text NOT NULL,
	`lokasi` text NOT NULL,
	`kategori` text NOT NULL,
	`created_at` integer DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer)) NOT NULL
);
--> statement-breakpoint
CREATE TABLE `anggaran` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`tahun` integer NOT NULL,
	`sektor` text NOT NULL,
	`alokasi_miliar` real NOT NULL,
	`realisasi_miliar` real NOT NULL,
	`persen_realisasi` real NOT NULL
);
--> statement-breakpoint
CREATE TABLE `kecamatan_data` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`nama` text NOT NULL,
	`luas_km2` real NOT NULL,
	`jumlah_penduduk` integer NOT NULL,
	`jumlah_desa` integer NOT NULL,
	`kepadatan_per_km2` real NOT NULL
);
--> statement-breakpoint
CREATE TABLE `pembangunan` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`tahun` integer NOT NULL,
	`kategori` text NOT NULL,
	`nilai` real NOT NULL,
	`satuan` text NOT NULL,
	`keterangan` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `populasi` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`tahun` integer NOT NULL,
	`total` integer NOT NULL,
	`laki_laki` integer NOT NULL,
	`perempuan` integer NOT NULL,
	`pertumbuhan_persen` real NOT NULL
);
