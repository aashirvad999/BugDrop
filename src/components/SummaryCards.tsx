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
      className="grid grid-cols-1 sm:grid-cols-3 gap-space-md"
      aria-label="Bug status summary metrics"
    >
      {/* Open Card */}
      <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between space-y-space-md hover:shadow-md transition-shadow border border-outline-variant/20">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
            Open
          </span>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-surface-container-high font-label-xs text-label-xs text-secondary font-medium">
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
            Awaiting Triage
          </span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="font-headline-xl text-headline-xl text-on-surface font-semibold tracking-tight">
            {openCount}
          </span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            {openCount === 1 ? "report queued" : "reports queued"}
          </span>
        </div>
      </div>

      {/* In Progress Card */}
      <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between space-y-space-md hover:shadow-md transition-shadow border border-outline-variant/20">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
            In Progress
          </span>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-surface-container-high font-label-xs text-label-xs text-tertiary-container font-medium">
            <span className="w-2 h-2 rounded-full bg-tertiary"></span>
            Investigating
          </span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="font-headline-xl text-headline-xl text-on-surface font-semibold tracking-tight">
            {inProgressCount}
          </span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            {inProgressCount === 1 ? "actively handled" : "actively handled"}
          </span>
        </div>
      </div>

      {/* Resolved Card */}
      <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col justify-between space-y-space-md hover:shadow-md transition-shadow border border-outline-variant/20">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
            Resolved
          </span>
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-surface-container-high font-label-xs text-label-xs text-primary font-medium">
            <span className="w-2 h-2 rounded-full bg-primary-container"></span>
            Completed
          </span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="font-headline-xl text-headline-xl text-on-surface font-semibold tracking-tight">
            {resolvedCount}
          </span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            closed this release
          </span>
        </div>
      </div>
    </section>
  );
}
