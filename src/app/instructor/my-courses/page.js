"use client";

import { useState, useEffect } from "react";

export default function InstructorCourses() {
  useEffect(() => {
    document.title = "My Courses | LMS Studio";
  }, []);

  const [courses, setCourses] = useState([
    {
      id: "nextjs15",
      title: "Next.js 15 Masterclass: App Router & Server Actions",
      studentsCount: 940,
      lessons: 20,
      price: "$89.00",
      status: "Published",
      category: "Development",
    },
    {
      id: "reactbasics",
      title: "React Fundamental Course: Hooks, State, and Context",
      studentsCount: 540,
      lessons: 15,
      price: "$59.00",
      status: "Published",
      category: "Development",
    },
    {
      id: "aiintro",
      title: "Intro to AI: Deep Learning Foundations",
      studentsCount: 0,
      lessons: 10,
      price: "$119.00",
      status: "Pending Review",
      category: "Data Science",
    },
  ]);

  // Modal & Wizard state
  const [showWizard, setShowWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [newCourse, setNewCourse] = useState({
    title: "",
    category: "Development",
    price: "",
    lessons: "",
  });

  const handleCreateCourse = () => {
    if (!newCourse.title.trim() || !newCourse.price || !newCourse.lessons) return;

    const newObj = {
      id: Math.random().toString(36).substr(2, 9),
      title: newCourse.title,
      studentsCount: 0,
      lessons: parseInt(newCourse.lessons) || 12,
      price: `$${parseFloat(newCourse.price).toFixed(2)}`,
      status: "Pending Review",
      category: newCourse.category,
    };

    setCourses((prev) => [newObj, ...prev]);
    // Reset state
    setNewCourse({ title: "", category: "Development", price: "", lessons: "" });
    setWizardStep(1);
    setShowWizard(false);
  };

  return (
    <div className="space-y-8 animate-fade-in relative">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            My Courses Studio
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Build, edit, and organize curriculum content templates for published courses.
          </p>
        </div>
        <button
          onClick={() => setShowWizard(true)}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs uppercase tracking-wide px-5 py-3 rounded-xl shadow-md shadow-indigo-600/10 transition-all hover:scale-[1.01] active:scale-[0.99]"
        >
          Create Course
        </button>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="glass-panel rounded-2xl p-5 hover:border-white/12 transition-all flex flex-col justify-between group"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-white/5 border border-white/5 text-slate-400">
                  {course.category}
                </span>
                <span
                  className={`text-[9px] font-bold px-2 py-0.5 rounded-md ${
                    course.status === "Published"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/10"
                      : "bg-amber-500/10 text-amber-400 border border-amber-500/10"
                  }`}
                >
                  {course.status}
                </span>
              </div>
              <h3 className="text-sm font-bold text-slate-200 group-hover:text-indigo-400 transition-colors leading-snug line-clamp-2 min-h-[40px]">
                {course.title}
              </h3>
              <div className="grid grid-cols-2 gap-2 pt-2 text-[10px] text-slate-500">
                <div>
                  <span className="block font-medium">Students Enrolled</span>
                  <span className="font-extrabold text-slate-300 text-xs mt-0.5 block">{course.studentsCount}</span>
                </div>
                <div>
                  <span className="block font-medium">Lessons Count</span>
                  <span className="font-extrabold text-slate-300 text-xs mt-0.5 block">{course.lessons} videos</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-sm font-black text-slate-300">{course.price}</span>
              <button className="text-[10px] font-extrabold uppercase tracking-wide text-indigo-400 hover:underline">
                Edit Course &rarr;
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Multi-step Course Creation Wizard Overlay */}
      {showWizard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={() => setShowWizard(false)} />

          {/* Modal Container */}
          <div className="relative w-full max-w-md glass-panel rounded-3xl p-6 z-10 shadow-2xl animate-scale-up space-y-6">
            {/* Header info */}
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-white">Create New Course</h3>
              <button onClick={() => setShowWizard(false)} className="text-slate-400 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Wizard Steps indicator */}
            <div className="flex justify-between items-center bg-slate-900/60 p-1.5 rounded-xl border border-white/5 relative">
              <div className={`flex-1 text-center text-[10px] font-bold py-1 transition-all ${wizardStep === 1 ? "text-indigo-400" : "text-slate-500"}`}>
                Step 1: Info
              </div>
              <div className={`flex-1 text-center text-[10px] font-bold py-1 transition-all ${wizardStep === 2 ? "text-indigo-400" : "text-slate-500"}`}>
                Step 2: Config
              </div>
              <div className={`flex-1 text-center text-[10px] font-bold py-1 transition-all ${wizardStep === 3 ? "text-indigo-400" : "text-slate-500"}`}>
                Step 3: Pricing
              </div>
            </div>

            {/* Wizard Step Forms */}
            {wizardStep === 1 && (
              <div className="space-y-4 animate-fade-in">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Course Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Next.js 15 Masterclass"
                    value={newCourse.title}
                    onChange={(e) => setNewCourse((prev) => ({ ...prev, title: e.target.value }))}
                    className="w-full bg-slate-950/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-indigo-500 text-slate-200"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Category</label>
                  <select
                    value={newCourse.category}
                    onChange={(e) => setNewCourse((prev) => ({ ...prev, category: e.target.value }))}
                    className="w-full bg-slate-950/60 border border-white/10 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-indigo-500 text-slate-300"
                  >
                    <option value="Development">Development</option>
                    <option value="Design">Design & UI/UX</option>
                    <option value="Data Science">Data Science & AI</option>
                    <option value="Marketing">Marketing</option>
                  </select>
                </div>
              </div>
            )}

            {wizardStep === 2 && (
              <div className="space-y-4 animate-fade-in">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Lessons Count</label>
                  <input
                    type="number"
                    placeholder="e.g. 15"
                    value={newCourse.lessons}
                    onChange={(e) => setNewCourse((prev) => ({ ...prev, lessons: e.target.value }))}
                    className="w-full bg-slate-950/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-indigo-500 text-slate-200"
                  />
                </div>
                <p className="text-[10px] text-slate-500 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/5">
                  We automatically pre-populate the Course Syllabus structure with mock lectures matching the count. You can modify lecture materials later.
                </p>
              </div>
            )}

            {wizardStep === 3 && (
              <div className="space-y-4 animate-fade-in">
                <div className="space-y-1.5">
                  <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Price (USD)</label>
                  <input
                    type="number"
                    placeholder="e.g. 89.00"
                    value={newCourse.price}
                    onChange={(e) => setNewCourse((prev) => ({ ...prev, price: e.target.value }))}
                    className="w-full bg-slate-950/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-indigo-500 text-slate-200"
                  />
                </div>
                <div className="text-[10px] text-amber-400 font-semibold bg-amber-500/10 p-3 rounded-xl border border-amber-500/10">
                  Submission sends this syllabus template to Platform Admins moderation queue. The course status will remain "Pending Review" until approved.
                </div>
              </div>
            )}

            {/* Actions Footer */}
            <div className="flex justify-between items-center pt-2">
              <button
                disabled={wizardStep === 1}
                onClick={() => setWizardStep((prev) => prev - 1)}
                className={`text-xs font-bold px-4 py-2 rounded-xl transition-all border border-white/5 ${
                  wizardStep === 1 ? "opacity-30 cursor-not-allowed text-slate-600" : "text-slate-300 hover:bg-white/5"
                }`}
              >
                Back
              </button>

              {wizardStep < 3 ? (
                <button
                  onClick={() => setWizardStep((prev) => prev + 1)}
                  disabled={wizardStep === 1 ? !newCourse.title.trim() : wizardStep === 2 ? !newCourse.lessons : false}
                  className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs py-2 px-4 rounded-xl shadow-md transition-all"
                >
                  Next Step
                </button>
              ) : (
                <button
                  onClick={handleCreateCourse}
                  disabled={!newCourse.price}
                  className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-bold text-xs py-2 px-4 rounded-xl shadow-md transition-all animate-pulse"
                >
                  Publish Draft
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
