# Day 3: UI/UX Wireframes & Screen Layout Specifications

This document outlines the low-fidelity structural design and wireframe specifications for the key screens of the **Learning Management System (LMS)**. These layouts are designed around the **Premium Dark Mode Glassmorphism** theme, prioritizing visual elegance, clear component hierarchy, and intuitive user navigation.

---

## 🎨 Visual Design Token System

To ensure consistency across all screens, we define the following visual guidelines:
- **Canvas / Background**: `#0F172A` (Slate Dark)
- **Primary Accent**: `#6366F1` (Indigo Glow)
- **Glass Containers**: Background color `rgba(30, 41, 59, 0.7)` with `backdrop-filter: blur(12px)` and a subtle border of `1px solid rgba(255, 255, 255, 0.08)`.
- **Card Shadows**: `0 8px 32px 0 rgba(0, 0, 0, 0.37)`
- **Grid Layout**: 12-column grid system for desktop, collapsing to 1-column on mobile screen widths (< 768px).

---

## 🖥️ Screen Layout Specifications

### 1. Home / Landing Page
The entry point of the LMS. Designed to grab user attention, promote course search, and highlight popular categories.

#### Layout Map:
- **Navbar (Global)**: Left-aligned Logo; Right-aligned Search Bar (expanding), "Explore", "Become Instructor", "Login", and "Join Now" CTA buttons.
- **Hero Section**: 
  - Left Column (7 cols): Main Value Proposition heading, brief subheadline, search input with categories dropdown.
  - Right Column (5 cols): Glassmorphic abstract graphical container showing quick platform statistics (e.g. active learners count, hours of course content).
- **Featured Categories**: 4-column cards grid displaying category icons, titles, and active course count.
- **Top Courses Grid**: 3-column cards grid showing Course Thumbnail, Title, Instructor Name, Star Rating, Price, and "Enroll" action.
- **Footer**: standard sitemap links, social handles, and copyright info.

#### Wireframe Preview:
![Home Page Wireframe](file:///c:/Users/Mr%20Laptop%20Point/Desktop/Learninng%20Management%20System/docs/images/home_wireframe.jpg)

---

### 2. Authentication Page (Login/Register)
A centered, translucent authentication card supporting registration and login with smooth tab switching and role selection.

#### Layout Map:
- **Centered Glass Card**: (Width: 480px) sits on a dark background with an organic purple/indigo background glow filter.
- **Card Header**: Large logo, tab toggles ("Sign In" | "Register") with an animated indicator sliding between the states.
- **Dynamic Input Area**:
  - Name Field (only visible when "Register" tab is active).
  - Email Field with validation indicator.
  - Password Field with show/hide password toggle.
  - **Role Selector Tab Segment** (only visible when "Register" tab is active): Split toggle button containing "Student" and "Instructor" choices.
- **Action CTA**: Neon indigo button block spanning full card width ("Create Account" or "Sign In").
- **Alternative Sign-in**: "Or continue with Google / GitHub" options.

#### Wireframe Preview:
![Auth Page Wireframe](file:///c:/Users/Mr%20Laptop%20Point/Desktop/Learninng%20Management%20System/docs/images/auth_wireframe.jpg)

---

### 3. Student Dashboard Page
The learning control center for students, facilitating ongoing course progress and discovery.

#### Layout Map:
- **Sidebar (Global Dashboard)**: Collapsible navigation containing "Dashboard", "Explore", "My Learning", "Certificates", and "Profile".
- **Dashboard Main Grid (12 cols)**:
  - **Welcome Banner (8 cols)**: Translucent glass card displaying "Welcome Back, [Name]!", overall learning streak, and weekly active minutes.
  - **Quick Stats Card (4 cols)**: Completed courses count, earned certificates, and average quiz scores.
  - **In-Progress Courses (12 cols)**: Carousel layout of courses currently in progress. Each card includes a progress bar percentage, completed lesson count, and a prominent "Resume Learning" button.
  - **Recommended Courses Catalog (12 cols)**: Grid of courses matching student interests.

#### Wireframe Preview:
![Student Dashboard Wireframe](file:///c:/Users/Mr%20Laptop%20Point/Desktop/Learninng%20Management%20System/docs/images/student_dashboard_wireframe.jpg)

---

### 4. Instructor Dashboard Page
The management portal for educators to create content, review students, and monitor sales analytics.

#### Layout Map:
- **Sidebar (Global Dashboard)**: Collapsible navigation with "Dashboard", "My Course Studio", "Gradebook", and "Revenue Analytics".
- **Header Toolbar**: "Create New Course" action button in primary Indigo color.
- **Key Metrics Grid (3 cols)**:
  - Total Revenue Card (line chart sparkline, current balance).
  - Total Students Enrolled Card (bar chart sparkline, active student delta).
  - Average Course Rating Card (star metrics, reviews link).
- **Active Courses Table (12 cols)**: Glassmorphic list view showing:
  - Course Thumbnail + Title
  - Enrolled Student Count
  - Status Badge ("Published", "Pending Review", "Draft")
  - Revenue earned
  - Edit / Manage action items.

#### Wireframe Preview:
![Instructor Dashboard Wireframe](file:///c:/Users/Mr%20Laptop%20Point/Desktop/Learninng%20Management%20System/docs/images/instructor_dashboard_wireframe.jpg)

---

### 5. Admin Moderation Dashboard
The governance portal for platform administrators to review user accounts and approve submitted courses.

#### Layout Map:
- **Sidebar (Global Admin Layout)**: Links for "System Overview", "Course Approval Queue", "User Accounts Management", and "Platform Settings".
- **Metrics Overview (3 cols)**: Total Platform Revenue, Pending Course Submissions Count, and Active System Users.
- **Pending Course Moderation Queue Table (12 cols)**:
  - Course Title & Category
  - Submitted By (Instructor Name & Rating)
  - Submission Date
  - Action Column: "Preview Course Content" button, "Approve" button (Indigo outline), and "Reject" button (Red outline with comments input modal).

#### Wireframe Preview:
![Admin Dashboard Wireframe](file:///c:/Users/Mr%20Laptop%20Point/Desktop/Learninng%20Management%20System/docs/images/admin_dashboard_wireframe.jpg)

---

## 🔗 Related Documents
- [Day 1: Requirement Analysis & Functional Scope](file:///c:/Users/Mr%20Laptop%20Point/Desktop/Learninng%20Management%20System/docs/DAY1_REQUIREMENTS.md)
- [Day 2: User Stories & Acceptance Criteria](file:///c:/Users/Mr%20Laptop%20Point/Desktop/Learninng%20Management%20System/docs/DAY2_USER_STORIES.md)
