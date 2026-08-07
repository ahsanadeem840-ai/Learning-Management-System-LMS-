"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function InstructorDashboard() {
  const { user, userData } = useAuth();
  useEffect(() => {
    document.title = "Instructor Dashboard | LMS Studio";
  }, []);

  const [reviews, setReviews] = useState([
    {
      id: 1,
      studentName: "Jane Doe",
      course: "Next.js 15 Masterclass",
      rating: 5,
      comment: "This course is absolutely fantastic! The explanations of server actions are the clearest I've found.",
      date: "1 day ago",
      replied: false,
      replyText: "",
    },
    {
      id: 2,
      studentName: "John Smith",
      course: "React Fundamental Course",
      rating: 4,
      comment: "Good pacing, but I wish there were more advanced styling exercises included.",
      date: "3 days ago",
      replied: true,
      replyText: "Thanks John! I will add some CSS-focused challenge assignments in the next content update.",
    },
  ]);

  const [replyInputs, setReplyInputs] = useState({});

  const handleSendReply = (reviewId) => {
    const text = replyInputs[reviewId]?.trim();
    if (!text) return;

    setReviews((prev) =>
      prev.map((r) => (r.id === reviewId ? { ...r, replied: true, replyText: text } : r))
    );
    setReplyInputs((prev) => ({ ...prev, [reviewId]: "" }));
  };

  const handleInputChange = (reviewId, text) => {
    setReplyInputs((prev) => ({ ...prev, [reviewId]: text }));
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
          Instructor Center
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
          Welcome back, <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 via-purple-300 to-pink-300">{userData?.name || user?.displayName || "Alex Rivers"}</span>!
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
          Track enrollments, manage student feedback, and check sales analytics on your premium course workspace.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metric 1 */}
        <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between hover:border-white/12 transition-all">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Revenue</span>
            <span className="text-indigo-400 text-xs font-extrabold bg-indigo-500/10 px-2 py-0.5 rounded-full">+12.5%</span>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-black text-white">$14,820.00</div>
            <div className="text-[10px] text-slate-500 mt-1">Earned this month</div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between hover:border-white/12 transition-all">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Enrolled Students</span>
            <span className="text-indigo-400 text-xs font-extrabold bg-indigo-500/10 px-2 py-0.5 rounded-full">+48 new</span>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-black text-white">1,480</div>
            <div className="text-[10px] text-slate-500 mt-1">Across all published courses</div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between hover:border-white/12 transition-all">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Course Rating</span>
            <span className="text-yellow-400 text-xs font-extrabold bg-yellow-500/10 px-2 py-0.5 rounded-full">Top 5%</span>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-black text-white">4.9 ★</div>
            <div className="text-[10px] text-slate-500 mt-1">Average student feedback</div>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between hover:border-white/12 transition-all">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Courses</span>
            <span className="text-purple-400 text-xs font-extrabold bg-purple-500/10 px-2 py-0.5 rounded-full">Active</span>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-black text-white">3</div>
            <div className="text-[10px] text-slate-500 mt-1">Published syllabus items</div>
          </div>
        </div>
      </div>

      {/* Analytics Graph & Feedback Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* SVG Earnings Graph (7 cols) */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 space-y-4 hover:border-white/12 transition-all">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-200">Revenue Performance Trends</h3>
            <span className="text-[10px] text-slate-500 font-semibold bg-white/5 border border-white/5 rounded-lg px-2.5 py-1">Last 6 Months</span>
          </div>

          <div className="w-full relative h-[180px] bg-slate-950/20 rounded-2xl p-4 flex items-end border border-white/5 overflow-hidden">
            {/* Draw dummy graph chart */}
            <svg viewBox="0 0 500 150" className="w-full h-full text-indigo-500">
              <defs>
                <linearGradient id="gradient-line" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgb(99, 102, 241)" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="rgb(99, 102, 241)" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Path area */}
              <path
                d="M0,130 Q80,100 150,70 T300,50 T450,20 L500,20 L500,150 L0,150 Z"
                fill="url(#gradient-line)"
              />
              {/* Line */}
              <path
                d="M0,130 Q80,100 150,70 T300,50 T450,20 L500,20"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                className="text-indigo-500"
              />
              {/* Data points */}
              <circle cx="150" cy="70" r="4.5" className="fill-indigo-400 stroke-slate-900 stroke-2" />
              <circle cx="300" cy="50" r="4.5" className="fill-indigo-400 stroke-slate-900 stroke-2" />
              <circle cx="450" cy="20" r="4.5" className="fill-indigo-400 stroke-slate-900 stroke-2" />
            </svg>
          </div>

          <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 px-2">
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul (Current)</span>
          </div>
        </div>

        {/* Student Reviews & Feedbacks (5 cols) */}
        <div className="lg:col-span-5 glass-panel rounded-3xl p-6 space-y-4 hover:border-white/12 transition-all">
          <h3 className="text-sm font-bold text-slate-200">Recent Student Reviews</h3>

          <div className="space-y-4 max-h-[220px] overflow-y-auto pr-1">
            {reviews.map((rev) => (
              <div key={rev.id} className="p-3 bg-white/5 border border-white/5 rounded-2xl space-y-2">
                <div className="flex justify-between items-center text-[10px]">
                  <div>
                    <span className="font-bold text-slate-200">{rev.studentName}</span>
                    <span className="text-slate-500"> on {rev.course}</span>
                  </div>
                  <span className="text-yellow-400 font-bold">{"★".repeat(rev.rating)}</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed italic">
                  "{rev.comment}"
                </p>

                {rev.replied ? (
                  <div className="p-2 bg-indigo-500/10 border border-indigo-500/10 rounded-xl text-[10px] text-indigo-300">
                    <span className="font-bold text-indigo-400">Your Response: </span>
                    {rev.replyText}
                  </div>
                ) : (
                  <div className="flex gap-1.5 pt-1">
                    <input
                      type="text"
                      placeholder="Type feedback reply..."
                      value={replyInputs[rev.id] || ""}
                      onChange={(e) => handleInputChange(rev.id, e.target.value)}
                      className="flex-1 h-7.5 bg-slate-950/40 border border-white/10 rounded-xl px-2.5 text-[10px] focus:outline-none focus:border-indigo-500 text-slate-200 placeholder:text-slate-500"
                    />
                    <button
                      onClick={() => handleSendReply(rev.id)}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-[9px] px-3 py-1.5 rounded-xl transition-all"
                    >
                      Reply
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
