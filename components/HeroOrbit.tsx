/* eslint-disable @next/next/no-img-element -- medali foto dari public/hero,
   murni dekoratif (aria-hidden); optimizer gambar Next tidak diperlukan. */
import type { CSSProperties } from "react";

/**
 * Latar orbit beranda — versi "ramai".
 *
 * Efek orbit lama dipertahankan sebagai BACKGROUND yang hidup: tujuh cincin
 * (solid / putus-putus / titik-titik), empat busur warna, enam medali FOTO
 * ASLI, dan dua puluh bintik berkedip.
 *
 * Inovasi: selain cincin konsentris besar, ada tiga "sistem orbit kecil"
 * yang digeser ke kiri, kanan, dan tengah. Lintasannya sengaja dibuat
 * cukup pendek agar seluruh medali tetap berada di dalam bingkai hero —
 * sebelumnya medali di cincin besar terpotong. Tiap medali berputar
 * berlawanan arah dengan pembawanya supaya wajah tetap tegak; delay negatif
 * memberi posisi awal berbeda tanpa JavaScript. Semua `aria-hidden`,
 * `pointer-events: none`, di belakang kartu, dan mati saat reduced-motion.
 */
const css = (nilai: Record<string, string>) => nilai as CSSProperties;

const CINCIN = [
  { w: "min(100vw, 1080px)", dur: "88s", putar: "normal", gaya: "dashed", tebal: "1.5px", warna: "rgba(9,103,125,.28)", titik: "#09677d", halo: "rgba(9,103,125,.15)", gx: "0px", gy: "0px" },
  { w: "min(84vw, 900px)", dur: "70s", putar: "reverse", gaya: "solid", tebal: "1.5px", warna: "rgba(16,42,49,.22)", titik: "#c2cc08", halo: "rgba(194,204,8,.16)", gx: "0px", gy: "0px" },
  { w: "min(68vw, 720px)", dur: "54s", putar: "normal", gaya: "dotted", tebal: "2.5px", warna: "rgba(212,163,70,.42)", titik: "#d4a346", halo: "rgba(212,163,70,.18)", gx: "0px", gy: "0px" },
  { w: "min(52vw, 540px)", dur: "40s", putar: "reverse", gaya: "solid", tebal: "1.5px", warna: "rgba(9,103,125,.26)", titik: "#09677d", halo: "rgba(9,103,125,.14)", gx: "0px", gy: "0px" },
  { w: "min(34vw, 350px)", dur: "28s", putar: "normal", gaya: "dashed", tebal: "2px", warna: "rgba(194,204,8,.45)", titik: "#c2cc08", halo: "rgba(194,204,8,.16)", gx: "0px", gy: "0px" },
  { w: "min(76vw, 300px)", dur: "34s", putar: "normal", gaya: "solid", tebal: "1.5px", warna: "rgba(9,103,125,.36)", titik: "#09677d", halo: "rgba(9,103,125,.17)", gx: "-24vw", gy: "-2vh" },
  { w: "min(72vw, 280px)", dur: "30s", putar: "reverse", gaya: "solid", tebal: "1.5px", warna: "rgba(212,163,70,.42)", titik: "#d4a346", halo: "rgba(212,163,70,.17)", gx: "24vw", gy: "2vh" },
] as const;

const BUSUR = [
  { w: "min(76vw, 800px)", dur: "46s", tunda: "0s", putar: "normal", atas: "rgba(194,204,8,.62)", kanan: "rgba(9,103,125,.45)", gx: "0px", gy: "0px" },
  { w: "min(58vw, 600px)", dur: "32s", tunda: "-8s", putar: "reverse", atas: "rgba(212,163,70,.65)", kanan: "rgba(9,103,125,.38)", gx: "0px", gy: "0px" },
  { w: "min(40vw, 420px)", dur: "22s", tunda: "-5s", putar: "normal", atas: "rgba(9,103,125,.55)", kanan: "rgba(194,204,8,.45)", gx: "0px", gy: "0px" },
  { w: "min(64vw, 340px)", dur: "26s", tunda: "-11s", putar: "reverse", atas: "rgba(194,204,8,.6)", kanan: "rgba(212,163,70,.45)", gx: "-24vw", gy: "-2vh" },
] as const;

/** Enam foto pada tiga sistem orbit kecil: semua tetap dalam bingkai hero. */
const MEDALI = [
  { foto: "/hero/kopi-pilih.jpg", w: "min(80vw, 440px)", dur: "44s", tunda: "0s", putar: "normal", gx: "-24vw", gy: "-2vh" },
  { foto: "/hero/cmm-terbit.jpg", w: "min(58vw, 300px)", dur: "30s", tunda: "-12s", putar: "reverse", gx: "-24vw", gy: "-2vh" },
  { foto: "/hero/kopi-bayar.jpg", w: "min(84vw, 460px)", dur: "52s", tunda: "-20s", putar: "normal", gx: "24vw", gy: "2vh" },
  { foto: "/hero/cmm-pilih-layanan.jpg", w: "min(62vw, 320px)", dur: "34s", tunda: "-8s", putar: "reverse", gx: "24vw", gy: "2vh" },
  { foto: "/hero/kopi-nikmati.jpg", w: "min(72vw, 380px)", dur: "40s", tunda: "-15s", putar: "normal", gx: "0px", gy: "-3vh" },
  { foto: "/hero/cmm-bayar.jpg", w: "min(50vw, 260px)", dur: "26s", tunda: "-9s", putar: "reverse", gx: "0px", gy: "-3vh" },
] as const;

