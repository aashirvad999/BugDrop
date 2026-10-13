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

      <main className="flex-1 w-full pt-14 bg-surface max-w-7xl mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
        <div className="flex flex-col w-full py-space-lg space-y-space-xl">
          {/* Toast Notification (Feedback on bug submission) */}
          {toastMessage && (
            <div
              className="flex items-center justify-between bg-surface-container-lowest p-space-md rounded-xl shadow-md border border-outline-variant/30 animate-fade-in transition-all duration-300"
              role="alert"
              aria-live="polite"
            >
              <div className="flex items-center gap-space-md">
                <div className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-secondary">
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-on-surface font-semibold">
                    {toastMessage}
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Thank you for helping improve BugDrop. Issue added to in-memory queue.
                  </span>
                </div>
              </div>
              <button
                type="button"
                aria-label="Dismiss notification"
                onClick={() => setToastMessage(null)}
                className="p-1 rounded text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>
          )}

          {/* Header & Primary Action */}
          <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
            <div className="space-y-space-xs">
              <div className="flex items-center gap-space-xs text-on-surface-variant font-code-sm text-code-sm">
                <span>PUBLIC REPOSITORY</span>
                <span>/</span>
                <span className="text-primary font-medium">COMMUNITY WORKSPACE</span>
              </div>
              <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight font-bold">
                Bug Dashboard
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant">
                Report issues, track progress, and help keep things running smoothly.
              </p>
            </div>
            <div className="flex items-center gap-space-sm pt-space-xs sm:pt-0">
              <a
                href="#bug-submission-section"
                className="inline-flex items-center gap-space-xs px-space-md py-2 rounded-lg bg-primary text-on-primary font-label-md text-label-md shadow-sm hover:bg-primary-container transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 font-medium"
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
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-start">
            {/* Left Column: Bug Submission Form (5 Cols) */}
            <div className="lg:col-span-5">
              <BugReportForm onSubmitSuccess={handleNewReport} />
            </div>

            {/* Right Column: Recent Bug Reports (7 Cols) */}
            <div className="lg:col-span-7">
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
