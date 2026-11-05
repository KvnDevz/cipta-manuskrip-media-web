// app/app/(publik)/page.test.tsx
import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import Home from "./page";

describe("beranda", () => {
  const html = renderToStaticMarkup(<Home />);

  it("memakai headline dan pendukung persis dari brief", () => {
    const visibleText = html.replace(/<[^>]*>/g, "");
    expect(visibleText).toContain("Publikasi Semudah Beli Kopi.");
    expect(visibleText).toContain("Layanan penerbitan buku dan publikasi artikel ilmiah.");
  });

  it("tombol mengarah ke dua halaman layanan, bukan katalog", () => {
    expect(html).toContain('href="/publish-buku"');
    expect(html).toContain('href="/publish-jurnal"');
    expect(html).toContain("Publish Buku");
    expect(html).toContain("Publish Jurnal");
  });

  it("hero memakai dua kartu foto + latar orbit, tanpa buku 3D lama", () => {
    expect(html).toContain("hero-photo-layout");
    expect(html).toContain("hero-bg-orbit");
    expect(html).toContain("Beli kopi");
    expect(html).toContain("Publikasi di CMM");
    expect(html).toContain("/hero/kopi-pilih.jpg");
    expect(html).toContain("/hero/cmm-terbit.jpg");
    expect(html).not.toContain("book-scene");
    expect(html).not.toContain("floating-note");
    expect(html).not.toContain("hero-grid");
    expect(html).not.toContain("orbit-outer");
  });

  it("marquee logo placeholder hadir setelah hero, sebelum section layanan", () => {
    expect(html).toContain("logo-marquee-viewport");
    expect(html.indexOf("logo-marquee-viewport")).toBeLessThan(
      html.indexOf('id="pilih-layanan"'),
    );
  });

  it("buku 3D dua lapis hidup DI DALAM hero, dengan 2 slot logo", () => {
    expect(html).toContain("hero-buku");
    expect(html).toContain("buku3d__belakang");
    expect(html).toContain("buku3d__depan");
    expect(html).toContain('data-jumlah-slot="2"');
    expect((html.match(/buku-slot--kosong/g) ?? [])).toHaveLength(2);
    // Buku sebelum marquee, dan keduanya masih di dalam hero.
    expect(html.indexOf("home-hero--foto")).toBeLessThan(html.indexOf("buku3d__depan"));
    expect(html.indexOf("buku3d__depan")).toBeLessThan(html.indexOf("logo-marquee-viewport"));
    expect(html).not.toContain("book-showcase");
    expect(html).not.toContain('aria-labelledby="buku-title"');
  });

  it("Section 2.2 menggantikan pintasan katalog di beranda", () => {
    expect(html).toContain('aria-labelledby="trust-title"');
    expect((html.match(/class="trust-card"/g) ?? [])).toHaveLength(4);
    expect(html).toContain("Mengapa Memilih Penerbit");
    expect(html).not.toContain('class="home-catalog ');
    expect(html).not.toContain('id="katalog-title"');
  });
});
