import { CheckCircle2, CreditCard, CupSoda, MousePointerClick, Rocket, Send } from "lucide-react";
import { LANGKAH_BANDING } from "@/content/site";

const IKON_KOPI = { pilih: CupSoda, bayar: CreditCard, nikmati: CheckCircle2 } as const;
const IKON_CMM = { pilih: MousePointerClick, bayar: Send, terbit: Rocket } as const;

/**
 * Ilustrasi "semudah beli kopi" (NOTE UTAMA butir 5).
 *
 * Dua jalur ditumpuk sebagai dua lajur yang sejajar: membeli kopi di atas,
 * menerbitkan karya di CMM di bawahnya, dengan tiga langkah yang berpasangan
 * satu-satu. Itu inti pesan klien — prosesnya sama sederhananya — jadi
 * pasangannya dibaca mendatar, bukan sebagai dua daftar terpisah.
 */
export function LangkahBanding() {
  return (
    <section className="banding" aria-labelledby="banding-judul">
      <div className="banding-kepala">
        <p className="banding-kicker">ANALOGINYA SEPERTI INI</p>
        <h2 id="banding-judul">Beli kopi tiga langkah. Terbitkan karya juga.</h2>
      </div>

      <div className="banding-papan">
        <div className="banding-lajur banding-lajur-kopi">
          <p className="banding-label"><CupSoda size={15} strokeWidth={1.9} /> BELI KOPI</p>
          <ol>
            {LANGKAH_BANDING.map((langkah) => {
              const Ikon = IKON_KOPI[langkah.kopi.ikon];
              return (
                <li key={langkah.kopi.judul}>
                  <span className="banding-ikon"><Ikon size={19} strokeWidth={1.7} /></span>
                  <div><strong>{langkah.kopi.judul}</strong><small>{langkah.kopi.isi}</small></div>
                </li>
              );
            })}
          </ol>
        </div>

        <div className="banding-lajur banding-lajur-cmm">
          <p className="banding-label"><Rocket size={15} strokeWidth={1.9} /> PUBLIKASI DI CMM</p>
          <ol>
            {LANGKAH_BANDING.map((langkah) => {
              const Ikon = IKON_CMM[langkah.cmm.ikon];
              return (
                <li key={langkah.cmm.judul}>
                  <span className="banding-ikon"><Ikon size={19} strokeWidth={1.7} /></span>
                  <div><strong>{langkah.cmm.judul}</strong><small>{langkah.cmm.isi}</small></div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
