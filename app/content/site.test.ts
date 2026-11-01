// app/content/site.test.ts
import { describe, it, expect } from "vitest";
import {
  NAV_UTAMA, LAYANAN_NAV, TAUTAN_LAYANAN, KONTAK, PAKET_BUKU,
  FASILITAS_JURNAL, KATEGORI_JURNAL, PREVIEW_LIMIT,
  ALASAN_PENERBIT, ALASAN_JURNAL,
} from "./site";

describe("content/site", () => {
  /**
   * Revisi klien 1 November 2026 (NOTE UTAMA butir 2): "Tentang Kami"
   * pindah dari menu tengah ke tombol kanan, jadi menu tengah hanya berisi
   * Beranda. Menu layanan ada di daftar terpisah supaya tes ini tetap bisa
   * membuktikan tidak ada tautan layanan yang menyelinap ke menu utama.
   */
  it("menu utama hanya memuat Beranda", () => {
    expect(NAV_UTAMA).toEqual([{ label: "Beranda", href: "/" }]);
  });

  it("menu layanan memuat dua layanan dan dua jalur asistensi", () => {
    expect(LAYANAN_NAV).toEqual([
      { label: "Publish Buku", href: "/publish-buku" },
      { label: "Publish Jurnal", href: "/publish-jurnal" },
      { label: "Asistensi Penulisan Buku", href: "/publish-buku#asistensi" },
      { label: "Asistensi Penulisan Artikel Jurnal", href: "/publish-jurnal/asistensi" },
    ]);
  });

  it("empat alasan memilih penerbit persis dari catatan klien", () => {
    expect(ALASAN_PENERBIT.map((a) => a.judul)).toEqual([
      "Legalitas Resmi",
      "ISBN Resmi",
      "Tidak Harus Ada Naskah di Awal",
      "Distribusi Beragam",
    ]);
  });

  it("tiga alasan memilih jurnal berurutan Pertama–Ketiga", () => {
    expect(ALASAN_JURNAL.map((a) => a.urutan)).toEqual(["Pertama", "Kedua", "Ketiga"]);
  });

  it("footer mengulang tautan dua layanan", () => {
    expect(TAUTAN_LAYANAN.map((t) => t.href)).toEqual([
      "/publish-buku",
      "/publish-jurnal",
    ]);
  });

  it("nomor kontak memakai format tampil yang ditetapkan brief", () => {
    expect(KONTAK.adminBuku).toBe("0896-7189-4900");
    expect(KONTAK.adminJurnal).toBe("0895-6292-03142");
  });

  it("tiga tier contoh berurutan dari harga tertinggi ke terendah dan berbeda fasilitasnya", () => {
    expect(PAKET_BUKU).toHaveLength(3);
    expect(PAKET_BUKU.map((paket) => paket.nama)).toEqual([
      "Paket Eksklusif",
      "Paket Profesional",
      "Paket Dasar",
    ]);
    const harga = PAKET_BUKU.map((paket) => Number(paket.harga.replace(/[^0-9]/g, "")));
    expect(harga[0]).toBeGreaterThan(harga[1]);
    expect(harga[1]).toBeGreaterThan(harga[2]);
    expect(new Set(PAKET_BUKU.map((paket) => paket.fasilitas.join("|"))).size).toBe(3);
    expect(PAKET_BUKU.every((paket) => paket.fasilitas.length > 0)).toBe(true);
  });

  it("daftar fasilitas jurnal 13 item persis seperti brief", () => {
    expect(FASILITAS_JURNAL).toEqual([
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
    ]);
  });

  it("tepat tiga kategori jurnal dengan en dash pada SINTA", () => {
    expect(KATEGORI_JURNAL).toEqual([
      "Jurnal Nasional Terakreditasi SINTA 1–4",
      "Jurnal Internasional Index Copernicus",
      "Jurnal Internasional Scopus dan SCImago",
    ]);
  });

  it("batas preview kecil, tetap, dan dipakai kedua preview", () => {
    expect(PREVIEW_LIMIT).toBe(3);
  });
});
