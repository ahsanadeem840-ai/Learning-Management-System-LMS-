"use client";

import { useState, useEffect, use, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { coursesData } from "@/data/courses";
import { quizzesData } from "@/data/quizzes";
import QuizPlayer from "@/components/QuizPlayer";


export default function StudentCourseDetails({ params }) {
  const resolvedParams = use(params);
  const courseId = resolvedParams.courseId;
  const router = useRouter();

  const course = coursesData.find((c) => c.id === courseId);

  // States
  const [enrolled, setEnrolled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [expandedModules, setExpandedModules] = useState({ 0: true });
  const [completedLessons, setCompletedLessons] = useState([]);

  // Fetch enrollment state & completed lessons from localStorage
  const syncCompleted = useCallback(() => {
    const saved = localStorage.getItem("lms_completed_lessons");
    if (saved) {
      const map = JSON.parse(saved);
      setCompletedLessons(map[courseId] || []);
    }
  }, [courseId]);

  useEffect(() => {
    if (!course) return;
    document.title = `${course.title} | LMS Studio`;

    const timer = setTimeout(() => {
      const saved = localStorage.getItem("lms_enrolled_courses");
      if (saved) {
        const list = JSON.parse(saved);
        if (list.includes(courseId)) {
          setEnrolled(true);
        }
      }
      syncCompleted();
    }, 0);



    window.addEventListener("lms_progress_updated", syncCompleted);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("lms_progress_updated", syncCompleted);
    };
  }, [courseId, course, syncCompleted]);

  const [activeQuiz, setActiveQuiz] = useState(null);

  const handleToggleLesson = (lessonTitle) => {
    if (!enrolled) return;
    const saved = localStorage.getItem("lms_completed_lessons");
    const map = saved ? JSON.parse(saved) : {};
    const current = map[courseId] || [];
    let updated = [];
    if (current.includes(lessonTitle)) {
      updated = current.filter(t => t !== lessonTitle);
    } else {
      updated = [...current, lessonTitle];
    }
    map[courseId] = updated;
    localStorage.setItem("lms_completed_lessons", JSON.stringify(map));
    setCompletedLessons(updated);

    // Dispatch progress updated event
    window.dispatchEvent(new Event("lms_progress_updated"));
  };

  const handleLessonAction = (lessonTitle) => {
    if (!enrolled) return;
    const quizKey = Object.keys(quizzesData).find(
      (k) => quizzesData[k].courseId === courseId && quizzesData[k].lessonTitle === lessonTitle
    );

    if (quizKey) {
      setActiveQuiz(quizzesData[quizKey]);
    } else {
      handleToggleLesson(lessonTitle);
    }
  };

  const handleQuizComplete = (scorePercent, isPassed) => {
    if (isPassed) {
      const saved = localStorage.getItem("lms_completed_lessons");
      const map = saved ? JSON.parse(saved) : {};
      const current = map[courseId] || [];
      if (!current.includes(activeQuiz.lessonTitle)) {
        const updated = [...current, activeQuiz.lessonTitle];
        map[courseId] = updated;
        localStorage.setItem("lms_completed_lessons", JSON.stringify(map));
        setCompletedLessons(updated);
      }
      
      // Dispatch progress updated event
      window.dispatchEvent(new Event("lms_progress_updated"));
    }

    // Save quiz grade results to localStorage for dashboard metrics & AssignmentsConsole
    const savedSubs = localStorage.getItem("lms_submissions");
    let submissions = savedSubs ? JSON.parse(savedSubs) : [];
    const newSubmission = {
      id: Date.now(),
      studentName: "Muhammad Ahsan",
      courseId: courseId,
      course: course.title,
      assignmentId: activeQuiz.title.replace(/\s+/g, "_").toLowerCase(),
      assignment: activeQuiz.lessonTitle,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      fileName: "online-quiz-assessment",
      status: "Graded",
      grade: scorePercent,
      feedback: isPassed ? "Congratulations on passing the module assessment!" : "Keep practicing, review course contents, and try again.",
      comments: `Scored ${scorePercent}% on the online assessment.`
    };

    // Filter out previous attempts for the same quiz
    submissions = submissions.filter(s => s.studentName !== "Muhammad Ahsan" || s.assignment !== activeQuiz.lessonTitle);
    submissions.push(newSubmission);
    localStorage.setItem("lms_submissions", JSON.stringify(submissions));
    window.dispatchEvent(new Event("lms_submissions_updated"));

    // Close the quiz player
    setActiveQuiz(null);
  };

  if (!course) {
    return (
      <div className="glass-panel rounded-3xl p-12 text-center max-w-md mx-auto space-y-4 mt-12">
        <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mx-auto text-slate-400 border border-white/5">
          ⚠️
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-white">Course Not Found</h3>
          <p className="text-slate-400 text-xs leading-relaxed">
            The course you are looking for does not exist or has been removed from the platform catalog.
          </p>
        </div>
        <Link
          href="/student/explore"
          className="text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-5 rounded-xl shadow-md transition-all inline-block"
        >
          Back to Catalog
        </Link>
      </div>
    );
  }

  // Toggle Syllabus module accordion
  const toggleModule = (index) => {
    setExpandedModules((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  // Enroll handler
  const handleEnroll = () => {
    if (enrolled) {
      // Direct navigate if already enrolled
      router.push("/student/my-learning");
      return;
    }

    setLoading(true);

    // Simulate validator latency (1.5s)
    setTimeout(() => {
      setLoading(false);
      setEnrolled(true);

      // Save to local storage
      const saved = localStorage.getItem("lms_enrolled_courses");
      let list = saved ? JSON.parse(saved) : [];
      if (!list.includes(courseId)) {
        list.push(courseId);
        localStorage.setItem("lms_enrolled_courses", JSON.stringify(list));
      }

      // Trigger standard CustomEvent to sync explore tab/dashboard if needed
      window.dispatchEvent(new Event("lms_enrollment_updated"));

      setToastMessage(`Successfully enrolled in "${course.title}"!`);
      setTimeout(() => {
        setToastMessage("");
      }, 4000);
    }, 1500);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-16">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 glass-panel border-emerald-500/30 bg-emerald-950/80 text-emerald-200 px-5 py-3 rounded-2xl flex items-center gap-3 shadow-lg shadow-emerald-500/10 animate-slide-up">
          <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Loading overlay for enrollment */}
      {loading && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center">
          <div className="glass-panel border-white/10 p-8 rounded-3xl flex flex-col items-center gap-4 text-center max-w-xs shadow-2xl">
            <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white">Enrolling...</h4>
              <p className="text-slate-400 text-[10px]">Configuring curriculum modules and active session parameters.</p>
            </div>
          </div>
        </div>
      )}

      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-slate-400">
        <Link href="/student/explore" className="hover:text-slate-200 transition-colors">
          Explore
        </Link>
        <svg className="w-3 h-3 text-slate-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-slate-500 truncate max-w-[200px] sm:max-w-xs">{course.title}</span>
      </nav>

      {/* Hero Header Card */}
      <div className="glass-panel rounded-3xl p-6 md:p-8 relative overflow-hidden flex flex-col justify-between min-h-[220px] transition-all hover:border-white/12">
        <div className="absolute top-[-30px] right-[-30px] w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        
        <div className="space-y-4 relative z-10 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border border-white/5 bg-indigo-500/20 text-indigo-400`}>
              {course.category}
            </span>
            <span className="text-[10px] bg-white/5 border border-white/10 text-slate-300 font-bold px-2.5 py-0.5 rounded-full uppercase">
              {course.level}
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight leading-tight">
            {course.title}
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            {course.subtitle}
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs text-slate-400">
            <div className="flex items-center gap-1.5 text-yellow-400 font-bold">
              <span>{course.rating}</span>
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-slate-500 font-normal">({course.reviews} reviews)</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-slate-700" />
            <div>
              <span>Instructor: <strong className="text-slate-200">{course.instructor}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: About, Outcomes, Syllabus (8 cols) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Course description */}
          <div className="glass-panel rounded-2xl p-6 space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              Course Description
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* Learning Outcomes */}
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

          {/* Interactive Accordion Syllabus */}
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
                    {/* Module Accordion Header */}
                    <button
                      onClick={() => toggleModule(mIdx)}
                      className="w-full p-4.5 flex justify-between items-center text-left hover:bg-white/3 transition-all focus:outline-none"
                    >
                      <div className="space-y-1 pr-4">
                        <h3 className="text-xs sm:text-sm font-bold text-slate-200">
                          {module.title}
                        </h3>
                        <div className="text-[10px] text-slate-500 flex items-center gap-3">
                          <span>{module.lessons.length} Lessons</span>
                          <span className="w-1 h-1 rounded-full bg-slate-700" />
                          <span>{module.duration} total time</span>
                        </div>
                      </div>
                      <div className="text-slate-400 shrink-0">
                        <svg
                          className={`w-5 h-5 transform transition-transform duration-250 ${isExpanded ? "rotate-180" : ""}`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </button>

                    {/* Accordion Lessons Content */}
                    <div
                      className={`transition-all duration-300 ${
                        isExpanded ? "max-h-[1000px] border-t border-white/5" : "max-h-0 overflow-hidden"
                      }`}
                    >
                      <div className="divide-y divide-white/5">
                        {module.lessons.map((lesson, lIdx) => {
                          const isCompleted = completedLessons.includes(lesson.title);
                          const isQuiz = Object.keys(quizzesData).some(
                            (k) => quizzesData[k].courseId === courseId && quizzesData[k].lessonTitle === lesson.title
                          );
                          return (
                            <div
                              key={lIdx}
                              onClick={() => enrolled && handleLessonAction(lesson.title)}
                              className={`p-4 flex items-center justify-between text-xs hover:bg-white/1.5 transition-colors gap-4 ${
                                enrolled ? "cursor-pointer" : ""
                              }`}
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                {isQuiz ? (
                                  <span className="text-slate-400 shrink-0 text-sm">
                                    {isCompleted ? "✅" : "📝"}
                                  </span>
                                ) : enrolled ? (
                                  <div
                                    className={`w-4.5 h-4.5 rounded-md border flex items-center justify-center shrink-0 transition-all duration-200 ${
                                      isCompleted
                                        ? "bg-indigo-600 border-indigo-600 text-white"
                                        : "border-white/15 hover:border-white/30 bg-slate-950/40"
                                    }`}
                                  >
                                    {isCompleted && (
                                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                      </svg>
                                    )}
                                  </div>
                                ) : (
                                  <span className="text-slate-500 shrink-0">
                                    📹
                                  </span>
                                )}
                                
                                <span className={`font-medium truncate ${enrolled && isCompleted ? (isQuiz ? "text-emerald-450 font-bold" : "text-slate-400 line-through") : "text-slate-300"}`}>
                                  {lesson.title}
                                </span>
                                
                                {isQuiz && (
                                  <span className={`text-[8px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider shrink-0 ${
                                    isCompleted 
                                      ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" 
                                      : "bg-indigo-500/10 border border-indigo-500/20 text-indigo-400"
                                  }`}>
                                    {isCompleted ? "Passed" : "Quiz Assessment"}
                                  </span>
                                )}
                                
                                {lesson.isPreview && !isQuiz && (
                                  <span className="text-[8px] font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2 py-0.5 rounded-md uppercase tracking-wider shrink-0">
                                    Preview
                                  </span>
                                )}
                              </div>
                              <span className="text-slate-500 font-mono text-[10px] shrink-0">
                                {lesson.duration}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Side: Purchase/Enroll Card, Instructor Bio, Ratings Summary (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Purchase / Enrollment Sticky Sidebar Panel */}
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
              {enrolled ? (
                <button
                  onClick={handleEnroll}
                  className="w-full bg-indigo-500/10 border border-indigo-500/25 hover:bg-indigo-500/15 text-indigo-400 text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-all"
                >
                  <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Go to Course Console
                </button>
              ) : (
                <button
                  onClick={handleEnroll}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-3 px-4 rounded-xl shadow-lg shadow-indigo-500/10 transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-1.5"
                >
                  Enroll in Course
                </button>
              )}
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

          {/* Ratings Breakdown Summary */}
          <div className="glass-panel rounded-2xl p-6 space-y-4">
            <h3 className="text-xs font-extrabold text-slate-400 uppercase tracking-wider">Student Reviews</h3>
            
            <div className="flex items-center gap-4">
              <div className="text-3xl font-black text-white leading-none">{course.rating}</div>
              <div>
                <div className="flex items-center gap-0.5 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} className="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-[10px] text-slate-500 mt-1">Global rating across all sessions</p>
              </div>
            </div>

            {/* Simple simulated ratings bars */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center text-[10px] text-slate-400 gap-3">
                <span className="w-3 shrink-0">5★</span>
                <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-400 rounded-full w-[85%]" />
                </div>
                <span className="w-6 text-right shrink-0">85%</span>
              </div>
              <div className="flex items-center text-[10px] text-slate-400 gap-3">
                <span className="w-3 shrink-0">4★</span>
                <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-400 rounded-full w-[12%]" />
                </div>
                <span className="w-6 text-right shrink-0">12%</span>
              </div>
              <div className="flex items-center text-[10px] text-slate-400 gap-3">
                <span className="w-3 shrink-0">3★</span>
                <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-400 rounded-full w-[2%]" />
                </div>
                <span className="w-6 text-right shrink-0">2%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {activeQuiz && (
        <QuizPlayer
          quiz={activeQuiz}
          onClose={() => setActiveQuiz(null)}
          onComplete={handleQuizComplete}
        />
      )}
    </div>
  );
}
