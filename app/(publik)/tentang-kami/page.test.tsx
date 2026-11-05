// app/app/(publik)/tentang-kami/page.test.tsx
import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import Page from "./page";

/**
 * Halaman `/tentang-kami` — brief §10, halaman statis tanpa database.
 *
 * Ini halaman tempat mengarang data perusahaan paling mudah, jadi tesnya
 * justru penjaga jujur: nomor kontak harus persis dari `KONTAK`, keempat
 * area harus ada, dan apa pun yang mirip NIB, NPWP, surel, atau tautan
 * sosial wajib tidak pernah muncul — semuanya menunggu materi klien.
 */
describe("tentang-kami", () => {
  const html = renderToStaticMarkup(<Page />);

  it("menampilkan nomor admin buku dan jurnal persis", () => {
    expect(html).toContain("0896-7189-4900");
    expect(html).toContain("0895-6292-03142");
    expect(html).toContain("Admin Buku");
    expect(html).toContain("Admin Jurnal");
  });

  it("memuat keempat area", () => {
    for (const a of ["Dokumen Resmi", "Kontak", "Media Sosial"]) expect(html).toContain(a);
    // Hero §7.1 tidak lagi memuat pill "Profil sementara", tetapi area
    // profil tetap ada sebagai kicker "01 / PROFIL" dan anchor #profil.
    expect(html).toMatch(/PROFIL/i);
    expect(html).toContain('id="profil"');
  });

  it("tidak mengarang alamat, NIB, NPWP, email, atau tautan sosial", () => {
    expect(html).not.toMatch(/NIB|NPWP/i);
    expect(html).not.toContain("http://instagram");
    expect(html).not.toContain("http://facebook");
    expect(html).not.toContain("@gmail");
  });

  it("§7.1 hero memakai headline, subheadline, dua CTA, dan tiga pill", () => {
    expect(html).toContain("Publikasi Itu Penting. Ribetnya Tidak Perlu.");
    expect(html).toContain("Kami hadir dengan satu keyakinan: publikasi ilmiah seharusnya lebih mudah, cepat, dan tanpa ribet. Kami mendampingi dari tahap ide awal hingga karya siap terbit.");
    expect(html).toContain("Publikasikan Artikel Jurnal");
    expect(html).toContain("Terbitkan Buku");
    expect(html).toContain('href="/publish-jurnal/kirim-artikel"');
    expect(html).toContain('href="/publish-buku"');
    for (const pill of ["Topik", "Pendampingan", "Publikasi"]) expect(html).toContain(pill);
  });

  it("§7.1 banner editorial menggantikan seni CSS abstrak", () => {
    expect(html).toContain("/aset/tentang-kami.jpg");
    expect(html).toContain("about-hero-banner");
    expect(html).not.toContain("about-art-studio");
    expect(html).not.toContain("about-art-connections");
  });
});
