"use client";

import { useState, useEffect } from "react";

export default function InstructorGradebook() {
  const [submissions, setSubmissions] = useState([]);
  const [selectedSub, setSelectedSub] = useState(null);
  const [gradeInput, setGradeInput] = useState("");
  const [feedbackInput, setFeedbackInput] = useState("");

  useEffect(() => {
    document.title = "Gradebook | LMS Studio";
    
    // Seed and sync submissions
    const savedSubmissions = localStorage.getItem("lms_submissions");
    const defaultSubmissions = [
      {
        id: 1,
        studentName: "Muhammad Ahsan",
        courseId: "nextjs15",
        course: "Next.js 15 Masterclass",
        assignmentId: "nextjs15_a2",
        assignment: "Module 2: Custom Layout Structure",
        date: "Jul 29, 2026",
        fileName: "layout-source-v2.zip",
        status: "Pending Review",
        grade: null,
        feedback: "",
        comments: "Attached is my zip containing the layout.js and sidebar collapsible components."
      },
      {
        id: 2,
        studentName: "John Smith",
        courseId: "reactbasics",
        course: "React Fundamental Course",
        assignmentId: "reactbasics_a1",
        assignment: "Module 1 Quiz: Hooks & Context API",
        date: "Jul 27, 2026",
        fileName: "react-quiz-answers.pdf",
        status: "Graded",
        grade: 92,
        feedback: "Great work explaining context updates and handling cleanups in useEffect hook. Keep it up!",
        comments: "Answers to the quiz questions in the PDF."
      },
      {
        id: 3,
        studentName: "Sarah Jenkins",
        courseId: "nextjs15",
        course: "Next.js 15 Masterclass",
        assignmentId: "nextjs15_a1",
        assignment: "Module 1: Server Actions & Form validation",
        date: "Jul 25, 2026",
        fileName: "form-action-submission.js",
        status: "Pending Review",
        grade: null,
        feedback: "",
        comments: "Finished the server actions with validation logic."
      }
    ];

    if (savedSubmissions) {
      setSubmissions(JSON.parse(savedSubmissions));
    } else {
      setSubmissions(defaultSubmissions);
      localStorage.setItem("lms_submissions", JSON.stringify(defaultSubmissions));
    }

    // Sync state if updates are emitted in other pages
    const syncSubmissions = () => {
      const saved = localStorage.getItem("lms_submissions");
      if (saved) {
        setSubmissions(JSON.parse(saved));
      }
    };

    window.addEventListener("lms_submissions_updated", syncSubmissions);
    return () => {
      window.removeEventListener("lms_submissions_updated", syncSubmissions);
    };
  }, []);

  const handleOpenGradeModal = (sub) => {
    setSelectedSub(sub);
    setGradeInput(sub.grade !== null ? sub.grade.toString() : "");
    setFeedbackInput(sub.feedback || "");
  };

  const handleSaveGrade = () => {
    if (!selectedSub || gradeInput === "") return;

    const updated = submissions.map((s) =>
      s.id === selectedSub.id
        ? {
            ...s,
            status: "Graded",
            grade: parseInt(gradeInput) || 0,
            feedback: feedbackInput,
          }
        : s
    );

    setSubmissions(updated);
    localStorage.setItem("lms_submissions", JSON.stringify(updated));

    // Dispatch custom event to notify other contexts
    window.dispatchEvent(new Event("lms_submissions_updated"));

    setSelectedSub(null);
    setGradeInput("");
    setFeedbackInput("");
  };

  return (
    <div className="space-y-8 animate-fade-in relative">
      {/* Header */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Student Gradebook
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm">
          Review, evaluate, and provide custom learning feedback on homework and assessment files.
        </p>
      </div>

      {/* Submissions Table / Grid */}
      <div className="glass-panel rounded-3xl overflow-hidden border border-white/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/5 text-slate-400 uppercase font-bold text-[10px] tracking-wider">
                <th className="p-4 px-6">Student</th>
                <th className="p-4">Course / Assignment</th>
                <th className="p-4">Submission File</th>
                <th className="p-4">Status</th>
                <th className="p-4">Grade</th>
                <th className="p-4 text-right px-6">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-slate-300">
              {submissions.map((sub) => (
                <tr key={sub.id} className="hover:bg-white/3 transition-colors">
                  <td className="p-4 px-6">
                    <div className="font-bold text-white">{sub.studentName}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{sub.date}</div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-slate-200">{sub.course}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{sub.assignment}</div>
                  </td>
                  <td className="p-4">
                    <a href="#" className="text-indigo-400 font-semibold hover:underline flex items-center gap-1">
                      📁 {sub.fileName}
                    </a>
                  </td>
                  <td className="p-4">
                    <span
                      className={`text-[9px] font-bold px-2.5 py-0.5 rounded-full border ${
                        sub.status === "Graded"
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/10"
                          : "bg-amber-500/10 text-amber-400 border-amber-500/10 animate-pulse"
                      }`}
                    >
                      {sub.status}
                    </span>
                  </td>
                  <td className="p-4 font-extrabold text-slate-200">
                    {sub.grade !== null ? `${sub.grade} / 100` : "--"}
                  </td>
                  <td className="p-4 text-right px-6">
                    <button
                      onClick={() => handleOpenGradeModal(sub)}
                      className="bg-white/5 hover:bg-indigo-600 hover:text-white text-slate-300 font-bold py-1.5 px-3 rounded-lg border border-white/5 transition-all text-[10px]"
                    >
                      {sub.status === "Graded" ? "Edit Grade" : "Grade"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Grading Overlay Modal */}
      {selectedSub && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={() => setSelectedSub(null)} />

          {/* Modal content */}
          <div className="relative w-full max-w-md glass-panel rounded-3xl p-6 z-10 shadow-2xl animate-scale-up space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-white">Evaluate Submission</h3>
              <button onClick={() => setSelectedSub(null)} className="text-slate-400 hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-1.5 bg-slate-950/20 p-3.5 rounded-2xl border border-white/5 text-[11px] leading-relaxed">
              <div><span className="font-bold text-slate-400">Student: </span>{selectedSub.studentName}</div>
              <div><span className="font-bold text-slate-400">Assignment: </span>{selectedSub.assignment}</div>
              <div><span className="font-bold text-slate-400">Attached: </span><span className="text-indigo-400 font-semibold">{selectedSub.fileName}</span></div>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Score (out of 100)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  placeholder="e.g. 95"
                  value={gradeInput}
                  onChange={(e) => setGradeInput(e.target.value)}
                  className="w-full bg-slate-950/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-indigo-500 text-slate-200"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Written Feedback</label>
                <textarea
                  rows="4"
                  placeholder="Provide recommendations for core adjustments or styling comments..."
                  value={feedbackInput}
                  onChange={(e) => setFeedbackInput(e.target.value)}
                  className="w-full bg-slate-950/40 border border-white/10 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-indigo-500 text-slate-200 resize-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setSelectedSub(null)}
                className="text-xs font-bold text-slate-300 hover:bg-white/5 px-4 py-2.5 rounded-xl border border-white/5 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveGrade}
                disabled={gradeInput === ""}
                className="bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold text-xs py-2.5 px-5 rounded-xl shadow-md transition-all"
              >
                Submit Score
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
