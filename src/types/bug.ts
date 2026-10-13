export type Severity = "Low" | "Medium" | "High";

export type BugStatus = "Open" | "In Progress" | "Resolved";

export interface BugReport {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  status: BugStatus;
  createdAt: string; // ISO 8601 string
  displayDate?: string;
  reporter?: string;
  environment?: string;
}
