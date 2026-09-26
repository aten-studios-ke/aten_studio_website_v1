"use client";

import { useState } from "react";
import { Lock, X } from "lucide-react";
import { CmsAdmin } from "./cms-admin";

/**
 * Discrete floating trigger that opens the CMS overlay.
 * Sits in the bottom-left so it doesn't compete with the site.
 */
export function CmsTrigger() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 left-5 z-[55] inline-flex h-10 w-10 items-center justify-center rounded-none border border-border bg-background/70 text-foreground/50 backdrop-blur transition-colors hover:border-gold hover:text-gold"
        aria-label="Open studio CMS"
        title="Studio CMS"
      >
        <Lock className="h-4 w-4" strokeWidth={1.5} />
      </button>

      {open && (
        <div className="fixed inset-0 z-[80]">
          <CmsAdmin onClose={() => setOpen(false)} />
        </div>
      )}
    </>
  );
}
