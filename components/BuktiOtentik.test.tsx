import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { MockupGmail, MockupTimelineSinta, MockupOjs } from "./BuktiOtentik";

/**
 * Mockup bukti otentik hero `/publish-jurnal` (brief §3.2).
 *
 * Dua hal dijaga: teks persis sesuai arahan klien, dan kejujuran bahwa ini
 * mockup ilustrasi (bukan dokumen/tanggal korespondensi karangan).
 */
describe("BuktiOtentik", () => {
  it("Gmail: subjek korespondensi persis", () => {
    const html = renderToStaticMarkup(<MockupGmail />);
    expect(html).toContain("Your submission has been reviewed and we encourage you to submit revisions...");
    expect(html).toContain("Inbox");
    expect(html).toContain("mockup");
  });

  it("Timeline SINTA 2: lima tahap berurutan tanpa tanggal karangan", () => {
    const html = renderToStaticMarkup(<MockupTimelineSinta />);
    expect(html).toContain("Timeline Publikasi SINTA 2");
    for (const tahap of [
      "Pengiriman artikel",
      "Komentar editorial",
      "Review 1–4",
      "Submit revisi",
      "Accepted &amp; copyediting",
    ]) {
      expect(html).toContain(tahap);
    }
    expect(html).toContain("tanggal menyusul");
    expect(html).toContain("bukan data riwayat");
    // Cek TEKS tampil saja: atribut SVG memuat "2000" (xmlns), jadi tag dibuang.
    expect(html.replace(/<[^>]*>/g, "")).not.toMatch(/\b20\d\d\b/);
  });

  it("OJS: dialog notifikasi, accepted, dan workflow round 1", () => {
    const html = renderToStaticMarkup(<MockupOjs />);
    expect(html).toContain("Notifications");
    expect(html).toContain("Your submission has been sent for another round of review");
    expect(html).toContain("Submission accepted");
    expect(html).toContain("Workflow / Round 1");
    expect(html).toContain("Mockup antarmuka OJS");
  });
});
