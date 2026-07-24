# Learning Management System (LMS) - Frontend

A modern, high-performance, and feature-rich Learning Management System (LMS) web application supporting Students, Instructors, and Administrators.

## Project Structure & Roadmap

- **Day 1: Requirement Analysis & Scope** — *Completed*
  - Identified User Roles: Student, Instructor, Administrator.
  - Specified Core Features & Workflow Specifications.
  - Planned Frontend Design System & Architecture.
  - See [docs/DAY1_REQUIREMENTS.md](docs/DAY1_REQUIREMENTS.md).

- **Day 2: User Stories & Acceptance Criteria** — *Completed*
  - Documented Detailed User Stories across 4 Epics (Auth, Learning Console, Studio, Admin).
  - Defined Functional Acceptance Criteria in Gherkin format (Given-When-Then).
  - Built Prioritized Requirements Matrix.
  - See [docs/DAY2_USER_STORIES.md](docs/DAY2_USER_STORIES.md).

- **Day 3: UI/UX Wireframes** — *Completed*
  - Crafted Low-fidelity structural layouts for core screens (Home, Auth, dashboards).
  - Drafted Glassmorphic token guidelines and screen component mappings.
  - See [docs/DAY3_WIREFRAMES.md](docs/DAY3_WIREFRAMES.md).

- **Day 4: High-Fidelity Mockups & Vite Scaffolding** — *Completed*
  - Refined wireframes into high-fidelity mockups.
  - Setup initial React + Vite project and finalized the dark-theme design system.

- **Day 5: Next.js + Tailwind CSS Setup** — *Completed*
  - Migrated project from Vite to Next.js App Router.
  - Configured Tailwind CSS v4 with custom design tokens.
  - Established a clean directory structure (`src/components`, `src/context`, `src/data`, `src/layout`, `src/styles`, `src/app`).
  - Added a premium dark glassmorphic landing page (`src/app/page.js`) and pushed the first Next.js commit to GitHub.

---

## Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (v18+ recommended).

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development
Start the Next.js development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Production Build
Build the optimized application:
```bash
npm run build
```
Start the production server locally:
```bash
npm run start
```
