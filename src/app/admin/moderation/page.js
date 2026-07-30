"use client";

import { useState, useEffect } from "react";

export default function AdminModeration() {
  useEffect(() => {
    document.title = "Course Moderation | LMS Studio";
  }, []);

  const [queue, setQueue] = useState([
    {
      id: 1,
      title: "Intro to AI: Deep Learning Foundations",
      instructor: "Alex Rivers",
      category: "Data Science",
      price: "$119.00",
      lessons: 10,
      description: "Build deep neural networks from scratch. We cover basic artificial neurons, backpropagation, gradient descent, and convolutional networks using clean layouts.",
      status: "Pending Review",
    },
    {
      id: 2,
      title: "Advanced Tailwind CSS: Design Systems & custom configurations",
      instructor: "Jane Doe",
      category: "Design",
      price: "$49.00",
      lessons: 12,
      description: "Take control of Utility classes. Build custom design tokens, create responsive themes, and learn optimized builds using next generation tools.",
      status: "Pending Review",
    },
  ]);

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState("");

  const handleApprove = (courseId) => {
    setQueue((prev) =>
      prev.map((c) => (c.id === courseId ? { ...c, status: "Published" } : c))
    );
    setSelectedCourse(null);
  };

  const handleOpenRejectModal = (course) => {
    setSelectedCourse(course);
    setShowRejectModal(true);
  };

  const handleRejectSubmit = () => {
    if (!selectedCourse || !rejectReason.trim()) return;

    setQueue((prev) =>
      prev.map((c) =>
        c.id === selectedCourse.id
          ? { ...c, status: "Needs Revision", rejectReason: rejectReason }
          : c
      )
    );

    setShowRejectModal(false);
    setRejectReason("");
    setSelectedCourse(null);
  };

  return (
    <div className="space-y-8 animate-fade-in relative">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Course Moderation Queue
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm">
          Review, approve, or request revisions on curriculum materials submitted by instructors.
        </p>
      </div>

      {/* Queue Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {queue.map((course) => (
          <div
            key={course.id}
            className="glass-panel rounded-2xl p-5 hover:border-white/12 transition-all flex flex-col justify-between group"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-white/5 border border-white/5 text-slate-400">
                  {course.category}
                </span>
                <span
                  className={`text-[9px] font-bold px-2 py-0.5 rounded-md ${
                    course.status === "Published"
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/10"
                      : course.status === "Needs Revision"
                      ? "bg-rose-500/10 text-rose-400 border border-rose-500/10"
                      : "bg-amber-500/10 text-amber-400 border border-amber-500/10 animate-pulse"
                  }`}
                >
                  {course.status}
                </span>
              </div>

              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-200 group-hover:text-rose-400 transition-colors leading-snug">
                  {course.title}
                </h3>
                <p className="text-[10px] text-slate-500 mt-1">Instructor: {course.instructor}</p>
                <p className="text-[11px] text-slate-400 mt-3 line-clamp-3 leading-relaxed">
                  {course.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 text-[10px] text-slate-500">
                <div>
                  <span className="block font-medium">Lessons count</span>
                  <span className="font-extrabold text-slate-300 text-xs mt-0.5 block">{course.lessons} lectures</span>
                </div>
                <div>
                  <span className="block font-medium">Catalog Price</span>
                  <span className="font-extrabold text-slate-300 text-xs mt-0.5 block">{course.price}</span>
                </div>
              </div>
            </div>

            {course.status === "Pending Review" && (
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-end gap-2.5">
                <button
                  onClick={() => handleOpenRejectModal(course)}
                  className="bg-red-500/10 hover:bg-red-500 border border-red-500/20 text-red-400 hover:text-white font-bold text-[10px] py-2 px-3.5 rounded-xl transition-all"
                >
                  Reject
                </button>
                <button
                  onClick={() => handleApprove(course.id)}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] py-2 px-4 rounded-xl shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Approve Course
                </button>
              </div>
            )}

            {course.status === "Needs Revision" && course.rejectReason && (
              <div className="mt-4 p-3 bg-rose-500/5 border border-rose-500/10 rounded-xl text-[10px] text-rose-300">
                <span className="font-bold text-rose-400 block mb-0.5">Revision Comments:</span>
                "{course.rejectReason}"
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Reject Comments Overlay Modal */}
      {showRejectModal && selectedCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={() => setShowRejectModal(false)} />

          <div className="relative w-full max-w-md glass-panel rounded-3xl p-6 z-10 shadow-2xl animate-scale-up space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-white">Reject Course Request</h3>
              <button onClick={() => setShowRejectModal(false)} className="text-slate-400 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div className="text-[11px] text-slate-400 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/5">
                Please provide detailed feedback explaining why <span className="text-indigo-400 font-bold">{selectedCourse.title}</span> needs revisions before publication.
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Revision Comments</label>
                <textarea
                  rows="4"
                  placeholder="e.g. Please update video descriptions in module 2 and correct pricing tier..."
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="w-full bg-slate-950/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-rose-500 text-slate-200 resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setShowRejectModal(false)}
                className="text-xs font-bold text-slate-300 hover:bg-white/5 px-4 py-2.5 rounded-xl border border-white/5 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleRejectSubmit}
                disabled={!rejectReason.trim()}
                className="bg-red-600 hover:bg-red-500 disabled:opacity-50 text-white font-bold text-xs py-2.5 px-5 rounded-xl shadow-md transition-all"
              >
                Submit Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
