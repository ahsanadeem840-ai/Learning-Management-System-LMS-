"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { coursesData } from "@/data/courses";

export default function StudentDashboard() {
  const router = useRouter();

  // Set page title
  useEffect(() => {
    document.title = "Student Dashboard | LMS Studio";
  }, []);

  const [enrolledCourseIds, setEnrolledCourseIds] = useState([]);
  const [inProgressCourses, setInProgressCourses] = useState([]);
  const [recommendedCourses, setRecommendedCourses] = useState([]);
  const [activeResume, setActiveResume] = useState(null);
  const [enrollSuccessMessage, setEnrollSuccessMessage] = useState("");

  const syncData = () => {
    const saved = localStorage.getItem("lms_enrolled_courses");
    let enrolledIds = [];
    if (saved) {
      enrolledIds = JSON.parse(saved);
    } else {
      enrolledIds = ["nextjs15", "uiuxfigma"];
      localStorage.setItem("lms_enrolled_courses", JSON.stringify(enrolledIds));
    }
    setEnrolledCourseIds(enrolledIds);

    // Build active in-progress list
    // Include initial default mock states or any new courses enrolled by user
    const baseInProgress = [
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

    // Check if there are other courses in enrolledIds not in baseInProgress
    const list = [...baseInProgress];
    enrolledIds.forEach((id) => {
      if (!list.some((c) => c.id === id)) {
        const fullCourse = coursesData.find((c) => c.id === id);
        if (fullCourse) {
          list.unshift({
            id: fullCourse.id,
            title: fullCourse.title,
            instructor: fullCourse.instructor,
            progress: 0,
            completedLessons: 0,
            totalLessons: fullCourse.syllabus ? fullCourse.syllabus.reduce((acc, mod) => acc + mod.lessons.length, 0) : 10,
            category: fullCourse.category,
            themeColor: "from-blue-500 to-indigo-600 shadow-blue-500/10",
            accentBg: "bg-blue-500/20 text-indigo-400",
          });
        }
      }
    });
    setInProgressCourses(list);

    // Recommended list is anything from coursesData that is NOT in enrolled list
    const recom = coursesData
      .filter((c) => !enrolledIds.includes(c.id))
      .slice(0, 3) // pick top 3
      .map((c) => ({
        id: c.id,
        title: c.title,
        instructor: c.instructor,
        rating: c.rating,
        reviews: c.reviews,
        price: c.price,
        category: c.category,
        duration: c.duration,
        lessons: c.syllabus ? c.syllabus.reduce((acc, mod) => acc + mod.lessons.length, 0) : 12,
        tag: c.tag,
        tagBg: c.tagBg,
        enrolled: false,
      }));
    setRecommendedCourses(recom);
  };

  useEffect(() => {
    syncData();

    // Listen to custom updates
    window.addEventListener("lms_enrollment_updated", syncData);
    return () => {
      window.removeEventListener("lms_enrollment_updated", syncData);
    };
  }, []);

  const handleResumeCourse = (courseTitle) => {
    setActiveResume(courseTitle);
    setTimeout(() => {
      setActiveResume(null);
    }, 3000);
  };

  const handleEnrollCourse = (courseId, courseTitle) => {
    const saved = localStorage.getItem("lms_enrolled_courses");
    let list = saved ? JSON.parse(saved) : [];
    if (!list.includes(courseId)) {
      list.push(courseId);
      localStorage.setItem("lms_enrolled_courses", JSON.stringify(list));
    }

    setEnrollSuccessMessage(`Successfully enrolled in "${courseTitle}"!`);
    syncData();

    // Trigger standard CustomEvent to sync explore tab/dashboard if needed
    window.dispatchEvent(new Event("lms_enrollment_updated"));

    setTimeout(() => {
      setEnrollSuccessMessage("");
    }, 4000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Toast Alert */}
      {enrollSuccessMessage && (
        <div className="fixed bottom-6 right-6 z-50 glass-panel border-emerald-500/30 bg-emerald-950/80 text-emerald-200 px-5 py-3 rounded-2xl flex items-center gap-3 shadow-lg shadow-emerald-500/10 animate-slide-up">
          <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-xs font-semibold">{enrollSuccessMessage}</span>
        </div>
      )}

      {/* Action modal for Resume Course demo */}
      {activeResume && (
        <div className="fixed bottom-6 right-6 z-50 glass-panel border-indigo-500/30 bg-indigo-950/80 text-indigo-200 px-5 py-3 rounded-2xl flex items-center gap-3 shadow-lg shadow-indigo-500/10 animate-slide-up">
          <div className="w-4 h-4 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-semibold">Resuming lesson for "{activeResume}"...</span>
        </div>
      )}

      {/* Welcome Banner & Quick Stats Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Welcome Banner Card (8 cols) */}
        <div className="lg:col-span-8 glass-panel rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between min-h-[220px] transition-all hover:border-white/12">
          {/* Decorative glowing gradient orb inside banner */}
          <div className="absolute top-[-30px] right-[-30px] w-48 h-48 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none" />
          <div className="absolute bottom-[-30px] left-[20%] w-48 h-48 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />
          
          <div className="space-y-2 relative z-10">
            <div className="inline-flex items-center gap-1 bg-white/5 border border-white/10 rounded-full px-3 py-1 text-[10px] font-bold text-indigo-300 uppercase tracking-wider">
              ✨ Module 2 Day 3
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
              Welcome Back, <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">Ahsan Adeem</span>!
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm max-w-lg leading-relaxed mt-1">
              "Education is the passport to the future, for tomorrow belongs to those who prepare for it today." Keep expanding your boundaries!
            </p>
          </div>

          {/* Banner bottom indicators */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mt-6 relative z-10 pt-4 border-t border-white/5">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-orange-500/10 text-orange-400 flex items-center justify-center border border-orange-500/15">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <div className="text-[10px] text-slate-500 font-bold uppercase leading-none">Learning Streak</div>
                <div className="text-sm font-black text-slate-200 mt-1">5 Days In a Row</div>
              </div>
            </div>

            <div className="w-px h-8 bg-white/5 hidden sm:block" />

            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/15">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="text-[10px] text-slate-500 font-bold uppercase leading-none">Time Spent (This Week)</div>
                <div className="text-sm font-black text-slate-200 mt-1">180 / 300 mins</div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Card (4 cols) */}
        <div className="lg:col-span-4 glass-panel rounded-3xl p-6 flex flex-col justify-between transition-all hover:border-white/12">
          <div>
            <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              Overall Progress Overview
            </h3>
            
            <div className="space-y-4">
              {/* Stat 1 */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/8 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-8.5 h-8.5 rounded-lg bg-indigo-500/15 text-indigo-400 flex items-center justify-center border border-indigo-500/10 text-xs font-bold">
                    🎓
                  </div>
                  <span className="text-xs font-semibold text-slate-300">Completed Courses</span>
                </div>
                <span className="text-sm font-black text-white">4</span>
              </div>

              {/* Stat 2 */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/8 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-8.5 h-8.5 rounded-lg bg-purple-500/15 text-purple-400 flex items-center justify-center border border-purple-500/10 text-xs font-bold">
                    🏆
                  </div>
                  <span className="text-xs font-semibold text-slate-300">Earned Certificates</span>
                </div>
                <span className="text-sm font-black text-white">2</span>
              </div>

              {/* Stat 3 */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/8 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-8.5 h-8.5 rounded-lg bg-pink-500/15 text-pink-400 flex items-center justify-center border border-pink-500/10 text-xs font-bold">
                    🎯
                  </div>
                  <span className="text-xs font-semibold text-slate-300">Avg Quiz Score</span>
                </div>
                <span className="text-sm font-black text-white">92%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* In-Progress Courses Grid (12 cols) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
            Resume Your Learning
          </h2>
          <Link href="/student/my-learning" className="text-xs font-bold text-indigo-400 hover:underline">
            View All My Courses &rarr;
          </Link>
        </div>

        {inProgressCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {inProgressCourses.map((course) => (
              <div
                key={course.id}
                onClick={() => router.push(`/student/explore/${course.id}`)}
                className="glass-panel rounded-2xl p-5 hover:border-white/15 transition-all duration-300 flex flex-col justify-between relative group cursor-pointer"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <span className={`text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border border-white/5 ${course.accentBg}`}>
                      {course.category}
                    </span>
                    <span className="text-[10px] text-slate-500 font-bold">
                      {course.completedLessons}/{course.totalLessons} Lessons
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm sm:text-base font-bold text-slate-100 group-hover:text-indigo-400 transition-colors leading-snug">
                      {course.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-1">Instructor: {course.instructor}</p>
                  </div>

                  {/* Progress Bar Container */}
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

                <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-end">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleResumeCourse(course.title);
                    }}
                    className="flex items-center gap-1.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-4 rounded-xl shadow-md shadow-indigo-500/10 hover:shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
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
          <div className="glass-panel rounded-2xl p-6 text-center text-slate-400 text-xs">
            No active courses. Navigate to <Link href="/student/explore" className="text-indigo-400 hover:underline">Explore</Link> to enroll.
          </div>
        )}
      </div>

      {/* Recommended Courses Grid */}
      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-black text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
            Recommended For You
          </h2>
          <p className="text-slate-400 text-xs mt-1">Based on your learning history and chosen preferences.</p>
        </div>

        {recommendedCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedCourses.map((course) => (
              <div
                key={course.id}
                onClick={() => router.push(`/student/explore/${course.id}`)}
                className="glass-panel rounded-2xl overflow-hidden hover:border-white/15 transition-all duration-300 flex flex-col justify-between group cursor-pointer"
              >
                {/* Card Banner Image Substitute */}
                <div className="h-32 bg-slate-800/40 border-b border-white/5 relative flex items-center justify-center p-4">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent z-10" />
                  <span className="text-2xl font-black text-slate-700 select-none group-hover:scale-105 transition-transform duration-300">
                    {course.category}
                  </span>
                  
                  {course.tag && (
                    <span className={`absolute top-3 left-3 z-20 font-bold text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider ${course.tagBg}`}>
                      {course.tag}
                    </span>
                  )}
                  
                  <span className="absolute bottom-3 right-3 z-20 text-[10px] text-slate-400 font-bold bg-slate-900/60 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/5">
                    {course.duration}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wide">
                      {course.category}
                    </span>
                    <h3 className="text-sm font-bold text-slate-200 group-hover:text-indigo-400 transition-colors leading-snug line-clamp-2 min-h-[40px]">
                      {course.title}
                    </h3>
                    <p className="text-[11px] text-slate-500">Instructor: {course.instructor}</p>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-yellow-400">{course.rating}</span>
                      <svg className="w-3.5 h-3.5 fill-current text-yellow-400" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-[10px] text-slate-500 font-medium">({course.reviews})</span>
                    </div>
                    <div className="text-sm font-black text-slate-200">{course.price}</div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEnrollCourse(course.id, course.title);
                      }}
                      className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs font-bold py-2.5 px-4 rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-1"
                    >
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="glass-panel rounded-2xl p-6 text-center text-slate-500 text-xs">
            🎉 You have enrolled in all recommended courses! Check your study catalog.
          </div>
        )}
      </div>
    </div>
  );
}
