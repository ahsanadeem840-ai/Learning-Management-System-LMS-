"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export default function CertificatesBoard() {
  const { user, userData } = useAuth();
  useEffect(() => {
    document.title = "My Certificates | LMS Studio";
  }, []);

  const [activeCert, setActiveCert] = useState(null);

  const certificates = [
    {
      id: "reactbasics",
      title: "React Fundamental Course: Hooks, State, and Context",
      instructor: "Maximilian Schwarz",
      issueDate: "June 12, 2026",
      credentialId: "LMS-CERT-REACT-8849",
      hours: "15 hours of video tutorials",
    },
    {
      id: "modernjs",
      title: "Modern JavaScript: ES6+ Syntax & Functional Programming",
      instructor: "Brad Traversy",
      issueDate: "May 28, 2026",
      credentialId: "LMS-CERT-JS-3091",
      hours: "12 hours of video tutorials",
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in relative">
      {/* Header Description */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          My Earned Credentials
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
          Review and share your verified certificates of completion. You can download certificates or print them for your CV portfolio.
        </p>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="glass-panel rounded-3xl p-6 hover:border-white/15 transition-all duration-300 flex flex-col justify-between group relative"
          >
            <div className="space-y-4">
              <div className="flex justify-between items-start">
                <span className="text-[10px] bg-indigo-500/10 text-indigo-400 font-extrabold uppercase px-2.5 py-0.5 rounded-full border border-indigo-500/15">
                  Verified
                </span>
                <span className="text-[9px] text-slate-500 font-mono">{cert.credentialId}</span>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-100 group-hover:text-indigo-400 transition-colors leading-snug">
                  {cert.title}
                </h3>
                <p className="text-[11px] text-slate-400 mt-1">Instructor: {cert.instructor}</p>
                <p className="text-[10px] text-slate-500 mt-2">Issued on: {cert.issueDate}</p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-[10px] text-slate-400 font-semibold">{cert.hours}</span>
              <button
                onClick={() => setActiveCert(cert)}
                className="flex items-center gap-1.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-4 rounded-xl shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                🏆 View Certificate
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Premium Glassmorphic Certificate Modal Overlay */}
      {activeCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
          {/* Close Backdrop click */}
          <div className="absolute inset-0" onClick={() => setActiveCert(null)} />

          {/* Certificate Board Container */}
          <div className="relative w-full max-w-2xl glass-panel rounded-3xl p-6 sm:p-10 shadow-2xl shadow-indigo-500/5 animate-scale-up z-10 border-indigo-500/20 overflow-hidden bg-slate-900/90 text-center space-y-8">
            
            {/* Decors */}
            <div className="absolute top-[-50px] right-[-50px] w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-[-50px] left-[-50px] w-64 h-64 rounded-full bg-purple-500/10 blur-3xl pointer-events-none" />
            
            {/* Close Button */}
            <button
              onClick={() => setActiveCert(null)}
              className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Certificate content border */}
            <div className="border border-white/5 rounded-2xl p-6 sm:p-8 space-y-6 relative bg-white/2 backdrop-blur-sm">
              
              {/* Badge Icon */}
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 mx-auto flex items-center justify-center shadow-lg shadow-indigo-500/20 text-white font-extrabold text-2xl">
                L
              </div>

              <div className="space-y-1">
                <div className="text-[10px] text-indigo-400 font-extrabold tracking-widest uppercase">
                  Certificate of Completion
                </div>
                <div className="text-[9px] text-slate-500">PROUDLY PRESENTED TO</div>
              </div>

              <div className="space-y-2">
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-none">
                  {userData?.name || user?.displayName || "Muhammad Ahsan"}
                </h2>
                <div className="w-16 h-0.5 bg-indigo-500 mx-auto rounded-full" />
              </div>

              <p className="text-slate-300 text-xs max-w-md mx-auto leading-relaxed">
                for successfully completing all modules, quizzes, and curriculum lessons required for the professional certification course:
              </p>

              <div className="space-y-1">
                <h3 className="text-sm sm:text-base font-bold text-indigo-300 leading-snug">
                  {activeCert.title}
                </h3>
                <p className="text-[10px] text-slate-500">Taught by instructor: {activeCert.instructor}</p>
              </div>

              {/* Signatures and Details */}
              <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5 text-left">
                <div>
                  <div className="text-[9px] text-slate-500 font-bold uppercase">Credential Identifier</div>
                  <div className="text-[10px] text-slate-300 font-mono mt-0.5">{activeCert.credentialId}</div>
                </div>
                <div className="text-right">
                  <div className="text-[9px] text-slate-500 font-bold uppercase">Date of Issue</div>
                  <div className="text-[10px] text-slate-300 mt-0.5">{activeCert.issueDate}</div>
                </div>
              </div>

            </div>

            {/* Actions buttons */}
            <div className="flex flex-col sm:flex-row gap-3 items-center justify-center pt-2">
              <button
                onClick={() => alert("Simulating PDF download...")}
                className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold py-2.5 px-6 rounded-xl transition-all shadow-md shadow-indigo-500/10 flex items-center justify-center gap-1.5"
              >
                📥 Download PDF
              </button>
              <button
                onClick={() => alert("Simulating sharing to LinkedIn...")}
                className="w-full sm:w-auto bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs font-bold py-2.5 px-6 rounded-xl transition-all flex items-center justify-center gap-1.5"
              >
                🔗 Share to LinkedIn
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}
