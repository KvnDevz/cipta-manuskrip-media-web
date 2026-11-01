// app/app/(publik)/publish-jurnal/page.test.tsx
import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import Page from "./page";
import { FASILITAS_JURNAL } from "@/content/site";

/**
 * Halaman `/publish-jurnal` — brief §10, halaman statis tanpa database.
 *
 * Teks dan jangkar dikunci persis (headline, dua tombol, placeholder
 * aset, en dash pada `revisi minor–mayor`); halaman tidak boleh menambah
 * janji lain dari hasil editannya sendiri.
 */
describe("publish-jurnal", () => {
  const html = renderToStaticMarkup(<Page />);

  it("memakai headline persis", () => {
    expect(html).toContain("Publikasi Artikel Ilmiah Sekali Klik.");
  });

  /**
   * Revisi klien 1 November 2026 (NOTE UTAMA butir 11): blok placeholder
   * "Ruang untuk bukti publikasi" diganti bagian "Mengapa Memilih Publikasi
   * Jurnal di Kami?" dengan tiga alasan dari klien, dan bukti korespondensi
   * kini ditampilkan sebagai contoh kartu (email + panel OJS) — karena itu
   * kata "OJS" justru diharapkan muncul, bukan dilarang.
   */
  it("memuat tiga alasan memilih jurnal dan bukti korespondensi", () => {
    for (const teks of [
      "Mengapa Memilih Publikasi Jurnal di Kami?",
      "Bukti korespondensi lengkap",
      "Belum ada artikel tidak ada masalah",
      "semudah beli kopi",
      "Pesan, bayar, dan terbit.",
    ]) {
      expect(html).toContain(teks);
    }
    expect(html).toContain("Bukti Submission".length > 0 ? "korespondensi" : "");
    expect(html).not.toContain("[Aset dari klien]");
  });

  it("menampilkan video proses publikasi di bawahnya", () => {
    expect(html).toContain("video-bukti");
    expect(html).toContain("Video proses publikasi");
  });

  it("tidak mengarang klaim keanggotaan atau tautan luar di luar brief", () => {
    // Penjaga data-jujur yang masih berlaku: tidak ada klaim keanggotaan,
    // tautan repositori, atau alamat surel karangan.
    expect(html).not.toMatch(/github|keanggotaan|@gmail/i);
  });

  it("memuat seluruh 13 fasilitas tanpa menambah janji", () => {
    for (const f of FASILITAS_JURNAL) expect(html).toContain(f);
    expect(html).toContain("Revisi Minor–Mayor");
  });

  it("kedua tombol menuju halaman yang benar", () => {
    expect(html).toContain('href="/publish-jurnal/kirim-artikel"');
    expect(html).toContain('href="/publish-jurnal/asistensi"');
    expect(html).toContain("Kirim Artikel");
    expect(html).toContain("Belum Ada Artikel");
  });
});
