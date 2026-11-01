# Revisi tahap 1 — catatan klien "NOTE UTAMA_finalisasi web tahap 1.pdf"

Dokumen ini memetakan **21 butir catatan klien** (PDF 11 halaman, 1 November
2026) ke pekerjaan di repo. PDF-nya sendiri tidak disimpan di sini: `.gitignore`
root mengabaikan `*.pdf`, dan berkas itu memuat tangkapan layar internal klien.

Legenda: **Selesai** = sudah ada di `code`, **Sebagian** = dikerjakan dengan
batasan tertentu (alasannya ditulis), **Menunggu aset** = butuh berkas dari klien.

| # | Permintaan klien | Status | Di mana |
|---|---|---|---|
| 1 | Headline jadi "Publikasi Karya Semudah Beli Kopi" tanpa titik | Selesai | `app/(publik)/page.tsx`, dikunci `page.test.tsx` |
| 2 | Tombol "Mulai berkarya" → "Tentang Kami"; Beranda sendirian di tengah | Selesai | `components/SiteHeader.tsx` |
| 3 | Deskripsi → "Layanan jasa penerbitan buku dan publikasi artikel jurnal" | Selesai | `app/(publik)/page.tsx` |
| 4 | Font headline & subheadline diperbesar (acuan bukuloka) | Selesai | blok "Penyesuaian ukuran display" di `app/globals.css` |
| 5 | Ilustrasi analogi "beli kopi vs publikasi di CMM" | Selesai | `components/LangkahBanding.tsx` |
| 6 | Hero diberi ilustrasi orang asli di kedai kopi | Selesai | `public/media/hero-kopi.jpg` |
| 7 | Ilustrasi buku CSS di hero diganti | Selesai | hero lama (`book-scene`) dihapus dari beranda |
| 8 | "Terbit Buku Sekali Klik" diberi foto cowok; layar HP & logo jangan simple | Selesai | `publish-buku/page.tsx` + `IndexLogos.tsx` (kartu Perpusnas & ISBN) |
| 9 | Bagian asistensi buku diberi ilustrasi | Selesai | `public/media/asistensi-buku.jpg` |
| 10 | Hero jurnal didesain ulang, bukti OJS/korespondensi harus masuk | Selesai | `publish-jurnal/page.tsx` (`bukti-kartu-email`, `bukti-kartu-ojs`) |
| 11 | Section jadi "Mengapa Memilih Publikasi Jurnal di Kami?" + video autoplay | Sebagian | `ALASAN_JURNAL` + `components/VideoBukti.tsx` — **video belum ada** |
| 12 | Hero asistensi jurnal diberi ilustrasi orang | Selesai | `public/media/asistensi-jurnal.jpg` |
| 13 | "Ruang lingkup jurnal" dipercantik | Selesai | logo SINTA/Copernicus/Scopus/SJR per baris |
| 14 | Kartu kategori jurnal dipercantik (logo indeksasi) | Selesai | `kirim-artikel/page.tsx` |
| 15 | Hero "Kirim Artikel" diberi foto orang | Selesai | `public/media/kirim-artikel.jpg` |
| 16 | Menu Layanan: + Asistensi penulisan buku & artikel jurnal | Selesai | `LAYANAN_NAV`, `components/LayananMenu.tsx` |
| 17 | Hapus teks "Katalog buku menjadi rujukan data terbit…" | Tidak ditemukan | teks itu tidak ada di repo ini (kemungkinan hanya di versi deploy) |
| 18 | Kartu "Paket Terbit Buku" | Sebagian | tidak ada instruksi tertulis di PDF; desain lama dipertahankan |
| 19 | Section jadi "Mengapa Memilih Penerbit Cipta Manuskrip Media?" + logo | Selesai | `ALASAN_PENERBIT`, section `.alasan-penerbit` |
| 20 | Kolom format/jenis/bahasa/ukuran buku + cap "SEGERA TERBIT" besar | Selesai | `db/migrations/003_detail_buku.sql`, `BookDetail.tsx` |
| 21 | Hero Tentang Kami → "Publikasi Itu Penting. Ribetnya Tidak Perlu." | Selesai | `public/media/tentang-hero.jpg` + alur Topik → Pendampingan → Publikasi |

## Yang perlu diputuskan / dikirim klien

1. **Video publikasi** (butir 11). Taruh berkasnya di
   `app/public/media/video-publikasi.mp4`. `VideoBukti` memeriksa keberadaan
   berkas itu saat render: begitu ada, videonya langsung diputar otomatis
   (tanpa suara, berulang) dengan poster `asistensi-jurnal.jpg`. Selama belum
   ada, yang tampil poster bernarasi + label "menyusul" — bukan pemutar rusak.
2. **Logo indeksasi resmi.** SINTA, Index Copernicus, Scopus, dan SJR sekarang
   digambar sebagai penanda SVG/teks di `components/IndexLogos.tsx` (tidak ada
   aset pihak ketiga yang masuk repo, tidak ada permintaan ke server luar).
   Kalau klien mengirim berkas logo resmi, ganti komponen itu — markup
   pemakaiannya tidak perlu berubah.
3. **Butir 17 & 18.** Butir 17 menunjuk teks yang tidak ada di branch ini,
   dan butir 18 tidak memuat instruksi tertulis. Keduanya menunggu konfirmasi
   sebelum diubah.
4. **Harga paket** masih simulasi (lihat komentar `PAKET_BUKU` di
   `app/content/site.ts`) dan halaman paket masih mencetak keterangan itu.

## Catatan teknis

- Kolom baru `format_buku`, `jenis_buku`, `bahasa`, `ukuran_buku` (migration
  003) semuanya `NULL`-able. Buku lama tetap sah, dan halaman detail hanya
  merender baris yang terisi — tidak ada deretan "-" tanpa arti.
- Migration wajib idempoten; 003 mengikuti pola `information_schema` +
  `PREPARE` dari 002 karena MySQL 8 tidak punya `ADD COLUMN IF NOT EXISTS`.
- Foto di `app/public/media/` dibuat khusus untuk prototipe ini (orang dan
  situasi sintetis), sehingga tidak ada masalah lisensi stock photo. Ganti
  dengan foto asli tim/brand klien bila sudah tersedia — path-nya terpusat di
  `MEDIA` (`app/content/site.ts`).
