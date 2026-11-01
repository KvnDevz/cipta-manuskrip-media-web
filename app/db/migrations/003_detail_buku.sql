-- Migration 003 — Detail fisik buku
--
-- Revisi klien 1 November 2026 (NOTE UTAMA butir 20): halaman detail buku
-- perlu menampilkan format, jenis, bahasa, dan ukuran buku — baik untuk buku
-- yang sudah terbit maupun yang segera terbit.
--
-- Keempatnya NULL-able: buku lama (dan buku yang datanya belum lengkap)
-- tetap sah, dan kolom kosong tidak ditampilkan sebagai baris berisi "-".
-- Tipe VARCHAR, bukan ENUM: daftar nilainya belum ditetapkan klien, dan
-- ENUM akan menolak nilai baru yang wajar (mis. "Board book", "Jawa").
--
-- Idempoten seperti 002: `scripts/migrate.mjs` menjalankan SELURUH berkas
-- setiap kali dipanggil, dan MySQL 8 tidak punya `ADD COLUMN IF NOT EXISTS`.

-- ------------------------------------------------------------------
-- Kolom
-- ------------------------------------------------------------------

SET @ada_format = (
  SELECT COUNT(*) FROM information_schema.COLUMNS
  WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'books' AND COLUMN_NAME = 'format_buku'
);
SET @sql = IF(@ada_format = 0,
  'ALTER TABLE books ADD COLUMN format_buku VARCHAR(60) NULL AFTER isbn, ADD COLUMN jenis_buku VARCHAR(60) NULL AFTER format_buku, ADD COLUMN bahasa VARCHAR(60) NULL AFTER jenis_buku, ADD COLUMN ukuran_buku VARCHAR(60) NULL AFTER bahasa',
  'DO 0'
);
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;

-- ------------------------------------------------------------------
-- Constraint
-- ------------------------------------------------------------------

-- Kolom kosong disimpan sebagai NULL, bukan string kosong: halaman detail
-- membedakan "belum diisi" (baris tidak dirender) dari nilai sungguhan.
-- Constraint ini menjaga jalur tulis lain (mis. impor SQL manual) tetap
-- konsisten dengan aturan validator.
SET @ada_cek_teks = (
  SELECT COUNT(*) FROM information_schema.TABLE_CONSTRAINTS
  WHERE CONSTRAINT_SCHEMA = DATABASE() AND TABLE_NAME = 'books'
    AND CONSTRAINT_NAME = 'chk_books_detail_teks'
);
SET @sql = IF(@ada_cek_teks = 0,
  'ALTER TABLE books ADD CONSTRAINT chk_books_detail_teks
     CHECK ((format_buku IS NULL OR TRIM(format_buku) <> '''')
        AND (jenis_buku IS NULL OR TRIM(jenis_buku) <> '''')
        AND (bahasa IS NULL OR TRIM(bahasa) <> '''')
        AND (ukuran_buku IS NULL OR TRIM(ukuran_buku) <> ''''))',
  'DO 0'
);
PREPARE s FROM @sql; EXECUTE s; DEALLOCATE PREPARE s;
