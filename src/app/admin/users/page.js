"use client";

import { useState, useEffect } from "react";

export default function AdminUsers() {
  useEffect(() => {
    document.title = "User Directory | LMS Studio";
  }, []);

  const [users, setUsers] = useState([
    {
      id: 1,
      name: "Muhammad Ahsan",
      email: "ahsanadeem840@gmail.com",
      role: "Student",
      status: "Active",
      joinedDate: "Jul 29, 2026",
    },
    {
      id: 2,
      name: "Alex Rivers",
      email: "alex.rivers@lms.studio",
      role: "Instructor",
      status: "Active",
      joinedDate: "Jun 12, 2026",
    },
    {
      id: 3,
      name: "John Smith",
      email: "john.smith@gmail.com",
      role: "Student",
      status: "Suspended",
      joinedDate: "May 28, 2026",
    },
    {
      id: 4,
      name: "Jane Doe",
      email: "jane.doe@gmail.com",
      role: "Instructor",
      status: "Active",
      joinedDate: "Apr 15, 2026",
    },
  ]);

  const [searchQuery, setSearchQuery] = useState("");

  const handleToggleStatus = (userId) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? { ...u, status: u.status === "Active" ? "Suspended" : "Active" }
          : u
      )
    );
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            User Directory
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm">
            Search, block, audit, and configure permission levels for all registered accounts.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 bg-white/5 border border-white/10 rounded-xl px-4 pl-10 text-xs focus:outline-none focus:border-rose-500/50 focus:ring-1 focus:ring-rose-500/50 transition-all text-slate-200 placeholder:text-slate-500"
          />
          <svg className="absolute left-3 top-3 w-4 h-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Users table */}
      <div className="glass-panel rounded-3xl overflow-hidden border border-white/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/5 text-slate-400 uppercase font-bold text-[10px] tracking-wider">
                <th className="p-4 px-6">User Name / Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Account Status</th>
                <th className="p-4">Joined Date</th>
                <th className="p-4 text-right px-6">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-white/3 transition-colors">
                  <td className="p-4 px-6">
                    <div className="font-bold text-white">{u.name}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{u.email}</div>
                  </td>
                  <td className="p-4 font-semibold text-slate-200">
                    <span
                      className={`text-[9px] px-2 py-0.5 rounded ${
                        u.role === "Instructor"
                          ? "bg-indigo-500/10 text-indigo-400 border border-indigo-500/10"
                          : "bg-purple-500/10 text-purple-400 border border-purple-500/10"
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded border ${
                        u.status === "Active"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/10"
                          : "bg-red-500/10 text-red-400 border-red-500/10"
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="p-4 text-slate-400 font-medium">{u.joinedDate}</td>
                  <td className="p-4 text-right px-6">
                    <button
                      onClick={() => handleToggleStatus(u.id)}
                      className={`font-bold py-1.5 px-3 rounded-lg border text-[10px] transition-all ${
                        u.status === "Active"
                          ? "bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white"
                          : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500 hover:text-white"
                      }`}
                    >
                      {u.status === "Active" ? "Suspend Account" : "Activate Account"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
