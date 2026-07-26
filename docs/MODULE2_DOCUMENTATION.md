# Learning Management System (LMS) - Module 2 Portfolio Documentation

This document compiles the work completed during **Module 2** (Core Feature Implementation) of the Learning Management System (LMS) Frontend development.

---

## 📋 Portfolio Overview
- **Student / Intern Name:** Ahsan Adeem
- **Email:** ahsanadeem840@gmail.com
- **Program:** Frontend Web Development / Next.js React Developer
- **Milestone:** Module 2 - Core Feature Implementation (Day 1: Authentication UI & Validation)
- **Repository URL:** [GitHub Repository](https://github.com/ahsanadeem840-ai/Learning-Management-System-LMS-)

---

## Table of Contents
1. [Day 1: Auth UI (login/signup) & Validation](#day-1-auth-ui-loginsignup--validation)
   - [Design & Visual Language](#design--visual-language)
   - [Functional Features & State Architecture](#functional-features--state-architecture)
   - [Interactive Success & Routing Logic](#interactive-success--routing-logic)
2. [Code Structure Reference](#code-structure-reference)
3. [Local Verification & Execution](#local-verification--execution)

---

## Day 1: Auth UI (login/signup) & Validation
We built a premium, production-ready Authentication console under `/login` using the Tailwind CSS v4 design tokens and Next.js App Router conventions.

### Design & Visual Language
Following the guidelines from the wireframing phase, the Auth UI incorporates high-end visual features:
- **Color Theme**: Solid slate-dark background (`#0F172A`) coupled with deep glassmorphic panel overlay structures.
- **Backdrop Blur Glows**: Top-left and bottom-right radial indigo and purple gradient circles (`bg-indigo-500/10` and `bg-purple-500/10` with up to `120px` blur overlays) to create modern spatial depth.
- **Glassmorphic Authentication Card**: Centered panel container utilizing backdrop-filters, fine borders (`border-white/5`), and ambient box-shadows.
- **Interactive Sliding Selector**: A custom-designed tab selection block featuring a sliding indigo backdrop pill that moves smoothly depending on the chosen mode (Sign In vs Register).

---

### Functional Features & State Architecture
The form implementation provides robust client-side validation and rich interactive feedback:
1. **Dynamic Tab Syncing**: The `mode` query parameter is derived directly from the Next.js `useSearchParams()`. Switching between the "Sign In" and "Register" tabs calls `router.replace` with the updated query parameter (`?mode=signin` vs `?mode=signup`), syncing state with the browser address bar while preserving a single-page app flow.
2. **Real-time Input Validation**:
   - **Full Name** (Register-only): Checks that name is not empty.
   - **Email**: Assesses validity against a standard regex pattern (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`).
   - **Password**: Assesses length (minimum 6 characters required).
3. **Smart Validation Warnings**: Errors are tracked via a `touched` state, showing warnings inline *only after* the user blurs an input field or types in it, avoiding intimidating initial states.
4. **Interactive Validation Indicators**: Icons change dynamically within inputs (emerald checkmarks for valid fields, red exclamation/warning symbols for errors).
5. **Show/Hide Password Toggle**: An interactive toggle button integrated inside the password input fields lets users preview their entry safely.
6. **Custom Role Selector**: Toggle buttons style dynamically to let registrants choose between `Student / Learner` and `Instructor / Tutor`.

---

### Interactive Success & Routing Logic
Submitting the form triggers a loading spinner simulating authentication verification before transitioning into a mock success screen:
- **Simulated Latency**: Submissions trigger a `1.5` seconds validator loading screen showing an animated spinner and "Validating..." status.
- **Dashboard Redirection Pathways**:
  - **Sign Up Mode**: Success screen displays a redirect message matching the user's selected role (Student dashboard vs Instructor studio).
  - **Sign In Mode**: Evaluates email keywords. Input containing `"instructor"` routes to the Instructor Studio, `"admin"` routes to the Admin dashboard, and other credentials default to the Student dashboard.
  - **Manual Bypass Links**: In addition to automated timers (`2` seconds delay), interactive buttons are rendered to allow direct manual dashboard access for easier demonstration and testing.

---

## Code Structure Reference

The application logic resides in:
- [src/app/login/page.js](file:///c:/Users/Mr%20Laptop%20Point/Desktop/Learninng%20Management%20System/src/app/login/page.js): The main page component rendering the form inside a Next.js `Suspense` wrapper (required for address bar search query reads).

Key UI styling tokens from `src/styles/globals.css`:
```css
.glass-panel {
  background: var(--glass-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--glass-border);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}
```

---

## Local Verification & Execution

To test the login system:
1. Fire up the development environment:
   ```bash
   npm run dev
   ```
2. Navigate to **[http://localhost:3000/login](http://localhost:3000/login)** or click **Login** / **Join Now** from the home page.
3. Test validation by typing malformed emails or clicking submit on empty fields.
4. Fill out the forms to witness the loading, success, and redirection flows.
