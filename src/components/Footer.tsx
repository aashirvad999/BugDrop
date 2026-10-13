"use client";

import React from "react";

export function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/30 py-space-md mt-auto">
      <div className="max-w-7xl mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop flex flex-col sm:flex-row items-center justify-between gap-space-sm">
        <div className="flex items-center gap-space-md">
          <div className="flex items-center gap-space-xs">
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
            <span className="font-label-xs text-label-xs text-on-surface-variant font-medium">
              All systems operational
            </span>
          </div>
          <span className="text-outline-variant">•</span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            © 2025 BugDrop Inc.
          </span>
        </div>
        <div className="flex items-center gap-space-lg">
          <a
            href="#"
            className="font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-colors"
          >
            Docs
          </a>
          <a
            href="#"
            className="font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-colors"
          >
            Changelog
          </a>
          <a
            href="#"
            className="font-label-sm text-label-sm text-on-surface-variant hover:text-on-surface transition-colors"
          >
            API
          </a>
        </div>
      </div>
    </footer>
  );
}
