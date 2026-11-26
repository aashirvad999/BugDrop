"use client";

import React, { useState } from "react";
import { Menu, X, Search, LayoutDashboard, Bug, PlusCircle } from "lucide-react";

interface HeaderProps {
  onOpenCommand?: () => void;
}

export function Header({ onOpenCommand }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface/90 backdrop-blur-md border-b border-border">
      <div className="h-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="flex items-center gap-2.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-md py-1 px-0.5"
            aria-label="BugDrop Home"
          >
            <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center shadow-xs group-hover:bg-primary-hover transition-colors relative">
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <circle cx="8" cy="8" r="5.5" stroke="#FFFFFF" strokeWidth="1.4" />
                <path
                  d="M8 1.5V4M8 12V14.5M1.5 8H4M12 8H14.5"
                  stroke="#FFFFFF"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
                <circle cx="8" cy="8" r="2" fill="#EA580C" />
              </svg>
            </div>
            <span className="font-display text-[15px] text-ink tracking-tight font-bold">
              BugDrop
            </span>
            <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 rounded bg-surface-subtle border border-border font-mono text-[10px] font-medium text-ink-secondary tracking-wider uppercase">
              Triage
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
            className="transition-colors bg-surface-subtle text-ink text-xs font-semibold rounded-md px-3 py-1.5 border border-border/80"
          >
            Cockpit
          </a>
          <a
            href="#reports-section"
            className="text-xs font-medium text-ink-secondary hover:text-ink hover:bg-surface-subtle/70 rounded-md px-3 py-1.5 transition-colors"
          >
            Queue
          </a>
          <a
            href="#bug-submission-section"
            className="text-xs font-medium text-ink-secondary hover:text-ink hover:bg-surface-subtle/70 rounded-md px-3 py-1.5 transition-colors"
          >
            Report Bug
          </a>
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onOpenCommand}
            className="hidden md:flex items-center bg-surface-subtle hover:bg-surface-hover px-2.5 py-1 rounded-md text-ink-secondary hover:text-ink gap-2 font-mono text-[11px] border border-border transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label="Open command palette"
            title="Quick search & commands (⌘K)"
          >
            <Search className="w-3.5 h-3.5 text-ink-muted" />
            <span>Quick jump</span>
            <kbd className="px-1 py-0.2 rounded bg-surface border border-border text-[10px] text-ink-muted font-mono">
              ⌘K
            </kbd>
          </button>

          {/* Profile session indicator */}
          <div className="flex items-center gap-2.5 pl-2 sm:pl-3 border-l border-border">
            <div
              className="relative flex items-center"
              title="Maintainer session (Active)"
            >
              <div className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center font-mono font-semibold text-[11px] tracking-tight">
                AC
              </div>
              <span
                className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-surface"
                title="Active status"
              />
            </div>
            <div className="hidden lg:flex flex-col">
              <span className="text-xs text-ink leading-tight font-semibold">
                Alex Chen
              </span>
              <span className="font-mono text-[10px] text-ink-muted leading-none">
                Core Maintainer
              </span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="sm:hidden p-2 rounded-md text-ink-secondary hover:text-ink hover:bg-surface-subtle transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[40px] min-w-[40px] flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-border bg-surface px-4 py-3 shadow-lg">
          <nav className="flex flex-col space-y-1" aria-label="Mobile Navigation">
            <a
              href="#"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-md bg-surface-subtle text-ink text-sm font-semibold min-h-[44px]"
            >
              <LayoutDashboard className="w-4 h-4 text-accent" />
              <span>Cockpit</span>
            </a>
            <a
              href="#reports-section"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-md text-ink-secondary hover:text-ink hover:bg-surface-subtle text-sm font-medium transition-colors min-h-[44px]"
            >
              <Bug className="w-4 h-4" />
              <span>Triage Queue</span>
            </a>
            <a
              href="#bug-submission-section"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-md text-ink-secondary hover:text-ink hover:bg-surface-subtle text-sm font-medium transition-colors min-h-[44px]"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Report a Bug</span>
            </a>
            {onOpenCommand && (
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCommand();
                }}
                className="flex items-center gap-2.5 px-3 py-2.5 rounded-md text-ink-secondary hover:text-ink hover:bg-surface-subtle text-sm font-medium transition-colors min-h-[44px] w-full text-left"
              >
                <Search className="w-4 h-4" />
                <span>Quick Search</span>
              </button>
            )}
            <div className="pt-2.5 mt-2 border-t border-border flex items-center justify-between px-3 text-ink-muted text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Maintainer: Alex Chen
              </span>
              <span className="font-mono text-[11px]">Online</span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
