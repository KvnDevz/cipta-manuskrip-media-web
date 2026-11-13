/**
 * Kerangka muat beranda — mengikuti susunan asli halaman `/` di desktop dan
 * mobile agar transisi saat konten datang tidak menyebabkan lompatan tata letak.
 */
export default function Loading() {
  return (
    <div aria-busy="true" aria-live="polite">
      <p className="sr-only">Memuat beranda…</p>

      <section className="home-hero home-hero--foto home-hero-skeleton" aria-hidden="true">
        <div className="hero-copy home-skeleton-center">
          <span className="skeleton-pill" style={{ width: 210 }} />
          <span className="skeleton-line skeleton-title" style={{ width: "min(560px, 82%)", height: 46, marginTop: 24 }} />
          <span className="skeleton-line skeleton-title" style={{ width: "min(360px, 58%)", height: 46, marginTop: 12 }} />
          <span className="skeleton-line" style={{ width: "min(420px, 72%)", height: 14, marginTop: 22 }} />
          <div className="hero-actions home-skeleton-actions">
            <span className="skeleton-pill" style={{ width: 162, height: 50 }} />
            <span className="skeleton-pill" style={{ width: 162, height: 50 }} />
          </div>
          <div className="hero-buku home-skeleton-buku">
            <span className="skeleton-cover" style={{ width: 200, height: 224, borderRadius: 12 }} />
          </div>
        </div>
      </section>

      <section className="home-comparison-section home-hero-skeleton" aria-hidden="true">
        <div className="hero-photo-layout hero-comparison home-skeleton-hero">
          <div className="hero-photo-card home-skeleton-card home-skeleton-card--kiri">
            <span className="skeleton-line" style={{ width: 120, height: 9 }} />
            <span className="skeleton-line skeleton-title" style={{ width: "72%", height: 22, marginTop: 12 }} />
            <div className="home-skeleton-steps">
              {[0, 1, 2].map((i) => (
                <div className="home-skeleton-step" key={i}>
                  <span className="skeleton-cover" style={{ width: 52, height: 52 }} />
                  <span className="skeleton-line" style={{ width: "66%", height: 10 }} />
                </div>
              ))}
            </div>
          </div>

          <div className="hero-photo-card home-skeleton-card home-skeleton-card--kanan">
            <span className="skeleton-line" style={{ width: 140, height: 9 }} />
            <span className="skeleton-line skeleton-title" style={{ width: "82%", height: 22, marginTop: 12 }} />
            <div className="home-skeleton-steps">
              {[0, 1, 2].map((i) => (
                <div className="home-skeleton-step" key={i}>
                  <span className="skeleton-cover" style={{ width: 52, height: 52 }} />
                  <span className="skeleton-line" style={{ width: "66%", height: 10 }} />
                </div>
              ))}
            </div>
          </div>

          <span className="skeleton-pill" style={{ width: "min(440px, 84%)", height: 28, gridColumn: "1 / -1", margin: "16px auto 22px" }} />
        </div>
      </section>

      <div className="logo-marquee home-skeleton-marquee" aria-hidden="true">
        <span className="skeleton-line" style={{ width: 170, height: 9 }} />
        <div className="home-skeleton-marquee-track">
          {[0, 1, 2, 3].map((i) => (
            <span className="skeleton-cover" key={i} style={{ width: 170, height: 60 }} />
          ))}
        </div>
      </div>

      <section className="home-prinsip home-skeleton-prinsip" aria-hidden="true">
        <span className="skeleton-line" style={{ width: 190, height: 9 }} />
        <span className="skeleton-line skeleton-title" style={{ width: "min(560px, 78%)", height: 40, marginTop: 16 }} />
        <div className="prinsip-grid" style={{ marginTop: 28 }}>
          {[0, 1, 2, 3].map((i) => (
            <span className="skeleton-cover prinsip-card" key={i} style={{ height: 210 }} />
          ))}
        </div>
      </section>

      <section className="home-faq mx-auto max-w-6xl px-5 pb-24 sm:px-8" aria-hidden="true">
        <div className="home-section-head">
          <span className="skeleton-line" style={{ width: 110, height: 9 }} />
          <span className="skeleton-line skeleton-title" style={{ width: "min(460px, 82%)", height: 34, marginTop: 14 }} />
        </div>
        <div className="home-faq-list">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="home-faq-item" style={{ padding: "18px 20px" }}>
              <span className="skeleton-line" style={{ width: i % 2 === 0 ? "68%" : "56%", height: 14, marginTop: 0 }} />
            </div>
          ))}
        </div>
      </section>

      <section className="home-contact mx-auto max-w-6xl px-5 pb-24 sm:px-8" aria-hidden="true">
        <div className="home-contact-panel">
          <div className="home-contact-copy">
            <span className="skeleton-line" style={{ width: 150, height: 9 }} />
            <span className="skeleton-line skeleton-title" style={{ width: "86%", height: 34, marginTop: 14 }} />
            <span className="skeleton-line" style={{ width: "92%", height: 12, marginTop: 16 }} />
            <span className="skeleton-line" style={{ width: "70%", height: 12 }} />
          </div>
          <div className="home-contact-cards">
            <span className="skeleton-cover" style={{ height: 84, borderRadius: 16 }} />
            <span className="skeleton-cover" style={{ height: 84, borderRadius: 16 }} />
          </div>
        </div>
      </section>
    </div>
  );
}
