"use client";

import { Toaster } from "sonner";

export function SonnerProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        className: "border border-border",
      }}
      closeButton
    />
  );
}
