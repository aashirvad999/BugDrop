"use client";

import React, { useState } from "react";
import { Header } from "../components/Header";
import { SummaryCards } from "../components/SummaryCards";
import { BugReportForm } from "../components/BugReportForm";
import { BugReportList } from "../components/BugReportList";
import { Footer } from "../components/Footer";
import { INITIAL_SAMPLE_BUGS } from "../data/sampleBugs";
import { BugReport } from "../types/bug";

export default function DashboardPage() {
  // In-memory bug report state for Phase 1 UI MVP
  const [reports, setReports] = useState<BugReport[]>(INITIAL_SAMPLE_BUGS);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Dynamic calculations for summary cards
  const openCount = reports.filter((r) => r.status === "Open").length;
  const inProgressCount = reports.filter((r) => r.status === "In Progress").length;
  const resolvedCount = reports.filter((r) => r.status === "Resolved").length;

  const handleNewReport = (newReport: BugReport) => {
    // Add to in-memory list (prepended so newest appears first)
    setReports((prev) => [newReport, ...prev]);

    // Show success feedback toast
    setToastMessage(`Report #${newReport.id} submitted successfully`);

    // Smoothly scroll to the top or notification
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleResetSeedData = () => {
    setReports(INITIAL_SAMPLE_BUGS);
    setToastMessage("Sample seed data restored.");
  };

  return (
    <>
      <Header />

      <main className="flex-1 w-full pt-16 sm:pt-20 pb-12 bg-surface max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col w-full space-y-6 sm:space-y-8">
          {/* Toast Notification (Feedback on bug submission) */}
          {toastMessage && (
            <div
              className="flex items-center justify-between gap-3 bg-surface-container-lowest p-3.5 sm:p-4 rounded-xl shadow-md border border-outline-variant/30 animate-fade-in transition-all duration-300"
              role="alert"
              aria-live="polite"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-secondary flex-shrink-0">
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-md text-sm sm:text-base text-on-surface font-semibold truncate">
                    {toastMessage}
                  </span>
                  <span className="font-body-sm text-xs sm:text-sm text-on-surface-variant truncate sm:whitespace-normal">
                    Issue added to triage queue.
                  </span>
                </div>
              </div>
              <button
                type="button"
                aria-label="Dismiss notification"
                onClick={() => setToastMessage(null)}
                className="p-1.5 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center flex-shrink-0"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
          )}

          {/* Header & Primary Action */}
          <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-on-surface-variant font-code-sm text-[11px] sm:text-xs tracking-wider flex-wrap">
                <span>PUBLIC REPOSITORY</span>
                <span className="text-outline-variant">/</span>
                <span className="text-primary font-semibold">COMMUNITY WORKSPACE</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-headline-xl text-on-surface tracking-tight font-bold">
                Bug Dashboard
              </h1>
              <p className="font-body-md text-sm sm:text-base text-on-surface-variant max-w-2xl">
                Report issues, track progress, and collaborate on bug fixes in real time.
              </p>
            </div>
            <div className="flex items-center gap-2 pt-1 sm:pt-0">
              <a
                href="#bug-submission-section"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-on-primary font-label-md text-sm font-semibold shadow-xs hover:bg-primary-container transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-primary active:scale-[0.99]"
              >
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                <span>Report a Bug</span>
              </a>
            </div>
          </section>

          {/* Summary Status Cards */}
          <SummaryCards
            openCount={openCount}
            inProgressCount={inProgressCount}
            resolvedCount={resolvedCount}
          />

          {/* Interactive Grid: Intake Form & Bug List */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* Left Column: Bug Submission Form (5 Cols, Sticky on Desktop/Laptop) */}
            <div className="lg:col-span-5 lg:sticky lg:top-20 order-2 lg:order-1">
              <BugReportForm onSubmitSuccess={handleNewReport} />
            </div>

            {/* Right Column: Recent Bug Reports (7 Cols) */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <BugReportList
                reports={reports}
                onResetSeedData={handleResetSeedData}
              />
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
