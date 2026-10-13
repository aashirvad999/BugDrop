"use client";

import React from "react";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/95 backdrop-blur-md border-b border-outline-variant/30">
      <div className="h-14 max-w-7xl mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop flex items-center justify-between gap-space-lg">
        {/* Brand identity */}
        <div className="flex items-center gap-space-md">
          <a
            href="#"
            className="flex items-center gap-space-sm group"
            aria-label="BugDrop Home"
          >
            <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center p-1 shadow-xs border border-outline-variant/30">
              <span className="material-symbols-outlined text-primary text-[20px]">
                bug_report
              </span>
            </div>
            <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight font-semibold">
              BugDrop
            </span>
          </a>
          <span className="px-space-xs py-0.5 rounded bg-surface-container font-code-sm text-code-sm text-on-surface-variant border border-outline-variant/40 leading-none">
            v0.9-beta
          </span>
        </div>

        {/* Navigation */}
        <nav
          className="hidden sm:flex items-center gap-space-xs"
          aria-label="Main Navigation"
        >
          <a
            href="#"
            aria-current="page"
            className="transition-colors bg-surface-container-high text-primary font-label-md text-label-md rounded px-space-md py-1.5 font-medium"
          >
            Dashboard
          </a>
          <a
            href="#reports-section"
            className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface px-space-md py-1.5 transition-colors"
          >
            Reports
          </a>
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-space-md">
          <div className="hidden md:flex items-center bg-surface-container-low px-space-sm py-1 rounded text-on-surface-variant gap-space-xs font-code-sm text-code-sm border border-outline-variant/30 select-none">
            <span className="material-symbols-outlined text-[16px]">search</span>
            <span>⌘K</span>
          </div>

          {/* Profile & Non-functional placeholder control for Phase 1 */}
          <div className="flex items-center gap-space-sm pl-space-sm border-l border-outline-variant/40">
            <div
              className="relative flex items-center"
              title="Maintainer session (Visual preview for Phase 1)"
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 text-primary border border-outline-variant/50 flex items-center justify-center font-label-sm font-semibold text-label-sm">
                AC
              </div>
              <span
                className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-secondary-container rounded-full ring-2 ring-surface-container-lowest"
                title="Active status"
              ></span>
            </div>
            <div className="hidden lg:flex flex-col">
              <span className="font-label-sm text-label-sm text-on-surface leading-tight font-medium">
                Core Maintainer
              </span>
              <span className="font-label-xs text-label-xs text-on-surface-variant leading-none">
                Alex Chen
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
