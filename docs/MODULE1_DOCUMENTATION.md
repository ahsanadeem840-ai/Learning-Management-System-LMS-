# Learning Management System (LMS) - Module 1 Portfolio Documentation

This document compiles the work completed during **Module 1** (Day 1 to Day 5) of the Learning Management System (LMS) Frontend development.

---

## 📋 Portfolio Overview
- **Student / Intern Name:** Ahsan Adeem
- **Email:** ahsanadeem840@gmail.com
- **Program:** Frontend Web Development / Next.js React Developer
- **Milestone:** Module 1 Submission (Requirements, UX Wireframes, and Next.js Scaffolding)
- **Repository URL:** [GitHub Repository](https://github.com/ahsanadeem840-ai/Learning-Management-System-LMS-)

---

## Table of Contents
1. [Day 1: Requirement Analysis & Scope Specification](#day-1-requirement-analysis--scope-specification)
2. [Day 2: Detailed User Stories & Acceptance Criteria](#day-2-detailed-user-stories--acceptance-criteria)
3. [Day 3: UI/UX Wireframes & Screen Layout Maps](#day-3-uiux-wireframes--screen-layout-maps)
4. [Day 4: Design Token Setup & Mockup Finalization](#day-4-design-token-setup--mockup-finalization)
5. [Day 5: Next.js + Tailwind CSS Scaffolding & Landing Page](#day-5-nextjs--tailwind-css-scaffolding--landing-page)
6. [Getting Started & Local Setup](#getting-started--local-setup)

---

## Day 1: Requirement Analysis & Scope Specification
We identified the core personas and outlined the functional boundaries of the application:

### 1. User Roles & Permission Scopes
- **Student / Learner:**
  - Course search & filters (category, level, rating).
  - Learning console: video player, curriculum sidebar, notes, Q&A discussion boards.
  - Quizzes & assignments grading tracking.
  - Certificate download page for completed courses.
- **Instructor / Educator:**
  - Instructor dashboard (revenue, total students, course metrics).
  - Course builder studio (multi-step curriculum builder wizard, upload support).
  - Student grading panel.
- **Platform Administrator:**
  - Admin dashboard tracking system-wide activity, user metrics, and pending approvals.
  - User accounts management.
  - Course moderation (approval queue, reject with reason logs).

### 2. Premium Design Tokens
- **Background Color:** `#0F172A` (Slate Dark)
- **Accent Color:** `#6366F1` (Indigo Glow)
- **Glass Panel Style:** `rgba(30, 41, 59, 0.7)` background, `12px` blur backdrop filter, `1px solid rgba(255, 255, 255, 0.08)` border.

---

## Day 2: Detailed User Stories & Acceptance Criteria
We formulated the functional requirements as user stories and mapped acceptance criteria using the Gherkin format:

| Epic Area | Story ID | Persona | Feature | Priority |
| :--- | :--- | :--- | :--- | :--- |
| **Auth & Navigation** | US-01 | Guest | Signup / Login with role selection | High |
| **Auth & Navigation** | US-02 | User | Role-customized header navigation menus | High |
| **Student Experience** | US-03 | Student | Search and multi-criteria filters | High |
| **Student Experience** | US-04 | Student | Syllabus accordion detail viewing & enrollment | High |
| **Student Experience** | US-05 | Student | Learning console with video player & curriculum list | **Critical** |
| **Student Experience** | US-06 | Student | Notepad with timestamps & lesson Q&As | **Critical** |
| **Student Experience** | US-07 | Student | Multiple-choice quiz attempts & explanation panel | Medium |
| **Student Experience** | US-08 | Student | PDF Certificates of completion | Medium |
| **Instructor Studio** | US-09 | Instructor | Multi-step Course Creation Studio wizard | **Critical** |
| **Instructor Studio** | US-10 | Instructor | Student submissions grading table | **Critical** |
| **Admin Moderation** | US-11 | Admin | Course approval queue and revision comments | Medium |

### Sample Acceptance Criteria (Gherkin Format)
```gherkin
Scenario: Clicking on a curriculum lesson
  Given the student is on the Learning Console page (/learn/:courseId)
  When they click on Lesson 3 in the curriculum sidebar
  Then the main video player loads the media for Lesson 3
  And the lesson title updates in the header layout.
```

---

## Day 3: UI/UX Wireframes & Screen Layout Maps
Low-fidelity layout blueprints were drafted for the five core screens:
1. **Home/Landing Page:** 12-column layout mapping header navbar, value hero banner, featured categories grid, and popular course card grid.
2. **Authentication Page:** Floating centered card backdrop layout with dynamic form fields (based on Sign-in vs Register tab selection).
3. **Student Dashboard:** Features a left collapsible sidebar, welcome streak stats panel, in-progress carousel, and recommended courses grid.
4. **Instructor Dashboard:** Displays revenue, students, and ratings analytics sparklines, followed by the active course management table.
5. **Admin Moderation Portal:** Moderation queue table containing action CTAs (Preview, Approve, Reject modal).

*Note: Wireframe image assets are committed to the directory `docs/images/`.*

---

## Day 4: Design Token Setup & Mockup Finalization
The structural layouts were refined into high-fidelity designs, defining clean component interfaces and typography:
- Font pairings: **Outfit** (headings) & **Inter** (copy text).
- Premium design overlays: Glow shadows and subtle dark-borders to maximize glassmorphic depth.

---

## Day 5: Next.js + Tailwind CSS Scaffolding & Landing Page
The project structure was migrated from Vite to **Next.js 16 (App Router)** and **Tailwind CSS v4**.

### Next.js File Layout
- `src/app/page.js`: Premium dark glassmorphic landing page containing:
  - Sticky glass header with search box.
  - Hero banner with absolute glow blur graphics and LMS platform metrics.
  - Interactive category selection grids.
  - Course product cards styled with Tailwind transitions.
- `src/app/layout.js`: Main layout loading google fonts and setting text selections.
- `src/app/favicon.ico`: Custom platform branding icon.

---

## Getting Started & Local Setup

To launch and run the frontend server locally:

```bash
# 1. Clone the repository
git clone https://github.com/ahsanadeem840-ai/Learning-Management-System-LMS-.git
cd Learning-Management-System-LMS-

# 2. Install dependencies
npm install

# 3. Launch Development Server
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser to view the live dark-themed LMS Landing Page.
