// app/app/(publik)/page.test.tsx
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import Home from "./page";

describe("beranda", () => {
  const html = renderToStaticMarkup(<Home />);

  it("memakai headline, subheadline, dan kutipan bawah hero sesuai Figma", () => {
    const visibleText = html.replace(/<[^>]*>/g, "");
    expect(visibleText).toContain("Penerbit Cipta Manuskrip Media");
    expect(visibleText).toContain("Layanan penerbitan buku dan publikasi artikel ilmiah.");
    expect(visibleText).toContain("“Di Penerbit CMM, Publikasi Karya Semudah Beli Kopi”");
  });

  it("headline kembali ke markup asli; efek heboh tidak mengubah font", () => {
    expect(html).toContain('class="hero-title mt-7 text-teks"');
    expect(html).not.toContain("hero-title--heboh");

    const css = readFileSync(join(process.cwd(), "app/hero-headline.css"), "utf8");
    expect(css).not.toMatch(/font-(family|size|weight|style)\s*:/);
    expect(css).not.toMatch(/letter-spacing\s*:/);
    expect(css).not.toMatch(/text-transform\s*:/);
  });

  it("CSS membesarkan subheadline dan menu untuk audiens dosen senior", () => {
    const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");
    expect(css).toMatch(/font-size: clamp\(20px, 2\.15vw, 28px\)/);
    expect(css).toContain("font-size: 15.5px;");
    expect(css).not.toMatch(/\.hero-bg-(?:orbit|ring|busur|bintik|glow|karrier|medali)\b/);
    expect(css).not.toContain("hero-orbit-spin");
  });

  it("tombol mengarah ke dua halaman layanan, bukan katalog", () => {
    expect(html).toContain('href="/publish-buku"');
    expect(html).toContain('href="/publish-jurnal"');
    expect(html).toContain("Publish Buku");
    expect(html).toContain("Publish Jurnal");
  });

  it("hero memakai dua alur foto dalam satu panel landscape di section terpisah setelah hero buku", () => {
    expect(html).toContain("home-comparison-section");
    expect(html).toContain("hero-photo-layout");
    expect(html).toContain("hero-comparison");
    expect(html).toContain('aria-label="Perbandingan alur beli kopi dan publikasi di CMM"');
    expect(html).not.toMatch(/hero-bg-(?:orbit|ring|busur|bintik|glow|karrier|medali)/);
    expect(html).toContain("Beli kopi");
    expect(html).toContain("Publikasi di CMM");
    expect(html).toContain("/hero/kopi-pilih.jpg");
    expect(html).toContain("/hero/cmm-terbit.jpg");
    expect(html.indexOf("buku3d__depan")).toBeLessThan(html.indexOf("home-comparison-section"));
    expect(html.indexOf("hero-comparison")).toBeLessThan(html.indexOf("hero-photo-card--kopi"));
    expect(html.indexOf("hero-comparison")).toBeLessThan(html.indexOf("hero-photo-card--cmm"));
    expect(html).not.toContain("book-scene");
    expect(html).not.toContain("floating-note");
    expect(html).not.toContain("hero-grid");
  });

  it("orbit latar dirancang minimalis, tenang, berada di belakang hero-copy, dan mendukung reduced motion", () => {
    expect(html).toContain('class="orbit orbit-outer"');
    expect(html).toContain('class="orbit orbit-middle"');
    expect(html).toContain('class="orbit orbit-inner"');
    expect(html.indexOf("orbit-outer")).toBeLessThan(html.indexOf("hero-copy"));
    expect(html.indexOf("orbit-middle")).toBeLessThan(html.indexOf("hero-copy"));
    expect(html.indexOf("orbit-inner")).toBeLessThan(html.indexOf("hero-copy"));

    const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");
    expect(css).toContain("pointer-events: none");
    expect(css).toContain("cmm-orbit-spin");
    expect(css).toMatch(/@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  });

  it("ikon satelit: berputar DI GARIS orbit dengan arah & titik awal berbeda per cincin", () => {
    expect((html.match(/class="orbit-sat /g) ?? [])).toHaveLength(4);
    for (const rotor of ["luar", "tengah", "inner"]) {
      expect(html).toContain(`orbit-sat-rotor--${rotor}`);
    }
    // Cincin luar memakai DUA foto orang asli berdiskusi buku (satu arah putar),
    // cincin tengah & dalam masing-masing satu ikon.
    expect((html.match(/orbit-sat__gambar/g) ?? []).length).toBe(2);
    expect(html).toContain('src="/aset/orbit-diskusi-buku.png"');
    expect(html).toContain('src="/aset/orbit-diskusi-buku-2.png"');
    expect(html.indexOf("orbit-outer")).toBeLessThan(html.indexOf("orbit-sat"));
    expect(html.indexOf("orbit-sat")).toBeLessThan(html.indexOf("hero-copy"));

    const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");
    // Tiga rotor = tiga ukuran cincin; arah bergantian antar cincin
    // (shorthand animation penuh supaya reverse tidak kalah specificity).
    expect((css.match(/\.home-hero \.orbit-sat-rotor--[a-z-]+ \{/g) ?? []).length).toBe(3);
    expect(css).toMatch(/\.home-hero \.orbit-sat-rotor--luar \{[^}]*width:\s*min\(88vw, 860px\)[^}]*animation:\s*cmm-orbit-spin 90s linear infinite;/);
    expect(css).toMatch(/\.home-hero \.orbit-sat-rotor--tengah \{[^}]*width:\s*min\(70vw, 670px\)[^}]*cmm-orbit-spin 70s linear infinite reverse/);
    expect(css).toMatch(/\.home-hero \.orbit-sat-rotor--inner \{[^}]*width:\s*min\(52vw, 490px\)[^}]*cmm-orbit-spin 60s linear infinite -40s;/);
    // Titik awal putaran tiap cincin berbeda (delay negatif per rotor) dan
    // ikon counter-rotate ikut delay yang sama supaya tetap tegak.
    expect(css).toMatch(/\.home-hero \.orbit-sat-rotor--tengah \{[^}]*reverse -25s/);
    expect(css).toMatch(/rotor--tengah \.orbit-sat__ikon \{ animation: cmm-sat-tegak 70s linear infinite -25s/);
    expect(css).toMatch(/rotor--inner \.orbit-sat__ikon \{ animation: cmm-sat-tegak 60s linear infinite reverse -40s/);
    // Ikon di-counter-rotate supaya tetap tegak saat mengorbit.
    expect(css).toContain("cmm-sat-tegak");
    // Semua posisi TEPAT di garis cincin (radius 50% kotak rotor): tidak ada
    // radius khusus yang membuat ikon keluar dari orbit.
    expect(css).not.toContain("--sat-r");
    expect(css).toMatch(/\.orbit-sat--1 \{ left: 3\.02%; top: 32\.9%/);
    expect(css).toMatch(/\.orbit-sat--3 \{ left: 0%; top: 50%/);
    // Satelit murni hiasan: non-aktif secara pointer dan tersembunyi di layar kecil.
    expect(css).toMatch(/\.home-hero \.orbit-sat-rotor \{[^}]*pointer-events:\s*none/);
    expect(css).toMatch(/@media \(max-width: 899px\) \{\s*\.home-hero \.orbit-sat-rotor \{\s*display:\s*none/);
    // Foto bulatan mengisi penuh lingkaran badge (pembungkus ikon 100% supaya tidak
    // kolaps saat rotor berputar; gambar di-crop penuh ke lingkaran).
    expect(css).toMatch(/\.home-hero \.orbit-sat__ikon \{[^}]*width:\s*100%[^}]*height:\s*100%/);
    expect(css).toMatch(/\.home-hero \.orbit-sat__gambar \{[^}]*border-radius:\s*50%[^}]*object-fit:\s*cover/);
    expect(css).toMatch(/\.orbit-sat--foto \{[^}]*width:\s*54px/);
  });

  it("tidak ada lagi bintang sparkle pada aksen kata Media di headline", () => {
    const css = readFileSync(join(process.cwd(), "app/hero-headline.css"), "utf8");
    expect(css).not.toContain("headline-accent::before");
    expect(css).not.toMatch(/hero-sparkle/);
    // Underline aksen tetap ada.
    expect(css).toContain("headline-accent::after");
  });

  it("marquee logo placeholder hadir setelah hero, sebelum section prinsip", () => {
    expect(html).toContain("logo-marquee-viewport");
    expect(html.indexOf("logo-marquee-viewport")).toBeLessThan(
      html.indexOf('id="prinsip-publikasi"'),
    );
  });

  it("buku 3D dua lapis hidup DI DALAM hero, dengan 2 slot logo", () => {
    expect(html).toContain("hero-buku");
    expect(html).toContain("buku3d__belakang");
    expect(html).toContain("buku3d__depan");
    expect(html).toContain('data-jumlah-slot="2"');
    expect((html.match(/class="buku-slot__gambar"/g) ?? [])).toHaveLength(2);
    expect(html).not.toContain("buku-slot__nama");
    expect(html).not.toContain("buku-slot__titik");
    // Buku sebelum marquee, dan keduanya masih di dalam hero.
    expect(html.indexOf("home-hero--foto")).toBeLessThan(html.indexOf("buku3d__depan"));
    expect(html.indexOf("buku3d__depan")).toBeLessThan(html.indexOf("logo-marquee-viewport"));
    expect(html).not.toContain("book-showcase");
    expect(html).not.toContain('aria-labelledby="buku-title"');
  });

  it("section prinsip publikasi menggantikan Bukan janji besar, sesuai referensi", () => {
    const teks = html.replace(/<[^>]*>/g, "");
    expect(html).toContain('aria-labelledby="prinsip-title"');
    expect(teks).toContain("Empat prinsip, satu tujuan: publikasi lebih mudah.");
    expect(teks).toContain(
      "Di Cipta Manuskrip Media, proses publikasi dibuat lebih praktis sejak langkah pertama.",
    );
    expect((html.match(/class="prinsip-card"/g) ?? [])).toHaveLength(4);
    for (const judul of [
      "Semudah Beli Kopi",
      "Segala Kondisi Naskah, Kami Terima &amp; Proses",
      "Belum Ada Naskah? Bukan Masalah",
      "Fast Track, Tanpa Ribet",
    ]) {
      expect(html).toContain(judul);
    }
    expect(html).toContain("/aset/prinsip-kopi.jpg");
    expect(html).toContain("/aset/prinsip-naskah.jpg");
    expect(html).toContain("/aset/prinsip-ide.jpg");
    expect(html).toContain("/aset/prinsip-fast-track.jpg");
  });

  it("section lama yang diminta hapus tidak lagi tampil di beranda", () => {
    const teks = html.replace(/<[^>]*>/g, "");
    expect(teks).not.toContain("Empat langkah");
    expect(teks).not.toContain("dua jalan berkarya");
    expect(teks).not.toContain("Bukan janji besar");
    expect(teks).not.toContain("Mengapa Memilih Penerbit");
    expect(html).not.toContain("home-flow");
    expect(html).not.toContain("home-ground");
    expect(html).not.toContain("services-section");
    expect(html).not.toContain("trust-pillars");
    expect(html).not.toContain('id="pilih-layanan"');
  });
});
