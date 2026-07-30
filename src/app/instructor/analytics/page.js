"use client";

import { useState, useEffect } from "react";

export default function InstructorAnalytics() {
  useEffect(() => {
    document.title = "Analytics | LMS Studio";
  }, []);

  const [courseStats] = useState([
    {
      title: "Next.js 15 Masterclass: App Router & Server Actions",
      enrollments: 940,
      completionRate: "78%",
      monthlyRevenue: "$8,360.00",
      rating: "4.9 ★",
    },
    {
      title: "React Fundamental Course: Hooks, State, and Context",
      enrollments: 540,
      completionRate: "89%",
      monthlyRevenue: "$4,820.00",
      rating: "4.8 ★",
    },
    {
      title: "Intro to AI: Deep Learning Foundations",
      enrollments: 0,
      completionRate: "--",
      monthlyRevenue: "$0.00",
      rating: "--",
    },
  ]);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Performance Analytics
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm">
          Monitor your students engagement levels, conversion rates, and revenue distributions.
        </p>
      </div>

      {/* Visual Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Metric 1: SVG Bar Chart for Daily Student Activity */}
        <div className="glass-panel rounded-3xl p-6 space-y-4 hover:border-white/12 transition-all">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-200">Daily Video Watch Times</h3>
            <span className="text-[10px] text-slate-500 font-semibold bg-white/5 border border-white/5 rounded-lg px-2 py-0.5">Weekly</span>
          </div>

          <div className="h-[180px] flex items-end justify-between gap-3 bg-slate-950/20 border border-white/5 p-4 rounded-2xl">
            {/* Monday bar */}
            <div className="flex flex-col items-center gap-1.5 flex-1 group">
              <div className="w-full bg-white/5 group-hover:bg-indigo-500/20 rounded-t-lg transition-all h-[120px] relative overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 bg-indigo-600 group-hover:bg-indigo-500 transition-all rounded-t-lg h-[60px]" />
              </div>
              <span className="text-[9px] font-bold text-slate-500">Mon</span>
            </div>

            {/* Tuesday bar */}
            <div className="flex flex-col items-center gap-1.5 flex-1 group">
              <div className="w-full bg-white/5 group-hover:bg-indigo-500/20 rounded-t-lg transition-all h-[120px] relative overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 bg-indigo-600 group-hover:bg-indigo-500 transition-all rounded-t-lg h-[90px]" />
              </div>
              <span className="text-[9px] font-bold text-slate-500">Tue</span>
            </div>

            {/* Wednesday bar */}
            <div className="flex flex-col items-center gap-1.5 flex-1 group">
              <div className="w-full bg-white/5 group-hover:bg-indigo-500/20 rounded-t-lg transition-all h-[120px] relative overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 bg-indigo-600 group-hover:bg-indigo-500 transition-all rounded-t-lg h-[40px]" />
              </div>
              <span className="text-[9px] font-bold text-slate-500">Wed</span>
            </div>

            {/* Thursday bar */}
            <div className="flex flex-col items-center gap-1.5 flex-1 group">
              <div className="w-full bg-white/5 group-hover:bg-indigo-500/20 rounded-t-lg transition-all h-[120px] relative overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 bg-indigo-600 group-hover:bg-indigo-500 transition-all rounded-t-lg h-[110px]" />
              </div>
              <span className="text-[9px] font-bold text-slate-500">Thu</span>
            </div>

            {/* Friday bar */}
            <div className="flex flex-col items-center gap-1.5 flex-1 group">
              <div className="w-full bg-white/5 group-hover:bg-indigo-500/20 rounded-t-lg transition-all h-[120px] relative overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 bg-indigo-600 group-hover:bg-indigo-500 transition-all rounded-t-lg h-[75px]" />
              </div>
              <span className="text-[9px] font-bold text-slate-500">Fri</span>
            </div>

            {/* Saturday bar */}
            <div className="flex flex-col items-center gap-1.5 flex-1 group">
              <div className="w-full bg-white/5 group-hover:bg-indigo-500/20 rounded-t-lg transition-all h-[120px] relative overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 bg-indigo-600 group-hover:bg-indigo-500 transition-all rounded-t-lg h-[30px]" />
              </div>
              <span className="text-[9px] font-bold text-slate-500">Sat</span>
            </div>

            {/* Sunday bar */}
            <div className="flex flex-col items-center gap-1.5 flex-1 group">
              <div className="w-full bg-white/5 group-hover:bg-indigo-500/20 rounded-t-lg transition-all h-[120px] relative overflow-hidden">
                <div className="absolute bottom-0 left-0 right-0 bg-indigo-600 group-hover:bg-indigo-500 transition-all rounded-t-lg h-[50px]" />
              </div>
              <span className="text-[9px] font-bold text-slate-500">Sun</span>
            </div>
          </div>
        </div>

        {/* Metric 2: SVG Distribution Circle (Pie chart mock) */}
        <div className="glass-panel rounded-3xl p-6 space-y-4 hover:border-white/12 transition-all flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-slate-200">Device Source Distribution</h3>
            <span className="text-[10px] text-slate-500 font-semibold bg-white/5 border border-white/5 rounded-lg px-2 py-0.5">30 Days</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 justify-center py-2">
            {/* Visual SVG pie chart ring */}
            <div className="relative w-28 h-28 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="3" />
                
                {/* Desktop slice (60%) */}
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#6366f1" strokeWidth="3" 
                  strokeDasharray="60 40" strokeDashoffset="0" />
                
                {/* Mobile slice (30%) */}
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#a855f7" strokeWidth="3" 
                  strokeDasharray="30 70" strokeDashoffset="-60" />
                
                {/* Tablet slice (10%) */}
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#f43f5e" strokeWidth="3" 
                  strokeDasharray="10 90" strokeDashoffset="-90" />
              </svg>
              <div className="absolute text-center leading-none">
                <div className="text-sm font-black text-white">60%</div>
                <div className="text-[8px] text-slate-500 uppercase mt-0.5">Desktop</div>
              </div>
            </div>

            {/* Labels */}
            <div className="space-y-2 text-[10px] font-bold">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded bg-indigo-500" />
                <span className="text-slate-300">Desktop / Laptop (60%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded bg-purple-500" />
                <span className="text-slate-300">Smart Phones (30%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded bg-rose-500" />
                <span className="text-slate-300">Tablet view (10%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Course Detailed Metrics List */}
      <div className="glass-panel rounded-3xl overflow-hidden border border-white/5">
        <div className="p-5 border-b border-white/5 flex justify-between items-center">
          <h3 className="text-sm font-bold text-slate-200">Individual Course Statistics</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/5 text-slate-400 uppercase font-bold text-[10px] tracking-wider">
                <th className="p-4 px-6">Course Name</th>
                <th className="p-4">Enrollments</th>
                <th className="p-4">Avg Rating</th>
                <th className="p-4">Completion Rate</th>
                <th className="p-4 text-right px-6">Monthly Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {courseStats.map((stat, i) => (
                <tr key={i} className="hover:bg-white/3 transition-colors">
                  <td className="p-4 px-6 font-bold text-slate-200">{stat.title}</td>
                  <td className="p-4 font-semibold">{stat.enrollments} students</td>
                  <td className="p-4 font-bold text-yellow-400">{stat.rating}</td>
                  <td className="p-4 font-medium text-slate-400">{stat.completionRate}</td>
                  <td className="p-4 text-right px-6 font-black text-white">{stat.monthlyRevenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
