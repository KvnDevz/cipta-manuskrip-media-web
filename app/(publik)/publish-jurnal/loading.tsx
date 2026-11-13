/**
 * Kerangka muat halaman Publish Jurnal (`/publish-jurnal`).
 *
 * Banner gelap memakai shimmer terang agar bagian atas tetap terbaca. Visual
 * kanan mengikuti rasio foto lanskap 851:482, diikuti 3 kartu keunggulan,
 * placeholder video, 13 baris fasilitas, dan blok ajakan bawah.
 */
export default function Loading() {
  return (
    <div className="journal-page journal-overview" aria-busy="true" aria-live="polite">
      <p className="sr-only">Memuat layanan publikasi jurnal…</p>

      <section className="journal-hero" aria-hidden="true">
        <div className="journal-hero-copy">
          <span className="skeleton-line skeleton-dark" style={{ width: 200, height: 9 }} />
          <span className="skeleton-line skeleton-title skeleton-dark" style={{ width: "92%", height: 46, marginTop: 24 }} />
          <span className="skeleton-line skeleton-title skeleton-dark" style={{ width: "66%", height: 46, marginTop: 12 }} />
          <span className="skeleton-line skeleton-dark" style={{ width: "88%", height: 12, marginTop: 24 }} />
          <span className="skeleton-line skeleton-dark" style={{ width: "70%", height: 12 }} />
          <div className="journal-hero-actions home-skeleton-actions" style={{ justifyContent: "flex-start" }}>
            <span className="skeleton-pill skeleton-dark" style={{ width: 150, height: 48 }} />
            <span className="skeleton-pill skeleton-dark" style={{ width: 168, height: 48, opacity: 0.72 }} />
          </div>
          <span className="skeleton-line skeleton-dark" style={{ width: 120, height: 11, marginTop: 28 }} />
        </div>
        <div className="journal-hero-visual journal-hero-visual--foto">
          <span
            className="skeleton-cover skeleton-dark"
            style={{ width: "100%", height: "auto", aspectRatio: "851 / 482", borderRadius: 16 }}
          />
        </div>
      </section>

      <section className="journal-advantages-section" aria-hidden="true">
        <div className="journal-advantages-head">
          <span className="skeleton-line" style={{ width: 140, height: 9 }} />
          <span className="skeleton-line skeleton-title" style={{ width: "min(440px, 86%)", height: 32, marginTop: 14 }} />
        </div>
        <div className="journal-advantages-grid">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="journal-advantage-card">
              <span className="skeleton-pill" style={{ width: 46, height: 46, borderRadius: 12 }} />
              <span className="skeleton-line" style={{ width: 26, height: 9, marginTop: 16 }} />
              <span className="skeleton-line skeleton-title" style={{ width: "82%", height: 18, marginTop: 10 }} />
              <span className="skeleton-line" style={{ width: "96%", height: 11, marginTop: 14 }} />
              <span className="skeleton-line" style={{ width: "64%", height: 11 }} />
            </div>
          ))}
        </div>
        <div className="journal-video journal-video--skeleton">
          <span className="skeleton-cover" style={{ width: "100%", height: "100%", borderRadius: 0 }} />
        </div>
      </section>

      <section className="journal-facilities-section" aria-hidden="true">
        <div className="journal-facilities-heading">
          <div>
            <span className="skeleton-line" style={{ width: 150, height: 9 }} />
            <span className="skeleton-line skeleton-title" style={{ width: 200, height: 32, marginTop: 14 }} />
          </div>
          <span className="skeleton-line" style={{ width: 220, height: 12 }} />
        </div>
        <ul className="journal-facilities-grid">
          {Array.from({ length: 13 }, (_, i) => (
            <li key={i} className="journal-facility">
              <span className="skeleton-line" style={{ width: 20, height: 10, marginTop: 0 }} />
              <span className="skeleton-pill" style={{ width: 24, height: 24, borderRadius: "50%" }} />
              <span className="skeleton-line" style={{ width: "62%", height: 11, marginTop: 0 }} />
            </li>
          ))}
        </ul>
      </section>

      <section className="journal-next-step" aria-hidden="true">
        <div>
          <span className="skeleton-line" style={{ width: 140, height: 9 }} />
          <span className="skeleton-line skeleton-title" style={{ width: "min(280px, 76%)", height: 28, marginTop: 12 }} />
        </div>
        <div className="journal-next-actions">
          <span className="skeleton-pill" style={{ width: 150, height: 46 }} />
          <span className="skeleton-line" style={{ width: 132, height: 12, marginTop: 0 }} />
        </div>
      </section>
    </div>
  );
}
