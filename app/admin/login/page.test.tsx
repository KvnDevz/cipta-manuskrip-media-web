import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import Page from "./page";

describe("halaman login admin", () => {
  const html = renderToStaticMarkup(<Page />);

  it("tidak lagi menawarkan tautan buka pratinjau demo", () => {
    expect(html).not.toContain("Buka pratinjau demo");
    expect(html).not.toContain("/admin/preview");
    expect(html).not.toContain("admin-login-demo-note");
  });

  it("tetap memuat formulir masuk dan tautan kembali ke situs utama", () => {
    expect(html).toContain("Masuk ke panel admin");
    expect(html).toContain("Kembali ke situs utama");
    expect(html).toContain('href="/"');
  });
});
