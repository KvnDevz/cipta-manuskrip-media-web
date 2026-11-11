import { BookOpen, Feather, type LucideIcon } from "lucide-react";

/**
 * Satu bulatan per GARIS cincin orbit di banner beranda — total tiga, dan
 * ketiganya menempel tepat di garis cincin sambil BERPUTAR mengitari pusat
 * hero dengan arah bergantian serta titik awal putaran yang berbeda tiap
 * cincin (delay negatif per rotor, lihat `.orbit-sat-rotor` di globals.css):
 *
 * - cincin luar: DUA FOTO orang asli berdiskusi/belajar dengan buku (aset
 *   lokal) — keduanya di rotor yang sama jadi SELALU SATU ARAH putaran,
 *   posisinya dipisahkan jauh (sudut 200° vs 20°),
 * - cincin tengah: ikon buku (BookOpen), berlawanan arah,
 * - cincin dalam: ikon naskah (Feather).
 *
 * Struktur: tiga `rotor` — kotak tak terlihat yang ukurannya sama persis
 * dengan cincin orbit (luar / tengah / dalam) — diputar dengan keyframes
 * `cmm-orbit-spin`. Bulatan diposisikan sebagai persentase kotak rotor
 * sehingga selalu tepat di garis cincin; isi bulatan (ikon/foto) dibungkus
 * `.orbit-sat__ikon` yang di-counter-rotate supaya tetap tegak saat berputar.
 *
 * Murni dekorasi — rotor diberi `aria-hidden`, CSS mematikan `pointer-events`
 * dan menempatkan rotor di bawah `hero-copy`, jadi tidak mengganggu pembaca
 * layar, klik, maupun keterbacaan judul.
 */
type Satelit = { className: string; Ikon?: LucideIcon; gambar?: string };

const KELOMPOK_ROTOR: { rotor: string; satelit: Satelit[] }[] = [
  {
    // Cincin luar, searah jarum jam (90s, delay 0) — DUA foto diskusi buku,
    // posisinya dipisahkan jauh (sudut 200° dan 20°) dan tetap satu arah putar.
    rotor: "orbit-sat-rotor--luar",
    satelit: [
      { className: "orbit-sat--1 orbit-sat--foto", gambar: "/aset/orbit-diskusi-buku.png" },
      { className: "orbit-sat--4 orbit-sat--foto", gambar: "/aset/orbit-diskusi-buku-2.jpg" },
    ],
  },
  {
    // Cincin tengah, berlawanan arah (70s, delay -25s) — ikon buku.
    rotor: "orbit-sat-rotor--tengah",
    satelit: [{ className: "orbit-sat--2", Ikon: BookOpen }],
  },
  {
    // Cincin dalam, searah jarum jam (60s, delay -40s) — ikon naskah.
    rotor: "orbit-sat-rotor--inner",
    satelit: [{ className: "orbit-sat--3", Ikon: Feather }],
  },
];

export function OrbitSatellites() {
  return (
    <>
      {KELOMPOK_ROTOR.map(({ rotor, satelit }) => (
        <div key={rotor} aria-hidden="true" className={`orbit-sat-rotor ${rotor}`}>
          {satelit.map(({ className, Ikon, gambar }) => (
            <span key={className} className={`orbit-sat ${className}`}>
              <span className="orbit-sat__ikon">
                {gambar ? (
                  // eslint-disable-next-line @next/next/no-img-element -- aset lokal dekoratif di dalam rotor aria-hidden
                  <img src={gambar} alt="" className="orbit-sat__gambar" />
                ) : (
                  Ikon && <Ikon size={20} strokeWidth={1.8} />
                )}
              </span>
            </span>
          ))}
        </div>
      ))}
    </>
  );
}
