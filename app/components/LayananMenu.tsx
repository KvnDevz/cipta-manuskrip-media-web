"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BookOpen, ChevronDown, FileText, PenLine } from "lucide-react";
import { LAYANAN_NAV } from "@/content/site";

const IKON = [BookOpen, FileText, PenLine, PenLine] as const;

/**
 * Menu "Layanan" di header publik.
 *
 * Klien meminta dua layanan utama plus dua jalur asistensi (NOTE UTAMA
 * butir 16). Menu ini sengaja dibuat sebagai popover yang bisa dibuka
 * dengan papan ketik — bukan hover murni — karena hover tidak dapat
 * dijangkau pengguna layar sentuh dan pembaca layar.
 *
 * Tautannya tetap dirender di dalam DOM (bukan dimount hanya saat dibuka)
 * agar terbaca perayap dan tetap tersedia saat JavaScript belum jalan;
 * `hidden` mengatur tampilannya.
 */
export function LayananMenu() {
  const [terbuka, setTerbuka] = useState(false);
  const wadah = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!terbuka) return;

    function tutupBilaDiLuar(event: MouseEvent | TouchEvent) {
      if (wadah.current !== null && !wadah.current.contains(event.target as Node)) {
        setTerbuka(false);
      }
    }
    function tutupDenganEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setTerbuka(false);
    }

    document.addEventListener("mousedown", tutupBilaDiLuar);
    document.addEventListener("touchstart", tutupBilaDiLuar);
    document.addEventListener("keydown", tutupDenganEscape);
    return () => {
      document.removeEventListener("mousedown", tutupBilaDiLuar);
      document.removeEventListener("touchstart", tutupBilaDiLuar);
      document.removeEventListener("keydown", tutupDenganEscape);
    };
  }, [terbuka]);

  return (
    <div className="nav-layanan" ref={wadah}>
      <button
        type="button"
        className={`nav-layanan-tombol${terbuka ? " is-open" : ""}`}
        aria-expanded={terbuka}
        aria-controls="menu-layanan"
        onClick={() => setTerbuka((nilai) => !nilai)}
      >
        Layanan <ChevronDown size={14} strokeWidth={2} className="nav-layanan-chevron" />
      </button>

      <div id="menu-layanan" className="nav-layanan-panel" hidden={!terbuka}>
        <p className="nav-layanan-judul">Layanan</p>
        <ul>
          {LAYANAN_NAV.map((tautan, i) => {
            const Ikon = IKON[i] ?? BookOpen;
            return (
              <li key={tautan.href}>
                <Link href={tautan.href} className="nav-layanan-tautan" onClick={() => setTerbuka(false)}>
                  <span className="nav-layanan-ikon"><Ikon size={15} strokeWidth={1.7} /></span>
                  <span>{tautan.label}</span>
                  <span aria-hidden="true" className="nav-layanan-panah">↗</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
