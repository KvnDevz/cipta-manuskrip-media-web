import { ArrowDown, ArrowUpRight, BadgeCheck, BookOpen, Building2, Feather, PenLine, ScanBarcode, ShoppingBag, Sparkles, Users } from "lucide-react";
import { listBooks } from "@/lib/books/repository";
import { catalogueKind } from "@/lib/books/status";
import { CataloguePreview } from "@/components/CataloguePreview";
import { FormAsistensi } from "@/components/FormAsistensi";
import { PackagePicker } from "@/components/PackagePicker";
import { PackageSelectionStatus } from "@/components/PackageSelectionStatus";
import { KartuIsbn, LambangPerpusnas } from "@/components/IndexLogos";
import { ALASAN_PENERBIT, MEDIA, PAKET_BUKU, PREVIEW_LIMIT } from "@/content/site";

// Wajib: halaman membaca database. Tanpa ini Next.js membekukan hasil query
// saat build dan previewnya tidak melihat buku yang baru ditambahkan admin —
// kelas bug yang sama dengan katalog.
export const dynamic = "force-dynamic";

const IKON_ALASAN = {
  legal: Building2,
  isbn: ScanBarcode,
  naskah: Users,
  distribusi: ShoppingBag,
} as const;

/**
 * Halaman layanan publish buku. Data dan aturan bisnis tetap bersumber dari
 * content/site.ts dan komponen yang sudah ada; perubahan di file ini khusus UI.
 * Layout publik memiliki satu-satunya <main>, jadi pembungkusnya <div>.
 *
 * Revisi klien 1 November 2026 (NOTE UTAMA butir 8, 9, 18, 19):
 * - hero memakai foto orang asli dengan kartu Perpusnas dan ISBN;
 * - bagian asistensi diberi ilustrasi dua orang membahas naskah;
 * - kartu paket dipertegas hierarkinya;
 * - bagian "Sebagian buku kami" didahului blok "Mengapa Memilih Penerbit
 *   Cipta Manuskrip Media?" berisi empat alasan dari klien.
 */
