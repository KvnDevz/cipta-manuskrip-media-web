"use client";

import { useEffect, useRef, useState } from "react";
import { Coffee, Inbox, Lightbulb, Pause, Play } from "lucide-react";

/**
 * Section “Keunggulan Kami” pada /publish-jurnal.
 *
 * Menggantikan section lama “Ruang untuk bukti publikasi”. Tata letak dan
 * isi mengikuti referensi klien: kicker + judul, tiga kartu keunggulan,
 * lalu pemutar video proses publikasi dengan autoplay saat muncul di layar,
 * poster transisi awal, kontrol play/pause interaktif, dan badge indikator.
 */
const KEUNGGULAN = [
  {
    nomor: "01",
    judul: "Bukti korespondensi lengkap",
    isi: "Bukti submit, review, revisi, rebuttal letter, hingga terbit. Semua kami siapkan. Tanpa ribet.",
    ikon: Inbox,
  },
  {
    nomor: "02",
    judul: "Belum ada artikel? Tidak masalah.",
    isi: "Cukup mention topik penelitian, selanjutnya kami bantu sampai tuntas.",
    ikon: Lightbulb,
  },
  {
    nomor: "03",
    judul: "Prosesnya semudah beli kopi",
    isi: "Pesan, bayar, dan terbit.",
    ikon: Coffee,
  },
] as const;

export function JournalAdvantages() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPausedRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Pastikan muted aktif di DOM agar autoplay diizinkan peramban
    video.muted = true;

    if (!video.paused) {
      setIsPlaying(true);
    }

    if (typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            // Autoplay saat video masuk ke layar jika pengguna belum sengaja mem-pause
            if (video.paused && !userPausedRef.current) {
              const playPromise = video.play();
              if (playPromise !== undefined) {
                playPromise
                  .then(() => setIsPlaying(true))
                  .catch(() => {
                    // Browser policy mengabaikan autoplay otomatis bila belum ada interaksi
                  });
              }
            }
          } else {
            // Pause saat video keluar dari pandangan untuk menghemat daya & memori
            if (!video.paused) {
              video.pause();
              setIsPlaying(false);
            }
          }
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      userPausedRef.current = false;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
    } else {
      userPausedRef.current = true;
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section className="journal-advantages-section" aria-labelledby="journal-advantages-title">
      <div className="journal-advantages-head">
        <p className="journal-section-kicker">KEUNGGULAN KAMI</p>
        <h2 id="journal-advantages-title">Mengapa pilih publikasi jurnal di kami?</h2>
      </div>

      <div className="journal-advantages-grid">
        {KEUNGGULAN.map(({ nomor, judul, isi, ikon: Icon }) => (
          <article key={nomor} className="journal-advantage-card">
            <span className="journal-advantage-icon" aria-hidden="true">
              <Icon size={24} strokeWidth={1.5} />
            </span>
            <span className="journal-advantage-number">{nomor}</span>
            <h3>{judul}</h3>
            <p>{isi}</p>
          </article>
        ))}
      </div>

      <figure
        className={`journal-video ${isPlaying ? "is-playing" : ""}`}
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          className="journal-video-media journal-video-poster"
          src="/video/video_bukti_korespondensi.mp4"
          poster="/aset/jurnal-video-poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          aria-label="Video bukti korespondensi dan proses publikasi jurnal"
        >
          <source src="/video/video_bukti_korespondensi.mp4" type="video/mp4" />
          Browser Anda tidak mendukung tag video.
        </video>
        <span
          className="journal-video-chip journal-video-chip--left"
          onClick={(e) => e.stopPropagation()}
        >
          <Play size={11} strokeWidth={2} aria-hidden="true" /> VIDEO PROSES PUBLIKASI
        </span>
        <button
          type="button"
          className={`journal-video-play ${isPlaying ? "is-playing" : ""}`}
          aria-label={isPlaying ? "Jeda video proses publikasi" : "Putar video proses publikasi"}
          onClick={(e) => {
            e.stopPropagation();
            togglePlay();
          }}
        >
          {isPlaying ? (
            <Pause size={22} strokeWidth={2} aria-hidden="true" />
          ) : (
            <Play size={22} strokeWidth={2} aria-hidden="true" />
          )}
        </button>
        <figcaption className="sr-only">Video bukti korespondensi dan proses publikasi jurnal.</figcaption>
      </figure>
    </section>
  );
}
