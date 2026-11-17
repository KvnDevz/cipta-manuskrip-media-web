import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { TrustPillars } from "./TrustPillars";

describe("TrustPillars (Section 2.2)", () => {
  const html = renderToStaticMarkup(<TrustPillars />);

  it("judul section sesuai brief dan bisa dirujuk pembaca layar", () => {
    expect(html).toContain('aria-labelledby="trust-title"');
    expect(html).toContain('id="trust-title"');
    const teks = html.replace(/<[^>]*>/g, "");
    expect(teks).toContain("Mengapa Memilih CV Cipta Manuskrip Media?");
  });

  it("menampilkan tepat empat kartu pilar", () => {
    expect((html.match(/class="trust-card"/g) ?? [])).toHaveLength(4);
    expect((html.match(/class="trust-nomor"/g) ?? [])).toHaveLength(4);
  });

  it("keempat judul dan deskripsi persis dari brief", () => {
    const teks = html.replace(/<[^>]*>/g, "");
    for (const judul of [
      "Legalitas Resmi",
      "Tim Penerbitan Profesional",
      "Tidak Harus Ada Naskah di Awal",
      "Distribusi Beragam",
    ]) {
      expect(teks).toContain(judul);
    }
    expect(teks).toContain(
      "CV Cipta Manuskrip Media telah resmi berbadan hukum dengan kegiatan usaha penerbitan buku dan jurnal ilmiah.",
    );
    expect(teks).toContain(
      "Didukung oleh tim editor, proofreader, dan desainer tata letak berpengalaman yang memastikan setiap naskah diproses secara profesional sesuai standar penerbitan.",
    );
    expect(teks).toContain(
      "Belum ada naskah buku? Tak masalah. Tim kami siap bantu asistensi penulisan buku kamu. Fiksi ataupun Nonfiksi.",
    );
    expect(teks).toContain(
      "Buku kamu tak hanya dijual secara cetak, tapi bisa disewa secara online juga.",
    );
  });

  it("memakai keempat logo dan ilustrasi visual pilar sesuai Figma", () => {
    expect(html).toContain("/aset/trust-legalitas.png");
    expect(html).toContain("/aset/trust-tim.png");
    expect(html).toContain("/aset/trust-naskah.png");
    expect(html).toContain("/aset/trust-distribusi.png");
    expect(html).toContain("Tim editor, proofreader");
    expect(html).toContain("desainer");
    expect(html).not.toContain("home-catalog");
  });
});
