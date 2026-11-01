import { ArrowLeft, ArrowUpRight, FileUp, Landmark, Network, Orbit } from "lucide-react";
import Link from "next/link";
import { KATEGORI_JURNAL, MEDIA } from "@/content/site";
import { LogoIndeks, type JenisIndeks } from "@/components/IndexLogos";
import { buildJournalSubmitUrl } from "@/lib/whatsapp";

const IKON_KATEGORI = [Landmark, Orbit, Network] as const;

/**
 * Penanda indeksasi per kategori. Satu kategori bisa punya lebih dari satu
 * tanda (Scopus dan SJR adalah satu ekosistem yang sama).
 */
const INDEKS_KATEGORI: ReadonlyArray<ReadonlyArray<JenisIndeks>> = [
  ["sinta"],
  ["copernicus"],
  ["scopus", "sjr"],
];

/**
 * Naskah dikirim langsung melalui WhatsApp; tidak diunggah ke server.
 *
 * Revisi klien 1 November 2026 (NOTE UTAMA butir 14, 15): hero diberi foto
 * orang di sisi kanan, dan setiap kartu kategori menampilkan logo indeksasi
 * yang relevan.
 */
export default function Page() {
  return (
    <div className="journal-page journal-flow-page">
      <section className="journal-flow-hero journal-flow-hero-foto">
        <div className="journal-flow-hero-copy">
          <Link className="journal-back-link" href="/publish-jurnal"><ArrowLeft size={15} /> Kembali ke Publish Jurnal</Link>
          <p className="journal-kicker"><span className="journal-kicker-line" /> KIRIM ARTIKEL</p>
          <h1>Kirim Artikel Jurnal Anda.</h1>
          <p className="journal-hero-description">Pilih kategori jurnal tujuan, lalu kirimkan naskah Anda langsung ke admin lewat WhatsApp.</p>
          <div className="journal-flow-meta"><span><FileUp size={16} /> Naskah dikirim lewat WhatsApp</span><span className="meta-divider" /><span>3 kategori jurnal</span></div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element -- foto lokal di public/media */}
        <img className="journal-flow-hero-foto-gambar" src={MEDIA.kirimArtikel} alt="Penulis memeriksa naskah artikelnya di ponsel sebelum dikirim ke admin jurnal" />
      </section>

      <section className="journal-category-section">
        <div className="journal-section-heading">
          <div><p className="journal-section-kicker">PILIH TUJUAN</p><h2>Kategori jurnal</h2></div>
          <p>Pilih kategori yang sesuai dengan tujuan publikasi Anda.</p>
        </div>
        <ol className="journal-category-grid">
          {KATEGORI_JURNAL.map((kategori, i) => {
            const IkonKategori = IKON_KATEGORI[i];
            return (
              <li key={kategori} className={`journal-category-card journal-category-${i + 1}`}>
                <div className="category-art" aria-hidden="true">
                  {i === 0 ? (
                    <svg viewBox="0 0 120 96" className="category-art-svg"><path d="M24 20h53l17 14v48H24z" /><path d="M77 20v15h17M35 48h47M35 59h47M35 70h29" /><path d="M18 27v54h72" /></svg>
                  ) : i === 1 ? (
                    <svg viewBox="0 0 120 96" className="category-art-svg"><ellipse cx="60" cy="48" rx="45" ry="18" /><ellipse cx="60" cy="48" rx="45" ry="18" transform="rotate(58 60 48)" /><ellipse cx="60" cy="48" rx="45" ry="18" transform="rotate(-58 60 48)" /><circle cx="60" cy="48" r="5" className="art-core" /><circle cx="98" cy="48" r="3" className="art-node" /></svg>
                  ) : (
                    <svg viewBox="0 0 120 96" className="category-art-svg"><path d="m26 25 31 23 34-20M26 25l8 47 23-24 26 34 8-54M34 72l49 10" /><circle cx="26" cy="25" r="5" className="art-node" /><circle cx="57" cy="48" r="5" className="art-core" /><circle cx="91" cy="28" r="5" className="art-node" /><circle cx="34" cy="72" r="5" className="art-node" /><circle cx="83" cy="82" r="5" className="art-node" /></svg>
                  )}
                </div>
                <div className="category-card-top"><span>0{i + 1} <i>/ 03</i></span><span className="category-card-icon"><IkonKategori size={18} strokeWidth={1.7} /></span></div>
                <h2>{kategori}</h2>
                <div className="category-indeks">
                  {INDEKS_KATEGORI[i].map((jenis) => <LogoIndeks key={jenis} jenis={jenis} />)}
                </div>
                <div className="category-card-bottom"><span>PILIHAN KATEGORI</span><span className="category-arrow">↗</span></div>
                <a href={buildJournalSubmitUrl()} target="_blank" rel="noopener noreferrer" className="journal-category-cta">
                  Kirim naskah via WhatsApp <ArrowUpRight size={16} />
                </a>
              </li>
            );
          })}
        </ol>
        <p className="journal-privacy-note"><span aria-hidden="true">i</span> Naskah dikirim langsung melalui WhatsApp, bukan diunggah ke situs.</p>
      </section>
    </div>
  );
}
