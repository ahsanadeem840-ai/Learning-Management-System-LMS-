# Learning Management System (LMS) - Module 3 Portfolio Documentation

This document compiles the work completed during **Module 3** (Core Feature Extensions) of the Learning Management System (LMS) Frontend development.

---

## 📋 Portfolio Overview
- **Student / Intern Name:** Muhammad Ahsan
- **Email:** ahsanadeem840@gmail.com
- **Program:** Frontend Web Development / Next.js React Developer
- **Milestone:** Module 3 - Core Feature Extensions (Day 1: Assignments Console, Day 2: Progress Tracker, Day 3 & 4: Quiz Player, Scoring & Results Summary Screen)
- **Repository URL:** [GitHub Repository](https://github.com/ahsanadeem840-ai/Learning-Management-System-LMS-)

---

## Table of Contents
1. [Day 1: Student Assignments Console & Gradebook Sync](#day-1-student-assignments-console--gradebook-sync)
2. [Day 2: Student Progress Tracking Dashboard & Metrics Sync](#day-2-student-progress-tracking-dashboard--metrics-sync)
3. [Day 3 & 4: Quiz Player, Scoring, & Results Summary Screen](#day-3--4-quiz-player-scoring--results-summary-screen)
   - [Full-Screen Glassmorphic Quiz Player](#full-screen-glassmorphic-quiz-player)
   - [Interactive Question Types](#interactive-question-types)
   - [Real-Time HUD, Timer, & Keyboard Shortcuts](#real-time-hud-timer--keyboard-shortcuts)
   - [Premium Results Summary Screen & SVG Score Gauge](#premium-results-summary-screen--svg-score-gauge)
   - [Syncing Quiz Grades to Course Progress](#syncing-quiz-grades-to-course-progress)
4. [Code Structure Reference](#code-structure-reference)
5. [Local Verification & Execution](#local-verification--execution)

---

## Day 1: Student Assignments Console & Gradebook Sync
We designed and implemented a premium glassmorphic Student Assignments Console under `/student/assignments` to allow students to view all active, submitted, and graded tasks.

### Functional Features:
- **Status Filter Toggles**: Interactive filters classifying assignments into "All", "Pending", "Submitted", and "Graded".
- **Drag-and-Drop Submission Modal**: A custom file submission card that supports file attachment, user comments, drag-over highlights, and a multi-step simulated upload loader showing "Compressing...", "Uploading...", and "Finalizing..." stages.
- **LocalStorage Data Synchronization**: Student submissions are stored inside `localStorage` under `lms_submissions`. When a student uploads a file, a custom `lms_submissions_updated` event is dispatched. This syncs data in real time with the **Instructor Gradebook Console** (`/instructor/gradebook`), enabling live feedback loops.

---

## Day 2: Student Progress Tracking Dashboard & Metrics Sync
We implemented a comprehensive Student Progress Tracker under `/student/progress` that acts as the learning analytics dashboard.

### Functional Features:
- **Active Study Timer (Stopwatch)**: An interactive stopwatch tracking active learning seconds. Stopping the timer calculates elapsed minutes, adds them to the cumulative study time, updates `localStorage`, and triggers progress synchronization.
- **Weekly Study Velocity Charts**: Responsive SVG/HTML bar charts depicting active learning minutes spent over the past week.
- **Milestones & Badges Showcase**: Gamified achievement cards displaying acquired badges (e.g. *Fast Learner*, *Syllabus Conqueror*, *Perfect Score*) based on completed lessons and assignment submissions.
- **Syllabus Progress Synchronizer**: Fully integrated with the dynamic syllabus checklist in the Course Exploration interface. Completing video lessons or quizzes instantly updates progress percentages across the Student Dashboard and My Learning console.

---

## Day 3 & 4: Quiz Player, Scoring, & Results Summary Screen
We built a premium, immersive Quiz & Assessment Player component (`src/components/QuizPlayer.js`) and fully integrated it into the Student Course Details interface.

### Full-Screen Glassmorphic Quiz Player
The Quiz Player runs as a high-fidelity overlay modal (`fixed inset-0 z-50`) with a dark, frosted glass backdrop (`bg-slate-950/80 backdrop-blur-md`). This ensures absolute focus on the assessment material.

### Interactive Question Types
The player supports a wide array of pedagogical evaluation methods:
1. **Single Choice**: Interactive buttons representing options with inline keyboard shortcut bindings (`Key [1]` to `Key [N]`).
2. **Multiple Choice**: Multi-select checkcard structures with real-time checkbox animation states.
3. **Text / Code Fill-in**: Form-input validation comparing normalized entries against accepted correct answer lists.
4. **Sequencing / Reordering**: Interactive listing cards utilizing up/down arrows to swap positions and dynamically update the answer sequences.

### Real-Time HUD, Timer, & Keyboard Shortcuts
- **Time Limits**: Integrated timer ticking down in seconds. Approaching the final minute triggers red warnings and pulsating animations. Reaching `0` automatically triggers `handleAutoSubmit()` to safeguard already completed answers.
- **Navigation Controls**: Next/Prev step triggers that remain locked until a response is selected/entered.
- **Progress Trackers**: Dynamic progress bar indicating the current active question index.

### Premium Results Summary Screen & SVG Score Gauge
When submitting the assessment, the player computes stats instantly and presents a gorgeous **Results Dashboard Screen**:
- **SVG Circular Progress Gauge**: A custom SVG radial progress ring that scales dynamically based on the student's score. Uses vibrant colors (emerald for passing, red for failing) to convey performance at a glance.
- **Detailed Metrics Grid**: Displays Accuracy Score, Passing Threshold, Correct Answers ratio, and Time Elapsed.
- **Question-by-Question Review**: Displays every question accompanied by:
  - User's selected answer vs. the correct answer.
  - Success/Failure status badges.
  - Detailed design/rationale explanations for each answer.
- **Confetti/Celebration Effects**: Renders dynamic, floating celebration emojis on the client view upon passing.
- **Action Pathways**: Dynamic conditional button renders ("Retake Assessment" if failed, "Save Grade & Continue" if passed).

### Syncing Quiz Grades to Course Progress
Completing a quiz with a score exceeding the passing threshold automatically checks off that module lesson in the course syllabus, recalculates the student's overall progress bar, and pushes a graded entry into the submissions history list to update dashboard metrics.

---

## Code Structure Reference

The core files implementing the Module 3 features are:
- **Quiz Database**: [`src/data/quizzes.js`](file:///c:/Users/Mr%20Laptop%20Point/Desktop/Learninng%20Management%20System/src/data/quizzes.js) — defines custom questions, time limits, passing grades, and detailed answers/explanations.
- **Quiz Player Component**: [`src/components/QuizPlayer.js`](file:///c:/Users/Mr%20Laptop%20Point/Desktop/Learninng%20Management%20System/src/components/QuizPlayer.js) — houses the UI states (`start` | `active` | `results`), keyboard shortcut bindings, sequencing handlers, and the circular SVG results gauge.
- **Student Course Console**: [`src/app/student/explore/[courseId]/page.js`](file:///c:/Users/Mr%20Laptop%20Point/Desktop/Learninng%20Management%20System/src/app/student/explore/[courseId]/page.js) — triggers the Quiz player, receives the grading metrics on completion, marks curriculum items as completed, and fires storage events.
- **Assignments UI**: [`src/app/student/assignments/page.js`](file:///c:/Users/Mr%20Laptop%20Point/Desktop/Learninng%20Management%20System/src/app/student/assignments/page.js) — lists assignments/quizzes, manages student submission uploads, and updates grade values.
- **Progress UI**: [`src/app/student/progress/page.js`](file:///c:/Users/Mr%20Laptop%20Point/Desktop/Learninng%20Management%20System/src/app/student/progress/page.js) — implements study timer, weekly study graphs, and milestone badges.

---

## Local Verification & Execution

To run the application locally and test the Module 3 features:
1. Start the development server:
   ```bash
   npm run dev
   ```
2. Navigate to [http://localhost:3000](http://localhost:3000) and sign in as a student (or navigate to `/login?mode=signin`).
3. Open **Syllabus / Explore Courses**, select a course, and scroll to a **Quiz Assessment** lesson (e.g. *Module 1 Quiz & Assessment*).
4. Launch the quiz, attempt the questions, submit, and verify the interactive SVG grading score and detailed explanations list on the results screen.
