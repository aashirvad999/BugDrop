"use client";

import React from "react";
import { motion } from "motion/react";
import { AlertCircle, Clock, CheckCircle2 } from "lucide-react";
import { SlidingNumber } from "./SlidingNumber";
import { BugStatus } from "../types/bug";

interface SummaryCardsProps {
  openCount: number;
  inProgressCount: number;
  resolvedCount: number;
  activeFilter?: "All" | BugStatus;
  onSelectFilter?: (status: "All" | BugStatus) => void;
}

export function SummaryCards({
  openCount,
  inProgressCount,
  resolvedCount,
  activeFilter = "All",
  onSelectFilter,
}: SummaryCardsProps) {
  const total = openCount + inProgressCount + resolvedCount;
  const pct = (count: number) => (total > 0 ? Math.round((count / total) * 100) : 0);

  const cards = [
    {
      status: "Open" as BugStatus,
      label: "Open",
      badge: "Awaiting Triage",
      count: openCount,
      sublabel: openCount === 1 ? "report queued" : "reports queued",
      icon: AlertCircle,
      dotClass: "bg-orange-500",
      badgeClass: "bg-orange-50 text-orange-700 border-orange-200/80",
      barClass: "bg-orange-500",
      ringClass: "ring-orange-500/40 border-orange-300",
    },
    {
      status: "In Progress" as BugStatus,
      label: "In Progress",
      badge: "Investigating",
      count: inProgressCount,
      sublabel: "under review",
      icon: Clock,
      dotClass: "bg-blue-500",
      badgeClass: "bg-blue-50 text-blue-700 border-blue-200/80",
      barClass: "bg-blue-500",
      ringClass: "ring-blue-500/40 border-blue-300",
    },
    {
      status: "Resolved" as BugStatus,
      label: "Resolved",
      badge: "Completed",
      count: resolvedCount,
      sublabel: "closed this cycle",
      icon: CheckCircle2,
      dotClass: "bg-emerald-500",
      badgeClass: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
      barClass: "bg-emerald-500",
      ringClass: "ring-emerald-500/40 border-emerald-300",
    },
  ];

  return (
    <section
      className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4"
      aria-label="Bug status summary metrics"
    >
      {cards.map((card) => {
        const isSelected = activeFilter === card.status;
        const share = pct(card.count);
        const Icon = card.icon;

        return (
          <button
            key={card.status}
            type="button"
            onClick={() =>
              onSelectFilter?.(isSelected ? "All" : card.status)
            }
            aria-pressed={isSelected}
            className={`text-left bg-surface p-4 sm:p-5 rounded-lg border transition-all flex flex-col justify-between gap-3 group cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              isSelected
                ? `ring-2 ${card.ringClass} shadow-xs`
                : "border-border hover:border-border-strong shadow-[0_1px_2px_rgba(9,9,11,0.03)]"
            }`}
          >
            <div className="flex items-center justify-between gap-2 w-full">
              <div className="flex items-center gap-1.5">
                <Icon className="w-3.5 h-3.5 text-ink-muted" />
                <span className="font-mono text-[11px] text-ink-secondary uppercase tracking-wider font-semibold">
                  {card.label}
                </span>
              </div>
              <span
                className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[11px] font-medium ${card.badgeClass}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${card.dotClass}`} />
                {card.badge}
              </span>
            </div>

            <div className="flex items-baseline justify-between gap-2 w-full">
              <SlidingNumber
                value={card.count}
                className="font-display text-3xl sm:text-[34px] text-ink font-bold tracking-tight leading-none"
              />
              <span className="text-xs text-ink-muted font-mono truncate">
                {card.sublabel} · {share}%
              </span>
            </div>

            {/* Subtle proportion bar */}
            <div className="w-full h-1 bg-surface-subtle rounded-full overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${card.barClass}`}
                initial={{ width: 0 }}
                animate={{ width: `${share}%` }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </button>
        );
      })}
    </section>
  );
}
