/**
 * Sumber satu-satunya teks statis situs publik — nav, footer, kontak,
 * paket buku, dan daftar jurnal. Saat UI dirakit ulang di Arena cukup
 * mengimpor dari sini, jadi tidak ada teks yang tersalin dobel atau
 * berbeda antarhalaman.
 *
 * Placeholder dalam kurung siku tetap menandai materi klien yang belum ada.
 * PAKET_BUKU saat ini pengecualian eksperimental: tier dan harga simulasi,
 * dibuat atas izin pemilik proyek dan bukan penawaran resmi. Ganti dengan
 * paket klien yang disetujui sebelum rilis produksi (docs/DESIGN-STACK.md §8).
 *
 * Teks yang dikunci brief (nomor WhatsApp format tampil, 13 fasilitas,
 * kategori jurnal dengan en dash `–`) diperiksa di `site.test.ts`, jadi
 * tidak berubah tanpa sengaja saat UI dirombak.
 */

/**
 * Nav publik. Revisi klien 1 November 2026 (NOTE UTAMA butir 2): tombol
 * "Mulai berkarya" di kanan berubah menjadi "Tentang Kami", sehingga menu
 * tengah cukup berisi Beranda.
 */
export const NAV_UTAMA: ReadonlyArray<{ label: string; href: string }> = [
  { label: "Beranda", href: "/" },
];

/**
 * Menu "Layanan" di header (revisi butir 16): dua layanan utama ditambah
 * dua jalur asistensi penulisan. Tautan asistensi buku sengaja menunjuk
 * jangkar `#asistensi` di `/publish-buku` — bagian itu sudah memuat
 * formulir topik asistensi buku, jadi tidak ada halaman kembar.
 */
export const LAYANAN_NAV: ReadonlyArray<{ label: string; href: string }> = [
  { label: "Publish Buku", href: "/publish-buku" },
  { label: "Publish Jurnal", href: "/publish-jurnal" },
  { label: "Asistensi Penulisan Buku", href: "/publish-buku#asistensi" },
  { label: "Asistensi Penulisan Artikel Jurnal", href: "/publish-jurnal/asistensi" },
];

/**
 * Ilustrasi orang asli untuk seluruh situs (revisi butir 5–12, 15, 21).
 * Berkasnya di `app/public/media/`; nama di sini satu-satunya tempat path
 * itu ditulis, supaya mengganti foto cukup sekali.
 */
export const MEDIA = {
  heroKopi: "/media/hero-kopi.jpg",
  bukuKlik: "/media/buku-klik.jpg",
  asistensiBuku: "/media/asistensi-buku.jpg",
  jurnalHero: "/media/jurnal-hero.jpg",
  asistensiJurnal: "/media/asistensi-jurnal.jpg",
  kirimArtikel: "/media/kirim-artikel.jpg",
  tentangHero: "/media/tentang-hero.jpg",
  videoPoster: "/media/asistensi-jurnal.jpg",
} as const;

/**
 * Tiga langkah "semudah beli kopi" (revisi butir 5). Dua jalur ditampilkan
 * berdampingan: membeli kopi vs menerbitkan karya di CMM.
 */
export const LANGKAH_BANDING: ReadonlyArray<{
  kopi: { judul: string; isi: string; ikon: "pilih" | "bayar" | "nikmati" };
  cmm: { judul: string; isi: string; ikon: "pilih" | "bayar" | "terbit" };
}> = [
  {
    kopi: { judul: "Pilih Kopi", isi: "Tentukan menu yang paling Anda suka.", ikon: "pilih" },
    cmm: { judul: "Pilih Layanan", isi: "Sudah ada naskah atau baru punya ide? Bisa kedua-duanya.", ikon: "pilih" },
  },
  {
    kopi: { judul: "Bayar", isi: "Bayar di kasir, tunai atau nontunai.", ikon: "bayar" },
    cmm: { judul: "Bayar", isi: "Proses pembayaran praktis bersama admin kami.", ikon: "bayar" },
  },
  {
    kopi: { judul: "Nikmati", isi: "Kopi siap menemani hari Anda.", ikon: "nikmati" },
    cmm: { judul: "Terbit", isi: "Karya berhasil dipublikasikan dan didokumentasikan.", ikon: "terbit" },
  },
];

/**
 * Empat alasan memilih penerbit (revisi butir 19). Teksnya persis dari
 * catatan klien — jangan menambah klaim di luar ini.
 */
