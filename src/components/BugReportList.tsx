"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Search,
  X,
  Bug,
  Terminal,
  Database,
  User,
  Clock,
  ArrowUpRight,
  Copy,
  Check,
} from "lucide-react";
import { BugReport, BugStatus, Severity } from "../types/bug";
import { formatReportDate } from "../utils/date";

interface BugReportListProps {
  reports: BugReport[];
  statusFilter: "All" | BugStatus;
  onStatusFilterChange: (status: "All" | BugStatus) => void;
  onSelectReport: (report: BugReport) => void;
  onResetSeedData: () => void;
}

const SEVERITY_STYLE: Record<
  Severity,
  { badge: string; dot: string; rail: string }
> = {
  High: {
    badge: "bg-red-50 text-red-700 border-red-200/80",
    dot: "bg-red-600",
    rail: "bg-red-500",
  },
  Medium: {
    badge: "bg-amber-50 text-amber-700 border-amber-200/80",
    dot: "bg-amber-500",
    rail: "bg-amber-400",
  },
  Low: {
    badge: "bg-zinc-100 text-zinc-700 border-zinc-200/80",
    dot: "bg-zinc-400",
    rail: "bg-zinc-300",
  },
};

const STATUS_STYLE: Record<BugStatus, { badge: string; dot: string }> = {
  Open: {
    badge: "bg-orange-50 text-orange-700 border-orange-200/80",
    dot: "bg-orange-500",
  },
  "In Progress": {
    badge: "bg-blue-50 text-blue-700 border-blue-200/80",
    dot: "bg-blue-500",
  },
  Resolved: {
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    dot: "bg-emerald-500",
  },
};

const CURL_SNIPPET = `curl -X POST https://api.bugdrop.app/v1/report \\
  -H "Authorization: Bearer dev_token" \\
  -d '{"title":"Test Ping","severity":"low"}'`;

