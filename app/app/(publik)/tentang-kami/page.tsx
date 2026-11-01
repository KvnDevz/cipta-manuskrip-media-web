import Link from "next/link";
import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  Check,
  Compass,
  FileText,
  Share2,
  Lightbulb,
  MessageCircle,
  PenLine,
  Phone,
} from "lucide-react";
import { KONTAK, MEDIA } from "@/content/site";

/**
 * Halaman profil sementara. Narasi pengenalan dan nilai kerja di sini adalah
 * draf simulasi untuk kebutuhan desain, bukan klaim tentang legalitas,
 * rekam jejak, atau capaian. Bagian dokumen dan media sosial tetap menunggu
 * materi resmi dari klien. `<main>` dimiliki layout publik.
 */
export default function Page() {
  return (
    <div className="about-page">
      <section className="about-hero about-hero-foto" aria-labelledby="about-title">
        <div className="about-hero-copy">
          <p className="about-eyebrow"><span /> TENTANG CIPTA MANUSKRIP MEDIA</p>
          <h1 id="about-title">Publikasi Itu Penting. <em>Ribetnya Tidak Perlu.</em></h1>
          <p className="about-hero-lede">
            Kami hadir dengan satu keyakinan: publikasi ilmiah seharusnya lebih mudah, cepat, dan tanpa proses yang berbelit-belit.
          </p>
          <div className="about-hero-actions">
            <Link href="/publish-buku" className="about-button about-button-light">Publikasi Buku <ArrowUpRight size={15} /></Link>
            <Link href="/publish-jurnal" className="about-button about-button-outline">Publikasi Artikel Jurnal <ArrowUpRight size={15} /></Link>
          </div>
          <a className="about-scroll-cue" href="#profil"><ArrowDown size={14} /> Kenali cara pandang kami</a>
        </div>

        <div className="about-hero-visual">
          {/* eslint-disable-next-line @next/next/no-img-element -- foto lokal di public/media */}
          <img src={MEDIA.tentangHero} alt="Tiga orang berkolaborasi merawat naskah: membaca di ponsel, meninjau dokumen cetak, dan menulis di laptop" />
          <ol className="about-alur">
            <li><span className="about-alur-ikon"><Lightbulb size={17} /></span><span><small>TOPIK</small><strong>Ceritakan gagasan</strong></span></li>
            <li><span className="about-alur-ikon"><MessageCircle size={17} /></span><span><small>PENDAMPINGAN</small><strong>Kami dampingi proses</strong></span></li>
            <li><span className="about-alur-ikon"><BookOpen size={17} /></span><span><small>PUBLIKASI</small><strong>Karya terbit</strong></span></li>
          </ol>
        </div>
      </section>

      <section className="about-intro" id="profil">
        <div className="about-section-heading">
          <p className="about-kicker">01 / Profil</p>
          <h2>Setiap naskah punya perjalanan. <em>Kami hadir untuk mendampingi prosesnya.</em></h2>
        </div>
        <div className="about-intro-body">
          <p>Cipta Manuskrip Media adalah ruang pendampingan penerbitan yang berangkat dari satu keyakinan: gagasan yang bernilai perlu disajikan dengan cermat agar lebih mudah dipahami dan dibagikan.</p>
          <p>Kami melayani kebutuhan penerbitan buku dan pendampingan publikasi jurnal. Dosen menjadi salah satu audiens utama kami, bersama penulis dan masyarakat umum yang ingin mengembangkan naskahnya.</p>
          <div className="about-note"><Lightbulb size={17} /><span><strong>Catatan draf</strong> Narasi profil ini bersifat sementara dan akan disesuaikan dengan informasi resmi dari klien.</span></div>
        </div>
      </section>

      <section className="about-values" aria-labelledby="values-title">
        <div className="about-values-heading"><div><p className="about-kicker">02 / NILAI KERJA</p><h2 id="values-title">Hal-hal kecil yang <em>membentuk proses.</em></h2></div><p>Prinsip editorial yang menjadi arah dalam mendampingi setiap naskah.</p></div>
        <div className="about-values-grid">
          <article className="about-value-card"><span className="about-value-index">01</span><span className="about-value-icon"><Compass size={19} /></span><h3>Arah yang jelas</h3><p>Memulai dengan memahami kebutuhan naskah, lalu menyepakati langkah yang relevan bersama penulis.</p><span className="about-value-rule" /></article>
          <article className="about-value-card"><span className="about-value-index">02</span><span className="about-value-icon"><PenLine size={19} /></span><h3>Cermat dalam detail</h3><p>Menaruh perhatian pada kerapian bahasa, struktur, dan penyajian agar gagasan tersampaikan dengan baik.</p><span className="about-value-rule" /></article>
          <article className="about-value-card"><span className="about-value-index">03</span><span className="about-value-icon"><MessageCircle size={19} /></span><h3>Komunikasi terbuka</h3><p>Menjaga ruang diskusi yang hangat supaya penulis memahami proses dan pilihan yang sedang dijalani.</p><span className="about-value-rule" /></article>
        </div>
      </section>

      <section className="about-journey" aria-labelledby="journey-title">
        <div className="about-journey-copy"><p className="about-kicker">03 / SEBUAH PERJALANAN</p><h2 id="journey-title">Dari ide menuju <em>bentuk yang siap dibagikan.</em></h2><p>Setiap naskah berangkat dari kebutuhan yang berbeda. Gambaran ini adalah pengantar sederhana—detail proses dapat dibicarakan sesuai kebutuhan karya Anda.</p><Link href="/publish-jurnal" className="about-inline-link">Lihat layanan kami <ArrowUpRight size={15} /></Link></div>
        <ol className="about-steps">
          <li><span className="about-step-icon"><MessageCircle size={17} /></span><div><span>LANGKAH 01</span><h3>Mulai dengan percakapan</h3><p>Ceritakan naskah dan tujuan yang ingin dicapai.</p></div><Check size={15} className="about-step-check" /></li>
          <li><span className="about-step-icon"><FileText size={17} /></span><div><span>LANGKAH 02</span><h3>Petakan kebutuhan</h3><p>Kenali bentuk pendampingan yang sesuai untuk naskah.</p></div><Check size={15} className="about-step-check" /></li>
          <li><span className="about-step-icon"><BookOpen size={17} /></span><div><span>LANGKAH 03</span><h3>Rawat proses bersama</h3><p>Lanjutkan langkah editorial dengan komunikasi yang terbuka.</p></div><Check size={15} className="about-step-check" /></li>
        </ol>
      </section>

      <section className="about-contact" aria-labelledby="about-contact-title">
        <div className="about-contact-heading"><p className="about-kicker">04 / HUBUNGI KAMI</p><h2 id="about-contact-title">Kontak dan konsultasi naskah</h2><p>Silakan pilih tim yang sesuai dengan kebutuhan Anda.</p></div>
        <div className="about-contact-grid">
          <a className="about-contact-card" href={`tel:${KONTAK.adminBuku}`}><span className="about-contact-icon"><BookOpen size={18} /></span><span className="about-contact-copy"><small>UNTUK PENERBITAN BUKU</small><strong>Admin Buku</strong><b>{KONTAK.adminBuku}</b></span><Phone size={16} className="about-contact-arrow" /></a>
          <a className="about-contact-card" href={`tel:${KONTAK.adminJurnal}`}><span className="about-contact-icon about-contact-icon-journal"><FileText size={18} /></span><span className="about-contact-copy"><small>UNTUK PUBLIKASI JURNAL</small><strong>Admin Jurnal</strong><b>{KONTAK.adminJurnal}</b></span><Phone size={16} className="about-contact-arrow" /></a>
        </div>
      </section>

      <section className="about-pending" aria-label="Informasi yang menunggu materi resmi">
        <article className="about-pending-card"><span className="about-pending-icon"><FileText size={17} /></span><div><p className="about-kicker">INFORMASI MENYUSUL</p><h2>Dokumen Resmi</h2><p>Informasi dokumen perusahaan akan ditambahkan setelah materi resmi tersedia.</p></div><span className="about-pending-tag">BELUM TERSEDIA</span></article>
        <article className="about-pending-card"><span className="about-pending-icon"><Share2 size={17} /></span><div><p className="about-kicker">INFORMASI MENYUSUL</p><h2>Media Sosial</h2><p>Akun media sosial resmi akan ditautkan setelah detailnya dikonfirmasi.</p></div><span className="about-pending-tag">BELUM TERSEDIA</span></article>
      </section>
      <div className="about-endnote"><span>CV CIPTA MANUSKRIP MEDIA</span><span>PROFIL SEMENTARA — NARASI SIMULASI</span></div>
    </div>
  );
}
