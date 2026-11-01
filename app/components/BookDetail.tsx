import { BadgeCheck, BookMarked, CalendarClock, Clock3, Languages, Ruler, Tag } from "lucide-react";
import { buildBookOrderUrl } from "@/lib/whatsapp";
import { resolveCoverUrl } from "@/lib/storage/path";
import { formatRupiah } from "@/lib/books/price";
import type { Book } from "@/lib/books/types";

const KELAS_TOMBOL = "buku-detail-tombol";

/**
 * Halaman detail buku — komponen presentasi murni.
 *
 * Tidak menyentuh database sama sekali: seluruh datanya datang lewat props
 * dan URL sampul dibentuk resolver terpisah. Karena itu perombakan tampilan
 * di Arena tidak bisa merusak aliran data maupun aturan pesan WhatsApp.
 *
 * ISBN dan harga tampil untuk buku yang sudah terbit, dengan `-` bila admin
 * belum menetapkannya. Buku yang segera terbit menampilkan status "Segera
 * terbit" pada baris ISBN dan **tidak** menawarkan harga maupun pesanan.
 *
 * Revisi klien 1 November 2026 (NOTE UTAMA butir 20): ditambah baris format,
 * jenis, bahasa, dan ukuran buku (kolom migration 003), dan kolom kanan buku
 * yang belum terbit diisi cap "SEGERA TERBIT" berukuran besar — sebelumnya
 * ruang itu kosong.
 */
export function BookDetail({ book }: { book: Book }) {
  const sampul = resolveCoverUrl(book.coverPath);
  const sudahTerbit = book.status === "published";

  /**
   * Hanya detail yang benar-benar terisi. Baris kosong tidak dirender sama
   * sekali: daftar berisi "-" berulang membuat halaman terbaca seperti data
   * yang rusak, bukan seperti data yang belum diisi.
   */
  const detail = [
    { label: "Format buku", nilai: book.formatBuku, ikon: BookMarked },
    { label: "Jenis buku", nilai: book.jenisBuku, ikon: Tag },
    { label: "Bahasa", nilai: book.bahasa, ikon: Languages },
    { label: "Ukuran buku", nilai: book.ukuranBuku, ikon: Ruler },
  ].filter((baris) => baris.nilai !== null && baris.nilai.trim() !== "");

  return (
    <div className="buku-detail">
      <article className="buku-detail-grid">
        <figure className="buku-detail-sampul">
          {/* eslint-disable-next-line @next/next/no-img-element -- sampul sudah diperkecil dan dikompres sharp saat diunggah; next/image belum dikonfigurasi. */}
          <img src={sampul} alt={`Sampul buku ${book.title}`} />
          <figcaption>{book.publisherInfo}</figcaption>
        </figure>

        <div className="buku-detail-info">
          <p className="buku-detail-kicker">
            <span className={`buku-detail-lencana${sudahTerbit ? "" : " is-segera"}`}>
              {sudahTerbit ? "TELAH TERBIT" : "DALAM PENERBITAN"}
            </span>
            KATALOG BUKU
          </p>
          <h1>{book.title}</h1>
          <p className="buku-detail-penulis">{book.author}</p>

          <dl className="buku-detail-meta">
            <div>
              <dt>ISBN</dt>
              <dd>{sudahTerbit ? (book.isbn ?? "-") : "Segera terbit"}</dd>
            </div>

            {detail.map(({ label, nilai, ikon: Ikon }) => (
              <div key={label}>
                <dt><Ikon size={13} strokeWidth={1.8} /> {label}</dt>
                <dd>{nilai}</dd>
              </div>
            ))}

            {sudahTerbit ? (
              <>
                <div>
                  <dt>Harga buku cetak</dt>
                  <dd>{formatRupiah(book.pricePrint)}</dd>
                </div>
                <div>
                  <dt>Sewa ebook</dt>
                  <dd>{formatRupiah(book.priceEbook)}</dd>
                </div>
              </>
            ) : null}
          </dl>

          {sudahTerbit ? (
            <>
              <h2>Sinopsis</h2>
              <p className="buku-detail-isi">{book.synopsis}</p>
            </>
          ) : (
            <>
              <h2>Informasi Buku</h2>
              <p className="buku-detail-isi">{book.bookInfo}</p>
              <p className="buku-detail-estimasi">
                <CalendarClock size={15} /> <span><b>Estimasi terbit:</b> {book.estimatedRelease}</span>
              </p>
            </>
          )}
        </div>

        <aside className="buku-detail-sisi">
          {sudahTerbit ? (
            <div className="buku-detail-pesan">
              <p className="buku-detail-sisi-kicker"><BadgeCheck size={14} /> TERSEDIA SEKARANG</p>
              <h2>Dapatkan buku ini</h2>
              <p>Pesan langsung ke admin penerbitan lewat WhatsApp. Kami bantu sampai buku sampai ke tangan Anda.</p>
              <a href={buildBookOrderUrl(book.title, "cetak")} target="_blank" rel="noopener noreferrer" className={KELAS_TOMBOL}>
                Beli Buku Cetak
              </a>
              <a href={buildBookOrderUrl(book.title, "ebook")} target="_blank" rel="noopener noreferrer" className={KELAS_TOMBOL}>
                Sewa Ebook
              </a>
            </div>
          ) : (
            <div className="cap-segera">
              <span className="cap-segera-pita">SEGERA TERBIT</span>
              <span className="cap-segera-jam"><Clock3 size={54} strokeWidth={1.1} /></span>
              <p>Buku ini akan segera hadir. Pantau terus untuk mendapatkan akses saat sudah diterbitkan.</p>
              <small>{book.estimatedRelease ? `Estimasi ${book.estimatedRelease}` : book.publisherInfo}</small>
            </div>
          )}
        </aside>
      </article>

      <p className="buku-detail-penerbit">{book.publisherInfo}</p>
    </div>
  );
}
