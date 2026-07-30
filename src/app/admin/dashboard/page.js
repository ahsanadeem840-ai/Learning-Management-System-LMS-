"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  useEffect(() => {
    document.title = "Admin Console | LMS Studio";
  }, []);

  const [systemLogs] = useState([
    {
      id: 1,
      type: "User Signup",
      detail: "New Student (Ahsan Adeem) completed registration form.",
      timestamp: "10 mins ago",
      badge: "bg-emerald-500/10 text-emerald-400 border-emerald-500/10",
    },
    {
      id: 2,
      type: "Course Creation",
      detail: "Alex Rivers submitted draft 'Intro to AI' for review.",
      timestamp: "1 hour ago",
      badge: "bg-indigo-500/10 text-indigo-400 border-indigo-500/10",
    },
    {
      id: 3,
      type: "System Maintenance",
      detail: "Nightly backup jobs executed successfully.",
      timestamp: "14 hours ago",
      badge: "bg-slate-500/15 text-slate-400 border-slate-500/10",
    },
  ]);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-400 text-xs font-semibold uppercase tracking-wider">
          Platform Governance
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
          Admin Control Center
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
          Overview of platform-wide user operations, server logs, and pending moderator checkouts.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metric 1 */}
        <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between hover:border-white/12 transition-all">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Users</span>
            <span className="text-rose-400 text-xs font-extrabold bg-rose-500/10 px-2 py-0.5 rounded-full">+140 today</span>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-black text-white">12,450</div>
            <div className="text-[10px] text-slate-500 mt-1">Students & Instructors</div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between hover:border-white/12 transition-all">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Published Courses</span>
            <span className="text-rose-400 text-xs font-extrabold bg-rose-500/10 px-2 py-0.5 rounded-full">Active</span>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-black text-white">820</div>
            <div className="text-[10px] text-slate-500 mt-1">Available in catalog</div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between hover:border-white/12 transition-all">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Pending Approvals</span>
            <span className="text-amber-400 text-xs font-extrabold bg-amber-500/10 px-2.5 py-0.5 rounded-full animate-pulse">2 Courses</span>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-black text-white">2</div>
            <div className="text-[10px] text-slate-500 mt-1">Awaiting moderation queue</div>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="glass-panel p-5 rounded-2xl flex flex-col justify-between hover:border-white/12 transition-all">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Monthly Revenue</span>
            <span className="text-rose-400 text-xs font-extrabold bg-rose-500/10 px-2 py-0.5 rounded-full">+8.4%</span>
          </div>
          <div className="mt-4">
            <div className="text-2xl font-black text-white">$42,100.00</div>
            <div className="text-[10px] text-slate-500 mt-1">LMS Platform total</div>
          </div>
        </div>
      </div>

      {/* Analytics Graph & Platform Logs */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* User Registration Line Chart (7 cols) */}
        <div className="lg:col-span-7 glass-panel rounded-3xl p-6 space-y-4 hover:border-white/12 transition-all">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-200">User Growth Trends</h3>
            <span className="text-[10px] text-slate-500 font-semibold bg-white/5 border border-white/5 rounded-lg px-2.5 py-1">Last 6 Months</span>
          </div>

          <div className="w-full relative h-[180px] bg-slate-950/20 rounded-2xl p-4 flex items-end border border-white/5 overflow-hidden">
            {/* Draw dummy graph chart */}
            <svg viewBox="0 0 500 150" className="w-full h-full text-rose-500">
              <defs>
                <linearGradient id="gradient-line-rose" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgb(244, 63, 94)" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="rgb(244, 63, 94)" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {/* Path area */}
              <path
                d="M0,130 Q100,120 180,90 T320,60 T450,30 L500,30 L500,150 L0,150 Z"
                fill="url(#gradient-line-rose)"
              />
              {/* Line */}
              <path
                d="M0,130 Q100,120 180,90 T320,60 T450,30 L500,30"
                fill="none"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                className="text-rose-500"
              />
              {/* Data points */}
              <circle cx="180" cy="90" r="4.5" className="fill-rose-400 stroke-slate-900 stroke-2" />
              <circle cx="320" cy="60" r="4.5" className="fill-rose-400 stroke-slate-900 stroke-2" />
              <circle cx="450" cy="30" r="4.5" className="fill-rose-400 stroke-slate-900 stroke-2" />
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

        {/* System Activity Log (5 cols) */}
        <div className="lg:col-span-5 glass-panel rounded-3xl p-6 space-y-4 hover:border-white/12 transition-all">
          <h3 className="text-sm font-bold text-slate-200">System Operations Log</h3>

          <div className="space-y-4 max-h-[220px] overflow-y-auto pr-1">
            {systemLogs.map((log) => (
              <div key={log.id} className="p-3 bg-white/5 border border-white/5 rounded-2xl space-y-2">
                <div className="flex justify-between items-center text-[9px] font-bold">
                  <span className={`px-2 py-0.5 rounded border uppercase tracking-wider ${log.badge}`}>
                    {log.type}
                  </span>
                  <span className="text-slate-500 font-semibold">{log.timestamp}</span>
                </div>
                <p className="text-[10px] text-slate-300 leading-relaxed">
                  {log.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
