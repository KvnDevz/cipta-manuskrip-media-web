/**
 * Kerangka muat halaman Penerbitan Buku (`/publish-buku`).
 *
 * Meniru urutan persis halaman aslinya: hero dengan foto sisi kanan, tiga
 * kartu paket sejajar, blok asistensi dengan foto & formulir, empat pilar
 * kepercayaan, lalu pratinjau katalog.
 */
export default function Loading() {
  return (
    <div className="publish-page" aria-busy="true" aria-live="polite">
      <p className="sr-only">Memuat layanan penerbitan buku…</p>

      <section className="publish-hero" aria-hidden="true">
        <div className="publish-hero-content">
          <span className="skeleton-pill" style={{ width: 168 }} />
          <span className="skeleton-line skeleton-title" style={{ width: "88%", height: 44, marginTop: 22 }} />
          <span className="skeleton-line skeleton-title" style={{ width: "62%", height: 44, marginTop: 12 }} />
          <span className="skeleton-line" style={{ width: "92%", height: 12, marginTop: 22 }} />
          <span className="skeleton-line" style={{ width: "78%", height: 12 }} />
          <div className="publish-hero-actions home-skeleton-actions" style={{ justifyContent: "flex-start" }}>
            <span className="skeleton-pill" style={{ width: 148, height: 47 }} />
            <span className="skeleton-pill" style={{ width: 172, height: 47 }} />
          </div>
          <span className="skeleton-line" style={{ width: 136, height: 11, marginTop: 28 }} />
        </div>
        <div className="publish-hero-art publish-hero-art--foto" style={{ opacity: 0.55 }}>
          <span className="skeleton-cover" style={{ width: "100%", height: "100%", minHeight: 240, aspectRatio: "687 / 492", borderRadius: 14 }} />
        </div>
      </section>

      <section className="package-section" aria-hidden="true">
        <div className="package-heading">
          <div>
            <span className="skeleton-line" style={{ width: 150, height: 9 }} />
            <span className="skeleton-line skeleton-title" style={{ width: "min(300px, 80%)", height: 34, marginTop: 14 }} />
          </div>
          <span className="skeleton-line" style={{ width: "min(260px, 75%)", height: 12 }} />
        </div>
        <div className="package-grid">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="package-card">
              <div className="home-skeleton-between">
                <span className="skeleton-line" style={{ width: 74, height: 9, marginTop: 0 }} />
                <span className="skeleton-pill" style={{ width: 33, height: 33, borderRadius: 10 }} />
              </div>
              <span className="skeleton-line skeleton-title" style={{ width: "70%", height: 20, marginTop: 24 }} />
              <span className="skeleton-line" style={{ width: 110, height: 9, marginTop: 20 }} />
              <span className="skeleton-line skeleton-title" style={{ width: "58%", height: 26, marginTop: 10 }} />
              <span className="skeleton-line" style={{ width: "100%", height: 1, marginTop: 20 }} />
              {Array.from({ length: 4 }, (_, j) => (
                <span key={j} className="skeleton-line" style={{ width: j === 3 ? "56%" : "86%", height: 11, marginTop: 16 }} />
              ))}
              <span className="skeleton-pill skeleton-wide" style={{ marginTop: "auto" }} />
            </div>
          ))}
        </div>
      </section>

      <div className="assist-section" style={{ display: "contents" }} aria-hidden="true">
        <section className="assist-section assist-section--foto">
          <div className="assist-copy">
            <span className="skeleton-line" style={{ width: 190, height: 9 }} />
            <span className="skeleton-line skeleton-title" style={{ width: "90%", height: 34, marginTop: 18 }} />
            <span className="skeleton-line skeleton-title" style={{ width: "62%", height: 34, marginTop: 12 }} />
            <span className="skeleton-line" style={{ width: "84%", height: 12, marginTop: 22 }} />
            <span className="skeleton-line" style={{ width: "64%", height: 12 }} />
          </div>
          <div className="assist-media">
            <span className="skeleton-cover" style={{ width: "100%", height: "100%", minHeight: 160, aspectRatio: "963 / 423" }} />
          </div>
          <div className="assist-form-card">
            <span className="skeleton-line" style={{ width: 190, height: 10 }} />
            <span className="skeleton-line" style={{ width: "100%", height: 46, marginTop: 18, borderRadius: 12 }} />
            <span className="skeleton-line" style={{ width: "70%", height: 9 }} />
            <span className="skeleton-line" style={{ width: "100%", height: 48, marginTop: 20, borderRadius: 12 }} />
          </div>
        </section>
      </div>

      <div className="publish-trust" aria-hidden="true">
        <div className="trust-pillars home-skeleton-trust">
          <span className="skeleton-line" style={{ width: 190, height: 9 }} />
          <span className="skeleton-line skeleton-title" style={{ width: "min(520px, 74%)", height: 32, marginTop: 16 }} />
          <div className="trust-grid">
            {[0, 1, 2, 3].map((i) => (
              <span className="skeleton-cover" key={i} style={{ height: 280 }} />
            ))}
          </div>
        </div>
      </div>

      <section className="book-preview-section" aria-hidden="true">
        <div className="preview-intro">
          <span className="skeleton-line" style={{ width: 90, height: 9 }} />
          <span className="skeleton-line skeleton-title" style={{ width: "min(280px, 76%)", height: 32, marginTop: 14 }} />
          <span className="skeleton-line" style={{ width: "min(380px, 84%)", height: 12, marginTop: 14 }} />
        </div>
        <ul className="kat-grid" style={{ marginTop: 28 }}>
          {[0, 1, 2].map((i) => (
            <li key={i}>
              <div className="kat-card katalog-skeleton-card">
                <span className="skeleton-cover publish-preview-cover" />
                <div className="kat-card-body">
                  <span className="skeleton-line" style={{ width: "80%", height: 15 }} />
                  <span className="skeleton-line" style={{ width: "45%", height: 10 }} />
                  <span className="skeleton-pill skeleton-wide" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
