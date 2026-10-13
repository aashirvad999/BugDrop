"use client";

import React, { useState } from "react";
import { Severity, BugReport } from "../types/bug";

interface BugReportFormProps {
  onSubmitSuccess: (newReport: BugReport) => void;
}

export function BugReportForm({ onSubmitSuccess }: BugReportFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState<Severity>("Medium");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validation errors
  const [titleError, setTitleError] = useState<string | null>(null);
  const [descError, setDescError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let hasError = false;

    // Validate Title: must not be empty or whitespace only
    if (!title.trim()) {
      setTitleError("Please provide an issue title.");
      hasError = true;
    } else if (title.trim().length < 5) {
      setTitleError("Title must be at least 5 characters long.");
      hasError = true;
    } else {
      setTitleError(null);
    }

    // Validate Description: must not be empty or whitespace only
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

    // Simulated client-side submission with feedback state
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
        environment: "Local Client",
      };

      onSubmitSuccess(newReport);

      // Reset form on success
      setTitle("");
      setDescription("");
      setSeverity("Medium");
      setTitleError(null);
      setDescError(null);
      setIsSubmitting(false);
    }, 450);
  };

  return (
    <div
      className="bg-surface-container-lowest p-space-lg md:p-space-xl rounded-xl shadow-sm flex flex-col space-y-space-lg border border-outline-variant/20"
      id="bug-submission-section"
    >
      <div className="space-y-space-xs">
        <div className="flex items-center justify-between">
          <h2 className="font-headline-md text-headline-md text-on-surface font-semibold">
            Report a Bug
          </h2>
          <span className="font-code-sm text-code-sm px-2 py-0.5 rounded bg-surface-container text-on-surface-variant">
            Markdown OK
          </span>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Found a glitch? Submit the details below to log it into the triage cockpit.
        </p>
      </div>

      <form className="flex flex-col space-y-space-md" onSubmit={handleSubmit} noValidate>
        {/* Title Field */}
        <div className="flex flex-col space-y-space-xs">
          <label
            htmlFor="bug-title"
            className="font-label-md text-label-md text-on-surface flex items-center justify-between"
          >
            <span>
              Bug Title <span className="text-error font-bold">*</span>
            </span>
            <span className="font-label-xs text-label-xs text-on-surface-variant">
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
            className={`w-full bg-surface-container-low px-space-md py-2 rounded-lg text-on-surface font-body-md text-body-md placeholder:text-on-surface-variant/60 focus:bg-surface-container-lowest focus:ring-2 transition-all outline-none ${
              titleError
                ? "border border-error ring-1 ring-error/50 bg-error-container/20"
                : "focus:ring-primary/40 border border-transparent"
            }`}
            disabled={isSubmitting}
            aria-invalid={!!titleError}
            aria-describedby={titleError ? "title-error" : undefined}
          />
          {titleError && (
            <p
              id="title-error"
              className="font-label-xs text-label-xs text-error flex items-center gap-1 pt-0.5"
            >
              <span className="material-symbols-outlined text-[14px]">error</span>
              {titleError}
            </p>
          )}
        </div>

        {/* Description Field */}
        <div className="flex flex-col space-y-space-xs">
          <label
            htmlFor="bug-desc"
            className="font-label-md text-label-md text-on-surface flex items-center justify-between"
          >
            <span>
              Description <span className="text-error font-bold">*</span>
            </span>
            <span className="font-label-xs text-label-xs text-on-surface-variant">
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
            className={`w-full bg-surface-container-low px-space-md py-2.5 rounded-lg text-on-surface font-body-md text-body-md placeholder:text-on-surface-variant/60 focus:bg-surface-container-lowest focus:ring-2 transition-all resize-none outline-none ${
              descError
                ? "border border-error ring-1 ring-error/50 bg-error-container/20"
                : "focus:ring-primary/40 border border-transparent"
            }`}
            disabled={isSubmitting}
            aria-invalid={!!descError}
            aria-describedby={descError ? "desc-error" : undefined}
          />
          {descError && (
            <p
              id="desc-error"
              className="font-label-xs text-label-xs text-error flex items-center gap-1 pt-0.5"
            >
              <span className="material-symbols-outlined text-[14px]">error</span>
              {descError}
            </p>
          )}
        </div>

        {/* Severity Selector */}
        <div className="flex flex-col space-y-space-xs">
          <span className="font-label-md text-label-md text-on-surface font-medium">
            Severity Level
          </span>
          <div
            className="grid grid-cols-3 gap-space-xs p-1 bg-surface-container-low rounded-lg"
            role="radiogroup"
            aria-label="Severity level options"
          >
            {(["Low", "Medium", "High"] as Severity[]).map((level) => {
              const isActive = severity === level;
              const dotColor =
                level === "High"
                  ? "bg-error"
                  : level === "Medium"
                  ? "bg-secondary"
                  : "bg-tertiary";

              return (
                <button
                  key={level}
                  type="button"
                  role="radio"
                  aria-checked={isActive}
                  onClick={() => setSeverity(level)}
                  disabled={isSubmitting}
                  className={`py-1.5 px-space-xs rounded-md font-label-sm text-label-sm flex items-center justify-center gap-1.5 transition-all select-none ${
                    isActive
                      ? "bg-surface-container-lowest text-on-surface shadow-xs font-semibold ring-1 ring-outline-variant/30"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container/60"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full ${dotColor}`}></span>
                  <span>{level}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Button & Security Notice */}
        <div className="pt-space-xs flex flex-col space-y-space-sm">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2.5 px-space-md rounded-lg font-label-md text-label-md shadow-sm flex items-center justify-center gap-space-xs transition-all active:scale-[0.99] ${
              isSubmitting
                ? "bg-primary/70 text-on-primary cursor-wait"
                : "bg-primary hover:bg-primary-container text-on-primary cursor-pointer hover:shadow"
            }`}
          >
            {isSubmitting ? (
              <>
                <span className="material-symbols-outlined text-[18px] animate-spin">
                  sync
                </span>
                <span>Adding to Queue...</span>
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[18px]">send</span>
                <span>Submit Bug Report</span>
              </>
            )}
          </button>

          <div className="flex items-start gap-1.5 text-on-surface-variant/80 pt-1">
            <span className="material-symbols-outlined text-[14px] mt-0.5 text-outline">
              lock
            </span>
            <p className="font-body-sm text-body-sm leading-relaxed">
              Please avoid including passwords, access tokens, or other sensitive information in bug reports.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
