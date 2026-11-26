"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Send, Loader2, Lock, AlertCircle } from "lucide-react";
import { Severity, BugReport } from "../types/bug";

interface BugReportFormProps {
  onSubmitSuccess: (newReport: BugReport) => void;
}

const ENVIRONMENTS = [
  "Local Client",
  "Production",
  "Staging",
  "iOS Safari",
] as const;

export function BugReportForm({ onSubmitSuccess }: BugReportFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState<Severity>("Medium");
  const [environment, setEnvironment] = useState<string>("Local Client");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation errors
  const [titleError, setTitleError] = useState<string | null>(null);
  const [descError, setDescError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;

    if (!title.trim()) {
      setTitleError("Please provide an issue title.");
      hasError = true;
    } else if (title.trim().length < 5) {
      setTitleError("Title must be at least 5 characters long.");
      hasError = true;
    } else {
      setTitleError(null);
    }

    if (!description.trim()) {
      setDescError("Please describe the issue or reproduction steps.");
      hasError = true;
    } else if (description.trim().length < 10) {
      setDescError("Description should be at least 10 characters long.");
      hasError = true;
    } else {
      setDescError(null);
    }

    if (hasError) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = `BD-${Math.floor(1043 + Math.random() * 900)}`;

      const newReport: BugReport = {
        id: generatedId,
        title: title.trim(),
        description: description.trim(),
        severity,
        status: "Open",
        createdAt: new Date().toISOString(),
        displayDate: "Just now",
        reporter: "You",
        environment: environment.trim() || "Local Client",
      };

      onSubmitSuccess(newReport);

      setTitle("");
      setDescription("");
      setSeverity("Medium");
      setEnvironment("Local Client");
      setTitleError(null);
      setDescError(null);
      setIsSubmitting(false);
    }, 450);
  };

  return (
    <div
      className="bg-surface p-5 sm:p-6 rounded-lg border border-border shadow-[0_1px_2px_rgba(9,9,11,0.03)] flex flex-col gap-5"
      id="bug-submission-section"
    >
      <div className="space-y-1 border-b border-border pb-4">
        <h2 className="font-display text-lg text-ink font-bold tracking-tight">
          Report a Bug
        </h2>
        <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
          Log an issue directly into the triage cockpit queue.
        </p>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
        {/* Title Field */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="bug-title"
            className="text-xs text-ink flex items-center justify-between"
          >
            <span className="font-semibold">
              Bug Title <span className="text-error">*</span>
            </span>
            <span className="font-mono text-[11px] text-ink-muted">
              Short &amp; descriptive
            </span>
          </label>
          <input
            id="bug-title"
            name="title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (titleError) setTitleError(null);
            }}
            placeholder="e.g., Login button unresponsive on mobile"
            className={`w-full min-h-[44px] bg-surface-subtle/60 px-3.5 py-2.5 rounded-md text-ink text-base sm:text-sm placeholder:text-ink-muted/70 focus:bg-surface focus:ring-2 transition-all outline-none ${
              titleError
                ? "border border-error ring-1 ring-error/30 bg-error-soft/50"
                : "border border-border hover:border-border-strong focus:border-ink focus:ring-ink/10"
            }`}
            disabled={isSubmitting}
            aria-invalid={!!titleError}
            aria-describedby={titleError ? "title-error" : undefined}
          />
          {titleError && (
            <p
              id="title-error"
              className="text-xs text-error flex items-center gap-1.5 pt-0.5 font-medium"
            >
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              {titleError}
            </p>
          )}
        </div>

        {/* Description Field */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="bug-desc"
            className="text-xs text-ink flex items-center justify-between"
          >
            <span className="font-semibold">
              Description <span className="text-error">*</span>
            </span>
            <span className="font-mono text-[11px] text-ink-muted">
              Steps to reproduce
            </span>
          </label>
          <textarea
            id="bug-desc"
            name="description"
            rows={4}
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              if (descError) setDescError(null);
            }}
            placeholder="Describe what happened, what you expected, and how to reproduce the issue..."
            className={`w-full min-h-[110px] bg-surface-subtle/60 px-3.5 py-2.5 rounded-md text-ink text-base sm:text-sm placeholder:text-ink-muted/70 focus:bg-surface focus:ring-2 transition-all resize-y outline-none ${
              descError
                ? "border border-error ring-1 ring-error/30 bg-error-soft/50"
                : "border border-border hover:border-border-strong focus:border-ink focus:ring-ink/10"
            }`}
            disabled={isSubmitting}
            aria-invalid={!!descError}
            aria-describedby={descError ? "desc-error" : undefined}
          />
          {descError && (
            <p
              id="desc-error"
              className="text-xs text-error flex items-center gap-1.5 pt-0.5 font-medium"
            >
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
              {descError}
            </p>
          )}
        </div>

        {/* Severity Selector */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-ink font-semibold">
            Severity Level
          </span>
          <div
            className="grid grid-cols-3 gap-1 p-1 bg-surface-subtle rounded-md border border-border"
            role="radiogroup"
            aria-label="Severity level options"
          >
            {(["Low", "Medium", "High"] as Severity[]).map((level) => {
              const isActive = severity === level;
              const dotColor =
                level === "High"
                  ? "bg-red-600"
                  : level === "Medium"
                  ? "bg-amber-500"
                  : "bg-zinc-400";

              return (
                <button
                  key={level}
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  onClick={() => setSeverity(level)}
                  disabled={isSubmitting}
                  className={`relative min-h-[38px] py-1.5 px-2 rounded text-xs sm:text-[13px] flex items-center justify-center gap-1.5 transition-colors select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                    isActive
                      ? "text-ink font-semibold"
                      : "text-ink-secondary hover:text-ink"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="severity-active-pill"
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                      className="absolute inset-0 bg-surface rounded shadow-xs border border-border"
                    />
                  )}
                  <span
                    className={`relative z-10 w-2 h-2 rounded-full flex-shrink-0 ${dotColor}`}
                  />
                  <span className="relative z-10 truncate">{level}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Environment Quick Tag */}
        <div className="flex flex-col gap-1.5">
          <span className="text-xs text-ink font-semibold flex items-center justify-between">
            <span>Environment</span>
            <span className="font-mono text-[11px] text-ink-muted font-normal">
              Optional
            </span>
          </span>
          <div className="flex flex-wrap gap-1.5">
            {ENVIRONMENTS.map((env) => {
              const active = environment === env;
              return (
                <button
                  key={env}
                  type="button"
                  onClick={() => setEnvironment(env)}
                  disabled={isSubmitting}
                  className={`px-2.5 py-1 rounded text-[11px] font-mono transition-colors cursor-pointer border focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                    active
                      ? "bg-ink text-on-primary border-ink font-medium"
                      : "bg-surface-subtle/60 text-ink-secondary border-border hover:border-border-strong hover:text-ink"
                  }`}
                >
                  {env}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Button & Security Notice */}
        <div className="pt-2 flex flex-col gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full min-h-[44px] py-2.5 px-4 rounded-md text-sm font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
              isSubmitting
                ? "bg-primary/75 text-on-primary cursor-wait"
                : "bg-primary hover:bg-primary-hover text-on-primary cursor-pointer shadow-xs"
            }`}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Adding to Queue...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Bug Report</span>
              </>
            )}
          </button>

          <div className="flex items-start gap-2 text-ink-muted pt-0.5">
            <Lock className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
            <p className="text-xs leading-relaxed">
              Avoid including passwords, access tokens, or confidential keys in bug reports.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
