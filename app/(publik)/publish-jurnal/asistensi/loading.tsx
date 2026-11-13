/**
 * Kerangka muat halaman Asistensi Penulisan Artikel (`/publish-jurnal/asistensi`).
 *
 * Meniru banner gelap dengan foto sisi kanan (atau atas di mobile), lalu area
 * kerja dua kolom: daftar 3 kategori jurnal dan panel formulir topik.
 */
export default function Loading() {
  return (
    <div className="journal-page journal-flow-page journal-assist-page" aria-busy="true" aria-live="polite">
      <p className="sr-only">Memuat asistensi penulisan artikel…</p>

      <section className="journal-flow-hero journal-assist-hero journal-flow-hero--banner" aria-hidden="true">
        <div className="journal-flow-banner" style={{ opacity: 0.45 }}>
          <span className="skeleton-cover skeleton-dark" style={{ width: "100%", height: "100%", minHeight: 190, aspectRatio: "763 / 426", borderRadius: 14 }} />
        </div>
        <span className="skeleton-line skeleton-dark" style={{ width: 180, height: 12, marginTop: 0 }} />
        <span className="skeleton-line skeleton-dark" style={{ width: 190, height: 9, marginTop: 22 }} />
        <span className="skeleton-line skeleton-title skeleton-dark" style={{ width: "min(520px, 86%)", height: 42, marginTop: 18 }} />
        <span className="skeleton-line skeleton-title skeleton-dark" style={{ width: "min(360px, 64%)", height: 42, marginTop: 10 }} />
        <span className="skeleton-line skeleton-dark" style={{ width: "min(430px, 76%)", height: 12, marginTop: 20 }} />
      </section>

      <section className="journal-assist-workspace" aria-hidden="true">
        <div className="journal-assist-info">
          <span className="skeleton-line" style={{ width: 140, height: 10 }} />
          <span className="skeleton-line skeleton-title" style={{ width: "86%", height: 32, marginTop: 16 }} />
          <span className="skeleton-line" style={{ width: "68%", height: 12, marginTop: 14 }} />
          <ol className="journal-assist-categories" style={{ marginTop: 22 }}>
            {[0, 1, 2].map((i) => (
              <li key={i} className="journal-assist-category">
                <span className="skeleton-line" style={{ width: 20, height: 11, marginTop: 0 }} />
                <div style={{ width: "100%" }}>
                  <span className="skeleton-line" style={{ width: "84%", height: 14, marginTop: 0 }} />
                  <span className="skeleton-cover" style={{ width: "100%", height: 52, marginTop: 12, borderRadius: 10 }} />
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="journal-assist-right">
          <div className="journal-assist-form-panel">
            <span className="skeleton-line" style={{ width: 130, height: 9 }} />
            <span className="skeleton-line skeleton-title" style={{ width: "80%", height: 24, marginTop: 12 }} />
            <span className="skeleton-line" style={{ width: "100%", height: 46, marginTop: 22, borderRadius: 12 }} />
            <span className="skeleton-line" style={{ width: "100%", height: 48, marginTop: 16, borderRadius: 12 }} />
          </div>
          <div className="journal-return-link">
            <span className="skeleton-line" style={{ width: 220, height: 12, marginInline: "auto" }} />
          </div>
        </div>
      </section>
    </div>
  );
}
