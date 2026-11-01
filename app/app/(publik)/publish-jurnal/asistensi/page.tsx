import Link from "next/link";
import { ArrowLeft, ArrowUpRight, FileText, MessageCircle, PenLine } from "lucide-react";
import { KATEGORI_JURNAL, MEDIA } from "@/content/site";
import { FormAsistensi } from "@/components/FormAsistensi";
import { LogoIndeks, type JenisIndeks } from "@/components/IndexLogos";

const INDEKS_KATEGORI: ReadonlyArray<ReadonlyArray<JenisIndeks>> = [
  ["sinta"],
  ["copernicus"],
  ["scopus", "sjr"],
];

/**
 * Topik hanya pernah masuk ke teks WhatsApp; tidak disimpan ke database.
 *
 * Revisi klien 1 November 2026 (NOTE UTAMA butir 12, 13): hero diberi foto
 * dua orang yang sedang membahas artikel, dan daftar "Ruang lingkup jurnal"
 * menampilkan logo indeksasi di tiap barisnya.
 */
export default function Page() {
  return (
    <div className="journal-page journal-flow-page journal-assist-page">
      <section className="journal-flow-hero journal-assist-hero journal-flow-hero-foto">
        <div className="journal-flow-hero-copy">
          <Link className="journal-back-link" href="/publish-jurnal"><ArrowLeft size={15} /> Kembali ke Publish Jurnal</Link>
          <p className="journal-kicker"><span className="journal-kicker-line" /> ASISTENSI PENULISAN</p>
          <h1>Asistensi Penulisan Artikel.</h1>
          <p className="journal-hero-description">Tuliskan topik yang sedang Anda kerjakan, lalu lanjutkan ke admin lewat WhatsApp.</p>
          <div className="journal-flow-meta"><span><PenLine size={16} /> Masukkan topik penelitian</span><span className="meta-divider" /><span><MessageCircle size={16} /> Lanjut lewat WhatsApp</span></div>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element -- foto lokal di public/media */}
        <img className="journal-flow-hero-foto-gambar" src={MEDIA.asistensiJurnal} alt="Dua penulis perempuan berdiskusi tentang artikel ilmiah di depan laptop" />
      </section>

      <section className="journal-assist-workspace">
        <div className="journal-assist-info">
          <div className="journal-assist-label"><FileText size={16} /> KATEGORI JURNAL</div>
          <h2>Ruang lingkup jurnal</h2>
          <p>Tiga kategori jurnal yang tersedia pada layanan ini.</p>
          <ol className="journal-assist-categories">
            {KATEGORI_JURNAL.map((kategori, i) => (
              <li key={kategori}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <strong>{kategori}</strong>
                <span className="journal-assist-indeks">
                  {INDEKS_KATEGORI[i].map((jenis) => <LogoIndeks key={jenis} jenis={jenis} />)}
                </span>
              </li>
            ))}
          </ol>
        </div>
        <div className="journal-assist-form-panel">
          <div className="journal-form-heading"><span className="journal-form-icon"><PenLine size={18} /></span><div><p>LANGKAH TERAKHIR</p><h2>Ceritakan topik Anda.</h2></div></div>
          <p className="journal-form-intro">Isi topik penelitian agar admin dapat menerima konteks asistensi Anda.</p>
          <FormAsistensi jenis="jurnal" />
        </div>
      </section>
      <div className="journal-return-link"><Link href="/publish-jurnal/kirim-artikel">Sudah memiliki artikel? Kirim artikel <ArrowUpRight size={15} /></Link></div>
    </div>
  );
}
