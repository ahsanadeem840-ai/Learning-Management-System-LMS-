"use client";

import { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { coursesData } from "@/data/courses";

export default function PublicCourseDetails({ params }) {
  const resolvedParams = use(params);
  const courseId = resolvedParams.courseId;
  const router = useRouter();

  const course = coursesData.find((c) => c.id === courseId);

  // States
  const [expandedModules, setExpandedModules] = useState({ 0: true });

  useEffect(() => {
    if (course) {
      document.title = `${course.title} | LMS Studio`;
    }
  }, [course]);

  if (!course) {
    return (
      <div className="min-h-screen bg-[#0F172A] text-slate-100 flex flex-col items-center justify-center p-6 select-none relative overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
        
        <div className="glass-panel rounded-3xl p-12 text-center max-w-md mx-auto space-y-4 relative z-10">
          <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mx-auto text-slate-400 border border-white/5">
            ⚠️
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white">Course Not Found</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              We couldn't find a course matching this identifier in the public registry.
            </p>
          </div>
          <Link
            href="/"
            className="text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 px-5 rounded-xl shadow-md transition-all inline-block"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const toggleModule = (index) => {
    setExpandedModules((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleEnrollClick = () => {
    router.push(`/login?mode=signup&courseId=${courseId}`);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-500/10 blur-[150px] pointer-events-none" />

      {/* Global Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0F172A]/70 backdrop-blur-md transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/30">
              L
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-indigo-400">
              LMS Studio
            </span>
          </Link>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <Link href="/login" className="text-sm font-medium hover:text-white transition-colors px-4 py-2 text-slate-300">
              Login
            </Link>
            <Link href="/signup" className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-full px-5 py-2 transition-all duration-200 shadow-md shadow-indigo-500/20">
              Join Now
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-8 pb-12 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6">
            <Link href="/" className="hover:text-slate-200 transition-colors">
              Home
            </Link>
            <svg className="w-3 h-3 text-slate-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-slate-500 truncate max-w-[200px] sm:max-w-xs">{course.title}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border border-white/5 bg-indigo-500/20 text-indigo-400`}>
                  {course.category}
                </span>
                <span className="text-[10px] bg-white/5 border border-white/10 text-slate-300 font-bold px-2.5 py-0.5 rounded-full uppercase">
                  {course.level}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight leading-tight">
                {course.title}
              </h1>

              <p className="text-slate-350 text-sm sm:text-base leading-relaxed max-w-3xl">
                {course.subtitle}
              </p>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs sm:text-sm text-slate-400">
                <div className="flex items-center gap-1.5 text-yellow-400 font-bold">
                  <span>{course.rating}</span>
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-slate-500 font-normal">({course.reviews} reviews)</span>
                </div>
                <div className="w-1 h-1 rounded-full bg-slate-700 hidden sm:block" />
                <div>
                  <span>Instructor: <strong className="text-slate-200">{course.instructor}</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Body Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Main (8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Description */}
            <div className="glass-panel rounded-2xl p-6 space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-indigo-500" />
                Course Description
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {course.description}
              </p>
            </div>

            {/* Outcomes */}
            {course.outcomes && (
              <div className="glass-panel rounded-2xl p-6 space-y-4">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-indigo-500" />
                  What You Will Learn
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                  {course.outcomes.map((outcome, idx) => (
                    <div key={idx} className="flex gap-2.5 items-start">
                      <span className="text-indigo-400 mt-0.5">✓</span>
                      <span>{outcome}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Curriculum Accordion */}
            <div className="space-y-4">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                Curriculum Syllabus
              </h2>

              <div className="space-y-3">
                {course.syllabus.map((module, mIdx) => {
                  const isExpanded = !!expandedModules[mIdx];
                  return (
                    <div key={mIdx} className="glass-panel rounded-2xl overflow-hidden">
                      <button
                        onClick={() => toggleModule(mIdx)}
                        className="w-full p-4.5 flex justify-between items-center text-left hover:bg-white/3 transition-all focus:outline-none"
                      >
                        <div className="space-y-1">
                          <h3 className="text-xs sm:text-sm font-bold text-slate-200">
                            {module.title}
                          </h3>
                          <div className="text-[10px] text-slate-500 flex items-center gap-3">
                            <span>{module.lessons.length} Lessons</span>
                            <span className="w-1 h-1 rounded-full bg-slate-700" />
                            <span>{module.duration} total time</span>
                          </div>
                        </div>
                        <div className="text-slate-400">
                          <svg
                            className={`w-5 h-5 transform transition-transform duration-250 ${isExpanded ? "rotate-180" : ""}`}
                            fill="none; stroke=currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </button>

                      <div
                        className={`transition-all duration-300 ${
                          isExpanded ? "max-h-[1000px] border-t border-white/5" : "max-h-0 overflow-hidden"
                        }`}
                      >
                        <div className="divide-y divide-white/5">
                          {module.lessons.map((lesson, lIdx) => (
                            <div
                              key={lIdx}
                              className="p-4 flex items-center justify-between text-xs hover:bg-white/1.5 transition-colors gap-4"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <span className="text-slate-500 shrink-0">📹</span>
                                <span className="text-slate-300 font-medium truncate">{lesson.title}</span>
                                {lesson.isPreview && (
                                  <span className="text-[8px] font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-md uppercase tracking-wider shrink-0">
                                    Preview
                                  </span>
                                )}
                              </div>
                              <span className="text-slate-500 font-mono text-[10px] shrink-0">{lesson.duration}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Main (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Purchase/Callout sticky box */}
            <div className="glass-panel rounded-2xl p-6 space-y-5 sticky top-24">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider leading-none">Course Price</span>
                <div className="text-3xl font-black text-white">{course.price}</div>
              </div>

              {/* highlights list */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between text-xs text-slate-400 border-b border-white/5 pb-2">
                  <span>Duration</span>
                  <span className="font-semibold text-slate-200">{course.duration}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400 border-b border-white/5 pb-2">
                  <span>Total Lectures</span>
                  <span className="font-semibold text-slate-200">{course.lessonsCount} lessons</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400 border-b border-white/5 pb-2">
                  <span>Skill Level</span>
                  <span className="font-semibold text-slate-200">{course.level}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400 border-b border-white/5 pb-2">
                  <span>Assessments</span>
                  <span className="font-semibold text-slate-200">Quizzes & Projects</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Credentials</span>
                  <span className="font-semibold text-emerald-400">Verified Certificate</span>
                </div>
              </div>

              {/* Dynamic CTA */}
              <div className="pt-2">
                <button
                  onClick={handleEnrollClick}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-3 px-4 rounded-xl shadow-lg shadow-indigo-500/10 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-1.5"
                >
                  Join LMS to Enroll
                </button>
              </div>

              <div className="text-[10px] text-slate-500 text-center">
                30-day money-back guarantee • Free lifetime updates
              </div>
            </div>

            {/* Instructor Bio Profile */}
            <div className="glass-panel rounded-2xl p-6 space-y-4">
              <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Meet Your Instructor</h3>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-xs text-white uppercase shrink-0 shadow-md shadow-indigo-500/10">
                  {course.instructor.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white leading-tight">{course.instructor}</h4>
                  <p className="text-[10px] text-indigo-400 font-semibold mt-0.5">{course.instructorTitle}</p>
                </div>
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                {course.instructorBio}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Global Footer */}
      <footer className="mt-auto py-8 border-t border-white/5 bg-slate-950/40 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} LMS Studio. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-slate-400 transition-colors">Terms of Service</Link>
            <Link href="#" className="hover:text-slate-400 transition-colors">Contact Support</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
