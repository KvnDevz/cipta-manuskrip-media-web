import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { LangkahBanding } from "./LangkahBanding";
import { VideoBukti } from "./VideoBukti";
import { LogoIndeks, LambangPerpusnas, KartuIsbn } from "./IndexLogos";
import { LAYANAN_NAV, LANGKAH_BANDING, ALASAN_PENERBIT, ALASAN_JURNAL } from "@/content/site";

/**
 * Tes ringkas untuk komponen yang lahir dari revisi klien 1 November 2026
 * (NOTE UTAMA finalisasi tahap 1). Yang dijaga bukan detail visual, tapi
 * janji yang tidak boleh hilang saat komponen ini disunting lagi:
 * tiga langkah yang berpasangan, video yang tidak tampil rusak, dan label
 * aksesibilitas pada lencana indeksasi.
 */
describe("LangkahBanding", () => {
  const html = renderToStaticMarkup(<LangkahBanding />);

  it("menampilkan tiga langkah untuk kedua jalur", () => {
    for (const langkah of LANGKAH_BANDING) {
      expect(html).toContain(langkah.kopi.judul);
      expect(html).toContain(langkah.cmm.judul);
    }
    expect((html.match(/<li>/g) ?? []).length).toBe(LANGKAH_BANDING.length * 2);
  });

  it("menyebut kedua jalur secara eksplisit", () => {
    expect(html).toContain("BELI KOPI");
    expect(html).toContain("PUBLIKASI DI CMM");
  });
});

describe("VideoBukti", () => {
  const html = renderToStaticMarkup(<VideoBukti />);

  it("menampilkan poster bernarasi selama berkas video belum ada", () => {
    // Berkas `public/media/video-publikasi.mp4` memang belum diserahkan
    // klien; komponen harus jujur menyebutkannya alih-alih memutar kotak
    // hitam.
    expect(html).toContain("Video proses publikasi");
    expect(html).toContain("/media/");
  });
});

describe("lencana indeksasi", () => {
  it("memberi label aksesibel pada setiap tanda", () => {
    for (const jenis of ["sinta", "copernicus", "scopus", "sjr"] as const) {
      const html = renderToStaticMarkup(<LogoIndeks jenis={jenis} />);
      expect(html).toContain(`aria-label="`);
      expect(html).toContain('role="img"');
    }
  });

  it("kartu ISBN tidak memuat nomor terbitan karangan", () => {
    const html = renderToStaticMarkup(<KartuIsbn />);
    expect(html).toContain("ISBN");
    expect(html).not.toMatch(/97[89][\d-]{10,}/);
  });

  it("lambang Perpusnas menyebut nama lembaganya", () => {
    const html = renderToStaticMarkup(<LambangPerpusnas />);
    expect(html).toContain("PERPUSTAKAAN NASIONAL");
    expect(html).toContain("REPUBLIK INDONESIA");
  });
});

describe("isi revisi tahap 1", () => {
  it("menu layanan berisi empat tautan yang semuanya menuju halaman nyata", () => {
    expect(LAYANAN_NAV).toHaveLength(4);
    for (const tautan of LAYANAN_NAV) {
      expect(tautan.href.startsWith("/publish-buku") || tautan.href.startsWith("/publish-jurnal")).toBe(true);
    }
  });

  it("empat alasan penerbit dan tiga alasan jurnal tidak kosong", () => {
    expect(ALASAN_PENERBIT).toHaveLength(4);
    expect(ALASAN_JURNAL).toHaveLength(3);
    expect(ALASAN_PENERBIT.every((a) => a.isi.length > 20)).toBe(true);
    expect(ALASAN_JURNAL.every((a) => a.isi.length > 5)).toBe(true);
  });
});
