"use client";

import { useState, useEffect } from "react";

export default function StudentProfile() {
  useEffect(() => {
    document.title = "Student Profile | LMS Studio";
  }, []);

  const [formData, setFormData] = useState({
    name: "Muhammad Ahsan",
    email: "ahsanadeem840@gmail.com",
    bio: "Passionate web developer specializing in Next.js, React, and modern UI design frameworks.",
    skills: "React, Next.js, Tailwind CSS, JavaScript",
  });

  const [isUpdating, setIsUpdating] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsUpdating(true);

    setTimeout(() => {
      setIsUpdating(false);
      setSuccessMessage("Profile settings updated successfully!");
      setTimeout(() => {
        setSuccessMessage("");
      }, 4000);
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Toast Alert */}
      {successMessage && (
        <div className="fixed bottom-6 right-6 z-50 glass-panel border-emerald-500/30 bg-emerald-950/80 text-emerald-200 px-5 py-3 rounded-2xl flex items-center gap-3 shadow-lg shadow-emerald-500/10 animate-slide-up">
          <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-xs font-semibold">{successMessage}</span>
        </div>
      )}

      {/* Header Description */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Profile Settings
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
          Manage your personal details, profile avatar details, track active courses count, and update learning preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Profile Card Summary (4 cols) */}
        <div className="lg:col-span-4 glass-panel rounded-3xl p-6 text-center space-y-6 relative overflow-hidden transition-all hover:border-white/12">
          {/* Background Glow */}
          <div className="absolute top-[-30px] right-[-30px] w-32 h-32 rounded-full bg-indigo-500/10 blur-2xl pointer-events-none" />

          <div className="space-y-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-2xl text-white uppercase shadow-lg shadow-indigo-500/25 mx-auto">
              AA
            </div>

            <div>
              <h2 className="text-lg font-black text-white">{formData.name}</h2>
              <p className="text-[11px] text-indigo-400 font-bold uppercase tracking-wider mt-0.5">Student / Learner</p>
              <p className="text-xs text-slate-500 mt-1">{formData.email}</p>
            </div>
          </div>

          <div className="border-t border-white/5 pt-6 grid grid-cols-3 gap-2">
            <div>
              <div className="text-[10px] text-slate-500 font-bold uppercase">Enrolled</div>
              <div className="text-base font-black text-slate-200 mt-0.5">4</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 font-bold uppercase">Streak</div>
              <div className="text-base font-black text-slate-200 mt-0.5">5d</div>
            </div>
            <div>
              <div className="text-[10px] text-slate-500 font-bold uppercase">Completed</div>
              <div className="text-base font-black text-slate-200 mt-0.5">4</div>
            </div>
          </div>
        </div>

        {/* Profile Editing Form (8 cols) */}
        <div className="lg:col-span-8 glass-panel rounded-3xl p-6 sm:p-8 transition-all hover:border-white/12">
          <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-base font-bold text-white flex items-center gap-2 pb-3 border-b border-white/5">
              <span className="w-2 h-2 rounded-full bg-indigo-500" />
              Personal Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full h-10 bg-white/5 border border-white/10 rounded-xl px-4 text-xs focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all text-slate-200"
                />
              </div>

              {/* Email Address */}
              <div className="space-y-2">
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full h-10 bg-white/5 border border-white/10 rounded-xl px-4 text-xs focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all text-slate-200"
                />
              </div>
            </div>

            {/* Biography */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Biography / About Me</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="4"
                className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-xs focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all text-slate-200 resize-none leading-relaxed"
              />
            </div>

            {/* Skills */}
            <div className="space-y-2">
              <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Skill Keywords (comma-separated)</label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className="w-full h-10 bg-white/5 border border-white/10 rounded-xl px-4 text-xs focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all text-slate-200"
              />
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-end">
              <button
                type="submit"
                disabled={isUpdating}
                className="bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-600/50 text-white text-xs font-bold py-2.5 px-6 rounded-xl shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-1.5"
              >
                {isUpdating ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Updating Profile...
                  </>
                ) : (
                  "Save Changes"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