export default async function Page() {
  const sudahTerbit = catalogueKind("telah-terbit");
  const segeraTerbit = catalogueKind("segera-terbit");

  let hasil: Awaited<ReturnType<typeof duaPreview>> | null;
  try {
    hasil = sudahTerbit === null || segeraTerbit === null ? null : await duaPreview();
  } catch {
    hasil = null;
  }

  return (
    <div className="publish-page">
      <section className="publish-hero publish-hero-foto">
        <div aria-hidden="true" className="publish-orb publish-orb-one" />
        <div aria-hidden="true" className="publish-orb publish-orb-two" />
        <div className="publish-hero-content">
          <p className="publish-eyebrow"><BookOpen size={14} /> PENERBITAN BUKU</p>
          <h1>Terbit Buku Sekali Klik.</h1>
          <p className="publish-lede">Layanan penerbitan buku dan pendampingan penulisan untuk membantu naskah Anda melangkah menuju publikasi.</p>
          <div className="publish-hero-actions">
            <a href="#paket" className="publish-button publish-button-primary">Kirim Naskah <ArrowUpRight size={16} /></a>
            <a href="#asistensi" className="publish-button publish-button-secondary">Asistensi Penulisan <ArrowUpRight size={16} /></a>
          </div>
          <a href="#paket" className="publish-scroll"><span>Lihat pilihan paket</span><ArrowDown size={14} /></a>
        </div>

        <figure className="publish-hero-figure">
          {/* eslint-disable-next-line @next/next/no-img-element -- foto lokal di public/media */}
          <img src={MEDIA.bukuKlik} alt="Penulis muda menunjukkan layar ponselnya yang menampilkan tanda buku berhasil terbit" />
          <span className="foto-chip-terbit" aria-hidden="true">
            <span className="foto-chip-ikon"><BadgeCheck size={18} strokeWidth={2.2} /></span>
            <span><strong>PUBLISHED</strong><small>Naskah terbit</small></span>
          </span>
          <LambangPerpusnas className="foto-lambang-perpusnas" />
          <KartuIsbn className="foto-kartu-isbn" />
          <figcaption>Naskah, ISBN, dan pendampingan — satu alur yang sama.</figcaption>
        </figure>
      </section>

      <PackagePicker tiers={PAKET_BUKU} />

      <section id="asistensi" className="assist-section assist-section-foto scroll-mt-24">
        <div className="assist-visual">
          <div className="assist-foto-bingkai">
            {/* eslint-disable-next-line @next/next/no-img-element -- foto lokal di public/media */}
            <img src={MEDIA.asistensiBuku} alt="Dua orang mendiskusikan naskah buku yang penuh catatan di atas meja kerja" />
            <span className="assist-foto-chip assist-foto-chip-topik">
              <span className="assist-foto-chip-ikon"><PenLine size={14} /></span>
              <span><small>TOPIK ASISTENSI BUKU</small><strong>Tuliskan topik atau gagasan buku Anda</strong></span>
            </span>
            <span className="assist-foto-chip assist-foto-chip-lanjut"><Sparkles size={13} /> Lanjut ke WhatsApp</span>
          </div>
        </div>

        <div className="assist-copy">
          <p className="publish-section-kicker">PENDAMPINGAN NASKAH</p>
          <h2>Setiap ide layak mendapat ruang untuk tumbuh.</h2>
          <p>Pendampingan penulisan untuk artikel dan naskah buku. Hubungi admin untuk menanyakan ruang lingkup dan jadwalnya.</p>
          <div className="assist-note"><PenLine size={17} /><span>Mulai dengan menceritakan topik atau gagasan buku Anda.</span></div>
          <div className="assist-form-card"><PackageSelectionStatus /><FormAsistensi jenis="buku" /></div>
        </div>
      </section>

      <section className="alasan-penerbit" aria-labelledby="alasan-penerbit-judul">
        <div className="alasan-kepala">
          <div>
            <p className="publish-section-kicker">ALASAN MEMILIH KAMI</p>
            <h2 id="alasan-penerbit-judul">Mengapa Memilih Penerbit Cipta Manuskrip Media?</h2>
          </div>
          <p>Empat hal yang membuat naskah Anda aman, tercatat, dan tetap sampai ke pembaca.</p>
        </div>

        <div className="alasan-grid">
          {ALASAN_PENERBIT.map((alasan, i) => {
            const Ikon = IKON_ALASAN[alasan.ikon];
            return (
              <article key={alasan.judul} className="alasan-kartu">
                <div className="alasan-kartu-atas">
                  <span className="alasan-nomor">{String(i + 1).padStart(2, "0")}</span>
                  <span className="alasan-ikon"><Ikon size={19} strokeWidth={1.7} /></span>
                </div>
                <h3>{alasan.judul}</h3>
                <p>{alasan.isi}</p>
              </article>
            );
          })}
        </div>

        <div className="alasan-logo">
          <span className="alasan-logo-label">Legalitas dan distribusi</span>
          <div className="alasan-logo-deret">
            <LambangPerpusnas />
            <KartuIsbn />
            <span className="alasan-lencana"><Building2 size={15} /> CV berbadan hukum</span>
            <span className="alasan-lencana"><Feather size={15} /> Cetak &amp; sewa online</span>
          </div>
        </div>
      </section>

      <section className="book-preview-section">
        {sudahTerbit === null || hasil === null ? (
          <p data-testid="db-error" className="text-red-700">Preview katalog sedang tidak dapat dimuat. Silakan coba beberapa saat lagi.</p>
        ) : (
          <>
            <div data-testid="preview-telah-terbit">
              <CataloguePreview heading={sudahTerbit.heading} emptyMessage={sudahTerbit.emptyMessage} items={hasil.terbit.items} lihatSemuaHref="/katalog/telah-terbit" />
            </div>
            {segeraTerbit === null ? null : (
              <div data-testid="preview-segera-terbit">
                <CataloguePreview heading={segeraTerbit.heading} emptyMessage={segeraTerbit.emptyMessage} items={hasil.segera.items} lihatSemuaHref="/katalog/segera-terbit" />
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}

async function duaPreview() {
  const sudah = await listBooks({ status: "published", page: 1, pageSize: PREVIEW_LIMIT });
  const akan = await listBooks({ status: "upcoming", page: 1, pageSize: PREVIEW_LIMIT });
  return { terbit: sudah, segera: akan };
}
