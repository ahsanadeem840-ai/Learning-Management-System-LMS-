# Day 1: Requirement Analysis & Functional Scope

## 🎯 Project Overview
This document outlines the core requirements, functional scope, user personas, and component architecture for the **Learning Management System (LMS) Frontend**.

---

## 1. Target User Roles & Permissions

### 👨‍🎓 1. Student / Learner
- **Course Discovery & Enrollment**: Search, filter by category/rating/level, view course previews, syllabus, and enroll.
- **Learning Console**: High-quality video player, collapsible curriculum sidebar, lesson notes, and Q&A discussion board.
- **Assessments & Submissions**: Timed quiz interface, assignment file upload, and grade tracking.
- **Certificates**: downloadable/verifiable PDF completion certificates.

### 👩‍🏫 2. Instructor / Educator
- **Instructor Dashboard**: Overview of revenue, student enrollment counts, course ratings, and performance metrics.
- **Course Studio**: Multi-step course creation (metadata, curriculum sections, video uploader, resource attachments).
- **Grading & Feedback**: Review assignment submissions, assign grades, and provide feedback.

### 🛡️ 3. Platform Administrator
- **Admin Dashboard**: System-wide user activity, revenue overview, and course approval status.
- **User Management**: Manage student and instructor accounts, role assignments, and suspensions.
- **Course Moderation**: Review pending course submissions, approve or request revisions.

---

## 2. Design System & Aesthetics
- **Theme**: Premium Dark / Modern Glassmorphism (`#0F172A` canvas, `#6366F1` primary accent, glass cards with soft borders).
- **Typography**: Inter / Outfit Google Fonts.
- **Responsiveness**: Fully responsive mobile, tablet, and desktop layouts.

---

## 3. Architecture & Directory Blueprint

```
src/
├── assets/             # Branding, graphics, icons
├── components/         # Reusable UI components (Navbar, Sidebar, Modal, Cards)
├── context/            # Auth, Course, and Theme state providers
├── data/               # Mock datasets for offline development
├── layout/             # Shared layout wrappers
├── pages/              # Route views (Home, Dashboard, Learn, Studio, Admin)
└── styles/             # Global design tokens, CSS variables, utility classes
```
