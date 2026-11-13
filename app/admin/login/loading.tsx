/**
 * Kerangka muat halaman masuk admin (`/admin/login`).
 *
 * Menggunakan div pembungkus (bukan `<main>`) agar kontrak aksesibilitas
 * kerangka tetap seragam, sambil menjaga tata letak split-screen di desktop
 * dan kartu tunggal di ponsel.
 */
export default function Loading() {
  return (
    <div className="admin-login-page" aria-busy="true" aria-live="polite">
      <p className="sr-only">Memuat halaman masuk admin…</p>

      <section className="admin-login-story" aria-hidden="true">
        <div className="admin-login-brand">
          <span className="skeleton-pill skeleton-dark" style={{ width: 40, height: 40, borderRadius: 10 }} />
          <div style={{ display: "grid", gap: 6 }}>
            <span className="skeleton-line skeleton-dark" style={{ width: 68, height: 11, marginTop: 0 }} />
            <span className="skeleton-line skeleton-dark" style={{ width: 112, height: 8, marginTop: 0 }} />
          </div>
        </div>

        <div className="admin-login-story-copy">
          <span className="skeleton-pill skeleton-dark" style={{ width: 156, height: 26 }} />
          <span className="skeleton-line skeleton-title skeleton-dark" style={{ width: "86%", height: 34, marginTop: 18 }} />
          <span className="skeleton-line skeleton-title skeleton-dark" style={{ width: "62%", height: 34, marginTop: 10 }} />
          <span className="skeleton-line skeleton-dark" style={{ width: "82%", height: 12, marginTop: 16 }} />
        </div>

        <div className="admin-login-visual">
          <span className="skeleton-cover skeleton-dark" style={{ width: 180, height: 180, borderRadius: "50%" }} />
        </div>

        <div className="admin-login-story-foot">
          <span className="skeleton-line skeleton-dark" style={{ width: 140, height: 9, marginTop: 0 }} />
          <span className="skeleton-line skeleton-dark" style={{ width: 130, height: 9, marginTop: 0 }} />
        </div>
      </section>

      <section className="admin-login-panel" aria-hidden="true">
        <div className="admin-login-mobile-brand">
          <span className="skeleton-pill" style={{ width: 34, height: 34, borderRadius: 9 }} />
          <span className="skeleton-line" style={{ width: 120, height: 12, marginTop: 0 }} />
        </div>

        <div className="admin-login-card">
          <span className="skeleton-pill" style={{ width: 42, height: 42, borderRadius: 12 }} />
          <span className="skeleton-line" style={{ width: 140, height: 9, marginTop: 18 }} />
          <span className="skeleton-line skeleton-title" style={{ width: "72%", height: 24, marginTop: 12 }} />
          <span className="skeleton-line" style={{ width: "84%", height: 11, marginTop: 10 }} />

          <div style={{ display: "grid", gap: 14, marginTop: 24 }}>
            <span className="skeleton-cover" style={{ height: 44, borderRadius: 10 }} />
            <span className="skeleton-cover" style={{ height: 44, borderRadius: 10 }} />
            <span className="skeleton-pill skeleton-wide" style={{ height: 44, borderRadius: 10 }} />
          </div>

          <span className="skeleton-line" style={{ width: 148, height: 11, marginTop: 22 }} />
        </div>
      </section>
    </div>
  );
}
