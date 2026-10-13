"use client";

import React, { useState } from "react";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/95 backdrop-blur-md border-b border-outline-variant/30">
      <div className="h-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg py-1 px-0.5"
            aria-label="BugDrop Home"
          >
            <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center p-1 shadow-xs border border-outline-variant/30 group-hover:border-primary/40 transition-colors">
              <span className="material-symbols-outlined text-primary text-[20px]">
                bug_report
              </span>
            </div>
            <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight font-semibold">
              BugDrop
            </span>
          </a>
        </div>

        {/* Desktop/Tablet Navigation */}
        <nav
          className="hidden sm:flex items-center gap-1"
          aria-label="Main Navigation"
        >
          <a
            href="#"
            aria-current="page"
            className="transition-colors bg-surface-container-high text-primary font-label-md text-label-md rounded-md px-3 py-1.5 font-medium"
          >
            Dashboard
          </a>
          <a
            href="#reports-section"
            className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container/60 rounded-md px-3 py-1.5 transition-colors"
          >
            Reports
          </a>
          <a
            href="#bug-submission-section"
            className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface hover:bg-surface-container/60 rounded-md px-3 py-1.5 transition-colors"
          >
            Submit Bug
          </a>
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden md:flex items-center bg-surface-container-low px-2.5 py-1 rounded-md text-on-surface-variant gap-1.5 font-code-sm text-code-sm border border-outline-variant/30 select-none">
            <span className="material-symbols-outlined text-[16px]">search</span>
            <span>⌘K</span>
          </div>

          {/* Profile session indicator */}
          <div className="flex items-center gap-2 pl-2 sm:pl-3 border-l border-outline-variant/40">
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

          {/* Mobile Menu Button (Hamburger) */}
          <button
            type="button"
            className="sm:hidden p-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-[40px] min-w-[40px] flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-[22px]">
              {mobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer / Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-outline-variant/30 bg-surface-container-lowest/98 px-4 py-3 shadow-lg animate-fade-in backdrop-blur-md">
          <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
            <a
              href="#"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-surface-container-high text-primary font-label-md text-label-md font-semibold"
            >
              <span className="material-symbols-outlined text-[18px]">dashboard</span>
              <span>Dashboard</span>
            </a>
            <a
              href="#reports-section"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container/60 font-label-md text-label-md font-medium transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">bug_report</span>
              <span>Recent Reports</span>
            </a>
            <a
              href="#bug-submission-section"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container/60 font-label-md text-label-md font-medium transition-colors"
            >
              <span className="material-symbols-outlined text-[18px]">add_circle</span>
              <span>Report a Bug</span>
            </a>
            <div className="pt-2 mt-2 border-t border-outline-variant/30 flex items-center justify-between px-3 text-on-surface-variant text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
                Maintainer: Alex Chen
              </span>
              <span className="font-code-sm text-code-sm">Online</span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
