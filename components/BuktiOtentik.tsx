import { Check, Inbox, Mail, MoreHorizontal, X } from "lucide-react";

/**
 * Mockup "bukti otentik" untuk hero `/publish-jurnal` (brief §3.2).
 *
 * Ketiganya sengaja berupa MOCKUP, bukan dokumen asli: tanggal memakai
 * "—" dan ada catatan "ilustrasi alur", supaya tidak ada riwayat
 * korespondensi karangan yang terbaca sebagai bukti sungguhan. Saat klien
 * mengirim tangkapan layar asli, ganti isi kartu ini dengan <img> dan
 * hapus catatan mockup.
 *
 * Ketiga kartu dipakai sebagai floating cards di sekeliling foto dosen.
 */

export function MockupGmail() {
  return (
    <div className="bukti-card bukti-card--gmail">
      <div className="bukti-card__kepala">
        <span className="bukti-gmail-mark" aria-hidden="true"><Mail size={12} /></span>
        <strong>Inbox</strong>
        <MoreHorizontal size={13} aria-hidden="true" />
      </div>
      <div className="bukti-email">
        <span className="bukti-email__pengirim">
          <Inbox size={11} aria-hidden="true" /> Editorial Office
        </span>
        <p>Your submission has been reviewed and we encourage you to submit revisions...</p>
      </div>
      <p className="bukti-card__catatan">Bukti korespondensi email · mockup</p>
    </div>
  );
}

const TAHAP_TIMELINE = [
  "Pengiriman artikel",
  "Komentar editorial",
  "Review 1–4",
  "Submit revisi",
  "Accepted & copyediting",
];

export function MockupTimelineSinta() {
  return (
    <div className="bukti-card bukti-card--timeline">
      <div className="bukti-card__kepala">
        <strong>Timeline Publikasi SINTA 2</strong>
        <span>riwayat</span>
      </div>
      <ul className="bukti-timeline">
        {TAHAP_TIMELINE.map((tahap, i) => (
          <li key={tahap}>
            <span className="bukti-timeline__tanggal" aria-label="tanggal menyusul">—</span>
            <span className="bukti-timeline__titik" aria-hidden="true">
              {i === TAHAP_TIMELINE.length - 1 ? <Check size={9} /> : null}
            </span>
            <span>{tahap}</span>
          </li>
        ))}
      </ul>
      <p className="bukti-card__catatan">Ilustrasi alur, bukan data riwayat</p>
    </div>
  );
}

export function MockupOjs() {
  return (
    <div className="bukti-card bukti-card--ojs">
      <div className="bukti-card__kepala bukti-card__kepala--ojs">
        <span className="bukti-ojs-dot" aria-hidden="true" />
        <strong>Notifications</strong>
        <X size={12} aria-hidden="true" />
      </div>
      <div className="bukti-ojs-body">
        <p>Your submission has been sent for another round of review</p>
        <p>Submission accepted</p>
        <span className="bukti-ojs-workflow">Workflow / Round 1</span>
      </div>
      <p className="bukti-card__catatan">Mockup antarmuka OJS</p>
    </div>
  );
}
