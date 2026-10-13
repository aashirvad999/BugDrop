export function formatReportDate(report: {
  createdAt: string;
  displayDate?: string;
}): string {
  if (report.displayDate) {
    return report.displayDate;
  }

  try {
    const d = new Date(report.createdAt);
    if (isNaN(d.getTime())) return "Recently";

    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "Recently";
  }
}
