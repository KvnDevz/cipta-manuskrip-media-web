-- Migration 003 — Format buku, jenis buku, bahasa, dan ukuran buku
--
-- Menambahkan kolom spesifikasi buku agar dapat dikelola secara dinamis
-- lewat dashboard admin dan tampil di halaman detail buku publik (/buku/[slug]).
-- Berlaku untuk buku yang telah terbit maupun segera terbit.
--
-- Idempoten: aman dijalankan berkali-kali via scripts/migrate.mjs.

-- 1. Format Buku (contoh: "Buku Cetak & E-Book")
SET @ada_format_buku = (
  SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'books' AND COLUMN_NAME = 'format_buku'
);
SET @sql = IF(@ada_format_buku = 0,
  'ALTER TABLE books ADD COLUMN format_buku VARCHAR(100) NULL AFTER price_ebook',
  'DO 0'
);
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

-- 2. Jenis Buku (contoh: "Nonfiksi", "Monograf", "Buku Referensi")
SET @ada_jenis_buku = (
  SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'books' AND COLUMN_NAME = 'jenis_buku'
);
SET @sql = IF(@ada_jenis_buku = 0,
  'ALTER TABLE books ADD COLUMN jenis_buku VARCHAR(100) NULL AFTER format_buku',
  'DO 0'
);
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

-- 3. Bahasa (contoh: "Bahasa Indonesia")
SET @ada_bahasa = (
  SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'books' AND COLUMN_NAME = 'bahasa'
);
SET @sql = IF(@ada_bahasa = 0,
  'ALTER TABLE books ADD COLUMN bahasa VARCHAR(100) NULL AFTER jenis_buku',
  'DO 0'
);
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

-- 4. Ukuran Buku (contoh: "UNESCO 15.5 x 23 cm")
SET @ada_ukuran_buku = (
  SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'books' AND COLUMN_NAME = 'ukuran_buku'
);
SET @sql = IF(@ada_ukuran_buku = 0,
  'ALTER TABLE books ADD COLUMN ukuran_buku VARCHAR(100) NULL AFTER bahasa',
  'DO 0'
);
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;
