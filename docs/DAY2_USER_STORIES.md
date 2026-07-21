# Day 2: User Stories & Acceptance Criteria

## 📌 Document Overview
This document finalizes the functional scope for the **Learning Management System (LMS) Frontend** by defining detailed **User Stories** and **Acceptance Criteria (Gherkin format)** across all target user personas (Student, Instructor, Admin).

---

## 🔐 Epic 1: Authentication & Role-Based Navigation

### US-01: Account Registration & Role Selection
* **As a** new user,  
* **I want to** register an account by choosing my role (Student or Instructor),  
* **So that** I can access persona-tailored dashboards and features.

#### Acceptance Criteria:
- **AC 1.1**: Given a user on the Register page, when valid details (Name, Email, Password) and a Role ("Student" or "Instructor") are submitted, then a new account session is created.
- **AC 1.2**: Given an invalid email format or password under 6 characters, when submission is attempted, then descriptive inline validation errors are displayed.
- **AC 1.3**: Given a successful registration as "Student", when redirected, then the user lands on the Student Dashboard.

---

### US-02: Role-Based Navigation Header & Layout
* **As a** logged-in user,  
* **I want to** see a navigation header tailored to my active role,  
* **So that** I can easily access my relevant pages (Catalog/My Courses for Students, Studio for Instructors, Console for Admins).

#### Acceptance Criteria:
- **AC 2.1**: Given a user logged in as "Student", the navbar displays "Explore Courses", "My Learning", "Certificates", and "Profile".
- **AC 2.2**: Given a user logged in as "Instructor", the navbar displays "Instructor Studio", "My Courses", "Gradebook", and "Analytics".
- **AC 2.3**: Given a user logged in as "Admin", the navbar displays "Admin Overview", "User Management", and "Course Approval Queue".

---

## 👨‍🎓 Epic 2: Student Experience & Learning Console

### US-03: Course Search & Multi-Criteria Filtering
* **As a** Student,  
* **I want to** search for courses by keywords and filter by category, difficulty level, and rating,  
* **So that** I can quickly find courses relevant to my learning goals.

#### Acceptance Criteria:
- **AC 3.1**: Given a search query entered in the search bar, when typing, then the course list updates dynamically in real-time.
- **AC 3.2**: Given category checkboxes (e.g., Development, Design, Business), when selected, then only courses matching the checked categories are displayed.
- **AC 3.3**: Given no courses match the filter criteria, an attractive "No Courses Found" empty state with a "Reset Filters" button is rendered.

---

### US-04: Course Details & Syllabus Inspection
* **As a** prospective Student,  
* **I want to** view a comprehensive course preview page with syllabus details, instructor bio, and reviews,  
* **So that** I can decide whether to enroll in the course.

#### Acceptance Criteria:
- **AC 4.1**: Given a selected course card, when clicked, then the app navigates to `/courses/:courseId` showing title, description, instructor profile, ratings breakdown, and total video hours.
- **AC 4.2**: Given the syllabus accordion, when section headers are clicked, then lesson titles, durations, and preview tags expand/collapse.
- **AC 4.3**: Given an un-enrolled user, when clicking "Enroll Now", the course is added to "My Learning" and the CTA changes to "Go to Course".

---

### US-05: Interactive Video Player & Curriculum Console
* **As an** enrolled Student,  
* **I want an** interactive learning console with a main video player and collapsible curriculum sidebar,  
* **So that** I can watch lessons seamlessly and track my section completion.

#### Acceptance Criteria:
- **AC 5.1**: Given the learning console page (`/learn/:courseId`), when a lesson is clicked in the sidebar, then the main video player loads that lesson's media.
- **AC 5.2**: Given a video lesson ends, when playback reaches 100%, then the lesson status updates to "Completed" with a checkmark indicator, and progress bar increments.
- **AC 5.3**: Given the sidebar collapse toggle button, when clicked, the video player expands to full width for focus mode.

---

