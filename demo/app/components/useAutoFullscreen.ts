"use client";

import { useEffect } from "react";

export function useAutoFullscreen() {
  useEffect(() => {
    const el = document.documentElement;
    if (typeof el.requestFullscreen !== "function") return;

    function cleanup() {
      window.removeEventListener("pointerdown", tryEnter);
      window.removeEventListener("keydown", tryEnter);
    }

    function tryEnter() {
      if (document.fullscreenElement) {
        cleanup();
        return;
      }
      el.requestFullscreen()
        .then(cleanup)
        .catch(() => {});
    }

    window.addEventListener("pointerdown", tryEnter);
    window.addEventListener("keydown", tryEnter);
    tryEnter();

    return cleanup;
  }, []);
}