export function BugReportList({
  reports,
  statusFilter,
  onStatusFilterChange,
  onSelectReport,
  onResetSeedData,
}: BugReportListProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [severityFilter, setSeverityFilter] = useState<"All" | Severity>("All");
  const [copiedCurl, setCopiedCurl] = useState(false);

  const filteredReports = reports.filter((r) => {
    const matchesStatus = statusFilter === "All" || r.status === statusFilter;
    const matchesSeverity =
      severityFilter === "All" || r.severity === severityFilter;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesStatus && matchesSeverity;
    const matchesSearch =
      r.title.toLowerCase().includes(q) ||
      r.id.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      (r.reporter && r.reporter.toLowerCase().includes(q));
    return matchesStatus && matchesSeverity && matchesSearch;
  });

  const handleCopyCurl = async () => {
    try {
      await navigator.clipboard.writeText(CURL_SNIPPET);
      setCopiedCurl(true);
      setTimeout(() => setCopiedCurl(false), 1800);
    } catch {
      // Clipboard unavailable
    }
  };

  return (
    <div className="flex flex-col gap-3.5" id="reports-section">
      {/* Header & Filter Controls */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5">
            <h2 className="font-display text-lg text-ink font-bold tracking-tight">
              Triage Queue
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-surface-subtle border border-border text-ink-secondary font-mono text-[11px] font-medium tabular-nums">
              {filteredReports.length}
              {filteredReports.length !== reports.length
                ? ` / ${reports.length}`
                : " total"}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-ink-muted font-mono text-[11px]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
            </span>
            <span className="uppercase tracking-wider">Live Stream</span>
          </div>
        </div>

        {/* Search & Status Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          <div className="relative flex-1 min-w-0">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ID, title, reporter..."
              className="w-full min-h-[38px] pl-9 pr-8 py-1.5 rounded-md bg-surface text-ink text-sm placeholder:text-ink-muted/70 focus:ring-2 focus:ring-ink/10 focus:border-ink outline-none border border-border transition-all hover:border-border-strong"
              aria-label="Search bug reports"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search query"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink p-0.5 rounded cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Animated Status Tabs */}
          <div
            className="flex items-center bg-surface-subtle p-1 rounded-md border border-border text-xs overflow-x-auto scrollbar-none flex-shrink-0"
            role="tablist"
            aria-label="Filter bug reports by status"
          >
            {(["All", "Open", "In Progress", "Resolved"] as const).map(
              (status) => {
                const isActive = statusFilter === status;
                return (
                  <button
                    key={status}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => onStatusFilterChange(status)}
                    className={`relative min-h-[30px] px-2.5 sm:px-3 py-1 rounded transition-colors font-medium whitespace-nowrap cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                      isActive
                        ? "text-ink font-semibold"
                        : "text-ink-secondary hover:text-ink"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="status-tab-pill"
                        transition={{
                          type: "spring",
                          stiffness: 420,
                          damping: 34,
                        }}
                        className="absolute inset-0 bg-surface rounded shadow-xs border border-border"
                      />
                    )}
                    <span className="relative z-10">{status}</span>
                  </button>
                );
              }
            )}
          </div>
        </div>

        {/* Severity Filter Chips */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="font-mono text-[11px] text-ink-muted mr-1">
            Severity:
          </span>
          {(["All", "High", "Medium", "Low"] as const).map((sev) => {
            const active = severityFilter === sev;
            return (
              <button
                key={sev}
                type="button"
                onClick={() => setSeverityFilter(sev)}
                className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer border focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  active
                    ? "bg-ink text-on-primary border-ink font-medium"
                    : "bg-surface text-ink-secondary border-border hover:border-border-strong hover:text-ink"
                }`}
              >
                {sev}
              </button>
            );
          })}
        </div>
      </div>

      {/* Reports Stream or Empty State */}
      {filteredReports.length === 0 ? (
        <div className="bg-surface rounded-lg border border-border p-6 sm:p-8 flex flex-col items-center justify-center text-center min-h-[340px]">
          <div className="w-12 h-12 rounded-lg bg-surface-subtle border border-border flex items-center justify-center mb-4">
            <Bug className="w-6 h-6 text-ink-muted" />
          </div>

          <h3 className="font-display text-base sm:text-lg font-bold text-ink tracking-tight mb-1.5">
            {reports.length === 0
              ? "No bug reports yet"
              : searchQuery
              ? `No matching reports for "${searchQuery}"`
              : "No matching issues"}
          </h3>

          <p className="text-xs sm:text-sm text-ink-secondary max-w-md mx-auto mb-5 leading-relaxed">
            {reports.length === 0
              ? "When someone reports an issue, it will appear here. Submit the form to log your project's first bug."
              : "Try adjusting your search terms or clearing the active status and severity filters."}
          </p>

          {reports.length === 0 ? (
            <div className="w-full max-w-md bg-surface-subtle rounded-md p-3.5 text-left border border-border">
              <div className="flex items-center justify-between text-ink-secondary mb-2">
                <span className="font-mono text-[11px] flex items-center gap-1.5 font-medium">
                  <Terminal className="w-3.5 h-3.5" />
                  cURL Ingest Preview
                </span>
                <button
                  type="button"
                  onClick={handleCopyCurl}
                  className="inline-flex items-center gap-1 font-mono text-[11px] text-ink-secondary hover:text-ink cursor-pointer"
                >
                  {copiedCurl ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      Copy
                    </>
                  )}
                </button>
              </div>
              <pre className="bg-surface p-2.5 rounded font-mono text-[11px] text-ink overflow-x-auto border border-border">
                <code>{CURL_SNIPPET}</code>
              </pre>
              <button
                type="button"
                onClick={onResetSeedData}
                className="mt-3 w-full min-h-[38px] py-1.5 px-3 rounded-md bg-surface hover:bg-surface-hover text-ink text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-border cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <Database className="w-3.5 h-3.5 text-accent" />
                Pre-load Sample Seed Data
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 flex-wrap justify-center">
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="min-h-[36px] py-1.5 px-4 rounded-md bg-primary text-on-primary text-xs font-semibold hover:bg-primary-hover transition-colors cursor-pointer"
                >
                  Clear search
                </button>
              )}
              {(statusFilter !== "All" || severityFilter !== "All") && (
                <button
                  type="button"
                  onClick={() => {
                    onStatusFilterChange("All");
                    setSeverityFilter("All");
                  }}
                  className="min-h-[36px] py-1.5 px-4 rounded-md bg-surface-subtle text-ink border border-border text-xs font-semibold hover:bg-surface-hover transition-colors cursor-pointer"
                >
                  Reset filters
                </button>
              )}
            </div>
          )}
        </div>
      ) : (
        <div
          className="flex flex-col gap-2.5"
          role="feed"
          aria-label="Recent bugs list"
        >
          {filteredReports.map((report) => {
            const sevStyle = SEVERITY_STYLE[report.severity];
            const statStyle = STATUS_STYLE[report.status];

            return (
              <motion.article
                key={report.id}
                layout="position"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => onSelectReport(report)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onSelectReport(report);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Inspect bug report ${report.id}: ${report.title}`}
                className="relative bg-surface p-4 rounded-lg border border-border hover:border-border-strong shadow-[0_1px_2px_rgba(9,9,11,0.03)] hover:shadow-sm transition-all flex flex-col gap-2.5 group cursor-pointer overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {/* Left severity accent rail */}
                <span
                  className={`absolute left-0 top-0 bottom-0 w-[3px] ${sevStyle.rail} opacity-75 group-hover:opacity-100 transition-opacity`}
                />

                {/* Top Meta Row */}
                <div className="flex items-center justify-between gap-2 flex-wrap pl-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-ink font-semibold bg-surface-subtle px-2 py-0.5 rounded border border-border">
                      #{report.id}
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded border text-[11px] font-medium ${sevStyle.badge}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${sevStyle.dot}`}
                      />
                      {report.severity}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[11px] font-medium ${statStyle.badge}`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${statStyle.dot}`}
                      />
                      {report.status}
                    </span>
                  </div>
                </div>

                {/* Title & Description */}
                <div className="pl-1 space-y-1">
                  <h3
                    className={`text-sm sm:text-[15px] leading-snug break-words flex items-start justify-between gap-2 ${
                      report.status === "Resolved"
                        ? "line-through text-ink-muted font-medium"
                        : "font-semibold text-ink group-hover:text-accent transition-colors"
                    }`}
                  >
                    <span>{report.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-ink-muted opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 mt-0.5" />
                  </h3>
                  <p className="text-xs sm:text-[13px] text-ink-secondary line-clamp-2 leading-relaxed break-words">
                    {report.description}
                  </p>
                </div>

                {/* Footer Metadata */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pt-2 pl-1 border-t border-border/70 font-mono text-[11px] text-ink-muted">
                  <span className="truncate flex items-center gap-1.5">
                    <User className="w-3 h-3 flex-shrink-0" />
                    <span>
                      {report.reporter || "Anonymous"}
                      {report.environment ? ` · ${report.environment}` : ""}
                    </span>
                  </span>
                  <span className="flex-shrink-0 flex items-center gap-1.5">
                    <Clock className="w-3 h-3 flex-shrink-0" />
                    <span>{formatReportDate(report)}</span>
                  </span>
                </div>
              </motion.article>
            );
          })}
        </div>
      )}
    </div>
  );
}
