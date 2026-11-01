import Link from "next/link";
import { ArrowDown, ArrowUpRight, BadgeCheck, Eye, Fingerprint, GraduationCap, Languages, Layers3, LayoutTemplate, Link2, Mail, MessageSquareText, MessagesSquare, PanelsTopLeft, Paperclip, PenLine, ScanSearch, ShieldCheck, Timer } from "lucide-react";
import { ALASAN_JURNAL, FASILITAS_JURNAL, MEDIA } from "@/content/site";
import { VideoBukti } from "@/components/VideoBukti";

const IKON_FASILITAS = [
  Timer,
  Link2,
  MessagesSquare,
  Eye,
  ShieldCheck,
  PenLine,
  Fingerprint,
  GraduationCap,
  Languages,
  ScanSearch,
  PanelsTopLeft,
  LayoutTemplate,
  BadgeCheck,
] as const;

const TAHAP_KORESPONDENSI: ReadonlyArray<{ tahap: string; tanggal: string; status: "selesai" | "jalan" }> = [
  { tahap: "Pengiriman artikel", tanggal: "12 Mei 2026", status: "selesai" },
  { tahap: "Reviewer 1 — komentar", tanggal: "8 September 2026", status: "selesai" },
  { tahap: "Revisi penulis", tanggal: "25 September 2026", status: "selesai" },
  { tahap: "Keputusan editor", tanggal: "30 September 2026", status: "jalan" },
];

/**
 * Halaman layanan jurnal.
 *
 * Revisi klien 1 November 2026 (NOTE UTAMA butir 10–13):
 * - hero memakai foto orang asli di sisi kanan dengan kartu bukti
 *   korespondensi (email + panel OJS) melayang di atas latar gelap;
 * - bagian "Ruang untuk bukti publikasi" diganti "Mengapa Memilih
 *   Publikasi Jurnal di Kami?" berisi tiga alasan dari klien;
 * - di bawahnya video proses publikasi yang diputar otomatis.
 *
 * Fasilitas tetap 13 butir dari brief dan tidak ditambah.
 */
export default function Page() {
  return (
    <div className="journal-page journal-overview">
      <section className="journal-hero journal-hero-foto">
        <div className="journal-hero-copy">
          <p className="journal-kicker"><span className="journal-kicker-line" /> LAYANAN PUBLIKASI JURNAL</p>
          <h1>Publikasi Artikel Ilmiah Sekali Klik.</h1>
          <p className="journal-hero-description">Jelajahi fasilitas publikasi, dokumentasi, dan pilihan layanan artikel ilmiah.</p>
          <div className="journal-hero-actions">
            <Link href="/publish-jurnal/kirim-artikel" className="journal-button journal-button-bright">Kirim Artikel <ArrowUpRight size={17} /></Link>
            <Link href="/publish-jurnal/asistensi" className="journal-button journal-button-outline">Belum Ada Artikel <ArrowUpRight size={17} /></Link>
          </div>
          <a className="journal-scroll" href="#fasilitas">Lihat fasilitas <ArrowDown size={14} /></a>
        </div>

        <div className="journal-hero-visual">
          {/* eslint-disable-next-line @next/next/no-img-element -- foto lokal di public/media */}
          <img className="journal-hero-foto-gambar" src={MEDIA.jurnalHero} alt="Konsultan publikasi ilmiah menjelaskan proses pengiriman artikel" />

          <article className="bukti-kartu bukti-kartu-email" aria-label="Contoh bukti korespondensi email">
            <header>
              <span className="bukti-ikon"><Mail size={14} /></span>
              <span><strong>Revision request</strong><small>editor@journal</small></span>
              <span className="bukti-waktu">10 Apr</span>
            </header>
            <p>Your submission has been reviewed and we encourage you to submit revisions.</p>
            <div className="bukti-lampiran"><Paperclip size={12} /> Komentar reviewer</div>
          </article>

          <article className="bukti-kartu bukti-kartu-ojs" aria-label="Contoh panel status di sistem jurnal">
            <header>
              <span className="bukti-ikon bukti-ikon-gelap"><Layers3 size={14} /></span>
              <span><strong>Submission</strong><small>OJS · Journal of Sciences</small></span>
            </header>
            <ul>
              {TAHAP_KORESPONDENSI.map((baris) => (
                <li key={baris.tahap}>
                  <span className={`bukti-titik${baris.status === "jalan" ? " is-jalan" : ""}`} aria-hidden="true" />
                  <span className="bukti-tahap">{baris.tahap}</span>
                  <span className="bukti-tanggal">{baris.tanggal}</span>
                </li>
              ))}
            </ul>
          </article>

          <span className="journal-hero-cap"><MessageSquareText size={13} /> BUKTI KORESPONDENSI DISERAHKAN KE PENULIS</span>
        </div>
      </section>

      <section className="alasan-jurnal" aria-labelledby="alasan-jurnal-judul">
        <div className="alasan-jurnal-copy">
          <p className="journal-section-kicker">MENGAPA MEMILIH KAMI</p>
          <h2 id="alasan-jurnal-judul">Mengapa Memilih Publikasi Jurnal di Kami?</h2>
          <ol className="alasan-jurnal-daftar">
            {ALASAN_JURNAL.map((alasan) => (
              <li key={alasan.urutan}>
                <span className="alasan-jurnal-urutan">{alasan.urutan}</span>
                <div>
                  <h3>{alasan.judul}</h3>
                  <p>{alasan.isi}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="alasan-jurnal-pesan"><strong>Pesan, bayar, dan terbit.</strong></p>
        </div>
        <VideoBukti />
      </section>

      <section id="fasilitas" className="journal-facilities-section">
        <div className="journal-facilities-heading">
          <div><p className="journal-section-kicker">CAKUPAN LAYANAN</p><h2>Fasilitas</h2></div>
          <p>Daftar fasilitas publikasi artikel ilmiah.</p>
        </div>
        <ul className="journal-facilities-grid">
          {FASILITAS_JURNAL.map((fasilitas, i) => {
            const IkonFasilitas = IKON_FASILITAS[i];
            return (
              <li key={fasilitas} className="journal-facility">
                <span className="facility-number">{String(i + 1).padStart(2, "0")}</span>
                <span className="facility-check" aria-hidden="true"><IkonFasilitas size={14} strokeWidth={1.8} /></span>
                <span>{fasilitas}</span>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="journal-next-step">
        <div><p className="journal-section-kicker">LANGKAH BERIKUTNYA</p><h2>Siap melanjutkan artikel?</h2></div>
        <div className="journal-next-actions">
          <Link href="/publish-jurnal/kirim-artikel" className="journal-button journal-button-dark">Kirim Artikel <ArrowUpRight size={16} /></Link>
          <Link href="/publish-jurnal/asistensi" className="journal-text-link">Belum Ada Artikel <ArrowUpRight size={15} /></Link>
        </div>
      </section>
    </div>
  );
}
