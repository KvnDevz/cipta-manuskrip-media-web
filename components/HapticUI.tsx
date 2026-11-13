"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export type HapticKind = "warn" | "confirm" | "tap";

const INTERACTIVE_SELECTOR = [
  "a",
  "button",
  "summary",
  "[role='button']",
  ".hero-photo-card",
  ".kat-card",
  ".admin-stat-card",
  ".admin-quick-card",
  ".home-contact-card",
  ".about-contact-card",
  ".about-medsos-item",
  ".journal-category-card",
].join(",");

const CONFIRM_SELECTOR = [
  "button[type='submit']",
  ".button-primary",
  ".package-action",
  ".journal-button",
  ".publish-button",
  ".about-button",
  ".asistensi-submit",
  ".admin-primary-button",
  ".admin-login-submit",
  ".detail-order-whatsapp",
].join(",");

const WARN_SELECTOR = ".admin-danger-button, [data-haptic='warn']";

/** Menentukan intensitas umpan balik taktil sesuai jenis aksi elemen. */
export function hapticKindFor(el: { matches?: (selector: string) => boolean }): HapticKind {
  if (!el.matches) return "tap";
  if (el.matches(WARN_SELECTOR)) return "warn";
  if (el.matches(CONFIRM_SELECTOR)) return "confirm";
  return "tap";
}

/** Menentukan apakah klik tautan perlu memicu garis kemajuan navigasi. */
export function shouldStartNavProgress(
  href: string | null,
  target: string | null,
  download: boolean,
  currentPathname: string,
): boolean {
  if (!href || download) return false;
  if (target && target !== "_self") return false;
  if (!href.startsWith("/") || href.startsWith("//")) return false;
  const targetPath = href.split(/[?#]/)[0] || "/";
  return targetPath !== currentPathname;
}

function vibrate(kind: HapticKind) {
  if (typeof navigator === "undefined" || typeof navigator.vibrate !== "function") return;
  try {
    if (kind === "warn") {
      navigator.vibrate([8, 28, 10]);
    } else if (kind === "confirm") {
      navigator.vibrate(11);
    } else {
      navigator.vibrate(6);
    }
  } catch {
    // Sebagian peramban memblokir vibrate sebelum interaksi penuh — abaikan diam-diam.
  }
}

/**
 * Lapisan pengalaman taktil & kehalusan antarhalaman untuk seluruh rute.
 *
 * 1. Memberi kelas `.is-haptic-pressed` dengan penahanan minimal ~95ms supaya
 *    ketukan cepat di ponsel tetap terasa memegas tanpa tertahan saat gulir.
 * 2. Memicu getaran mikro `navigator.vibrate` (perangkat yang mendukung) dan
 *    berhenti total bila pengguna mengaktifkan `prefers-reduced-motion`.
 * 3. Menampilkan garis kemajuan 2.5px di tepi atas selama perpindahan rute.
 */
export function HapticUI() {
  const pathname = usePathname() ?? "/";
  const [navState, setNavState] = useState<"idle" | "loading" | "done">("idle");
  const prevPathRef = useRef(pathname);
  const doneTimerRef = useRef<number | null>(null);
  const failSafeRef = useRef<number | null>(null);

  useEffect(() => {
    if (prevPathRef.current === pathname) return;
    prevPathRef.current = pathname;

    if (failSafeRef.current) {
      window.clearTimeout(failSafeRef.current);
      failSafeRef.current = null;
    }

    setNavState((curr) => (curr === "loading" ? "done" : "idle"));
    if (doneTimerRef.current) window.clearTimeout(doneTimerRef.current);
    doneTimerRef.current = window.setTimeout(() => {
      setNavState("idle");
    }, 260);
  }, [pathname]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let pressedEl: HTMLElement | null = null;
    let pressStart = 0;
    let startX = 0;
    let startY = 0;
    let moved = false;
    let lastVibrateAt = 0;
    let releaseTimer: number | null = null;

    function clearPress(immediate = false) {
      if (!pressedEl) return;
      const target = pressedEl;
      pressedEl = null;

      if (releaseTimer) {
        window.clearTimeout(releaseTimer);
        releaseTimer = null;
      }

      const elapsed = performance.now() - pressStart;
      const holdMs = immediate || reducedMotion.matches ? 0 : Math.max(0, 95 - elapsed);

      if (holdMs === 0) {
        target.classList.remove("is-haptic-pressed");
      } else {
        releaseTimer = window.setTimeout(() => {
          target.classList.remove("is-haptic-pressed");
          releaseTimer = null;
        }, holdMs);
      }
    }

    function onPointerDown(event: PointerEvent) {
      if (event.button !== 0 && event.pointerType === "mouse") return;
      const raw = event.target as Element | null;
      const target = raw?.closest?.(INTERACTIVE_SELECTOR) as HTMLElement | null;
      if (!target) return;
      if (target.matches(":disabled, [aria-disabled='true']")) return;

      clearPress(true);
      pressedEl = target;
      pressStart = performance.now();
      startX = event.clientX;
      startY = event.clientY;
      moved = false;

      if (!reducedMotion.matches) {
        target.classList.add("is-haptic-pressed");
      }
    }

    function onPointerMove(event: PointerEvent) {
      if (!pressedEl || moved) return;
      const dx = event.clientX - startX;
      const dy = event.clientY - startY;
      if (dx * dx + dy * dy > 64) {
        moved = true;
        clearPress(true);
      }
    }

    function onPointerUp() {
      const target = pressedEl;
      const wasMoved = moved;
      clearPress(false);
      if (!target || wasMoved || reducedMotion.matches) return;

      const now = performance.now();
      if (now - lastVibrateAt >= 24) {
        lastVibrateAt = now;
        vibrate(hapticKindFor(target));
      }
    }

    function onPointerCancel() {
      moved = true;
      clearPress(true);
    }

    function onClick(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const raw = event.target as Element | null;
      const anchor = raw?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;

      if (
        shouldStartNavProgress(
          anchor.getAttribute("href"),
          anchor.getAttribute("target"),
          anchor.hasAttribute("download"),
          prevPathRef.current,
        )
      ) {
        if (doneTimerRef.current) window.clearTimeout(doneTimerRef.current);
        if (failSafeRef.current) window.clearTimeout(failSafeRef.current);
        setNavState("loading");
        failSafeRef.current = window.setTimeout(() => setNavState("idle"), 6000);
      }
    }

    function onPageRestore() {
      clearPress(true);
      setNavState("idle");
    }

    document.addEventListener("pointerdown", onPointerDown, { passive: true });
    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerup", onPointerUp, { passive: true });
    document.addEventListener("pointercancel", onPointerCancel, { passive: true });
    document.addEventListener("click", onClick);
    window.addEventListener("pageshow", onPageRestore);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("pointercancel", onPointerCancel);
      document.removeEventListener("click", onClick);
      window.removeEventListener("pageshow", onPageRestore);
      if (releaseTimer) window.clearTimeout(releaseTimer);
      if (doneTimerRef.current) window.clearTimeout(doneTimerRef.current);
      if (failSafeRef.current) window.clearTimeout(failSafeRef.current);
    };
  }, []);

  return (
    <div
      className={`route-progress${navState === "loading" ? " is-loading" : ""}${navState === "done" ? " is-done" : ""}`}
      aria-hidden="true"
    />
  );
}
