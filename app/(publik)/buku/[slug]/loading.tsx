/**
 * Kerangka muat halaman detail buku (`/buku/[slug]`).
 *
 * Meniru susunan asli: breadcrumb, bingkai sampul + badge status di kiri, dan
 * kicker, judul, fakta ISBN/harga, grid 4 spesifikasi, sinopsis, serta panel
 * pesan WhatsApp di kanan.
 */
export default function Loading() {
  return (
    <div className="detail-page" aria-busy="true" aria-live="polite">
      <p className="sr-only">Memuat detail buku…</p>

      <div className="detail-crumbs detail-skeleton-crumbs" aria-hidden="true">
        <span className="skeleton-line" style={{ width: 60 }} />
        <span className="skeleton-line" style={{ width: 110 }} />
      </div>

      <div className="detail-shell" aria-hidden="true">
        <div className="detail-media">
          <div className="detail-cover-frame">
            <span className="skeleton-cover skeleton-cover--tall" />
          </div>
          <div className="detail-media-caption" style={{ gap: 10 }}>
            <span className="skeleton-pill" style={{ width: 104, height: 24 }} />
            <span className="skeleton-line" style={{ width: 130, height: 10, marginTop: 0 }} />
          </div>
        </div>

        <div className="detail-content">
          <span className="skeleton-line" style={{ width: 140, height: 10 }} />
          <span className="skeleton-line skeleton-title" style={{ width: "76%", height: 38 }} />
          <span className="skeleton-line" style={{ width: "34%", height: 13 }} />

          <div className="detail-facts">
            <span className="skeleton-line" style={{ width: "100%", height: 38, marginTop: 0 }} />
            <span className="skeleton-line" style={{ width: "100%", height: 38, marginTop: 0 }} />
            <span className="skeleton-line" style={{ width: "100%", height: 38, marginTop: 0 }} />
          </div>

          <div className="detail-specs">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="skeleton-line" style={{ width: "100%", height: 38, marginTop: 0 }} />
            ))}
          </div>

          <div className="detail-section">
            <span className="skeleton-line" style={{ width: 90, height: 14 }} />
            <span className="skeleton-line" style={{ width: "100%", height: 12, marginTop: 12 }} />
            <span className="skeleton-line" style={{ width: "92%", height: 12 }} />
            <span className="skeleton-line" style={{ width: "64%", height: 12 }} />
          </div>

          <div className="detail-order">
            <div style={{ width: "100%" }}>
              <span className="skeleton-line" style={{ width: 170, height: 13, marginTop: 0 }} />
              <span className="skeleton-line" style={{ width: "86%", height: 11, marginTop: 8 }} />
            </div>
            <div className="detail-order-actions">
              <span className="skeleton-pill" style={{ width: 152, height: 44 }} />
              <span className="skeleton-pill" style={{ width: 132, height: 44 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
