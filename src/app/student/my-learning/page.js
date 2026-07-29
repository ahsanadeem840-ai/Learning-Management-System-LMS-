"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function MyLearning() {
  useEffect(() => {
    document.title = "My Learning | LMS Studio";
  }, []);

  const [activeTab, setActiveTab] = useState("in-progress");
  const [activeResume, setActiveResume] = useState(null);

  const inProgressCourses = [
    {
      id: "nextjs15",
      title: "Next.js 15 Masterclass: App Router & Server Actions",
      instructor: "Alex Rivers",
      progress: 75,
      completedLessons: 15,
      totalLessons: 20,
      category: "Development",
      themeColor: "from-indigo-500 to-purple-600 shadow-indigo-500/10",
      accentBg: "bg-indigo-500/20 text-indigo-400",
    },
    {
      id: "uiuxfigma",
      title: "UI/UX Design Systems with Figma: Scalable & Modern",
      instructor: "Marcus Vance",
      progress: 40,
      completedLessons: 8,
      totalLessons: 20,
      category: "Design",
      themeColor: "from-purple-500 to-pink-600 shadow-purple-500/10",
      accentBg: "bg-purple-500/20 text-purple-400",
    },
  ];

  const completedCourses = [
    {
      id: "reactbasics",
      title: "React Fundamental Course: Hooks, State, and Context",
      instructor: "Maximilian Schwarz",
      progress: 100,
      completedLessons: 15,
      totalLessons: 15,
      category: "Development",
      completedDate: "June 12, 2026",
      themeColor: "from-emerald-500 to-teal-600 shadow-emerald-500/10",
      accentBg: "bg-emerald-500/20 text-emerald-400",
    },
    {
      id: "modernjs",
      title: "Modern JavaScript: ES6+ Syntax & Functional Programming",
      instructor: "Brad Traversy",
      progress: 100,
      completedLessons: 12,
      totalLessons: 12,
      category: "Development",
      completedDate: "May 28, 2026",
      themeColor: "from-emerald-500 to-teal-600 shadow-emerald-500/10",
      accentBg: "bg-emerald-500/20 text-emerald-400",
    },
  ];

  const handleResumeCourse = (courseTitle) => {
    setActiveResume(courseTitle);
    setTimeout(() => {
      setActiveResume(null);
    }, 3000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Action modal for Resume Course demo */}
      {activeResume && (
        <div className="fixed bottom-6 right-6 z-50 glass-panel border-indigo-500/30 bg-indigo-950/80 text-indigo-200 px-5 py-3 rounded-2xl flex items-center gap-3 shadow-lg shadow-indigo-500/10 animate-slide-up">
          <div className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-semibold">Resuming lesson for "{activeResume}"...</span>
        </div>
      )}

      {/* Header Description */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          My Learning Console
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
          Track your ongoing study progress, review curriculum modules, and claim verified certificates of completion.
        </p>
      </div>

      {/* Tabs Menu */}
      <div className="flex border-b border-white/5 gap-6">
        <button
          onClick={() => setActiveTab("in-progress")}
          className={`pb-3 text-sm font-bold tracking-wide relative transition-colors select-none ${
            activeTab === "in-progress" ? "text-white" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          In Progress ({inProgressCourses.length})
          {activeTab === "in-progress" && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 rounded-full animate-fade-in" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("completed")}
          className={`pb-3 text-sm font-bold tracking-wide relative transition-colors select-none ${
            activeTab === "completed" ? "text-white" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          Completed ({completedCourses.length})
          {activeTab === "completed" && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 rounded-full animate-fade-in" />
          )}
        </button>
      </div>

      {/* Content Rendered based on activeTab */}
      {activeTab === "in-progress" ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {inProgressCourses.map((course) => (
            <div
              key={course.id}
              className="glass-panel rounded-2xl p-5 hover:border-white/15 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border border-white/5 ${course.accentBg}`}>
                    {course.category}
                  </span>
                  <span className="text-[10px] text-slate-500 font-bold">
                    {course.completedLessons}/{course.totalLessons} Lessons
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-100 group-hover:text-indigo-400 transition-colors leading-snug">
                    {course.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1">Instructor: {course.instructor}</p>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between items-center text-[10px] font-bold">
                    <span className="text-slate-400">Course progress</span>
                    <span className="text-slate-200">{course.progress}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${course.themeColor} rounded-full transition-all duration-500`}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-end">
                <button
                  onClick={() => handleResumeCourse(course.title)}
                  className="flex items-center gap-1.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-4 rounded-xl shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                    <path d="M4.5 3a.5.5 0 00-.5.5v13a.5.5 0 00.8.4l10-6.5a.5.5 0 000-.8l-10-6.5A.5.5 0 004.5 3z" />
                  </svg>
                  Resume Learning
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {completedCourses.map((course) => (
            <div
              key={course.id}
              className="glass-panel rounded-2xl p-5 hover:border-white/15 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border border-white/5 ${course.accentBg}`}>
                    {course.category}
                  </span>
                  <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                    <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Completed
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-100 group-hover:text-emerald-400 transition-colors leading-snug">
                    {course.title}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-1">Instructor: {course.instructor}</p>
                  <p className="text-[10px] text-slate-500 mt-2">Completed on: {course.completedDate}</p>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between items-center text-[10px] font-bold">
                    <span className="text-slate-400">Course progress</span>
                    <span className="text-slate-200">100%</span>
                  </div>
                  <div className="w-full h-1.5 bg-emerald-500/10 rounded-full overflow-hidden">
                    <div className="h-full w-full bg-emerald-500 rounded-full" />
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-end">
                <Link
                  href="/student/certificates"
                  className="flex items-center gap-1.5 text-xs font-bold bg-white/5 hover:bg-white/10 text-white border border-white/10 py-2 px-4 rounded-xl shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  🏆 View Certificate
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
