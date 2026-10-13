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

  const filteredReports =
    filter === "All"
      ? reports
      : reports.filter((r) => r.status === filter);

  return (
    <div className="flex flex-col space-y-space-md" id="reports-section">
      {/* Header and Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
        <div className="flex items-center gap-space-sm">
          <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">
            Recent Bug Reports
          </h2>
          <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-xs text-label-xs font-semibold">
            {reports.length} total
          </span>
        </div>

        {/* Filter Pills and Live Sync Indicator */}
        <div className="flex items-center gap-space-sm flex-wrap">
          <div
            className="flex items-center bg-surface-container-low p-0.5 rounded-lg border border-outline-variant/30 text-label-xs font-label-xs"
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
                className={`px-2.5 py-1 rounded-md transition-all ${
                  filter === status
                    ? "bg-surface-container-lowest text-primary shadow-xs font-semibold"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-space-xs text-on-surface-variant font-label-xs text-label-xs">
            <span className="uppercase tracking-wider">Sync: Live</span>
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
          </div>
        </div>
      </div>

      {/* Reports Stream or Empty State */}
      {filteredReports.length === 0 ? (
        <div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-xl flex flex-col items-center justify-center text-center min-h-[380px] border border-outline-variant/20">
          <div className="w-16 h-16 rounded-2xl bg-surface-container-low flex items-center justify-center mb-space-lg shadow-xs">
            <span className="material-symbols-outlined text-outline text-[32px]">
              pest_control
            </span>
          </div>

          <h3 className="text-[18px] leading-[26px] font-semibold text-on-surface tracking-tight mb-space-xs">
            {reports.length === 0
              ? "No bug reports yet"
              : `No ${filter} issues`}
          </h3>

          <p className="font-body-md text-body-md text-on-surface-variant max-w-md mx-auto mb-space-lg leading-relaxed">
            {reports.length === 0
              ? "When someone reports an issue, it will appear here. Submit the form to log your project's first bug."
              : `There are currently no bug reports marked as "${filter}".`}
          </p>

          {reports.length === 0 ? (
            <div className="w-full max-w-md bg-surface-container-low rounded-lg p-space-md text-left mb-space-md border border-outline-variant/30">
              <div className="flex items-center justify-between text-on-surface-variant mb-space-xs">
                <span className="font-code-sm text-code-sm flex items-center gap-1 font-medium">
                  <span className="material-symbols-outlined text-[14px]">code</span>
                  cURL Ingest Preview
                </span>
                <span className="font-code-sm text-code-sm text-tertiary">
                  v1/events
                </span>
              </div>
              <div className="bg-surface-container-lowest p-space-sm rounded font-code-sm text-code-sm text-on-surface select-all overflow-x-auto shadow-xs border border-outline-variant/20">
                <code>{`curl -X POST https://api.bugdrop.app/v1/report \\
  -H "Authorization: Bearer dev_token" \\
  -d '{"title":"Test Ping","severity":"low"}'`}</code>
              </div>
              <button
                type="button"
                onClick={onResetSeedData}
                className="mt-3 w-full py-1.5 px-space-md rounded-md bg-surface-container-lowest hover:bg-surface-container text-primary font-label-xs text-label-xs font-semibold flex items-center justify-center gap-1 transition-colors border border-outline-variant/40"
              >
                <span className="material-symbols-outlined text-[14px]">dataset</span>
                Pre-load Sample Seed Data
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setFilter("All")}
              className="py-1.5 px-space-md rounded-lg bg-surface-container text-primary font-label-sm text-label-sm font-medium hover:bg-surface-container-high transition-colors"
            >
              Show all reports
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-col space-y-space-sm" role="feed" aria-label="Recent bugs list">
          {filteredReports.map((report) => {
            // Severity badge styling
            const severityBadge =
              report.severity === "High" ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-error-container text-on-error-container font-label-xs text-label-xs font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-error"></span>
                  High
                </span>
              ) : report.severity === "Medium" ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container-high text-tertiary-container font-label-xs text-label-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  Medium
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container text-on-surface-variant font-label-xs text-label-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-outline"></span>
                  Low
                </span>
              );

            // Status badge styling
            const statusBadge =
              report.status === "Open" ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container-high text-secondary font-label-xs text-label-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  Open
                </span>
              ) : report.status === "In Progress" ? (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container-high text-tertiary-container font-label-xs text-label-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                  In Progress
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-surface-container-high text-primary font-label-xs text-label-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
                  Resolved
                </span>
              );

            return (
              <article
                key={report.id}
                className="bg-surface-container-lowest p-space-md rounded-xl shadow-xs hover:shadow-sm transition-all flex flex-col space-y-space-xs border border-outline-variant/20 animate-fade-in group"
              >
                {/* Header row: ID, title, severity & status */}
                <div className="flex items-center justify-between gap-space-sm flex-wrap">
                  <div className="flex items-center gap-space-xs min-w-0 pr-space-xs">
                    <span className="font-code-sm text-code-sm text-primary font-semibold">
                      #{report.id}
                    </span>
                    <span className="text-on-surface-variant/40">•</span>
                    <h3
                      className={`font-headline-sm text-headline-sm text-on-surface leading-snug truncate ${
                        report.status === "Resolved"
                          ? "line-through text-on-surface-variant/80"
                          : "font-semibold"
                      }`}
                      title={report.title}
                    >
                      {report.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-space-xs flex-shrink-0">
                    {severityBadge}
                    {statusBadge}
                  </div>
                </div>

                {/* Description preview */}
                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 leading-relaxed">
                  {report.description}
                </p>

                {/* Footer metadata: reporter & formatted relative time */}
                <div className="flex items-center justify-between pt-space-xs font-code-sm text-code-sm text-on-surface-variant/80">
                  <span className="truncate">
                    Reported by {report.reporter || "Anonymous"}
                    {report.environment ? ` • ${report.environment}` : ""}
                  </span>
                  <span className="flex-shrink-0 text-right">
                    {formatReportDate(report)}
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
