import { BugReport } from "../types/bug";

/**
 * TEMPORARY IN-MEMORY SAMPLE DATA FOR PHASE 1 UI ONLY.
 * Note: Reports do NOT persist across browser refreshes.
 * This sample data module will be replaced in Phase 2 when Supabase PostgreSQL is connected.
 */
export const INITIAL_SAMPLE_BUGS: BugReport[] = [
  {
    id: "BD-1042",
    title: "Login button does not respond on mobile",
    description:
      "Tapping the Google OAuth button on Safari iOS triggers no event, console shows silent rejection in credential handler.",
    severity: "High",
    status: "Open",
    createdAt: "2026-10-13T19:42:00.000Z",
    displayDate: "10 mins ago",
    reporter: "@dev_marcus",
    environment: "iOS Safari 17",
  },
  {
    id: "BD-1039",
    title: "Dashboard count does not refresh after submission",
    description:
      "Summary counters stay stale until manual page reload. Mutation optimistic UI cache invalidation appears skipped.",
    severity: "Medium",
    status: "In Progress",
    createdAt: "2026-10-13T17:52:00.000Z",
    displayDate: "2 hours ago",
    reporter: "@sara_k",
    environment: "Staging",
  },
  {
    id: "BD-1035",
    title: "Form validation allows an empty description",
    description:
      "Submitting whitespace passes client-side validation check without throwing standard input bounds feedback.",
    severity: "Low",
    status: "Resolved",
    createdAt: "2026-10-12T19:52:00.000Z",
    displayDate: "Yesterday",
    reporter: "@alec_v",
    environment: "Production",
  },
  {
    id: "BD-1031",
    title: "Navigation overlaps content on smaller tablet viewports",
    description:
      "Header z-index conflicts with sticky table controls around 768px breakpoint causing clipped dropdowns.",
    severity: "Medium",
    status: "In Progress",
    createdAt: "2026-10-11T19:52:00.000Z",
    displayDate: "2 days ago",
    reporter: "@julian_ui",
    environment: "Tablet / iPad",
  },
  {
    id: "BD-1028",
    title: "Supabase session cookie expires prematurely after 1 hour",
    description:
      "OAuth refresh token rotation intermittently fails in production when concurrent tabs initiate handshake.",
    severity: "High",
    status: "Resolved",
    createdAt: "2026-10-10T19:52:00.000Z",
    displayDate: "3 days ago",
    reporter: "@nathan_infra",
    environment: "Production",
  },
];