export const ALASAN_PENERBIT: ReadonlyArray<{ judul: string; isi: string; ikon: "legal" | "isbn" | "naskah" | "distribusi" }> = [
  {
    judul: "Legalitas Resmi",
    isi: "CV Cipta Manuskrip Media telah resmi berbadan hukum dengan kegiatan usaha penerbitan buku dan jurnal ilmiah.",
    ikon: "legal",
  },
  {
    judul: "ISBN Resmi",
    isi: "Setiap buku memiliki nomor ISBN dari Perpustakaan Nasional yang bisa divalidasi di website resmi Perpusnas.",
    ikon: "isbn",
  },
  {
    judul: "Tidak Harus Ada Naskah di Awal",
    isi: "Belum ada naskah buku? Tak masalah. Tim kami siap bantu asistensi penulisan buku kamu. Fiksi ataupun Nonfiksi.",
    ikon: "naskah",
  },
  {
    judul: "Distribusi Beragam",
    isi: "Buku kamu tak hanya dijual secara cetak, tapi bisa disewa secara online juga.",
    ikon: "distribusi",
  },
];

/**
 * Tiga alasan memilih publikasi jurnal (revisi butir 11). Klien meminta
 * urutan "Pertama, Kedua, Ketiga" dipertahankan apa adanya.
 */
export const ALASAN_JURNAL: ReadonlyArray<{ urutan: string; judul: string; isi: string }> = [
  {
    urutan: "Pertama",
    judul: "Bukti korespondensi lengkap",
    isi: "Seluruh percakapan dengan pengelola jurnal didokumentasikan dan diserahkan kepada Anda sebagai bukti proses publikasi.",
  },
  {
    urutan: "Kedua",
    judul: "Belum ada artikel tidak ada masalah",
    isi: "Anda cukup mention topik penelitian. Selanjutnya kami bantu sampai tuntas.",
  },
  {
    urutan: "Ketiga",
    judul: "Prosesnya semudah beli kopi",
    isi: "Pesan, bayar, dan terbit.",
  },
];

/** Footer mengulang kedua layanan; header tidak. */
export const TAUTAN_LAYANAN: ReadonlyArray<{ label: string; href: string }> = [
  { label: "Publish Buku", href: "/publish-buku" },
  { label: "Publish Jurnal", href: "/publish-jurnal" },
];

/**
 * Nomor tampil (bukan nomor wa.me) yang ditetapkan brief §10. Nomor
 * wa.me yang sama ada terpisah di `lib/whatsapp.ts`, dalam bentuk
 * internasional — kalau klien mengganti nomornya, keduanya wajib
 * diganti bersama.
 */
export const KONTAK: { adminBuku: string; adminJurnal: string } = {
  adminBuku: "0896-7189-4900",
  adminJurnal: "0895-6292-03142",
};

/**
 * Tiga tier contoh untuk prototipe visual, tertinggi ke terendah.
 * Nama, harga, dan fasilitas ini dikarang atas persetujuan pemilik proyek
 * (21 Oktober 2026) dan BUKAN penawaran resmi. Ganti setelah klien
 * mengirim paket dan harga final.
 */
export const PAKET_BUKU: ReadonlyArray<{
  nama: string;
  harga: string;
  fasilitas: readonly string[];
}> = [
  {
    nama: "Paket Eksklusif",
    harga: "Rp7.500.000",
    fasilitas: [
      "Penyuntingan naskah",
      "Proofreading akhir",
      "Desain sampul dan tata letak isi",
      "Pendampingan proses ISBN",
      "10 buku cetak",
    ],
  },
  {
    nama: "Paket Profesional",
    harga: "Rp4.500.000",
    fasilitas: [
      "Proofreading akhir",
      "Desain sampul dan tata letak isi",
      "Pendampingan proses ISBN",
      "5 buku cetak",
    ],
  },
  {
    nama: "Paket Dasar",
    harga: "Rp2.500.000",
    fasilitas: [
      "Tata letak isi buku",
      "Desain sampul buku",
      "Pendampingan proses ISBN",
    ],
  },
];

/**
 * 13 fasilitas jurnal persis dari brief §10 — urutan dan ejaannya
 * terkunci oleh tes; halaman jurnal tidak boleh menambah janji lain
 * (statistik, jumlah terbit, dan sebagainya).
 */
export const FASILITAS_JURNAL: readonly string[] = [
  "LOA Cepat",
  "DOI Aktif",
  "Dokumentasi Korespondensi Lengkap",
  "Review Transparan",
  "Jurnal Non-Predator",
  "Revisi Minor–Mayor",
  "Turnitin",
  "Konversi Skripsi/Tesis/Disertasi",
  "Penerjemahan Artikel",
  "Proofreading",
  "Layout",
  "Template Artikel",
  "Garansi Terbit",
];

/** Tepat tiga kategori; en dash pada `SINTA 1–4` persis dari brief. */
export const KATEGORI_JURNAL: readonly string[] = [
  "Jurnal Nasional Terakreditasi SINTA 1–4",
  "Jurnal Internasional Index Copernicus",
  "Jurnal Internasional Scopus dan SCImago",
];

/**
 * Batas preview katalog di `/publish-buku` — kedua preview (published
 * dan upcoming) memakai nilai yang ini, bukan memotong keduanya
 * sendiri.
 */
export const PREVIEW_LIMIT: number = 3;
