/**
 * Tanda indeksasi jurnal yang dipakai situs ini.
 *
 * Digambar sebagai SVG/teks di dalam repo, bukan berkas logo yang diunduh:
 * tidak ada aset pihak ketiga yang ikut ke repositori klien, tidak ada
 * permintaan jaringan ke server luar saat halaman dibuka, dan warnanya tetap
 * tajam di layar beresolusi tinggi. Bentuknya adalah penanda visual kategori
 * (SINTA, Index Copernicus, Scopus, SJR) — bukan reproduksi logo resmi, jadi
 * jangan dipakai sebagai klaim sertifikasi.
 *
 * Semua penanda ditandai `aria-hidden` dan diberi label teks di sebelahnya
 * ketika ditampilkan sendirian, supaya pembaca layar tidak menerima deretan
 * singkatan tanpa konteks.
 */

export type JenisIndeks = "sinta" | "copernicus" | "scopus" | "sjr";

const LABEL: Record<JenisIndeks, string> = {
  sinta: "SINTA",
  copernicus: "Index Copernicus",
  scopus: "Scopus",
  sjr: "SJR — SCImago Journal & Country Rank",
};

export function labelIndeks(jenis: JenisIndeks): string {
  return LABEL[jenis];
}

function Sinta() {
  // Empat level akreditasi; warnanya dibedakan supaya terbaca sebagai
  // tingkatan, bukan sekadar hiasan.
  return (
    <span className="indeks-sinta">
      {["1", "2", "3", "4"].map((level) => (
        <span key={level} className={`sinta-chip sinta-chip-${level}`}>
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M12 3c3.6 2.2 6.6 4.9 6.6 8.4 0 4.3-3.2 7.4-6.6 9.6-3.4-2.2-6.6-5.3-6.6-9.6C5.4 7.9 8.4 5.2 12 3z" />
            <path d="M12 6.4v12.2" className="sinta-vein" />
          </svg>
          <b>SINTA {level}</b>
        </span>
      ))}
    </span>
  );
}

function Copernicus() {
  return (
    <span className="indeks-copernicus">
      <svg viewBox="0 0 28 28" aria-hidden="true" focusable="false">
        <circle cx="14" cy="14" r="11" className="copernicus-ring" />
        <circle cx="14" cy="14" r="4.4" className="copernicus-core" />
        <path d="M14 3v22M3 14h22" className="copernicus-axis" />
      </svg>
      <span className="indeks-wordmark">
        <b>INDEX</b>
        <strong>COPERNICUS</strong>
        <small>INTERNATIONAL</small>
      </span>
    </span>
  );
}

function Scopus() {
  return (
    <span className="indeks-scopus">
      <svg viewBox="0 0 26 26" aria-hidden="true" focusable="false">
        <path d="M20.5 7.4c-2-2.6-5-3.9-8.2-3.5C8 4.3 5.2 6.9 4.6 11c-.5 3.6 1 6.9 4 8.6 3.2 1.8 7.2 1.3 9.7-1.2l-2.6-2.3c-1.6 1.5-4 1.7-5.7.5-1.9-1.3-2.4-3.8-1.3-5.8 1-1.9 3.3-2.9 5.4-2.3 1 .3 1.9.9 2.6 1.7l2.4-2.8z" />
      </svg>
      <b>Scopus<sup>®</sup></b>
    </span>
  );
}

function SJR() {
  return (
    <span className="indeks-sjr">
      <b>SJR</b>
      <small>SCImago Journal &amp; Country Rank</small>
    </span>
  );
}

export function LogoIndeks({ jenis, className = "" }: { jenis: JenisIndeks; className?: string }) {
  const isi = jenis === "sinta" ? <Sinta /> : jenis === "copernicus" ? <Copernicus /> : jenis === "scopus" ? <Scopus /> : <SJR />;
  return (
    <span className={`logo-indeks logo-indeks-${jenis} ${className}`.trim()} role="img" aria-label={LABEL[jenis]}>
      {isi}
    </span>
  );
}

/**
 * Lambang Perpustakaan Nasional pada kartu "Terbit Buku Sekali Klik".
 * Bintang biru dengan pita — penanda visual, bukan logo resmi.
 */
export function LambangPerpusnas({ className = "" }: { className?: string }) {
  return (
    <span className={`lambang-perpusnas ${className}`.trim()} role="img" aria-label="Perpustakaan Nasional Republik Indonesia">
      <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
        <path className="perpusnas-star" d="M24 4.5l5.6 11.2 12.4 1.8-9 8.7 2.1 12.3L24 32.6 12.9 38.5 15 26.2l-9-8.7 12.4-1.8z" />
        <path className="perpusnas-ribbon" d="M15.5 34.5l-2.6 9.5 6.9-3.6 4.2 3.6V35.2zM32.5 34.5l2.6 9.5-6.9-3.6L24 44V35.2z" />
      </svg>
      <span className="perpusnas-copy">
        <small>PERPUSTAKAAN NASIONAL</small>
        <b>REPUBLIK INDONESIA</b>
      </span>
    </span>
  );
}

/**
 * Kartu ISBN dengan barcode. Batang barcode sengaja dibangkitkan dari pola
 * tetap — bukan nomor sungguhan — jadi tidak ada nomor terbitan yang
 * "dikarang" di tampilan. Nomor asli tetap datang dari database.
 */
export function KartuIsbn({ className = "" }: { className?: string }) {
  const pola = [2, 1, 1, 3, 1, 2, 1, 1, 2, 3, 1, 1, 2, 1, 3, 1, 1, 2, 2, 1, 3, 1, 1, 2, 1, 1, 3, 2, 1, 1];
  let x = 0;
  return (
    <span className={`kartu-isbn ${className}`.trim()} role="img" aria-label="ISBN">
      <span className="kartu-isbn-label">ISBN</span>
      <svg viewBox="0 0 100 34" aria-hidden="true" focusable="false" preserveAspectRatio="none">
        {pola.map((lebar, i) => {
          const mulai = x;
          x += lebar + (i % 2 === 0 ? 1 : 2);
          return i % 2 === 0 ? <rect key={i} x={mulai} y="0" width={lebar} height="34" /> : null;
        })}
      </svg>
    </span>
  );
}
