"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_KANAN, NAV_UTAMA } from "@/content/site";

/**
 * Header publik.
 *
 * Slot kanan bukan lagi tombol CTA "Mulai berkarya", melainkan tautan menu
 * biasa "Tentang Kami" — tanpa pill CTA, tanpa ikon panah, tanpa `nav-cta`.
 * Arahan terbaru klien: navbar hanya dua menu, `Beranda` dan `Tentang Kami`,
 * berukuran huruf besar demi keterbacaan audiens dosen senior. Menandai rute
 * aktif dengan `aria-current="page"` agar orientasi halaman langsung terbaca.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const isRouteActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || Boolean(pathname?.startsWith(`${href}/`));

  return (
    <header className="site-header">
      <nav aria-label="Navigasi utama" className="site-nav">
        <Link href="/" aria-label="CV Cipta Manuskrip Media — Beranda" className="brand-lockup">
          {/* eslint-disable-next-line @next/next/no-img-element -- lambang lokal,
              dipotong dari berkas logo penuh agar tidak ada teks ganda di samping
              wordmark yang sudah dirender sebagai teks. */}
          <img src="/logo-cmm-mark.png" alt="" className="brand-logo" />
          <span className="brand-name"><strong>CIPTA</strong><small>MANUSKRIP MEDIA</small></span>
        </Link>
        <div className="nav-links">
          {NAV_UTAMA.map((tautan) => (
            <Link
              key={tautan.href}
              href={tautan.href}
              className="nav-link"
              aria-current={isRouteActive(tautan.href) ? "page" : undefined}
            >
              {tautan.label}
            </Link>
          ))}
        </div>
        <Link
          href={NAV_KANAN.href}
          className="nav-link nav-link-kanan"
          aria-current={isRouteActive(NAV_KANAN.href) ? "page" : undefined}
        >
          {NAV_KANAN.label}
        </Link>
      </nav>
    </header>
  );
}
