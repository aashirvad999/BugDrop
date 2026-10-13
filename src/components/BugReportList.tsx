"use client";

import React, { useState } from "react";
import { BugReport } from "../types/bug";
import { formatReportDate } from "../utils/date";

interface BugReportListProps {
  reports: BugReport[];
  onResetSeedData: () => void;
  onClearAll?: () => void;
}

export function BugReportList({
  reports,
  onResetSeedData,
}: BugReportListProps) {
  const [filter, setFilter] = useState<"All" | "Open" | "In Progress" | "Resolved">("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredReports = reports.filter((r) => {
    const matchesFilter = filter === "All" || r.status === filter;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesFilter;
    const matchesSearch =
      r.title.toLowerCase().includes(q) ||
      r.id.toLowerCase().includes(q) ||
      r.description.toLowerCase().includes(q) ||
      (r.reporter && r.reporter.toLowerCase().includes(q));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="flex flex-col space-y-3 sm:space-y-4" id="reports-section">
      {/* Header and Filter Controls */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <h2 className="font-headline-md text-headline-md text-on-surface font-semibold tracking-tight">
              Recent Bug Reports
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-xs text-xs font-semibold">
              {filteredReports.length}{filteredReports.length !== reports.length ? ` of ${reports.length}` : " total"}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-on-surface-variant font-label-xs text-xs">
            <span className="uppercase tracking-wider">Live Sync</span>
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
          </div>
        </div>

        {/* Search & Status Filter Controls Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
          {/* Quick Search */}
          <div className="relative flex-1 min-w-0">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-[18px] pointer-events-none">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, ID, or description..."
              className="w-full min-h-[38px] pl-9 pr-8 py-1.5 rounded-lg bg-surface-container-low text-on-surface text-sm font-body-md placeholder:text-on-surface-variant/60 focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/40 outline-none border border-outline-variant/30 transition-all hover:border-outline-variant/50"
              aria-label="Search bug reports"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search query"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface p-0.5 rounded"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            )}
          </div>

          {/* Filter Pills */}
          <div
            className="flex items-center bg-surface-container-low p-1 rounded-lg border border-outline-variant/30 text-xs overflow-x-auto scrollbar-none flex-shrink-0"
            role="tablist"
            aria-label="Filter bug reports by status"
          >
            {(["All", "Open", "In Progress", "Resolved"] as const).map((status) => (
              <button
                key={status}
                type="button"
                role="tab"
                aria-selected={filter === status}
                onClick={() => setFilter(status)}
                className={`min-h-[30px] px-2.5 sm:px-3 py-1 rounded-md transition-all font-medium whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  filter === status
                    ? "bg-surface-container-lowest text-primary shadow-xs font-semibold"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container/40"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Reports Stream or Empty State */}
      {filteredReports.length === 0 ? (
        <div className="bg-surface-container-lowest rounded-xl shadow-xs p-6 sm:p-8 md:p-space-xl flex flex-col items-center justify-center text-center min-h-[340px] border border-outline-variant/20">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-surface-container-low flex items-center justify-center mb-4 shadow-xs">
            <span className="material-symbols-outlined text-outline text-[28px] sm:text-[32px]">
              pest_control
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-semibold text-on-surface tracking-tight mb-1.5">
            {reports.length === 0
              ? "No bug reports yet"
              : searchQuery
              ? `No matching reports for "${searchQuery}"`
              : `No ${filter} issues`}
          </h3>

          <p className="font-body-sm text-sm text-on-surface-variant max-w-md mx-auto mb-5 leading-relaxed">
            {reports.length === 0
              ? "When someone reports an issue, it will appear here. Submit the form to log your project's first bug."
              : searchQuery
              ? "Try adjusting your search terms or clearing the filter to find other reports."
              : `There are currently no bug reports marked as "${filter}".`}
          </p>

          {reports.length === 0 ? (
            <div className="w-full max-w-md bg-surface-container-low rounded-lg p-3 sm:p-4 text-left mb-4 border border-outline-variant/30">
              <div className="flex items-center justify-between text-on-surface-variant mb-2">
                <span className="font-code-sm text-xs flex items-center gap-1 font-medium">
                  <span className="material-symbols-outlined text-[14px]">code</span>
                  cURL Ingest Preview
                </span>
                <span className="font-code-sm text-xs text-tertiary">
                  v1/events
                </span>
              </div>
              <div className="bg-surface-container-lowest p-2.5 rounded font-code-sm text-xs text-on-surface select-all overflow-x-auto shadow-xs border border-outline-variant/20">
                <code>{`curl -X POST https://api.bugdrop.app/v1/report \\
  -H "Authorization: Bearer dev_token" \\
  -d '{"title":"Test Ping","severity":"low"}'`}</code>
              </div>
              <button
                type="button"
                onClick={onResetSeedData}
                className="mt-3 w-full min-h-[36px] py-1.5 px-3 rounded-md bg-surface-container-lowest hover:bg-surface-container text-primary text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-outline-variant/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span className="material-symbols-outlined text-[16px]">dataset</span>
                Pre-load Sample Seed Data
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="min-h-[36px] py-1.5 px-4 rounded-lg bg-primary text-on-primary text-xs sm:text-sm font-medium hover:bg-primary-container transition-colors shadow-xs"
                >
                  Clear search query
                </button>
              )}
              {filter !== "All" && (
                <button
                  type="button"
                  onClick={() => setFilter("All")}
                  className="min-h-[36px] py-1.5 px-4 rounded-lg bg-surface-container text-primary text-xs sm:text-sm font-medium hover:bg-surface-container-high transition-colors"
                >
                  Show all reports
                </button>
              )}
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col space-y-2.5 sm:space-y-3" role="feed" aria-label="Recent bugs list">
          {filteredReports.map((report) => {
            // Severity badge styling
            const severityBadge =
              report.severity === "High" ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-error-container text-on-error-container font-label-xs text-[11px] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
                  High
                </span>
              ) : report.severity === "Medium" ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container-high text-tertiary-container font-label-xs text-[11px] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  Medium
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-xs text-[11px] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-outline"></span>
                  Low
                </span>
              );

            // Status badge styling
            const statusBadge =
              report.status === "Open" ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container-high text-secondary font-label-xs text-[11px] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  Open
                </span>
              ) : report.status === "In Progress" ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container-high text-tertiary-container font-label-xs text-[11px] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                  In Progress
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container-high text-primary font-label-xs text-[11px] font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                  Resolved
                </span>
              );

            return (
              <article
                key={report.id}
                className="bg-surface-container-lowest p-3.5 sm:p-4 rounded-xl shadow-xs hover:shadow-sm hover:border-outline-variant/40 transition-all flex flex-col space-y-2 border border-outline-variant/20 animate-fade-in group"
              >
                {/* Meta row 1: ID & Badges */}
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <span className="font-code-sm text-xs text-primary font-semibold tracking-wide bg-primary/5 px-2 py-0.5 rounded border border-primary/10">
                      #{report.id}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    {severityBadge}
                    {statusBadge}
                  </div>
                </div>

                {/* Title */}
                <h3
                  className={`text-sm sm:text-base text-on-surface leading-snug break-words ${
                    report.status === "Resolved"
                      ? "line-through text-on-surface-variant/70 font-medium"
                      : "font-semibold text-on-surface group-hover:text-primary transition-colors"
                  }`}
                >
                  {report.title}
                </h3>

                {/* Description preview */}
                <p className="font-body-sm text-xs sm:text-sm text-on-surface-variant line-clamp-2 leading-relaxed break-words">
                  {report.description}
                </p>

                {/* Footer metadata: reporter & formatted relative time */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pt-1 border-t border-outline-variant/20 font-code-sm text-[11px] sm:text-xs text-on-surface-variant/80">
                  <span className="truncate flex items-center gap-1">
                    <span className="material-symbols-outlined text-[13px] text-outline">
                      person
                    </span>
                    <span>
                      {report.reporter || "Anonymous"}
                      {report.environment ? ` • ${report.environment}` : ""}
                    </span>
                  </span>
                  <span className="flex-shrink-0 flex items-center gap-1 text-on-surface-variant/70">
                    <span className="material-symbols-outlined text-[13px] text-outline">
                      schedule
                    </span>
                    <span>{formatReportDate(report)}</span>
                  </span>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
