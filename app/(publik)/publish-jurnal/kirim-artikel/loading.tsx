/**
 * Kerangka muat halaman Kirim Artikel (`/publish-jurnal/kirim-artikel`).
 *
 * Banner gelap dengan foto sisi kanan (atau atas di mobile) ditambah tepat
 * tiga kartu kategori tujuan dan catatan privasi di bagian bawah.
 */
export default function Loading() {
  return (
    <div className="journal-page journal-flow-page journal-submit-page" aria-busy="true" aria-live="polite">
      <p className="sr-only">Memuat halaman kirim artikel…</p>

      <section className="journal-flow-hero journal-submit-hero journal-flow-hero--banner" aria-hidden="true">
        <div className="journal-flow-banner" style={{ opacity: 0.45 }}>
          <span className="skeleton-cover skeleton-dark" style={{ width: "100%", height: "100%", minHeight: 190, aspectRatio: "668 / 400", borderRadius: 14 }} />
        </div>
        <span className="skeleton-line skeleton-dark" style={{ width: 180, height: 12, marginTop: 0 }} />
        <span className="skeleton-line skeleton-dark" style={{ width: 160, height: 9, marginTop: 22 }} />
        <span className="skeleton-line skeleton-title skeleton-dark" style={{ width: "min(480px, 82%)", height: 42, marginTop: 18 }} />
        <span className="skeleton-line skeleton-dark" style={{ width: "min(420px, 74%)", height: 12, marginTop: 20 }} />
        <span className="skeleton-line skeleton-dark" style={{ width: "min(300px, 54%)", height: 12 }} />
      </section>

      <section className="journal-category-section" aria-hidden="true">
        <div className="journal-section-heading">
          <div>
            <span className="skeleton-line" style={{ width: 130, height: 9 }} />
            <span className="skeleton-line skeleton-title" style={{ width: 260, height: 32, marginTop: 14 }} />
          </div>
          <span className="skeleton-line" style={{ width: "min(250px, 75%)", height: 12 }} />
        </div>

        <div className="journal-category-grid">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="journal-skeleton-card">
              <div className="home-skeleton-between">
                <span className="skeleton-line" style={{ width: 52, height: 9, marginTop: 0 }} />
                <span className="skeleton-pill" style={{ width: 30, height: 30, borderRadius: 9 }} />
              </div>
              <span className="skeleton-line skeleton-title" style={{ width: "82%", height: 20, marginTop: 20 }} />
              <span className="skeleton-line skeleton-title" style={{ width: "54%", height: 20, marginTop: 8 }} />
              <span className="skeleton-cover" style={{ height: 96, marginTop: 18 }} />
              <span className="skeleton-pill skeleton-wide" style={{ marginTop: "auto" }} />
            </div>
          ))}
        </div>

        <span className="skeleton-line" style={{ width: "min(340px, 82%)", height: 12, marginTop: 24 }} />
      </section>
    </div>
  );
}
