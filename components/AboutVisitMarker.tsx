"use client";

import { useEffect } from "react";

export default function AboutVisitMarker() {
  useEffect(() => {
    try {
      sessionStorage.setItem("about-visited-v2", "1");
    } catch {
      // The marker is a convenience; the About page remains fully usable if storage is blocked.
    }
  }, []);

  return null;
}
