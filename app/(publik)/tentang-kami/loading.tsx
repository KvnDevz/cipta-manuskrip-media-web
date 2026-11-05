/**
 * Kerangka muat halaman Tentang Kami — teks + pill di atas, banner lebar
 * di bawah, lalu dua blok narasi (selaras hero §7.1).
 */
export default function Loading() {
  return (
    <div className="about-page" aria-busy="true" aria-live="polite">
      <p className="sr-only">Memuat halaman tentang kami…</p>

      <section className="about-hero about-hero--baru" aria-hidden="true">
        <div className="about-hero-copy">
          <span className="skeleton-line" style={{ width: 190, height: 9, marginTop: 28 }} />
          <span className="skeleton-line skeleton-title" style={{ width: "92%", height: 46, marginTop: 18 }} />
          <span className="skeleton-line skeleton-title" style={{ width: "64%", height: 46, marginTop: 12 }} />
          <span className="skeleton-line" style={{ width: "88%", height: 12, marginTop: 22 }} />
          <span className="skeleton-line" style={{ width: "72%", height: 12 }} />
          <div className="about-pills">
            <span className="skeleton-pill" style={{ width: 74, height: 27 }} />
            <span className="skeleton-pill" style={{ width: 122, height: 27 }} />
            <span className="skeleton-pill" style={{ width: 92, height: 27 }} />
          </div>
          <div className="home-skeleton-actions" style={{ justifyContent: "flex-start" }}>
            <span className="skeleton-pill" style={{ width: 196, height: 46 }} />
            <span className="skeleton-pill" style={{ width: 148, height: 46, background: "transparent" }} />
          </div>
        </div>
        <div className="about-hero-banner">
          <span className="skeleton-cover" style={{ width: "100%", height: "100%", borderRadius: 0 }} />
        </div>
      </section>

      {["about-intro", "about-values"].map((kelas) => (
        <section key={kelas} className={kelas} aria-hidden="true">
          <div className="about-section-heading">
            <span className="skeleton-line" style={{ width: 140, height: 9 }} />
            <span className="skeleton-line skeleton-title" style={{ width: "min(380px, 62%)", height: 32, marginTop: 14 }} />
          </div>
          <div className="home-skeleton-grid">
            {[0, 1].map((kolom) => (
              <div key={kolom} className="journal-skeleton-card">
                <span className="skeleton-line" style={{ width: "88%", height: 12, marginTop: 0 }} />
                <span className="skeleton-line" style={{ width: "96%", height: 12 }} />
                <span className="skeleton-line" style={{ width: "74%", height: 12 }} />
                <span className="skeleton-line" style={{ width: "84%", height: 12 }} />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
