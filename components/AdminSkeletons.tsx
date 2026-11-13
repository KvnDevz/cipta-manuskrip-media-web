/**
 * Kerangka muat bersama untuk seluruh halaman panel admin dan preview admin.
 *
 * Setiap fungsi menjaga susunan kolom, kartu ringkasan, toolbar, baris tabel,
 * serta bilah samping agar perpindahan dari loading ke konten tidak bergeser
 * baik di desktop maupun di ponsel.
 */

export function AdminDashboardSkeleton({ srText }: { srText: string }) {
  return (
    <div className="admin-page" aria-busy="true" aria-live="polite">
      <p className="sr-only">{srText}</p>

      <div className="admin-page-heading" aria-hidden="true">
        <div>
          <span className="skeleton-line" style={{ width: 132, height: 9 }} />
          <span className="skeleton-line skeleton-title" style={{ width: "min(300px, 70%)", height: 30, marginTop: 12 }} />
          <span className="skeleton-line" style={{ width: "min(340px, 80%)", height: 11 }} />
        </div>
        <span className="skeleton-pill" style={{ width: 140, height: 42, borderRadius: 9 }} />
      </div>

      <section className="admin-stats-grid" aria-hidden="true">
        {[0, 1, 2].map((i) => (
          <div key={i} className="admin-stat-card">
            <span className="skeleton-line" style={{ width: 96, height: 10, marginTop: 0 }} />
            <span className="skeleton-line skeleton-title" style={{ width: 70, height: 27, marginTop: 16 }} />
            <span className="skeleton-line" style={{ width: 120, height: 8 }} />
          </div>
        ))}
      </section>

      <section className="admin-panel" aria-hidden="true">
        <div className="admin-panel-heading">
          <div>
            <span className="skeleton-line" style={{ width: 150, height: 15 }} />
            <span className="skeleton-line" style={{ width: 220, height: 9 }} />
          </div>
          <span className="skeleton-line" style={{ width: 96, height: 10 }} />
        </div>
        <div className="admin-list-toolbar">
          <span className="skeleton-line" style={{ width: 170, height: 11, marginTop: 0 }} />
          <span className="skeleton-line" style={{ width: 120, height: 10, marginTop: 0 }} />
        </div>
        <ul className="admin-skeleton-rows">
          {[0, 1, 2, 3, 4].map((i) => (
            <li key={i} className="admin-skeleton-row">
              <span className="skeleton-cover admin-skeleton-thumb" />
              <span className="admin-skeleton-text">
                <span className="skeleton-line" style={{ width: "72%", height: 11, marginTop: 0 }} />
                <span className="skeleton-line" style={{ width: "42%", height: 9 }} />
              </span>
              <span className="skeleton-pill" style={{ width: 86, height: 24 }} />
              <span className="skeleton-line" style={{ width: 74, height: 9, marginTop: 0 }} />
            </li>
          ))}
        </ul>
      </section>

      <section className="admin-quick-actions" aria-hidden="true">
        {[0, 1].map((i) => (
          <div key={i} className="admin-quick-card">
            <span className="skeleton-pill" style={{ width: 38, height: 38, borderRadius: 10 }} />
            <div style={{ width: "100%" }}>
              <span className="skeleton-line" style={{ width: 140, height: 13, marginTop: 0 }} />
              <span className="skeleton-line" style={{ width: "76%", height: 10, marginTop: 8 }} />
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}

export function AdminBukuListSkeleton({ srText }: { srText: string }) {
  return (
    <div className="admin-page" aria-busy="true" aria-live="polite">
      <p className="sr-only">{srText}</p>

      <div className="admin-page-heading" aria-hidden="true">
        <div>
          <span className="skeleton-line" style={{ width: 112, height: 9 }} />
          <span className="skeleton-line skeleton-title" style={{ width: "min(220px, 60%)", height: 30, marginTop: 12 }} />
          <span className="skeleton-line" style={{ width: "min(340px, 82%)", height: 11 }} />
        </div>
        <span className="skeleton-pill" style={{ width: 138, height: 42, borderRadius: 9 }} />
      </div>

      <section className="admin-panel admin-books-panel" aria-hidden="true">
        <div className="admin-list-toolbar">
          <span className="skeleton-line" style={{ width: 160, height: 14, marginTop: 0 }} />
          <span className="skeleton-line" style={{ width: 150, height: 10, marginTop: 0 }} />
        </div>
        <ul className="admin-skeleton-rows">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <li key={i} className="admin-skeleton-row">
              <span className="skeleton-cover admin-skeleton-thumb" />
              <span className="admin-skeleton-text">
                <span className="skeleton-line" style={{ width: "78%", height: 12, marginTop: 0 }} />
                <span className="skeleton-line" style={{ width: "48%", height: 9 }} />
              </span>
              <span className="skeleton-pill" style={{ width: 92, height: 24 }} />
              <span className="skeleton-line" style={{ width: 96, height: 10, marginTop: 0 }} />
            </li>
          ))}
        </ul>
        <div className="admin-list-footer">
          <span className="skeleton-line" style={{ width: 180, height: 10, marginTop: 0 }} />
        </div>
      </section>
    </div>
  );
}

export function AdminBukuFormSkeleton({ mode, srText }: { mode: "tambah" | "edit"; srText: string }) {
  const isEdit = mode === "edit";

  return (
    <div className="admin-page" aria-busy="true" aria-live="polite">
      <p className="sr-only">{srText}</p>

      <div className="admin-back-link" aria-hidden="true">
        <span className="skeleton-line" style={{ width: 164, height: 12, marginTop: 0 }} />
      </div>

      <div className="admin-page-heading admin-form-page-heading" aria-hidden="true">
        <div>
          <span className="skeleton-line" style={{ width: 128, height: 9 }} />
          <span className="skeleton-line skeleton-title" style={{ width: "min(240px, 68%)", height: 30, marginTop: 12 }} />
          <span className="skeleton-line" style={{ width: "min(340px, 84%)", height: 11 }} />
        </div>
        <span className="skeleton-pill" style={{ width: isEdit ? 172 : 44, height: 42, borderRadius: 10 }} />
      </div>

      <div className={`admin-form-layout ${isEdit ? "admin-edit-layout" : ""}`} aria-hidden="true">
        <div className="admin-form-main">
          <div className="admin-skeleton-form">
            <div className="admin-skeleton-fields">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div key={i}>
                  <span className="skeleton-line" style={{ width: 96, height: 10, marginTop: 0 }} />
                  <span className="skeleton-cover" style={{ height: 42, marginTop: 8, borderRadius: 10 }} />
                </div>
              ))}
              <div className="admin-skeleton-field-full">
                <span className="skeleton-line" style={{ width: 84, height: 10, marginTop: 0 }} />
                <span className="skeleton-cover" style={{ height: 112, marginTop: 8, borderRadius: 10 }} />
              </div>
              <div className="admin-skeleton-field-full">
                <span className="skeleton-line" style={{ width: 110, height: 10, marginTop: 0 }} />
                <span className="skeleton-cover" style={{ height: 84, marginTop: 8, borderRadius: 10 }} />
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 22 }}>
              <span className="skeleton-pill" style={{ width: 152, height: 42, borderRadius: 10 }} />
            </div>
          </div>
        </div>

        <aside className={`admin-form-aside ${isEdit ? "admin-edit-aside" : ""}`}>
          {isEdit ? (
            <>
              <div className="admin-cover-preview">
                <div className="admin-cover-preview-head">
                  <span className="skeleton-line" style={{ width: 110, height: 11, marginTop: 0 }} />
                  <span className="skeleton-pill" style={{ width: 64, height: 20 }} />
                </div>
                <span className="skeleton-cover" style={{ width: 132, height: 184, margin: "14px auto", borderRadius: 10 }} />
                <span className="skeleton-line" style={{ width: "74%", height: 14 }} />
                <span className="skeleton-line" style={{ width: "48%", height: 11 }} />
              </div>
              <div className="admin-danger-zone">
                <span className="skeleton-line" style={{ width: 110, height: 14, marginTop: 0 }} />
                <span className="skeleton-line" style={{ width: "92%", height: 10, marginTop: 10 }} />
                <span className="skeleton-pill" style={{ width: "100%", height: 40, marginTop: 14, borderRadius: 10 }} />
              </div>
            </>
          ) : (
            [0, 1].map((i) => (
              <div key={i} className={`admin-aside-note ${i === 1 ? "admin-aside-note-soft" : ""}`}>
                <span className="skeleton-pill" style={{ width: 32, height: 32, borderRadius: 8 }} />
                <div style={{ width: "100%" }}>
                  <span className="skeleton-line" style={{ width: 130, height: 12, marginTop: 0 }} />
                  <span className="skeleton-line" style={{ width: "92%", height: 10, marginTop: 8 }} />
                  <span className="skeleton-line" style={{ width: "70%", height: 10 }} />
                </div>
              </div>
            ))
          )}
        </aside>
      </div>
    </div>
  );
}
