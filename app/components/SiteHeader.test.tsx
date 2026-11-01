// app/components/SiteHeader.test.tsx
import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { SiteHeader } from "./SiteHeader";

describe("SiteHeader", () => {
  const html = renderToStaticMarkup(<SiteHeader />);

  it("menautkan Beranda dan Tentang Kami", () => {
    expect(html).toContain('href="/"');
    expect(html).toContain('href="/tentang-kami"');
  });

  /**
   * Revisi klien 1 November 2026 (NOTE UTAMA butir 2 & 16): menu utama cukup
   * Beranda, tombol kanan menjadi "Tentang Kami", dan tautan layanan tinggal
   * di panel "Layanan". Tes ini memastikan tautan layanan tidak bocor ke
   * menu utama — panelnya sendiri yang memang memuatnya.
   */
  it("menu utama hanya berisi Beranda; tautan layanan tinggal di panel Layanan", () => {
    const menu = html.match(/<div class="nav-links">([\s\S]*?)<div class="nav-layanan"/)?.[1] ?? "";
    expect(menu).toContain('href="/"');
    expect(menu).not.toContain('href="/publish-buku"');
    expect(menu).not.toContain('href="/publish-jurnal"');
    expect(menu).not.toContain('href="/katalog/');
  });

  it("tombol kanan menuju Tentang Kami", () => {
    expect(html).toContain("Tentang Kami");
    expect(html).toMatch(/class="nav-cta" href="\/tentang-kami"|href="\/tentang-kami" class="nav-cta"/);
  });

  it("panel Layanan memuat dua layanan dan dua jalur asistensi", () => {
    const panel = html.match(/<div id="menu-layanan"[\s\S]*?<\/div>\s*<\/div>/)?.[0] ?? "";
    for (const href of ["/publish-buku", "/publish-jurnal", "/publish-buku#asistensi", "/publish-jurnal/asistensi"]) {
      expect(panel).toContain(`href="${href}"`);
    }
    expect(html).toContain('aria-expanded="false"');
  });
});
