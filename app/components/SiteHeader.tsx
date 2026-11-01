import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { LayananMenu } from "./LayananMenu";
import { NAV_UTAMA } from "@/content/site";

/**
 * Header situs publik.
 *
 * Revisi klien 1 November 2026 (NOTE UTAMA butir 2): tombol kanan berganti
 * dari "Mulai berkarya" menjadi "Tentang Kami", sehingga menu tengah cukup
 * memuat Beranda — ditambah menu "Layanan" (butir 16) yang memuat dua
 * layanan utama dan dua jalur asistensi menulis.
 */
export function SiteHeader() {
  return (
    <header className="site-header">
      <nav aria-label="Navigasi utama" className="site-nav">
        <Link href="/" aria-label="CV Cipta Manuskrip Media — Beranda" className="brand-lockup">
          {/* eslint-disable-next-line @next/next/no-img-element -- keep the logo as a plain local image per UI handoff */}
          <img src="/logo-cmm-trim.png" alt="" className="brand-logo" />
          <span className="brand-name"><strong>CIPTA</strong><small>MANUSKRIP MEDIA</small></span>
        </Link>

        <div className="nav-links">
          {NAV_UTAMA.map((tautan) => (
            <Link key={tautan.href} href={tautan.href} className="nav-link">{tautan.label}</Link>
          ))}
          <LayananMenu />
        </div>

        <Link href="/tentang-kami" className="nav-cta">Tentang Kami <ArrowUpRight size={14} strokeWidth={2.1} /></Link>
      </nav>
    </header>
  );
}