const BINTIK = [
  { x: "8%", y: "15%", s: "6px", tunda: "0s", warna: "rgba(9,103,125,.75)" },
  { x: "17%", y: "34%", s: "4px", tunda: "-.7s", warna: "rgba(212,163,70,.8)" },
  { x: "26%", y: "9%", s: "5px", tunda: "-1.4s", warna: "rgba(194,204,8,.8)" },
  { x: "35%", y: "78%", s: "6px", tunda: "-2.1s", warna: "rgba(9,103,125,.7)" },
  { x: "11%", y: "64%", s: "4px", tunda: "-2.8s", warna: "rgba(212,163,70,.75)" },
  { x: "88%", y: "16%", s: "6px", tunda: "-.4s", warna: "rgba(194,204,8,.8)" },
  { x: "78%", y: "33%", s: "5px", tunda: "-1.1s", warna: "rgba(9,103,125,.75)" },
  { x: "93%", y: "57%", s: "4px", tunda: "-1.8s", warna: "rgba(212,163,70,.8)" },
  { x: "84%", y: "79%", s: "6px", tunda: "-2.5s", warna: "rgba(9,103,125,.7)" },
  { x: "67%", y: "90%", s: "5px", tunda: "-3.2s", warna: "rgba(194,204,8,.75)" },
  { x: "52%", y: "6%", s: "4px", tunda: "-.9s", warna: "rgba(212,163,70,.8)" },
  { x: "45%", y: "94%", s: "6px", tunda: "-1.6s", warna: "rgba(9,103,125,.7)" },
  { x: "63%", y: "21%", s: "5px", tunda: "-2.3s", warna: "rgba(194,204,8,.8)" },
  { x: "30%", y: "89%", s: "4px", tunda: "-3s", warna: "rgba(9,103,125,.75)" },
  { x: "72%", y: "63%", s: "6px", tunda: "-.3s", warna: "rgba(212,163,70,.7)" },
  { x: "22%", y: "49%", s: "5px", tunda: "-1.2s", warna: "rgba(194,204,8,.75)" },
  { x: "41%", y: "26%", s: "4px", tunda: "-2.6s", warna: "rgba(9,103,125,.8)" },
  { x: "58%", y: "76%", s: "5px", tunda: "-.6s", warna: "rgba(212,163,70,.75)" },
  { x: "14%", y: "82%", s: "4px", tunda: "-1.9s", warna: "rgba(194,204,8,.8)" },
  { x: "81%", y: "46%", s: "6px", tunda: "-2.9s", warna: "rgba(9,103,125,.72)" },
] as const;

export function HeroOrbit() {
  return (
    <div className="hero-bg-orbit" aria-hidden="true">
      <span className="hero-bg-glow hero-bg-glow--dasar" />

      {CINCIN.map((c, i) => (
        <span
          key={`cincin-${i}`}
          className="hero-bg-ring"
          style={css({
            "--w": c.w, "--dur": c.dur, "--putar": c.putar,
            "--gaya": c.gaya, "--tebal": c.tebal, "--warna": c.warna,
            "--titik": c.titik, "--halo": c.halo,
            "--geser-x": c.gx, "--geser-y": c.gy,
          })}
        />
      ))}

      {BUSUR.map((b, i) => (
        <span
          key={`busur-${i}`}
          className="hero-bg-busur"
          style={css({
            "--w": b.w, "--dur": b.dur, "--tunda": b.tunda,
            "--putar": b.putar, "--atas": b.atas, "--kanan": b.kanan,
            "--geser-x": b.gx, "--geser-y": b.gy,
          })}
        />
      ))}

      {MEDALI.map((m) => (
        <span
          key={m.foto}
          className="hero-bg-karrier"
          style={css({
            "--w": m.w, "--dur": m.dur, "--tunda": m.tunda, "--putar": m.putar,
            "--geser-x": m.gx, "--geser-y": m.gy,
          })}
        >
          <span className="hero-bg-medali">
            <img src={m.foto} alt="" width={46} height={46} />
          </span>
        </span>
      ))}

      {BINTIK.map((b, i) => (
        <span
          key={`bintik-${i}`}
          className="hero-bg-bintik"
          style={css({ "--x": b.x, "--y": b.y, "--s": b.s, "--tunda": b.tunda, "--warna": b.warna })}
        />
      ))}

      <span className="hero-bg-glow hero-bg-glow--tengah" />
    </div>
  );
}
