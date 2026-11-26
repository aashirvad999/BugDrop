"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, X, PlusCircle, RotateCcw, Database } from "lucide-react";
import { Header } from "../components/Header";
import { SummaryCards } from "../components/SummaryCards";
import { BugReportForm } from "../components/BugReportForm";
import { BugReportList } from "../components/BugReportList";
import { BugDetailModal } from "../components/BugDetailModal";
import { CommandPalette } from "../components/CommandPalette";
import { Footer } from "../components/Footer";
import { INITIAL_SAMPLE_BUGS } from "../data/sampleBugs";
import { BugReport, BugStatus } from "../types/bug";

export default function DashboardPage() {
  const [reports, setReports] = useState<BugReport[]>(INITIAL_SAMPLE_BUGS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [dbNotice, setDbNotice] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<"All" | BugStatus>("All");
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch("/api/bugs", { cache: "no-store" })
      .then(async (res) => {
        const data = await res.json();
        if (cancelled) return;
        if (!res.ok) {
          setDbNotice(
            data?.error ||
            "MongoDB is not configured yet. Using local sample data."
          );
          return;
        }
        setDbNotice(null);
        if (Array.isArray(data.reports)) {
          setReports(data.reports);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setDbNotice(
            "Unable to reach MongoDB API. Showing local sample data."
          );
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // Global Cmd+K / Ctrl+K shortcut for Command Palette
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const openCount = reports.filter((r) => r.status === "Open").length;
  const inProgressCount = reports.filter((r) => r.status === "In Progress").length;
  const resolvedCount = reports.filter((r) => r.status === "Resolved").length;

  const selectedReport =
    reports.find((r) => r.id === selectedReportId) ?? null;

  const handleNewReport = async (newReport: BugReport) => {
    const res = await fetch("/api/bugs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newReport),
    });

    const data = await res.json();

    if (!res.ok) {
      if (res.status === 503) {
        // MongoDB URI not configured yet; keep local fallback working
        setReports((prev) => [newReport, ...prev]);
        setToastMessage(`Report #${newReport.id} added locally (DB not configured)`);
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }
      throw new Error(data?.error || "Failed to save bug report.");
    }

    const savedReport: BugReport = data.report ?? newReport;
    setReports((prev) => [savedReport, ...prev]);
    setDbNotice(null);
    setToastMessage(`Report #${savedReport.id} saved to MongoDB`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleStatusChange = async (id: string, newStatus: BugStatus) => {
    const previous = reports;
    setReports((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );

    try {
      const res = await fetch(`/api/bugs/${encodeURIComponent(id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!res.ok && res.status !== 503) {
        setReports(previous);
        setToastMessage(`Failed to update #${id}`);
        return;
      }

      setToastMessage(`Updated #${id} status to ${newStatus}`);
    } catch {
      setReports(previous);
      setToastMessage(`Failed to update #${id}`);
    }
  };

  const handleResetSeedData = async () => {
    try {
      const res = await fetch("/api/bugs/seed", { method: "POST" });
      const data = await res.json();
      if (res.ok && Array.isArray(data.reports)) {
        setReports(data.reports);
        setDbNotice(null);
        setStatusFilter("All");
        setToastMessage("Sample seed data synced to MongoDB");
        return;
      }
    } catch {
      // Fallback to local seed
    }
    setReports(INITIAL_SAMPLE_BUGS);
    setStatusFilter("All");
    setToastMessage("Sample seed data restored locally");
  };

  return (
    <>
      <Header onOpenCommand={() => setCommandOpen(true)} />

      {/* Subtle architectural dot-matrix band at top */}
      <div className="relative flex-1 w-full bg-canvas">
        <div
          className="pointer-events-none absolute inset-x-0 top-14 h-56 bg-dot-matrix opacity-45 [mask-image:linear-gradient(to_bottom,black,transparent)]"
          aria-hidden="true"
        />

        <main className="relative z-10 w-full pt-20 sm:pt-24 pb-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col w-full gap-6 sm:gap-8">
            {/* Database status notice if MONGODB_URI is not configured */}
            {dbNotice && (
              <div
                className="flex items-center justify-between gap-3 bg-amber-50/90 p-3 rounded-lg border border-amber-200 text-amber-900 text-xs sm:text-sm"
                role="status"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Database className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span className="truncate">{dbNotice}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setDbNotice(null)}
                  aria-label="Dismiss database notice"
                  className="p-1 rounded text-amber-700 hover:bg-amber-100 cursor-pointer flex-shrink-0"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Toast Notification */}
            <AnimatePresence>
              {toastMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18 }}
                  className="flex items-center justify-between gap-3 bg-surface p-3.5 sm:p-4 rounded-lg shadow-sm border border-border"
                  role="alert"
                  aria-live="polite"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-md bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm text-ink font-semibold truncate">
                        {toastMessage}
                      </span>
                      <span className="font-mono text-[11px] text-ink-muted truncate">
                        Triage cockpit state synchronized
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    aria-label="Dismiss notification"
                    onClick={() => setToastMessage(null)}
                    className="p-1.5 rounded-md text-ink-muted hover:text-ink hover:bg-surface-subtle transition-colors min-h-[34px] min-w-[34px] flex items-center justify-center flex-shrink-0 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Editorial Cockpit Header */}
            <section className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-border/80">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 font-mono text-[11px] tracking-wider uppercase text-ink-muted">
                  <span>oss-core</span>
                  <span className="text-border-strong">/</span>
                  <span className="text-accent font-semibold">
                    community-triage
                  </span>
                </div>
                <h1 className="font-display text-2xl sm:text-3xl lg:text-[34px] text-ink tracking-tight font-extrabold leading-tight">
                  Incident Triage Cockpit
                </h1>
                <p className="text-sm text-ink-secondary max-w-2xl">
                  Report issues, inspect reproduction details, and manage release-blocking bugs in real time.
                </p>
              </div>

              <div className="flex items-center gap-2 pt-1 sm:pt-0">
                <button
                  type="button"
                  onClick={handleResetSeedData}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-md bg-surface hover:bg-surface-hover text-ink-secondary hover:text-ink border border-border text-xs font-medium transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  title="Restore sample dataset"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Reset Seed</span>
                </button>
                <a
                  href="#bug-submission-section"
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-primary text-on-primary text-sm font-semibold shadow-xs hover:bg-primary-hover transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-accent active:scale-[0.99]"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Report a Bug</span>
                </a>
              </div>
            </section>

            {/* Summary Status Telemetry */}
            <SummaryCards
              openCount={openCount}
              inProgressCount={inProgressCount}
              resolvedCount={resolvedCount}
              activeFilter={statusFilter}
              onSelectFilter={setStatusFilter}
            />

            {/* Two-Column Triage Cockpit */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              {/* Left Column: Sticky Submission Form */}
              <div className="lg:col-span-5 lg:sticky lg:top-20 order-2 lg:order-1">
                <BugReportForm onSubmitSuccess={handleNewReport} />
              </div>

              {/* Right Column: Triage Queue */}
              <div className="lg:col-span-7 order-1 lg:order-2">
                <BugReportList
                  reports={reports}
                  statusFilter={statusFilter}
                  onStatusFilterChange={setStatusFilter}
                  onSelectReport={(report) => setSelectedReportId(report.id)}
                  onResetSeedData={handleResetSeedData}
                />
              </div>
            </section>
          </div>
        </main>
      </div>

      <Footer />

      <BugDetailModal
        report={selectedReport}
        onClose={() => setSelectedReportId(null)}
        onStatusChange={handleStatusChange}
      />

      <CommandPalette
        open={commandOpen}
        onClose={() => setCommandOpen(false)}
        reports={reports}
        onSelectReport={(report) => setSelectedReportId(report.id)}
        onFilterStatus={setStatusFilter}
        onResetSeedData={handleResetSeedData}
      />
    </>
  );
}
