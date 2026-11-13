import { describe, expect, it, vi } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";

vi.mock("next/navigation", () => ({
  usePathname: () => "/publish-buku",
}));

import { HapticUI, hapticKindFor, shouldStartNavProgress } from "./HapticUI";

describe("HapticUI", () => {
  it("merender garis kemajuan rute sebagai elemen dekoratif aria-hidden", () => {
    const html = renderToStaticMarkup(<HapticUI />);
    expect(html).toContain('class="route-progress"');
    expect(html).toContain('aria-hidden="true"');
  });

  it("mengklasifikasikan jenis getaran taktil berdasarkan peran elemen", () => {
    const mockEl = (matched: string[]) => ({
      matches: (sel: string) => matched.some((m) => sel.includes(m)),
    });

    expect(hapticKindFor(mockEl([".admin-danger-button"]))).toBe("warn");
    expect(hapticKindFor(mockEl([".button-primary"]))).toBe("confirm");
    expect(hapticKindFor(mockEl([".package-action"]))).toBe("confirm");
    expect(hapticKindFor(mockEl([".nav-link"]))).toBe("tap");
  });

  it("hanya menyalakan garis kemajuan pada navigasi rute internal yang berbeda", () => {
    expect(shouldStartNavProgress("/publish-buku", null, false, "/")).toBe(true);
    expect(shouldStartNavProgress("/katalog/published?page=2", null, false, "/publish-buku")).toBe(true);
    expect(shouldStartNavProgress("/publish-buku#paket", null, false, "/publish-buku")).toBe(false);
    expect(shouldStartNavProgress("/publish-buku", "_blank", false, "/")).toBe(false);
    expect(shouldStartNavProgress("https://wa.me/628", null, false, "/")).toBe(false);
    expect(shouldStartNavProgress("#paket", null, false, "/publish-buku")).toBe(false);
    expect(shouldStartNavProgress("/berkas.pdf", null, true, "/")).toBe(false);
  });
});