### US-06: Lesson Q&A & Notes Tab
* **As a** Student,  
* **I want to** post questions under lessons and take private notes,  
* **So that** I can resolve doubts and keep track of key learning takeaways.

#### Acceptance Criteria:
- **AC 6.1**: Given the "Q&A" tab below the video player, when a student posts a question, it appears immediately in the lesson discussion thread.
- **AC 6.2**: Given the "My Notes" tab, when text is saved with a video timestamp, then a clickable note entry is recorded that jump-starts the video to that timestamp when clicked.

---

### US-07: Interactive Quiz & Self-Assessment
* **As a** Student,  
* **I want to** attempt timed quizzes within a course module,  
* **So that** I can test my understanding of the material.

#### Acceptance Criteria:
- **AC 7.1**: Given a quiz lesson, when initiated, a timer counts down and multiple-choice questions are presented sequentially.
- **AC 7.2**: Given quiz completion, when submitted, the app calculates score percentage instantly, displaying pass/fail badges and detailed explanation of correct answers.

---

### US-08: Downloadable Verified Certificate
* **As a** Student who has completed 100% of a course,  
* **I want to** view and download a digital Certificate of Completion,  
* **So that** I can share my achievement on LinkedIn or resumes.

#### Acceptance Criteria:
- **AC 8.1**: Given 100% progress achieved, the "Claim Certificate" button becomes active on the course page.
- **AC 8.2**: Given certificate view, a beautifully styled glassmorphic certificate displays Student Name, Course Title, Completion Date, Unique Certificate ID, and a Download/Print option.

---

## 👩‍🏫 Epic 3: Instructor Studio & Management

### US-09: Course Builder Studio
* **As an** Instructor,  
* **I want a** multi-step wizard to build a new course (Basic Info -> Curriculum Builder -> Pricing -> Publish),  
* **So that** I can create and submit high-quality courses structured into modules and lessons.

#### Acceptance Criteria:
- **AC 9.1**: Step 1 captures Course Title, Subtitle, Category, Level, and Thumbnail URL.
- **AC 9.2**: Step 2 enables adding Sections, reordering modules, uploading/linking video lessons, and adding downloadable PDFs.
- **AC 9.3**: Step 3 sets pricing (Free or Paid) and submits the course for Admin Moderation with status "Pending Review".

---

### US-10: Student Assignment Grading Console
* **As an** Instructor,  
* **I want to** view student assignment submissions and provide scores and written feedback,  
* **So that** I can evaluate student progress.

#### Acceptance Criteria:
- **AC 10.1**: Given the Gradebook tab in Instructor Studio, a table lists pending student submissions with submission date and attached files.
- **AC 10.2**: Given a submission entry, when the instructor inputs a numerical grade and feedback comment, then the submission status changes to "Graded" and notifies the student.

---

## 🛡️ Epic 4: Platform Administration & Governance

### US-11: Admin Course Moderation Queue
* **As a** Platform Administrator,  
* **I want to** review newly submitted courses and approve or request changes,  
* **So that** only high-quality content is published on the platform catalog.

#### Acceptance Criteria:
- **AC 11.1**: Given the Admin Moderation Queue, courses with status "Pending Review" are listed with a preview button.
- **AC 11.2**: Given course review, when Admin clicks "Approve", the course status changes to "Published" and becomes visible in the public catalog.
- **AC 11.3**: When Admin clicks "Reject" with comments, status changes to "Needs Revision" and alerts the instructor.

---

## 📊 Summary Matrix

| Persona | Feature Epic | Story ID | Priority |
| :--- | :--- | :--- | :--- |
| **All Users** | Auth & Navigation | US-01, US-02 | High |
| **Student** | Course Discovery | US-03, US-04 | High |
| **Student** | Learning Console | US-05, US-06 | Critical |
| **Student** | Assessments & Certificates | US-07, US-08 | Medium |
| **Instructor** | Studio & Course Builder | US-09, US-10 | Critical |
| **Admin** | Moderation & Governance | US-11 | Medium |
