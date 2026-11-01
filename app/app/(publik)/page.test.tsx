// app/app/(publik)/page.test.tsx
import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import Home from "./page";

describe("beranda", () => {
  const html = renderToStaticMarkup(<Home />);

  /**
   * Revisi klien 1 November 2026 (NOTE UTAMA butir 1 dan 3) mengubah dua
   * teks ini: headline menjadi "Publikasi Karya Semudah Beli Kopi" **tanpa
   * titik**, dan deskripsi menyebut "artikel jurnal", bukan "artikel
   * ilmiah". Tes mengunci bentuk barunya supaya tidak kembali sendiri.
   */
  it("memakai headline dan pendukung persis dari brief", () => {
    const visibleText = html.replace(/<[^>]*>/g, "");
    expect(visibleText).toContain("Publikasi Karya Semudah Beli Kopi");
    expect(visibleText).not.toContain("Publikasi Karya Semudah Beli Kopi.");
    expect(visibleText).toContain("Layanan jasa penerbitan buku dan publikasi artikel jurnal.");
  });

  it("menampilkan papan analogi beli kopi dan foto orang asli", () => {
    expect(html).toContain("Beli Kopi");
    expect(html).toContain("Pilih Layanan");
    expect(html).toContain("/media/hero-kopi.jpg");
  });

  it("tombol mengarah ke dua halaman layanan, bukan katalog", () => {
    expect(html).toContain('href="/publish-buku"');
    expect(html).toContain('href="/publish-jurnal"');
    expect(html).toContain("Publish Buku");
    expect(html).toContain("Publish Jurnal");
  });
});
