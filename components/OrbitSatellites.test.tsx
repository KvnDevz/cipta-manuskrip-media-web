import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { OrbitSatellites } from "./OrbitSatellites";

describe("OrbitSatellites", () => {
  const html = renderToStaticMarkup(<OrbitSatellites />);

  it("merender 4 bulatan: 2 foto di cincin luar, 1 ikon buku di tengah, 1 ikon naskah di dalam", () => {
    expect((html.match(/class="orbit-sat /g) ?? [])).toHaveLength(4);
    // Rotor dan svg lucide sama-sama tersembunyi dari pembaca layar.
    expect((html.match(/aria-hidden="true"/g) ?? []).length).toBeGreaterThanOrEqual(3);
    // Dua foto orang asli + dua ikon lucide.
    expect((html.match(/<img /g) ?? [])).toHaveLength(2);
    expect((html.match(/<svg/g) ?? [])).toHaveLength(2);
  });

  it("cincin luar memakai dua foto diskusi buku, sisanya ikon buku & naskah", () => {
    expect(html).toContain('src="/aset/orbit-diskusi-buku.png"');
    expect(html).toContain('src="/aset/orbit-diskusi-buku-2.jpg"');
    expect((html.match(/orbit-sat__gambar/g) ?? [])).toHaveLength(2);
    expect((html.match(/orbit-sat--foto/g) ?? [])).toHaveLength(2);
    expect(html).toContain("lucide-book-open");
    expect(html).toContain("lucide-feather");
    expect(html).not.toContain("lucide-users");
  });

  it("dua foto di rotor luar (satu arah putar), satu bulatan di rotor tengah & dalam", () => {
    expect(html).toContain('class="orbit-sat-rotor orbit-sat-rotor--luar"');
    expect(html).toContain('class="orbit-sat-rotor orbit-sat-rotor--tengah"');
    expect(html).toContain('class="orbit-sat-rotor orbit-sat-rotor--inner"');
    for (const i of [1, 2, 3, 4]) {
      expect(html).toContain(`orbit-sat--${i}`);
    }
    // Tiap rotor berisi jumlah bulatan yang benar.
    const potong = (dari: string, sampai: string) =>
      html.slice(html.indexOf(dari), html.indexOf(sampai));
    expect((potong('orbit-sat-rotor--luar"', 'orbit-sat-rotor--tengah"').match(/class="orbit-sat /g) ?? [])).toHaveLength(2);
    expect((potong('orbit-sat-rotor--tengah"', 'orbit-sat-rotor--inner"').match(/class="orbit-sat /g) ?? [])).toHaveLength(1);
    expect((html.slice(html.indexOf('orbit-sat-rotor--inner"')).match(/class="orbit-sat /g) ?? [])).toHaveLength(1);
    // Isi bulatan dibungkus span counter-rotate supaya tetap tegak saat mengorbit.
    expect((html.match(/orbit-sat__ikon/g) ?? [])).toHaveLength(4);
  });
});
