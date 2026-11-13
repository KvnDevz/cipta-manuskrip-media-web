/**
 * Kerangka muat katalog (`/katalog/[status]`).
 *
 * Meniru susunan asli: breadcrumb, kepala katalog dua kolom (intro + tab di
 * kiri, kartu ringkasan stat di kanan), kisi 6 kartu buku, dan panel bantuan.
 */
export default function Loading() {
  return (
    <div className="katalog-page" aria-busy="true" aria-live="polite">
      <p className="sr-only">Memuat katalog…</p>

      <div className="katalog-crumbs katalog-skeleton-crumbs" aria-hidden="true">
        <span className="skeleton-line" style={{ width: 64 }} />
        <span className="skeleton-line" style={{ width: 120 }} />
      </div>

      <header className="katalog-hero" aria-hidden="true">
        <div className="katalog-hero-copy">
          <span className="skeleton-line" style={{ width: 130, height: 10 }} />
          <span className="skeleton-line skeleton-title" style={{ width: "62%", height: 40 }} />
          <span className="skeleton-line" style={{ width: "84%", height: 12 }} />
          <span className="skeleton-line" style={{ width: "70%", height: 12 }} />
          <div className="katalog-tabs">
            <span className="skeleton-pill" />
            <span className="skeleton-pill" />
          </div>
        </div>

        <aside className="katalog-stat">
          <span className="skeleton-line" style={{ width: 120, height: 9 }} />
          <span className="skeleton-line skeleton-title" style={{ width: 88, height: 34, marginTop: 18 }} />
          <span className="skeleton-line" style={{ width: "76%", height: 11, marginTop: 14 }} />
          <span className="skeleton-line" style={{ width: "90%", height: 11 }} />
          <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
            <span className="skeleton-pill" style={{ width: 92, height: 24 }} />
            <span className="skeleton-pill" style={{ width: 106, height: 24 }} />
          </div>
        </aside>
      </header>

      <ul className="kat-grid" aria-hidden="true">
        {Array.from({ length: 6 }, (_, i) => (
          <li key={i}>
            <div className="kat-card katalog-skeleton-card">
              <span className="skeleton-cover" />
              <div className="kat-card-body">
                <span className="skeleton-line" style={{ width: "80%", height: 15 }} />
                <span className="skeleton-line" style={{ width: "45%", height: 10 }} />
                <span className="skeleton-line" style={{ width: "100%", height: 1 }} />
                <span className="skeleton-line" style={{ width: "100%", height: 1 }} />
                <span className="skeleton-pill skeleton-wide" />
              </div>
            </div>
          </li>
        ))}
      </ul>

      <aside className="katalog-help" aria-hidden="true">
        <div>
          <span className="skeleton-line" style={{ width: 120, height: 9 }} />
          <span className="skeleton-line skeleton-title" style={{ width: "min(280px, 78%)", height: 24, marginTop: 12 }} />
          <span className="skeleton-line" style={{ width: "min(360px, 90%)", height: 12, marginTop: 12 }} />
        </div>
        <span className="skeleton-pill" style={{ width: 170, height: 44 }} />
      </aside>
    </div>
  );
}
