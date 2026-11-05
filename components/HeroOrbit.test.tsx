import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renderToStaticMarkup } from "react-dom/server";
import { HeroOrbit } from "./HeroOrbit";

describe("HeroOrbit", () => {
  const html = renderToStaticMarkup(<HeroOrbit />);

  it("murni dekoratif: aria-hidden, tanpa teks yang dibacakan", () => {
    expect(html).toContain('aria-hidden="true"');
    expect(html.replace(/<[^>]*>/g, "").trim()).toBe("");
  });

  it("latarnya ramai: 7 cincin, 4 busur, 6 medali foto, 20 bintik", () => {
    expect((html.match(/class="hero-bg-ring"/g) ?? [])).toHaveLength(7);
    expect((html.match(/class="hero-bg-busur"/g) ?? [])).toHaveLength(4);
    expect((html.match(/class="hero-bg-karrier"/g) ?? [])).toHaveLength(6);
    expect((html.match(/<img/g) ?? [])).toHaveLength(6);
    expect((html.match(/class="hero-bg-bintik"/g) ?? [])).toHaveLength(20);
  });

  it("memakai keenam foto asli, bukan ikon vektor", () => {
    for (const foto of [
      "/hero/kopi-pilih.jpg",
      "/hero/kopi-bayar.jpg",
      "/hero/kopi-nikmati.jpg",
      "/hero/cmm-pilih-layanan.jpg",
      "/hero/cmm-bayar.jpg",
      "/hero/cmm-terbit.jpg",
    ]) expect(html).toContain(foto);
  });

  it("lintasan diberi kecepatan, arah, fase awal, dan geseran berbeda", () => {
    expect(html).toMatch(/--dur:\s*88s/);
    expect(html).toMatch(/--putar:\s*reverse/);
    expect(html).toMatch(/--tunda:\s*-20s/);
    // Sistem orbit kecil benar-benar digeser ke kiri/kanan, bukan menumpuk.
    expect(html).toContain("--geser-x:-24vw");
    expect(html).toContain("--geser-x:24vw");
  });


  it("CSS benar-benar menggeser sistem orbit, bukan menumpuk di tengah", () => {
    const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");
    expect(css).toContain("left: calc(50% + var(--geser-x, 0px));");
    expect(css).toContain("top: calc(50% + var(--geser-y, 0px));");
  });

  it("CSS membesarkan subheadline dan menu untuk audiens dosen senior", () => {
    const css = readFileSync(join(process.cwd(), "app/globals.css"), "utf8");
    expect(css).toMatch(/font-size: clamp\(20px, 2\.15vw, 28px\)/);
    expect(css).toContain("font-size: 15.5px;");
  });

  it("bukan dekorasi vektor lama yang sudah digantikan foto", () => {
    expect(html).not.toContain("orbit-note");
    expect(html).not.toContain("orbit-outer");
    expect(html).not.toContain("book-scene");
  });
});
