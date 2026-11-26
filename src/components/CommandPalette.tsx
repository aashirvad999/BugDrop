"use client";

import React, { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Bug, PlusCircle, RotateCcw, ArrowRight, X } from "lucide-react";
import { BugReport, BugStatus } from "../types/bug";

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  reports: BugReport[];
  onSelectReport: (report: BugReport) => void;
  onFilterStatus: (status: "All" | BugStatus) => void;
  onResetSeedData: () => void;
}

export function CommandPalette({
  open,
  onClose,
  reports,
  onSelectReport,
  onFilterStatus,
  onResetSeedData,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");

  const handleClose = () => {
    setQuery("");
    onClose();
  };

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setQuery("");
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  const matchingReports = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return reports.slice(0, 5);
    return reports
      .filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.id.toLowerCase().includes(q) ||
          (r.reporter && r.reporter.toLowerCase().includes(q))
      )
      .slice(0, 6);
  }, [query, reports]);

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.14 }}
            onClick={handleClose}
            className="fixed inset-0 bg-ink/35 backdrop-blur-[2px]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -6 }}
            transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-lg bg-surface rounded-lg border border-border shadow-2xl overflow-hidden"
          >
            {/* Search Input */}
            <div className="flex items-center gap-2.5 px-4 py-3 border-b border-border">
              <Search className="w-4 h-4 text-ink-muted flex-shrink-0" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Jump to issue ID, title, or action..."
                className="flex-1 bg-transparent text-sm text-ink placeholder:text-ink-muted outline-none"
              />
              <button
                type="button"
                onClick={handleClose}
                aria-label="Close command palette"
                className="p-1 rounded text-ink-muted hover:text-ink hover:bg-surface-subtle"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results & Quick Actions */}
            <div className="max-h-[60vh] overflow-y-auto p-2 space-y-3">
              <div>
                <div className="px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-muted font-semibold">
                  Issues ({matchingReports.length})
                </div>
                {matchingReports.length === 0 ? (
                  <div className="px-3 py-4 text-xs text-ink-muted text-center">
                    No matching issues found.
                  </div>
                ) : (
                  <div className="space-y-0.5">
                    {matchingReports.map((report) => (
                      <button
                        key={report.id}
                        type="button"
                        onClick={() => {
                          onSelectReport(report);
                          handleClose();
                        }}
                        className="w-full flex items-center justify-between gap-3 px-2.5 py-2 rounded-md text-left hover:bg-surface-subtle transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <Bug className="w-3.5 h-3.5 text-ink-muted flex-shrink-0" />
                          <span className="font-mono text-[11px] text-ink-secondary font-medium flex-shrink-0">
                            #{report.id}
                          </span>
                          <span className="text-xs sm:text-sm text-ink truncate font-medium">
                            {report.title}
                          </span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-ink-muted opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t border-border pt-2">
                <div className="px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-ink-muted font-semibold">
                  Quick Actions
                </div>
                <div className="space-y-0.5">
                  <button
                    type="button"
                    onClick={() => {
                      handleClose();
                      document
                        .getElementById("bug-submission-section")
                        ?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-left hover:bg-surface-subtle transition-colors text-xs sm:text-sm text-ink cursor-pointer"
                  >
                    <PlusCircle className="w-3.5 h-3.5 text-accent" />
                    <span>Jump to Report a Bug form</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onFilterStatus("Open");
                      handleClose();
                    }}
                    className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-left hover:bg-surface-subtle transition-colors text-xs sm:text-sm text-ink cursor-pointer"
                  >
                    <span className="w-2 h-2 rounded-full bg-orange-500 ml-0.5 mr-1" />
                    <span>Filter queue: Open issues</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onResetSeedData();
                      handleClose();
                    }}
                    className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-left hover:bg-surface-subtle transition-colors text-xs sm:text-sm text-ink cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-ink-muted" />
                    <span>Restore sample seed data</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="px-4 py-2 border-t border-border bg-surface-subtle/50 flex items-center justify-between text-[11px] font-mono text-ink-muted">
              <span>Click an issue to inspect &amp; triage</span>
              <span>ESC to close</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
