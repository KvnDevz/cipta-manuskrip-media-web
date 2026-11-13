/**
 * Kerangka muat halaman Tentang Kami (`/tentang-kami`).
 *
 * Meniru urutan persis: hero teks tengah + banner lebar, legalitas dua kolom
 * (dua dokumen berdampingan + catatan verifikasi), tim kami + empat peran,
 * kontak admin buku & jurnal, media sosial, lalu penutup.
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
          <span className="skeleton-line" style={{ width: "88%", height: 14, marginTop: 22 }} />
          <span className="skeleton-line" style={{ width: "72%", height: 14 }} />
          <div className="about-hero-actions home-skeleton-actions" style={{ justifyContent: "center" }}>
            <span className="skeleton-pill" style={{ width: 196, height: 46 }} />
            <span className="skeleton-pill" style={{ width: 148, height: 46 }} />
          </div>
        </div>
        <div className="about-hero-banner">
          <span className="skeleton-cover" style={{ width: "100%", height: "100%", borderRadius: 0 }} />
        </div>
      </section>

      <section className="about-legalitas" aria-hidden="true">
        <div className="about-legalitas-grid">
          <div className="about-legalitas-copy">
            <span className="skeleton-line" style={{ width: 140, height: 10 }} />
            <span className="skeleton-line skeleton-title" style={{ width: "86%", height: 44, marginTop: 22 }} />
            <span className="skeleton-line skeleton-title" style={{ width: "68%", height: 44, marginTop: 10 }} />
            <span className="skeleton-line" style={{ width: "92%", height: 14, marginTop: 26 }} />
            <span className="skeleton-line" style={{ width: "78%", height: 14 }} />
            <div className="about-legalitas-badges" style={{ display: "grid", gap: 10, marginTop: 22 }}>
              <span className="skeleton-pill" style={{ width: "min(280px, 100%)", height: 52, borderRadius: 12 }} />
              <span className="skeleton-pill" style={{ width: "min(250px, 100%)", height: 52, borderRadius: 12 }} />
            </div>
          </div>
          <div className="about-legalitas-visual">
            <div className="about-legalitas-docs" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, alignItems: "end", height: "auto" }}>
              <span className="skeleton-cover" style={{ width: "100%", height: "auto", aspectRatio: "443 / 552", borderRadius: 14 }} />
              <span className="skeleton-cover" style={{ width: "100%", height: "auto", aspectRatio: "520 / 312", borderRadius: 14 }} />
            </div>
          </div>
        </div>
        <div className="about-legalitas-note">
          <span className="skeleton-line" style={{ width: "82%", height: 14, margin: 0 }} />
        </div>
      </section>

      <section className="about-team" aria-hidden="true">
        <div className="about-team-head">
          <div>
            <span className="skeleton-line" style={{ width: 140, height: 10 }} />
            <span className="skeleton-line skeleton-title" style={{ width: "min(520px, 86%)", height: 40, marginTop: 18 }} />
            <span className="skeleton-line skeleton-title" style={{ width: "min(460px, 72%)", height: 40, marginTop: 10 }} />
          </div>
          <span className="skeleton-line" style={{ width: "78%", height: 14 }} />
        </div>
        <div className="about-team-photo">
          <span className="skeleton-cover" style={{ width: "100%", height: "auto", aspectRatio: "1584 / 672", borderRadius: 0 }} />
          <div className="about-team-roles" style={{ position: "static", background: "#f2f6f2", padding: "22px 24px" }}>
            {[0, 1, 2, 3].map((i) => (
              <div className="about-team-role" key={i}>
                <span className="skeleton-line" style={{ width: "70%", height: 16, marginInline: "auto" }} />
                <span className="skeleton-line" style={{ width: "86%", height: 11, marginInline: "auto" }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-contact" aria-hidden="true">
        <div className="about-contact-heading">
          <span className="skeleton-line" style={{ width: 140, height: 10 }} />
          <span className="skeleton-line skeleton-title" style={{ width: "min(360px, 84%)", height: 32, marginTop: 14 }} />
        </div>
        <div className="about-contact-grid">
          <span className="skeleton-cover" style={{ height: 86, borderRadius: 16 }} />
          <span className="skeleton-cover" style={{ height: 86, borderRadius: 16 }} />
        </div>
      </section>

      <section className="about-medsos" aria-hidden="true">
        <div className="about-medsos-card">
          <div>
            <span className="skeleton-line" style={{ width: 180, height: 10 }} />
            <span className="skeleton-line skeleton-title" style={{ width: 130, height: 30, marginTop: 12 }} />
            <span className="skeleton-line" style={{ width: "82%", height: 12, marginTop: 14 }} />
          </div>
          <div className="about-medsos-grid">
            {[0, 1, 2, 3].map((kotak) => (
              <span key={kotak} className="skeleton-pill" style={{ width: "100%", height: 70, borderRadius: 14 }} />
            ))}
            <span className="skeleton-pill about-medsos-item--wide" style={{ width: "100%", height: 70, borderRadius: 14 }} />
          </div>
        </div>
      </section>
    </div>
  );
}
