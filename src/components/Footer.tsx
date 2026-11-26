"use client";

import React from "react";

export function Footer() {
  return (
    <footer className="w-full bg-surface border-t border-border py-4 sm:py-5 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 sm:gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span className="font-mono text-[11px] text-ink-secondary font-medium">
              All systems operational
            </span>
          </div>
          <span className="text-border-strong select-none">/</span>
          <span className="text-xs text-ink-muted">
            © 2025 BugDrop Inc.
          </span>
        </div>
        <div className="flex items-center gap-5 sm:gap-6">
          <a
            href="#"
            className="text-xs text-ink-secondary hover:text-ink transition-colors py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
          >
            Documentation
          </a>
          <a
            href="#"
            className="text-xs text-ink-secondary hover:text-ink transition-colors py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
          >
            Changelog
          </a>
          <a
            href="#"
            className="text-xs font-mono text-ink-secondary hover:text-ink transition-colors py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
          >
            API
          </a>
        </div>
      </div>
    </footer>
  );
}
