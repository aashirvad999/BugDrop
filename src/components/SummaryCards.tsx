"use client";

import React from "react";

interface SummaryCardsProps {
  openCount: number;
  inProgressCount: number;
  resolvedCount: number;
}

export function SummaryCards({
  openCount,
  inProgressCount,
  resolvedCount,
}: SummaryCardsProps) {
  return (
    <section
      className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 md:gap-space-md"
      aria-label="Bug status summary metrics"
    >
      {/* Open Card */}
      <div className="bg-surface-container-lowest p-4 sm:p-5 rounded-xl shadow-xs flex flex-col justify-between space-y-3 hover:shadow-sm hover:border-outline-variant/40 transition-all border border-outline-variant/20">
        <div className="flex items-center justify-between gap-2">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
            Open
          </span>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-surface-container-high font-label-xs text-label-xs text-secondary font-medium">
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
            Awaiting Triage
          </span>
        </div>
        <div className="flex items-baseline justify-between gap-2 pt-1">
          <span className="text-2xl sm:text-3xl lg:text-headline-xl text-on-surface font-bold tracking-tight">
            {openCount}
          </span>
          <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
            {openCount === 1 ? "report queued" : "reports queued"}
          </span>
        </div>
      </div>

      {/* In Progress Card */}
      <div className="bg-surface-container-lowest p-4 sm:p-5 rounded-xl shadow-xs flex flex-col justify-between space-y-3 hover:shadow-sm hover:border-outline-variant/40 transition-all border border-outline-variant/20">
        <div className="flex items-center justify-between gap-2">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
            In Progress
          </span>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-surface-container-high font-label-xs text-label-xs text-tertiary-container font-medium">
            <span className="w-2 h-2 rounded-full bg-tertiary"></span>
            Investigating
          </span>
        </div>
        <div className="flex items-baseline justify-between gap-2 pt-1">
          <span className="text-2xl sm:text-3xl lg:text-headline-xl text-on-surface font-bold tracking-tight">
            {inProgressCount}
          </span>
          <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
            {inProgressCount === 1 ? "under review" : "under review"}
          </span>
        </div>
      </div>

      {/* Resolved Card */}
      <div className="bg-surface-container-lowest p-4 sm:p-5 rounded-xl shadow-xs flex flex-col justify-between space-y-3 hover:shadow-sm hover:border-outline-variant/40 transition-all border border-outline-variant/20">
        <div className="flex items-center justify-between gap-2">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
            Resolved
          </span>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-surface-container-high font-label-xs text-label-xs text-primary font-medium">
            <span className="w-2 h-2 rounded-full bg-primary-container"></span>
            Completed
          </span>
        </div>
        <div className="flex items-baseline justify-between gap-2 pt-1">
          <span className="text-2xl sm:text-3xl lg:text-headline-xl text-on-surface font-bold tracking-tight">
            {resolvedCount}
          </span>
          <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
            closed this cycle
          </span>
        </div>
      </div>
    </section>
  );
}
