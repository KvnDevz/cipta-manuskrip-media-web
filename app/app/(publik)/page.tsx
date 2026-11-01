import Link from "next/link";
import { ArrowDown, ArrowUpRight, BadgeCheck, BookOpen, Coffee, Feather, FileText, Sparkles, Stamp } from "lucide-react";
import { LangkahBanding } from "@/components/LangkahBanding";
import { MEDIA } from "@/content/site";

/**
 * Beranda.
 *
 * Revisi klien 1 November 2026 (NOTE UTAMA butir 1–7):
 * - headline menjadi "Publikasi Karya Semudah Beli Kopi" tanpa titik;
 * - deskripsi memakai kalimat baru ("Layanan jasa penerbitan buku dan
 *   publikasi artikel jurnal");
 * - ukuran display diperbesar mengikuti referensi bukuloka;
 * - ilustrasi buku CSS diganti foto orang sungguhan di kedai kopi, ditambah
 *   papan analogi tiga langkah "beli kopi vs publikasi di CMM".
 *
 * Tombol hero tetap menuju dua halaman layanan (dikunci tes).
 */
export default function Home() {
  return (
    <div className="kopi-beranda">
      <section className="kopi-hero">
        <div aria-hidden="true" className="kopi-hero-grid" />
        <div className="kopi-hero-copy">
          <div className="eyebrow-pill"><Sparkles size={13} /> Ruang untuk karya yang berarti</div>
          <h1 className="kopi-judul">
            Publikasi Karya <span className="kopi-judul-aksen">Semudah Beli Kopi</span>
          </h1>
          <p className="kopi-lede">
            Layanan jasa penerbitan buku dan publikasi artikel jurnal.
          </p>
          <div className="kopi-aksi">
            <Link href="/publish-buku" className="button-primary">
              Publish Buku <ArrowUpRight size={17} />
            </Link>
            <Link href="/publish-jurnal" className="button-secondary">
              Publish Jurnal <ArrowUpRight size={17} />
            </Link>
          </div>
          <ul className="kopi-poin">
            <li><BadgeCheck size={15} /> ISBN resmi Perpusnas</li>
            <li><Stamp size={15} /> CV berbadan hukum</li>
            <li><Feather size={15} /> Pendampingan penulisan</li>
          </ul>
        </div>

        <div className="kopi-hero-foto">
          {/* eslint-disable-next-line @next/next/no-img-element -- foto lokal di public/media, sudah dikompres */}
          <img src={MEDIA.heroKopi} alt="Seorang penulis menerima secangkir kopi di kedai kopi, analogi proses penerbitan yang sederhana" className="kopi-foto" />
          <div className="kopi-foto-kartu kopi-foto-kartu-atas">
            <span className="kopi-foto-ikon"><Coffee size={17} strokeWidth={1.8} /></span>
            <span><strong>Pilih kopi</strong><small>Pilih layanan</small></span>
            <ArrowDown size={15} className="kopi-foto-panah" />
          </div>
          <div className="kopi-foto-kartu kopi-foto-kartu-bawah">
            <span className="kopi-foto-ikon kopi-foto-ikon-gold"><BookOpen size={17} strokeWidth={1.8} /></span>
            <span><strong>Kopi siap</strong><small>Karya terbit</small></span>
            <ArrowUpRight size={15} className="kopi-foto-panah" />
          </div>
        </div>

        <a href="#pilih-layanan" className="kopi-scroll"><span>Jelajahi layanan</span><ArrowDown size={15} /></a>
      </section>

      <div className="kopi-bandung">
        <LangkahBanding />
      </div>

      <section id="pilih-layanan" className="services-section mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Publikasikan karya Anda</p>
            <h2 className="section-title">Satu tujuan, <em>dua jalan berkarya.</em></h2>
          </div>
          <p className="section-intro">Temukan layanan yang paling sesuai dengan karya dan rencana publikasi Anda.</p>
        </div>

        <div className="service-grid mt-10">
          <Link href="/publish-buku" className="service-card service-card-book">
            <div className="service-card-top"><span className="service-icon"><BookOpen size={21} /></span><span className="service-index">01 / BUKU</span></div>
            <div className="service-card-content"><h3>Penerbitan Buku</h3><p>Wujudkan naskah menjadi buku yang siap menemani pembaca.</p><span className="service-link">Jelajahi layanan <ArrowUpRight size={16} /></span></div>
            <div className="card-decoration card-decoration-book" aria-hidden="true"><div /><div /><div /></div>
          </Link>
          <Link href="/publish-jurnal" className="service-card service-card-journal">
            <div className="service-card-top"><span className="service-icon"><FileText size={21} /></span><span className="service-index">02 / JURNAL</span></div>
            <div className="service-card-content"><h3>Publikasi Artikel Ilmiah</h3><p>Kenali layanan publikasi dan asistensi untuk artikel ilmiah Anda.</p><span className="service-link">Jelajahi layanan <ArrowUpRight size={16} /></span></div>
            <div className="card-decoration card-decoration-journal" aria-hidden="true"><div /><div /><div /><div /></div>
          </Link>
        </div>

        <div className="closing-note mt-16">
          <div className="closing-mark">
            {/* eslint-disable-next-line @next/next/no-img-element -- local transparent client mark; preserve direct src as required by handoff tests */}
            <img src="/logo-cmm-trim.png" alt="" />
          </div>
          <p><strong>Setiap karya punya cerita.</strong><br /><span>Mulai ceritakan karya Anda bersama Cipta Manuskrip Media.</span></p>
          <Link href="/tentang-kami" aria-label="Kenali Cipta Manuskrip Media"><ArrowUpRight size={20} /></Link>
        </div>
      </section>
    </div>
  );
}
