# BugDrop — Technology Stack & Architecture

## Overview
**BugDrop** is a modern, high-velocity incident triage cockpit and bug reporting dashboard designed for open-source maintainers and developer teams. It provides an intuitive, accessible, and responsive interface across laptops, tablets, and mobile devices.

---

## Core Technologies

| Category | Technology | Version | Description |
| :--- | :--- | :--- | :--- |
| **Framework** | [Next.js](https://nextjs.org/) | `16.4.0` | App Router architecture with Turbopack for lightning-fast builds |
| **UI Library** | [React](https://react.dev/) | `19.3.0` | Modern React 19 architecture with Server & Client components |
| **Language** | [TypeScript](https://www.typescriptlang.org/) | `^5` | Strict static typing across components, models, and utilities |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) | `^4.0` | Utility-first styling engine using modern CSS variables & `@theme` |
| **Bundler / Engine**| [Turbopack](https://turbo.build/pack) | Built-in | Rust-based incremental bundler integrated with Next.js |
| **Linting** | [ESLint](https://eslint.org/) | `^9` | Code standard enforcement with `eslint-config-next` |

---

## Design System & Typography

- **Color Tokens**: Curated Material Design 3 tonal palette defined in CSS variables (`--color-surface`, `--color-primary`, `--color-surface-container`, `--color-error`, etc.) configured for clean contrast and elevation.
- **Typography**:
  - **Headings & Body UI**: [Inter](https://fonts.google.com/specimen/Inter) — clean, readable grotesque sans-serif.
  - **Code, Tokens & IDs**: [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) — monospace font tailored for bug IDs (`#BD-1043`) and cURL previews.
- **Iconography**: [Google Material Symbols Outlined](https://fonts.google.com/icons) — flexible, variable font icon set for UI states and navigation.

---

## Responsive Device Architecture

BugDrop is fully responsive and optimized for three primary form factors:

### 1. Mobile Phones (320px – 640px)
- **Navigation Drawer**: Collapsible mobile hamburger menu with smooth transitions, touch-friendly tap targets ($\ge 44\text{px}$), and instant jump links.
- **Form Ergonomics**: Input font sizes calibrated to prevent automatic zooming on iOS Safari; full-width tactile action buttons with active tap states.
- **Report Feed**: Fluid cards with dedicated metadata rows preventing title clipping and badge overflow on narrow screens.
- **Viewport Safe-Handling**: Added `-webkit-text-size-adjust: 100%` and `overflow-x: hidden` for horizontal stability.

### 2. Tablets (640px – 1024px)
- **3-Column Metric Summary**: Balanced metrics grid (`sm:grid-cols-3`) providing instant triage insight.
- **Fluid Layout**: Centered max-width with tablet gutter margins (`px-6 md:px-8`).
- **Unified Controls**: Search input and status filter pills side-by-side with live sync indicator.

### 3. Laptops & Wide Monitors ($\ge 1024\text{px}$)
- **Two-Column Cockpit**: 
  - **Left (5 cols)**: Sticky Bug Submission Form (`lg:sticky lg:top-20`) that stays pinned during report reviews.
  - **Right (7 cols)**: Incident reports stream with multi-level filtering and search.
- **Desktop Actions**: Quick search trigger (`⌘K`) and maintainer status preview in header.

---

## Component Architecture

```
src/
├── app/
│   ├── globals.css         # Tailwind v4 theme tokens, fonts & responsive utilities
│   ├── layout.tsx          # Root layout with font imports and metadata
│   └── page.tsx            # Main triage cockpit view & state orchestration
├── components/
│   ├── Header.tsx          # Top fixed navigation, brand logo & mobile drawer
│   ├── SummaryCards.tsx    # Live metric cards (Open, In Progress, Resolved)
│   ├── BugReportForm.tsx   # Bug submission form with client validation
│   ├── BugReportList.tsx   # Filterable report stream with live search & empty state
│   └── Footer.tsx          # Status indicator, legal notice & quick links
├── data/
│   └── sampleBugs.ts       # Curated seed dataset for initial dashboard state
├── types/
│   └── bug.ts              # Core TypeScript interfaces (BugReport, Severity, BugStatus)
└── utils/
    └── date.ts             # Relative date formatting utility
```

---

## State Management & Data Handling

- **Local Reactive State**: In-memory React state via `useState` for instantaneous feedback without external backend dependencies.
- **Validation**: Strict client-side validation ensuring minimum character lengths, preventing empty submissions, and displaying field-level alerts.
- **Live Search & Filter**: Real-time multi-field search (ID, title, description, reporter) combined with status tab filters (`All`, `Open`, `In Progress`, `Resolved`).
- **Seed Persistence**: Built-in sample dataset restoration and cURL API ingest preview.

---

## Scripts & Development

```bash
# Start local development server with Turbopack (http://localhost:3000)
npm run dev

# Create optimized production build
npm run build

# Run production server
npm run start

# Run ESLint validation
npm run lint
```
