// app/mobile-polish.test.ts
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, it, expect } from "vitest";

/**
 * Poles khusus mobile (blok terakhir `@media (max-width: 700px)` di
 * `app/globals.css`): halaman publik & admin harus nyaman dipakai di HP —
 * target sentuh >= 44px, input 16px (anti auto-zoom iOS), dan anchor tidak
 * tertutup header sticky. Tes ini mengunci aturan-aturan tersebut.
 */
describe("poles mobile (globals.css)", () => {
  const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");
  // Ambil blok media query terakhir untuk max-width:700px (blok poles mobile).
  const blok = (() => {
    const idx = css.indexOf("POLES KHUSUS MOBILE");
    return idx >= 0 ? css.slice(idx) : "";
  })();

  it("ada blok poles mobile di akhir globals.css", () => {
    expect(css).toContain("POLES KHUSUS MOBILE");
    expect(blok.length).toBeGreaterThan(500);
  });

  it("anchor tidak tertutup header sticky (scroll-padding-top)", () => {
    expect(blok).toMatch(/html\s*\{[^}]*scroll-padding-top:\s*\d+px/);
  });

  it("target sentuh utama >= 44px: nav, footer, crumbs, tab katalog, tombol aksi", () => {
    for (const sel of [
      ".nav-links .nav-link",
      ".brand-lockup",
      ".footer-link",
      ".footer-contact a",
      ".katalog-crumbs a",
      ".detail-crumbs a",
      ".katalog-tab",
      ".closing-note > a",
      ".admin-table-action",
    ]) {
      const re = new RegExp(
        sel.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "[^{]*\\{[^}]*min-height:\\s*44px",
      );
      expect(blok).toMatch(re);
    }
    // Tombol lihat kata sandi diperbesar ke 44x44.
    expect(blok).toMatch(/\.admin-password-toggle\s*\{[^}]*width:\s*44px[^}]*height:\s*44px/);
  });

  it("input/textarea/select 16px di layar kecil (anti auto-zoom iOS)", () => {
    expect(blok).toMatch(/input,\s*\n?\s*textarea,\s*\n?\s*select[^{]*\{[^}]*font-size:\s*16px\s*!important/);
    expect(blok).toContain(".admin-control");
  });

  it("teks kecil dinaikkan di mobile: brand small, footer title, kicker", () => {
    expect(blok).toMatch(/\.brand-name small\s*\{[^}]*font-size:\s*7px/);
    expect(blok).toMatch(/\.footer-title\s*\{[^}]*font-size:\s*11px/);
  });

  it("sidebar admin tidak overflow di layar sempit (min-width: 0)", () => {
    expect(blok).toMatch(/\.admin-sidebar\s*\{[^}]*min-width:\s*0/);
  });
});
