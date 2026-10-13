"use client";

import React from "react";

export function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/30 py-4 sm:py-5 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left">
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 sm:gap-3 text-xs sm:text-sm">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-secondary flex-shrink-0 animate-pulse"></span>
            <span className="font-label-xs text-xs text-on-surface-variant font-medium">
              All systems operational
            </span>
          </div>
          <span className="text-outline-variant select-none">•</span>
          <span className="font-body-sm text-xs sm:text-sm text-on-surface-variant">
            © 2025 BugDrop Inc.
          </span>
        </div>
        <div className="flex items-center gap-4 sm:gap-6">
          <a
            href="#"
            className="font-label-sm text-xs sm:text-sm text-on-surface-variant hover:text-primary transition-colors py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
          >
            Documentation
          </a>
          <a
            href="#"
            className="font-label-sm text-xs sm:text-sm text-on-surface-variant hover:text-primary transition-colors py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
          >
            Changelog
          </a>
          <a
            href="#"
            className="font-label-sm text-xs sm:text-sm text-on-surface-variant hover:text-primary transition-colors py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
          >
            API
          </a>
        </div>
      </div>
    </footer>
  );
}
