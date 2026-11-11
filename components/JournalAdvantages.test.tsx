import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { JournalAdvantages } from "./JournalAdvantages";

/**
 * Section pengganti “Ruang untuk bukti publikasi” di /publish-jurnal.
 * Isi dan struktur dikunci mengikuti referensi klien.
 */
describe("JournalAdvantages", () => {
  const html = renderToStaticMarkup(<JournalAdvantages />);

  it("memakai kicker dan judul sesuai referensi", () => {
    expect(html).toContain("KEUNGGULAN KAMI");
    expect(html).toContain("Mengapa pilih publikasi jurnal di kami?");
    expect(html).toContain('aria-labelledby="journal-advantages-title"');
  });

  it("memuat tepat tiga kartu keunggulan dengan isi referensi", () => {
    expect((html.match(/journal-advantage-card/g) ?? []).length).toBe(3);
    expect(html).toContain("Bukti korespondensi lengkap");
    expect(html).toContain("Bukti submit, review, revisi, rebuttal letter, hingga terbit. Semua kami siapkan. Tanpa ribet.");
    expect(html).toContain("Belum ada artikel? Tidak masalah.");
    expect(html).toContain("Cukup mention topik penelitian, selanjutnya kami bantu sampai tuntas.");
    expect(html).toContain("Prosesnya semudah beli kopi");
    expect(html).toContain("Pesan, bayar, dan terbit.");
  });

  it("memuat bidang video proses publikasi dengan elemen video asli, poster, dan kontrol", () => {
    expect(html).toContain("VIDEO PROSES PUBLIKASI");
    expect(html).toContain("AUTOPLAY · MUTED");
    expect(html).toContain("<video");
    expect(html).toContain('src="/video/video_bukti_korespondensi.mp4"');
    expect(html).toContain('poster="/aset/jurnal-video-poster.jpg"');
    expect(html.toLowerCase()).toContain("autoplay");
    expect(html.toLowerCase()).toContain("muted");
    expect(html.toLowerCase()).toContain("loop");
    expect(html.toLowerCase()).toContain("playsinline");
    expect(html).toContain('preload="auto"');
    expect(html).toContain('aria-label="Putar video proses publikasi"');
    expect(html).toContain("journal-video-play");
  });

  it("tidak lagi memakai placeholder aset lama", () => {
    expect(html).not.toContain("[Aset dari klien]");
    expect(html).not.toContain("Ruang untuk bukti publikasi");
    expect(html).not.toContain("journal-asset-card");
  });

  it("CSS menjaga tiga kolom, kartu rounded, poster video penuh, dan kontrol interaktif", () => {
    const css = readFileSync(join(process.cwd(), "app/home-sections.css"), "utf8");
    expect(css).toContain(".journal-advantages-grid");
    expect(css).toContain("grid-template-columns: repeat(3, minmax(0, 1fr))");
    expect(css).toContain(".journal-advantage-card");
    expect(css).toContain(".journal-video-poster");
    expect(css).toContain(".journal-video-media");
    expect(css).toContain("object-fit: cover");
    expect(css).toContain(".journal-video.is-playing .journal-video-play");
    expect(css).toContain(".journal-video:hover .journal-video-play");
  });
});
