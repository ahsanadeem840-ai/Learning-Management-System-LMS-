"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { coursesData } from "@/data/courses";

// Helper to seed initial completed lessons if not present
const getInitialCompletedLessons = () => {
  const nextjsLessons = [];
  const uiuxLessons = [];

  // Seed nextjs15 (first 12 lessons out of 16 in syllabus)
  const nextjsCourse = coursesData.find(c => c.id === "nextjs15");
  if (nextjsCourse && nextjsCourse.syllabus) {
    let count = 0;
    nextjsCourse.syllabus.forEach(mod => {
      mod.lessons.forEach(les => {
        if (count < 12) {
          nextjsLessons.push(les.title);
          count++;
        }
      });
    });
  }

  // Seed uiuxfigma (first 4 lessons out of 9 in syllabus)
  const uiuxCourse = coursesData.find(c => c.id === "uiuxfigma");
  if (uiuxCourse && uiuxCourse.syllabus) {
    let count = 0;
    uiuxCourse.syllabus.forEach(mod => {
      mod.lessons.forEach(les => {
        if (count < 4) {
          uiuxLessons.push(les.title);
          count++;
        }
      });
    });
  }

  return {
    nextjs15: nextjsLessons,
    uiuxfigma: uiuxLessons
  };
};

export default function ProgressDashboard() {
  // Sync States
  const [enrolledCourseIds, setEnrolledCourseIds] = useState([]);
  const [completedLessons, setCompletedLessons] = useState({});
  const [studyMinutes, setStudyMinutes] = useState(180);
  const [studyStreak, setStudyStreak] = useState(5);
  const [submissions, setSubmissions] = useState([]);
  
  // Interactive UI States
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [expandedModules, setExpandedModules] = useState({ 0: true });
  const [toastMessage, setToastMessage] = useState("");
  
  // Stopwatch Timer States
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);

  // Initial Seed & Sync
  const syncData = useCallback(() => {
    // 1. Enrolled courses
    const savedCourses = localStorage.getItem("lms_enrolled_courses");
    let enrolledIds = ["nextjs15", "uiuxfigma"];
    if (savedCourses) {
      enrolledIds = JSON.parse(savedCourses);
    } else {
      localStorage.setItem("lms_enrolled_courses", JSON.stringify(enrolledIds));
    }
    setEnrolledCourseIds(enrolledIds);
    if (enrolledIds.length > 0 && !selectedCourseId) {
      setSelectedCourseId(enrolledIds[0]);
    }

    // 2. Completed lessons
    const savedLessons = localStorage.getItem("lms_completed_lessons");
    let compLessons = {};
    if (savedLessons) {
      compLessons = JSON.parse(savedLessons);
    } else {
      compLessons = getInitialCompletedLessons();
      localStorage.setItem("lms_completed_lessons", JSON.stringify(compLessons));
    }
    setCompletedLessons(compLessons);

    // 3. Study Time
    const savedMinutes = localStorage.getItem("lms_study_time");
    if (savedMinutes) {
      setStudyMinutes(parseInt(savedMinutes));
    } else {
      localStorage.setItem("lms_study_time", "180");
      setStudyMinutes(180);
    }

    // 4. Streak
    const savedStreak = localStorage.getItem("lms_study_streak");
    if (savedStreak) {
      setStudyStreak(parseInt(savedStreak));
    } else {
      localStorage.setItem("lms_study_streak", "5");
      setStudyStreak(5);
    }

    // 5. Submissions
    const savedSubmissions = localStorage.getItem("lms_submissions");
    if (savedSubmissions) {
      setSubmissions(JSON.parse(savedSubmissions));
    }
  }, [selectedCourseId]);

  useEffect(() => {
    document.title = "Study Progress Console | LMS Studio";
    const timer = setTimeout(() => {
      syncData();
    }, 0);

    // Listen to custom updates
    window.addEventListener("lms_enrollment_updated", syncData);
    window.addEventListener("lms_submissions_updated", syncData);
    window.addEventListener("lms_progress_updated", syncData);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener("lms_enrollment_updated", syncData);
      window.removeEventListener("lms_submissions_updated", syncData);
      window.removeEventListener("lms_progress_updated", syncData);
    };
  }, [syncData]);

  // Stopwatch Logic
  useEffect(() => {
    let interval = null;
    if (isTimerActive) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerActive]);

  const handleToggleTimer = () => {
    if (isTimerActive) {
      // Stopping the timer
      const elapsedMins = Math.max(1, Math.round(timerSeconds / 60));
      const newMinutes = studyMinutes + elapsedMins;
      localStorage.setItem("lms_study_time", newMinutes.toString());
      setStudyMinutes(newMinutes);
      setIsTimerActive(false);
      setTimerSeconds(0);
      
      // Dispatch sync event
      window.dispatchEvent(new Event("lms_progress_updated"));
      
      showToast(`Study session recorded! Added ${elapsedMins} minute(s) to your total study time.`);
    } else {
      // Starting the timer
      setIsTimerActive(true);
      showToast("Study session timer started! Keep studying.");
    }
  };

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage("");
    }, 4000);
  };

  // Format stopwatch seconds to MM:SS
  const formatTimer = (totalSeconds) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Checkbox handlers
  const handleToggleLesson = (courseId, lessonTitle) => {
    const currentCompleted = completedLessons[courseId] ? [...completedLessons[courseId]] : [];
    let updated = [];
    
    if (currentCompleted.includes(lessonTitle)) {
      updated = currentCompleted.filter(t => t !== lessonTitle);
    } else {
      updated = [...currentCompleted, lessonTitle];
    }

    const newCompletedLessons = {
      ...completedLessons,
      [courseId]: updated
    };

    setCompletedLessons(newCompletedLessons);
    localStorage.setItem("lms_completed_lessons", JSON.stringify(newCompletedLessons));
    
    // Dispatch custom event to notify other routes
    window.dispatchEvent(new Event("lms_progress_updated"));
  };

  const handleMarkAllLessons = (courseId, lessonsList, markAll) => {
    const newCompletedLessons = {
      ...completedLessons,
      [courseId]: markAll ? lessonsList : []
    };
    
    setCompletedLessons(newCompletedLessons);
    localStorage.setItem("lms_completed_lessons", JSON.stringify(newCompletedLessons));
    
    // Dispatch custom event to notify other routes
    window.dispatchEvent(new Event("lms_progress_updated"));
    showToast(markAll ? "All lessons marked as completed!" : "All lessons marked as incomplete.");
  };

  // Calculations for metrics
  const getCourseDetailsList = () => {
    return enrolledCourseIds.map(id => {
      const course = coursesData.find(c => c.id === id);
      if (!course) return null;

      const allCourseLessons = [];
      if (course.syllabus) {
        course.syllabus.forEach(mod => {
          mod.lessons.forEach(les => {
            allCourseLessons.push(les.title);
          });
        });
      }

      const completed = completedLessons[id] ? completedLessons[id] : [];
      const completedCount = completed.filter(title => allCourseLessons.includes(title)).length;
      const totalCount = allCourseLessons.length || 10;
      const percent = Math.round((completedCount / totalCount) * 100);

      return {
        id,
        title: course.title,
        category: course.category,
        instructor: course.instructor,
        completedCount,
        totalCount,
        percent,
        allLessons: allCourseLessons
      };
    }).filter(Boolean);
  };

  const courseDetailsList = getCourseDetailsList();
  
  // Total stats
  const totalEnrolled = enrolledCourseIds.length;
  const completedCoursesCount = courseDetailsList.filter(c => c.percent === 100).length;
  const courseCompletionRate = totalEnrolled > 0 ? Math.round((completedCoursesCount / totalEnrolled) * 100) : 0;
  
  // Submissions stats
  const ahsanSubs = submissions.filter(s => s.studentName === "Muhammad Ahsan");
  const gradedSubs = ahsanSubs.filter(s => s.status === "Graded" && s.grade !== null);
  const averageGrade = gradedSubs.length > 0
    ? Math.round(gradedSubs.reduce((acc, curr) => acc + curr.grade, 0) / gradedSubs.length)
    : 0;
  const assignmentsSubmitted = ahsanSubs.length;

  // Active course calculations
  const activeCourse = courseDetailsList.find(c => c.id === selectedCourseId) || courseDetailsList[0];
  const activeFullCourse = coursesData.find(c => c.id === selectedCourseId) || coursesData.find(c => c.id === enrolledCourseIds[0]);

  // Achievements/Badges
  const badgesList = [
    {
      id: "first_enroll",
      name: "Quick Starter",
      desc: "Enrolled in at least one course and began learning.",
      icon: "🚀",
      unlocked: totalEnrolled > 0,
      unlockedText: "Unlocked! Enrolled in a course."
    },
    {
      id: "study_time",
      name: "Study Warrior",
      desc: "Accumulate more than 300 minutes of active studying.",
      icon: "⚔️",
      unlocked: studyMinutes >= 300,
      progress: Math.min(100, Math.round((studyMinutes / 300) * 100)),
      progressText: `${studyMinutes} / 300 mins`,
      unlockedText: "Unlocked! Studied > 300 minutes."
    },
    {
      id: "high_grade",
      name: "Apex Achiever",
      desc: "Maintain an average assignment score of 90% or above.",
      icon: "👑",
      unlocked: averageGrade >= 90 && gradedSubs.length > 0,
      progressText: averageGrade > 0 ? `Current: ${averageGrade}%` : "No graded files",
      unlockedText: `Unlocked! Average score is ${averageGrade}%.`
    },
    {
      id: "streak",
      name: "Consistent Learner",
      desc: "Maintain a study streak of 5 days or more.",
      icon: "🔥",
      unlocked: studyStreak >= 5,
      unlockedText: `Unlocked! Active ${studyStreak}-day streak.`
    }
  ];

  return (
    <div className="space-y-8 animate-fade-in pb-16">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 glass-panel border-emerald-500/30 bg-emerald-950/80 text-emerald-200 px-5 py-3 rounded-2xl flex items-center gap-3 shadow-lg shadow-emerald-500/10 animate-slide-up">
          <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-xs font-semibold">{toastMessage}</span>
        </div>
      )}

      {/* Header Description */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Study Progress Tracker
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
            Track module completions, review curriculum roadmap milestones, log study hours, and earn verified learning achievements.
          </p>
        </div>
        <Link 
          href="/student/my-learning"
          className="shrink-0 inline-flex items-center gap-1.5 text-xs font-bold text-indigo-400 bg-indigo-500/10 hover:bg-indigo-500/15 border border-indigo-500/15 py-2.5 px-4 rounded-xl transition-all"
        >
          View My Learning Hub &rarr;
        </Link>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Course Completion Rate */}
        <div className="glass-panel rounded-2xl p-4 flex flex-col justify-between hover:border-white/12 transition-all">
          <div className="text-[10px] text-slate-500 font-bold uppercase leading-none">Course Completion</div>
          <div className="flex items-baseline gap-1.5 mt-2.5">
            <span className="text-2xl font-black text-white">{courseCompletionRate}%</span>
            <span className="text-[10px] text-slate-400 font-medium">({completedCoursesCount}/{totalEnrolled} courses)</span>
          </div>
          <div className="w-full h-1.5 bg-white/5 rounded-full mt-3 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full" style={{ width: `${courseCompletionRate}%` }} />
          </div>
        </div>

        {/* Study Minutes Tracker */}
        <div className="glass-panel rounded-2xl p-4 flex flex-col justify-between hover:border-white/12 transition-all">
          <div className="text-[10px] text-slate-500 font-bold uppercase leading-none">Total Study Time</div>
          <div className="flex items-baseline gap-1.5 mt-2.5">
            <span className="text-2xl font-black text-white">{studyMinutes}</span>
            <span className="text-[10px] text-slate-400 font-medium">minutes</span>
          </div>
          <div className="text-[9px] text-indigo-400 font-semibold mt-3">🔥 {studyStreak} Days Learning Streak</div>
        </div>

        {/* Homework Submission Rate */}
        <div className="glass-panel rounded-2xl p-4 flex flex-col justify-between hover:border-white/12 transition-all">
          <div className="text-[10px] text-slate-500 font-bold uppercase leading-none">Assignments Submitted</div>
          <div className="flex items-baseline gap-1.5 mt-2.5">
            <span className="text-2xl font-black text-white">{assignmentsSubmitted}</span>
            <span className="text-[10px] text-slate-400 font-medium">submissions</span>
          </div>
          <div className="text-[9px] text-emerald-400 font-semibold mt-3">✓ {gradedSubs.length} Grades Recorded</div>
        </div>

        {/* Performance Metric */}
        <div className="glass-panel rounded-2xl p-4 flex flex-col justify-between hover:border-white/12 transition-all bg-gradient-to-tr from-indigo-950/10 to-purple-950/10 border-indigo-500/10">
          <div className="text-[10px] text-indigo-400 font-bold uppercase leading-none">Average Grade</div>
          <div className="flex items-baseline gap-1.5 mt-2.5">
            <span className="text-2xl font-black text-indigo-300">{averageGrade > 0 ? `${averageGrade}%` : "N/A"}</span>
          </div>
          <div className="text-[9px] text-indigo-400/70 font-semibold mt-3">Based on graded homework deliverables</div>
        </div>
      </div>

      {/* Main Grid: Checklist Left (8 cols), Timer/Badges Right (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Checklists */}
        <div className="lg:col-span-8 space-y-6">
          <div className="glass-panel rounded-3xl p-5 sm:p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
              <div className="space-y-1">
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                  Curriculum Checklist
                </h2>
                <p className="text-slate-400 text-[11px]">Check off finished lessons to dynamically update course metrics.</p>
              </div>

              {/* Course Selector Dropdown */}
              <div className="flex gap-2">
                <select
                  value={selectedCourseId}
                  onChange={(e) => {
                    setSelectedCourseId(e.target.value);
                    setExpandedModules({ 0: true });
                  }}
                  className="bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 transition-all font-semibold"
                >
                  {courseDetailsList.map(c => (
                    <option key={c.id} value={c.id}>
                      {c.title.split(":")[0]} ({c.percent}%)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {activeCourse && activeFullCourse ? (
              <div className="space-y-6">
                {/* Course header summary in card */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-white/3 border border-white/5">
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-400 border border-indigo-500/10">
                      {activeCourse.category}
                    </span>
                    <h3 className="text-sm font-bold text-white">{activeCourse.title}</h3>
                    <p className="text-[10px] text-slate-400">Instructor: {activeCourse.instructor}</p>
                  </div>
                  
                  {/* Progress Ring or Bar */}
                  <div className="shrink-0 flex items-center gap-3">
                    <div className="text-right">
                      <div className="text-xs font-black text-slate-200">{activeCourse.percent}% Complete</div>
                      <div className="text-[9px] text-slate-500">{activeCourse.completedCount} / {activeCourse.totalCount} Lessons</div>
                    </div>
                    
                    {/* SVG progress circle */}
                    <div className="relative w-11 h-11 shrink-0">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <path className="text-white/5" stroke="currentColor" strokeWidth="2.5" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        <path className="text-indigo-500 transition-all duration-300" strokeDasharray={`${activeCourse.percent}, 100`} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-slate-200">
                        {activeCourse.percent}%
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mark all buttons */}
                <div className="flex gap-3 justify-end text-[10px] font-bold">
                  <button
                    onClick={() => handleMarkAllLessons(activeCourse.id, activeCourse.allLessons, true)}
                    className="text-indigo-400 hover:underline cursor-pointer"
                  >
                    ✓ Mark All Completed
                  </button>
                  <span className="text-slate-700">|</span>
                  <button
                    onClick={() => handleMarkAllLessons(activeCourse.id, activeCourse.allLessons, false)}
                    className="text-slate-400 hover:underline cursor-pointer"
                  >
                    Mark All Incomplete
                  </button>
                </div>

                {/* Modules accordion checklists */}
                <div className="space-y-4">
                  {activeFullCourse.syllabus && activeFullCourse.syllabus.map((module, mIdx) => {
                    const isExpanded = !!expandedModules[mIdx];
                    // Count completed in this module
                    const moduleLessonTitles = module.lessons.map(l => l.title);
                    const completedInModule = (completedLessons[activeCourse.id] || []).filter(t => moduleLessonTitles.includes(t)).length;
                    const totalInModule = module.lessons.length;
                    
                    return (
                      <div key={mIdx} className="border border-white/5 rounded-2xl overflow-hidden bg-slate-900/40">
                        {/* Header */}
                        <div
                          onClick={() => setExpandedModules(prev => ({ ...prev, [mIdx]: !prev[mIdx] }))}
                          className="p-4 flex items-center justify-between bg-white/1 border-b border-white/5 cursor-pointer hover:bg-white/3 transition-all"
                        >
                          <div className="space-y-1 pr-6">
                            <h4 className="text-xs sm:text-sm font-bold text-slate-200">{module.title}</h4>
                            <div className="flex items-center gap-2 text-[10px] text-slate-500">
                              <span>{totalInModule} Lessons</span>
                              <span className="w-1 h-1 rounded-full bg-slate-700" />
                              <span className="text-indigo-400 font-semibold">{completedInModule} / {totalInModule} Done</span>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-3">
                            {completedInModule === totalInModule && (
                              <span className="text-[9px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded uppercase">
                                Module Clear ✓
                              </span>
                            )}
                            <svg
                              className={`w-4 h-4 text-slate-400 transform transition-transform duration-250 ${isExpanded ? "rotate-180" : ""}`}
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                          </div>
                        </div>

                        {/* Lessons List Checklist */}
                        {isExpanded && (
                          <div className="divide-y divide-white/5">
                            {module.lessons.map((lesson, lIdx) => {
                              const isLessonCompleted = (completedLessons[activeCourse.id] || []).includes(lesson.title);
                              return (
                                <div
                                  key={lIdx}
                                  onClick={() => handleToggleLesson(activeCourse.id, lesson.title)}
                                  className="p-3.5 px-4 flex items-center justify-between hover:bg-white/1.5 transition-colors cursor-pointer text-xs"
                                >
                                  <div className="flex items-center gap-3 min-w-0 pr-4">
                                    {/* Custom Checkbox */}
                                    <div
                                      className={`w-4.5 h-4.5 rounded-md border flex items-center justify-center shrink-0 transition-all duration-200 ${
                                        isLessonCompleted
                                          ? "bg-indigo-600 border-indigo-600 text-white"
                                          : "border-white/15 group-hover:border-white/30 bg-slate-950/40"
                                      }`}
                                    >
                                      {isLessonCompleted && (
                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                        </svg>
                                      )}
                                    </div>
                                    <span className={`font-medium truncate ${isLessonCompleted ? "text-slate-400 line-through" : "text-slate-200"}`}>
                                      {lesson.title}
                                    </span>
                                  </div>
                                  
                                  <div className="flex items-center gap-2 shrink-0">
                                    {lesson.isPreview && (
                                      <span className="text-[8px] font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-1.5 py-0.5 rounded uppercase">
                                        Preview
                                      </span>
                                    )}
                                    <span className="text-[10px] text-slate-500 font-mono">{lesson.duration}</span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className="text-center p-8 text-xs text-slate-500">
                Enroll in a course from the Explore tab to display study progress checklists.
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Study Session Timer & Achievements */}
        <div className="lg:col-span-4 space-y-6">
          {/* Stopwatch Timer Card */}
          <div className="glass-panel rounded-3xl p-6 space-y-5 text-center relative overflow-hidden">
            <div className="absolute top-[-30px] right-[-30px] w-36 h-36 rounded-full bg-indigo-500/5 blur-2xl pointer-events-none" />
            
            <div className="space-y-1">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Study Timer</h3>
              <p className="text-[10px] text-slate-500">Launch a focus session to record study time in your logs.</p>
            </div>

            {/* Visual stopwatch display */}
            <div className="py-6 relative">
              {/* Outer ticking loader ring */}
              <div className={`w-36 h-36 rounded-full border-2 border-dashed border-white/5 mx-auto flex items-center justify-center ${isTimerActive ? "animate-spin [animation-duration:30s]" : ""}`}>
                <div className="w-32 h-32 rounded-full bg-slate-900 border border-white/10 flex flex-col justify-center items-center shadow-inner">
                  <div className="text-2xl font-black font-mono text-white tracking-wide">
                    {isTimerActive ? formatTimer(timerSeconds) : "00:00"}
                  </div>
                  <div className="text-[8px] font-bold uppercase text-slate-500 mt-1 tracking-widest">
                    {isTimerActive ? "Focusing" : "Paused"}
                  </div>
                </div>
              </div>
              
              {/* Pulsing indicator dot */}
              {isTimerActive && (
                <span className="absolute top-8 right-[36%] w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
              )}
            </div>

            {/* CTA buttons */}
            <div className="space-y-2.5">
              <button
                onClick={handleToggleTimer}
                className={`w-full text-xs font-bold py-3 px-4 rounded-xl shadow-lg transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-1.5 cursor-pointer ${
                  isTimerActive
                    ? "bg-red-600 hover:bg-red-500 text-white shadow-red-500/10"
                    : "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-500/10"
                }`}
              >
                {isTimerActive ? (
                  <>
                    <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
                    </svg>
                    Finish Focus Session
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    Start Focus Session
                  </>
                )}
              </button>
              
              <div className="text-[10px] text-slate-500">
                Focus sessions are rounded up to the nearest minute.
              </div>
            </div>
          </div>

          {/* Weekly Study Velocity Chart */}
          <div className="glass-panel rounded-3xl p-5 space-y-4">
            <div className="space-y-0.5">
              <h3 className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                📊 Study Velocity
              </h3>
              <p className="text-slate-500 text-[10px]">Your daily focus log over the past week.</p>
            </div>

            {/* Custom SVG/HTML Bar Chart */}
            <div className="pt-4 pb-2">
              <div className="flex justify-between items-end h-28 px-1">
                {/* Mon */}
                <div className="flex flex-col items-center gap-2 group flex-1">
                  <div className="text-[9px] font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity absolute -translate-y-6 bg-slate-900 border border-white/10 px-1.5 py-0.5 rounded">45m</div>
                  <div className="w-4 bg-white/5 rounded-t-sm h-12 group-hover:bg-indigo-500/20 transition-all" />
                  <span className="text-[9px] font-bold text-slate-500">M</span>
                </div>
                {/* Tue */}
                <div className="flex flex-col items-center gap-2 group flex-1">
                  <div className="text-[9px] font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity absolute -translate-y-6 bg-slate-900 border border-white/10 px-1.5 py-0.5 rounded">60m</div>
                  <div className="w-4 bg-white/5 rounded-t-sm h-16 group-hover:bg-indigo-500/20 transition-all" />
                  <span className="text-[9px] font-bold text-slate-500">T</span>
                </div>
                {/* Wed */}
                <div className="flex flex-col items-center gap-2 group flex-1">
                  <div className="text-[9px] font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity absolute -translate-y-6 bg-slate-900 border border-white/10 px-1.5 py-0.5 rounded">30m</div>
                  <div className="w-4 bg-white/5 rounded-t-sm h-8 group-hover:bg-indigo-500/20 transition-all" />
                  <span className="text-[9px] font-bold text-slate-500">W</span>
                </div>
                {/* Thu */}
                <div className="flex flex-col items-center gap-2 group flex-1">
                  <div className="text-[9px] font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity absolute -translate-y-6 bg-slate-900 border border-white/10 px-1.5 py-0.5 rounded">90m</div>
                  <div className="w-4 bg-white/5 rounded-t-sm h-24 group-hover:bg-indigo-500/20 transition-all" />
                  <span className="text-[9px] font-bold text-slate-500">T</span>
                </div>
                {/* Fri */}
                <div className="flex flex-col items-center gap-2 group flex-1">
                  <div className="text-[9px] font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity absolute -translate-y-6 bg-slate-900 border border-white/10 px-1.5 py-0.5 rounded">45m</div>
                  <div className="w-4 bg-white/5 rounded-t-sm h-12 group-hover:bg-indigo-500/20 transition-all" />
                  <span className="text-[9px] font-bold text-slate-500">F</span>
                </div>
                {/* Sat */}
                <div className="flex flex-col items-center gap-2 group flex-1">
                  <div className="text-[9px] font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity absolute -translate-y-6 bg-slate-900 border border-white/10 px-1.5 py-0.5 rounded">120m</div>
                  <div className="w-4 bg-indigo-500/80 rounded-t-sm h-28 group-hover:bg-indigo-400 transition-all shadow-[0_0_12px_rgba(99,102,241,0.2)]" />
                  <span className="text-[9px] font-bold text-indigo-400">S</span>
                </div>
                {/* Sun */}
                <div className="flex flex-col items-center gap-2 group flex-1">
                  <div className="text-[9px] font-bold text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity absolute -translate-y-6 bg-slate-900 border border-white/10 px-1.5 py-0.5 rounded">60m</div>
                  <div className="w-4 bg-white/5 rounded-t-sm h-16 group-hover:bg-indigo-500/20 transition-all" />
                  <span className="text-[9px] font-bold text-slate-500">S</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-between items-center text-[10px] text-slate-400 border-t border-white/5 pt-3">
              <span>Avg Daily Study</span>
              <span className="font-bold text-slate-200">65 mins</span>
            </div>
          </div>

          {/* Gamified Achievements/Badges Card */}
          <div className="glass-panel rounded-3xl p-5 space-y-4">
            <h3 className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              🏆 Milestones &amp; Badges
            </h3>
            
            <div className="space-y-3.5">
              {badgesList.map((badge) => (
                <div
                  key={badge.id}
                  className={`p-3 rounded-2xl border flex items-center gap-3 transition-all ${
                    badge.unlocked
                      ? "bg-indigo-500/5 border-indigo-500/15"
                      : "bg-white/1 border-white/5 opacity-55"
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                    badge.unlocked
                      ? "bg-indigo-500/10 border border-indigo-500/20 shadow-md shadow-indigo-500/5 animate-pulse"
                      : "bg-white/5 border border-white/5"
                  }`}>
                    {badge.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-200 truncate">{badge.name}</span>
                      {badge.unlocked ? (
                        <span className="text-[8px] font-bold text-indigo-400 uppercase tracking-wide">Clear</span>
                      ) : (
                        <span className="text-[8px] font-bold text-slate-500 uppercase tracking-wide">Locked</span>
                      )}
                    </div>
                    <p className="text-[10px] text-slate-400 truncate mt-0.5">{badge.desc}</p>
                    
                    {/* Progress Bar / Text */}
                    {!badge.unlocked && badge.progressText && (
                      <div className="flex items-center gap-2 mt-2">
                        {badge.progress !== undefined && (
                          <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-slate-500 rounded-full" style={{ width: `${badge.progress}%` }} />
                          </div>
                        )}
                        <span className="text-[8px] font-mono text-slate-500 font-bold shrink-0">{badge.progressText}</span>
                      </div>
                    )}

                    {badge.unlocked && (
                      <div className="text-[8px] font-semibold text-indigo-400 mt-1.5 flex items-center gap-1 leading-none">
                        <span>🔓</span>
                        <span>{badge.unlockedText}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
