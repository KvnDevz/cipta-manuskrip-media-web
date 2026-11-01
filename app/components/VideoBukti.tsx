import { existsSync } from "node:fs";
import { join } from "node:path";
import { PlayCircle, Video } from "lucide-react";
import { MEDIA } from "@/content/site";

/** Berkas video klien, bila sudah tersedia di `public/media/`. */
const BERKAS_VIDEO = "video-publikasi.mp4";

function videoTersedia(): boolean {
  try {
    return existsSync(join(process.cwd(), "public", "media", BERKAS_VIDEO));
  } catch {
    return false;
  }
}

/**
 * Pemutar video bukti proses publikasi (NOTE UTAMA butir 11: "bawahnya kasih
 * puter video auto play").
 *
 * Video resmi belum diserahkan klien. Alih-alih menampilkan pemutar rusak
 * yang memutar layar hitam, komponen ini memeriksa keberadaan berkasnya:
 * begitu `app/public/media/video-publikasi.mp4` ada, ia langsung diputar
 * otomatis (tanpa suara, berulang) di tempat yang sama tanpa mengubah kode.
 * Selama belum ada, yang tampil adalah poster bernarasi dengan penanda jelas
 * bahwa videonya menyusul.
 *
 * `muted` wajib: setiap peramban memblokir autoplay yang bersuara, dan video
 * yang gagal autoplay tampil sebagai kotak diam tanpa penjelasan.
 */
export function VideoBukti() {
  const ada = videoTersedia();

  return (
    <figure className="video-bukti">
      <div className="video-bukti-bingkai">
        {ada ? (
          <video
            className="video-bukti-el"
            poster={MEDIA.videoPoster}
            autoPlay
            muted
            loop
            playsInline
            controls
            preload="metadata"
          >
            <source src={`/media/${BERKAS_VIDEO}`} type="video/mp4" />
            Peramban Anda tidak mendukung pemutar video.
          </video>
        ) : (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element -- poster lokal, bukan aset eksternal */}
            <img src={MEDIA.videoPoster} alt="Pendampingan penulisan artikel ilmiah bersama tim Cipta Manuskrip Media" className="video-bukti-poster" />
            <span className="video-bukti-lapisan" aria-hidden="true" />
            <span className="video-bukti-tombol" aria-hidden="true"><PlayCircle size={46} strokeWidth={1.2} /></span>
            <span className="video-bukti-label"><Video size={14} /> Video proses publikasi — menyusul</span>
          </>
        )}
      </div>
      <figcaption>Dari topik penelitian sampai terbit: proses yang kami dampingi langkah demi langkah.</figcaption>
    </figure>
  );
}
