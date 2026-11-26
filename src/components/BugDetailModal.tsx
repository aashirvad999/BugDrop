"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, User, Monitor, Clock, CheckCircle2, AlertCircle } from "lucide-react";
import { BugReport, BugStatus } from "../types/bug";
import { formatReportDate } from "../utils/date";

interface BugDetailModalProps {
  report: BugReport | null;
  onClose: () => void;
  onStatusChange: (id: string, status: BugStatus) => void;
}

const STATUS_OPTIONS: BugStatus[] = ["Open", "In Progress", "Resolved"];

export function BugDetailModal({
  report,
  onClose,
  onStatusChange,
}: BugDetailModalProps) {
  useEffect(() => {
    if (!report) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [report, onClose]);

  return (
    <AnimatePresence>
      {report && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="bug-detail-title"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/35 backdrop-blur-[2px]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-xl bg-surface rounded-lg border border-border shadow-xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-border bg-surface-subtle/50">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-semibold text-ink px-2 py-0.5 rounded bg-surface border border-border">
                  #{report.id}
                </span>
                <span
                  className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-medium border ${
                    report.severity === "High"
                      ? "bg-red-50 text-red-700 border-red-200"
                      : report.severity === "Medium"
                      ? "bg-amber-50 text-amber-700 border-amber-200"
                      : "bg-zinc-100 text-zinc-700 border-zinc-200"
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      report.severity === "High"
                        ? "bg-red-600"
                        : report.severity === "Medium"
                        ? "bg-amber-500"
                        : "bg-zinc-400"
                    }`}
                  />
                  {report.severity} Severity
                </span>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close issue inspector"
                className="p-1.5 rounded-md text-ink-muted hover:text-ink hover:bg-surface-subtle transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5 sm:p-6 space-y-5">
              <div className="space-y-2">
                <h2
                  id="bug-detail-title"
                  className="font-display text-lg sm:text-xl font-bold text-ink leading-snug"
                >
                  {report.title}
                </h2>
                <p className="text-sm text-ink-secondary leading-relaxed whitespace-pre-wrap">
                  {report.description}
                </p>
              </div>

              {/* Metadata grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-md bg-surface-subtle/70 border border-border text-xs">
                <div className="flex items-center gap-2 text-ink-secondary">
                  <User className="w-3.5 h-3.5 text-ink-muted flex-shrink-0" />
                  <span className="font-mono truncate">
                    {report.reporter || "Anonymous"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-ink-secondary">
                  <Monitor className="w-3.5 h-3.5 text-ink-muted flex-shrink-0" />
                  <span className="font-mono truncate">
                    {report.environment || "Unknown"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-ink-secondary">
                  <Clock className="w-3.5 h-3.5 text-ink-muted flex-shrink-0" />
                  <span className="font-mono truncate">
                    {formatReportDate(report)}
                  </span>
                </div>
              </div>

              {/* Status Triage Switcher */}
              <div className="space-y-2 pt-1 border-t border-border">
                <span className="text-xs font-semibold text-ink block">
                  Triage Status
                </span>
                <div className="grid grid-cols-3 gap-2">
                  {STATUS_OPTIONS.map((status) => {
                    const active = report.status === status;
                    return (
                      <button
                        key={status}
                        type="button"
                        onClick={() => onStatusChange(report.id, status)}
                        className={`min-h-[38px] px-3 py-2 rounded-md text-xs font-medium border flex items-center justify-center gap-1.5 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                          active
                            ? "bg-primary text-on-primary border-primary shadow-xs font-semibold"
                            : "bg-surface text-ink-secondary border-border hover:border-border-strong hover:text-ink"
                        }`}
                      >
                        {status === "Resolved" ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : status === "In Progress" ? (
                          <Clock className="w-3.5 h-3.5" />
                        ) : (
                          <AlertCircle className="w-3.5 h-3.5" />
                        )}
                        <span>{status}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
