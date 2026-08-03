"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { coursesData } from "@/data/courses";

// Global database of assignments mapped to course IDs
const ASSIGNMENTS_DB = [
  {
    id: "nextjs15_a1",
    courseId: "nextjs15",
    courseTitle: "Next.js 15 Masterclass: App Router & Server Actions",
    title: "Module 1: Server Actions & Form validation",
    description: "Implement secure server-side form validations using React Server Actions and Zod parsing. Include client-side touched states.",
    dueDate: "Aug 10, 2026"
  },
  {
    id: "nextjs15_a2",
    courseId: "nextjs15",
    courseTitle: "Next.js 15 Masterclass: App Router & Server Actions",
    title: "Module 2: Custom Layout Structure",
    description: "Develop nested desktop and mobile sidebars with sliding navigation indicators and active path bindings.",
    dueDate: "Aug 17, 2026"
  },
  {
    id: "nextjs15_a3",
    courseId: "nextjs15",
    courseTitle: "Next.js 15 Masterclass: App Router & Server Actions",
    title: "Module 3: Server vs Client Components",
    description: "Perform modular separation of static layouts and interactive inputs. Combine hydration checkpoints and composition models.",
    dueDate: "Aug 24, 2026"
  },
  {
    id: "uiuxfigma_a1",
    courseId: "uiuxfigma",
    courseTitle: "UI/UX Design Systems with Figma: Scalable & Modern",
    title: "Module 1: Figma Layout Grids & Wireframes",
    description: "Construct 12-column responsive layout grids and low-fidelity structural components matching web dashboard views.",
    dueDate: "Aug 12, 2026"
  },
  {
    id: "uiuxfigma_a2",
    courseId: "uiuxfigma",
    courseTitle: "UI/UX Design Systems with Figma: Scalable & Modern",
    title: "Module 2: Building reusable button & input variables",
    description: "Create consistent type scales, spacing hierarchies, and color variable overrides in Figma component pages.",
    dueDate: "Aug 19, 2026"
  },
  {
    id: "introai_a1",
    courseId: "introai",
    courseTitle: "Intro to AI: Deep Neural Networks from Scratch",
    title: "Module 1: Linear Algebra Tensors Scratch implementation",
    description: "Code multi-dimensional dot-product products and cross-entropy equations in pure Python without third-party frameworks.",
    dueDate: "Aug 18, 2026"
  },
  {
    id: "reactbasics_a1",
    courseId: "reactbasics",
    courseTitle: "React Fundamental Course: Hooks, State, and Context",
    title: "Module 1 Quiz: Hooks & Context API",
    description: "Implement dynamic state updates, custom hook abstractions, and render optimization cycles within React context containers.",
    dueDate: "Jul 28, 2026"
  }
];

// Initial default submissions to seed localStorage if empty
const DEFAULT_SUBMISSIONS = [
  {
    id: 1,
    studentName: "Ahsan Adeem",
    courseId: "nextjs15",
    course: "Next.js 15 Masterclass: App Router & Server Actions",
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
    course: "React Fundamental Course: Hooks, State, and Context",
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
    course: "Next.js 15 Masterclass: App Router & Server Actions",
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

export default function StudentAssignments() {
  const [enrolledCourseIds, setEnrolledCourseIds] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [toastMessage, setToastMessage] = useState("");
  
  // Submission Form State
  const [commentsText, setCommentsText] = useState("");
  const [attachedFile, setAttachedFile] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStep, setSubmitStep] = useState("");

  useEffect(() => {
    document.title = "Assignments | LMS Studio";
    
    // Seed and sync enrollment course IDs
    const savedCourses = localStorage.getItem("lms_enrolled_courses");
    let enrolledIds = ["nextjs15", "uiuxfigma"];
    if (savedCourses) {
      enrolledIds = JSON.parse(savedCourses);
    } else {
      localStorage.setItem("lms_enrolled_courses", JSON.stringify(enrolledIds));
    }
    setEnrolledCourseIds(enrolledIds);

    // Seed and sync submissions
    const savedSubmissions = localStorage.getItem("lms_submissions");
    let subs = DEFAULT_SUBMISSIONS;
    if (savedSubmissions) {
      subs = JSON.parse(savedSubmissions);
    } else {
      localStorage.setItem("lms_submissions", JSON.stringify(DEFAULT_SUBMISSIONS));
    }
    setSubmissions(subs);
  }, []);

  const getFilteredAssignments = () => {
    // Filter assignments DB to only include enrolled courses
    const studentAssignments = ASSIGNMENTS_DB.filter(asg => 
      enrolledCourseIds.includes(asg.courseId)
    );

    // Map each assignment to include its current submission status for Ahsan Adeem
    const mapped = studentAssignments.map(asg => {
      const submission = submissions.find(sub => 
        sub.studentName === "Ahsan Adeem" && sub.assignmentId === asg.id
      );

      if (submission) {
        return {
          ...asg,
          status: submission.status, // "Pending Review" or "Graded"
          fileName: submission.fileName,
          dateSubmitted: submission.date,
          grade: submission.grade,
          feedback: submission.feedback,
          comments: submission.comments
        };
      } else {
        return {
          ...asg,
          status: "Pending", // Not submitted yet
          fileName: null,
          dateSubmitted: null,
          grade: null,
          feedback: "",
          comments: ""
        };
      }
    });

    // Apply active tab filter
    if (activeTab === "pending") {
      return mapped.filter(a => a.status === "Pending");
    } else if (activeTab === "submitted") {
      return mapped.filter(a => a.status === "Pending Review");
    } else if (activeTab === "graded") {
      return mapped.filter(a => a.status === "Graded");
    }
    return mapped;
  };

  const filteredAsgs = getFilteredAssignments();

  // Statistics Calculation
  const totalAsgsCount = ASSIGNMENTS_DB.filter(asg => enrolledCourseIds.includes(asg.courseId)).length;
  const ahsanSubs = submissions.filter(s => s.studentName === "Ahsan Adeem" && enrolledCourseIds.includes(s.courseId));
  const submittedCount = ahsanSubs.filter(s => s.status === "Pending Review").length;
  const gradedCount = ahsanSubs.filter(s => s.status === "Graded").length;
  const pendingCount = totalAsgsCount - submittedCount - gradedCount;
  
  const gradedSubmissionsWithScores = ahsanSubs.filter(s => s.status === "Graded" && s.grade !== null);
  const averageScore = gradedSubmissionsWithScores.length > 0 
    ? Math.round(gradedSubmissionsWithScores.reduce((acc, curr) => acc + curr.grade, 0) / gradedSubmissionsWithScores.length)
    : null;

  // Handle file drop events
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setAttachedFile(e.dataTransfer.files[0]);
      setFormErrors(prev => ({ ...prev, file: null }));
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAttachedFile(e.target.files[0]);
      setFormErrors(prev => ({ ...prev, file: null }));
    }
  };

  const handleSubmitAssignment = (e) => {
    e.preventDefault();
    const errors = {};
    if (!attachedFile) {
      errors.file = "Please upload or choose a file to submit.";
    }
    if (!commentsText.trim()) {
      errors.comments = "Please provide details or comments for your submission.";
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setSubmitStep("Uploading submission package...");

    // Simulated file upload latency and quality checks (1.5 seconds)
    setTimeout(() => {
      setSubmitStep("Validating codebase & linting...");
      setTimeout(() => {
        setSubmitStep("Registering database entry...");
        setTimeout(() => {
          // Finalize submission
          const newSubmission = {
            id: Date.now(),
            studentName: "Ahsan Adeem",
            courseId: selectedAssignment.courseId,
            course: selectedAssignment.courseTitle,
            assignmentId: selectedAssignment.id,
            assignment: selectedAssignment.title,
            date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
            fileName: attachedFile.name,
            status: "Pending Review",
            grade: null,
            feedback: "",
            comments: commentsText
          };

          const currentSubs = [...submissions, newSubmission];
          setSubmissions(currentSubs);
          localStorage.setItem("lms_submissions", JSON.stringify(currentSubs));

          // Cleanup & Notify
          setIsSubmitting(false);
          setSelectedAssignment(null);
          setCommentsText("");
          setAttachedFile(null);
          setToastMessage(`Successfully submitted "${selectedAssignment.title}"!`);

          // Sync database updates in other windows
          window.dispatchEvent(new Event("lms_submissions_updated"));

          setTimeout(() => {
            setToastMessage("");
          }, 4000);
        }, 400);
      }, 500);
    }, 600);
  };

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
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Assignments Console
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
          Submit curriculum homework, review scoring rubrics, and view verified grading evaluations from your course instructors.
        </p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="glass-panel rounded-2xl p-4 transition-all hover:border-white/12">
          <div className="text-[10px] text-slate-500 font-bold uppercase leading-none">Total Assignments</div>
          <div className="text-xl font-black text-white mt-1.5">{totalAsgsCount}</div>
        </div>
        <div className="glass-panel rounded-2xl p-4 transition-all hover:border-white/12">
          <div className="text-[10px] text-slate-500 font-bold uppercase leading-none text-slate-400">Pending Review</div>
          <div className="text-xl font-black text-yellow-400 mt-1.5">{submittedCount}</div>
        </div>
        <div className="glass-panel rounded-2xl p-4 transition-all hover:border-white/12">
          <div className="text-[10px] text-slate-500 font-bold uppercase leading-none text-slate-400 font-bold">Graded Tasks</div>
          <div className="text-xl font-black text-emerald-400 mt-1.5">{gradedCount}</div>
        </div>
        <div className="glass-panel rounded-2xl p-4 transition-all hover:border-white/12">
          <div className="text-[10px] text-slate-500 font-bold uppercase leading-none">Not Submitted</div>
          <div className="text-xl font-black text-slate-400 mt-1.5">{pendingCount}</div>
        </div>
        <div className="glass-panel rounded-2xl p-4 col-span-2 md:col-span-1 transition-all hover:border-white/12 bg-gradient-to-tr from-indigo-950/10 to-purple-950/10 border-indigo-500/10">
          <div className="text-[10px] text-indigo-400 font-bold uppercase leading-none">Average Grade</div>
          <div className="text-xl font-black text-indigo-300 mt-1.5">
            {averageScore !== null ? `${averageScore}%` : "N/A"}
          </div>
        </div>
      </div>

      {/* Tabs Menu & Filter */}
      <div className="flex border-b border-white/5 gap-6">
        <button
          onClick={() => setActiveTab("all")}
          className={`pb-3 text-sm font-bold tracking-wide relative transition-colors select-none ${
            activeTab === "all" ? "text-white" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          All ({totalAsgsCount})
          {activeTab === "all" && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 rounded-full animate-fade-in" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("pending")}
          className={`pb-3 text-sm font-bold tracking-wide relative transition-colors select-none ${
            activeTab === "pending" ? "text-white" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          To Do ({pendingCount})
          {activeTab === "pending" && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 rounded-full animate-fade-in" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("submitted")}
          className={`pb-3 text-sm font-bold tracking-wide relative transition-colors select-none ${
            activeTab === "submitted" ? "text-white" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          Pending Review ({submittedCount})
          {activeTab === "submitted" && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 rounded-full animate-fade-in" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("graded")}
          className={`pb-3 text-sm font-bold tracking-wide relative transition-colors select-none ${
            activeTab === "graded" ? "text-white" : "text-slate-400 hover:text-slate-200"
          }`}
        >
          Graded ({gradedCount})
          {activeTab === "graded" && (
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 rounded-full animate-fade-in" />
          )}
        </button>
      </div>

      {/* Assignment Cards List */}
      <div className="space-y-4">
        {filteredAsgs.length > 0 ? (
          filteredAsgs.map((asg) => (
            <div
              key={asg.id}
              className="glass-panel rounded-2xl p-5 sm:p-6 hover:border-white/15 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6 group"
            >
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-white/5 border border-white/10 text-slate-300">
                    {asg.courseTitle.split(":")[0]}
                  </span>
                  
                  {asg.status === "Pending" && (
                    <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-500/10 border border-slate-500/20 text-slate-400">
                      Not Submitted
                    </span>
                  )}
                  {asg.status === "Pending Review" && (
                    <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-yellow-500/10 border border-yellow-500/25 text-yellow-400">
                      Pending Review
                    </span>
                  )}
                  {asg.status === "Graded" && (
                    <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/25 text-emerald-400">
                      Graded
                    </span>
                  )}
                </div>

                <div>
                  <h3 className="text-base font-bold text-slate-100 group-hover:text-indigo-400 transition-colors leading-snug">
                    {asg.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
                    {asg.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-4 pt-1 text-[10px] text-slate-500 font-semibold">
                  <div>
                    <span className="text-slate-400">Due Date: </span>
                    <span className="text-slate-300">{asg.dueDate}</span>
                  </div>
                  {asg.dateSubmitted && (
                    <div>
                      <span className="text-slate-400">Submitted: </span>
                      <span className="text-slate-300">{asg.dateSubmitted}</span>
                    </div>
                  )}
                  {asg.fileName && (
                    <div>
                      <span className="text-slate-400">Attached File: </span>
                      <span className="text-indigo-400 font-mono hover:underline">{asg.fileName}</span>
                    </div>
                  )}
                </div>

                {/* Graded Details Section */}
                {asg.status === "Graded" && (
                  <div className="mt-3 p-3.5 rounded-xl bg-white/3 border border-white/5 space-y-1.5">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-300">
                      <span className="flex items-center gap-1.5 text-emerald-400">
                        🏆 Score Awarded: {asg.grade}%
                      </span>
                      <span className="text-[10px] text-slate-500">Evaluated by Instructor</span>
                    </div>
                    {asg.feedback && (
                      <p className="text-[11px] text-slate-400 italic">
                        &ldquo;{asg.feedback}&rdquo;
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Action Button */}
              <div className="flex items-center shrink-0">
                {asg.status === "Pending" && (
                  <button
                    onClick={() => {
                      setSelectedAssignment(asg);
                      setFormErrors({});
                    }}
                    className="w-full md:w-auto flex items-center justify-center gap-1.5 text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 px-5 rounded-xl shadow-md shadow-indigo-500/10 hover:shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    Submit Assignment
                  </button>
                )}
                {asg.status === "Pending Review" && (
                  <span className="w-full md:w-auto text-center text-xs font-bold text-slate-500 border border-white/5 py-2 px-4 rounded-xl bg-white/2 cursor-default">
                    Waiting for Grade
                  </span>
                )}
                {asg.status === "Graded" && (
                  <div className="w-full md:w-auto text-center flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-400 border border-emerald-500/15 py-2 px-4 rounded-xl bg-emerald-500/5">
                    Completed ✓
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="glass-panel rounded-2xl p-12 text-center text-slate-400 text-xs">
            No assignments match the selected filter.
          </div>
        )}
      </div>

      {/* Interactive Glassmorphic Submission Modal Overlay */}
      {selectedAssignment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in">
          {/* Close Backdrop Click */}
          {!isSubmitting && <div className="absolute inset-0" onClick={() => setSelectedAssignment(null)} />}

          <div className="relative w-full max-w-xl glass-panel rounded-3xl p-6 sm:p-8 shadow-2xl z-10 border-indigo-500/20 bg-slate-900/90 space-y-6 animate-scale-up">
            
            {/* Loading Cover Spinner Overlay during submission */}
            {isSubmitting && (
              <div className="absolute inset-0 bg-slate-950/85 backdrop-blur-sm flex flex-col items-center justify-center gap-4 text-center p-8 rounded-3xl z-30 animate-fade-in">
                <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white">Submitting Homework...</h4>
                  <p className="text-slate-400 text-[10px] font-mono tracking-wide animate-pulse">
                    {submitStep}
                  </p>
                </div>
              </div>
            )}

            {/* Header */}
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[9px] font-bold tracking-wider text-indigo-400 uppercase">
                  {selectedAssignment.courseTitle}
                </span>
                <h2 className="text-lg font-black text-white mt-1 leading-snug">
                  Submit: {selectedAssignment.title}
                </h2>
              </div>
              
              {!isSubmitting && (
                <button
                  onClick={() => setSelectedAssignment(null)}
                  className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Assignment description recap */}
            <div className="p-3 bg-white/2 border border-white/5 rounded-xl text-[11px] text-slate-400 leading-relaxed">
              <span className="font-bold text-slate-300">Deliverable Instructions: </span>
              {selectedAssignment.description}
            </div>

            {/* Submission Form */}
            <form onSubmit={handleSubmitAssignment} className="space-y-4">
              
              {/* File Attachment Drag Zone */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase text-slate-400">Attach Code or File Package</label>
                
                <div
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  className={`border-2 border-dashed rounded-xl p-6 text-center transition-all relative ${
                    dragActive 
                      ? "border-indigo-500 bg-indigo-500/5" 
                      : attachedFile 
                        ? "border-emerald-500/40 bg-emerald-500/2" 
                        : "border-white/10 hover:border-white/20 bg-white/1"
                  }`}
                >
                  <input
                    type="file"
                    id="assignment-file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleFileChange}
                    disabled={isSubmitting}
                  />

                  {attachedFile ? (
                    <div className="space-y-1">
                      <div className="text-xl">📄</div>
                      <div className="text-xs font-bold text-emerald-400 font-mono truncate max-w-sm mx-auto">
                        {attachedFile.name}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        ({Math.round(attachedFile.size / 1024)} KB) - Click or drag to replace
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      <div className="text-xl text-slate-500">📤</div>
                      <div className="text-xs font-semibold text-slate-300">
                        Drag and drop your submission file here
                      </div>
                      <div className="text-[10px] text-slate-500">
                        or click to browse local folders (ZIP, PDF, JS, Py)
                      </div>
                    </div>
                  )}
                </div>
                {formErrors.file && (
                  <p className="text-[10px] font-semibold text-red-400 mt-1 flex items-center gap-1">
                    ⚠️ {formErrors.file}
                  </p>
                )}
              </div>

              {/* Submission comments text area */}
              <div className="space-y-1.5">
                <label htmlFor="submission-comments" className="text-[10px] font-bold uppercase text-slate-400">
                  Submission Notes &amp; Comments
                </label>
                <textarea
                  id="submission-comments"
                  rows="3.5"
                  placeholder="Describe your implementation approach, frameworks utilized, or specific layout tokens designed..."
                  value={commentsText}
                  onChange={(e) => {
                    setCommentsText(e.target.value);
                    if (e.target.value.trim()) {
                      setFormErrors(prev => ({ ...prev, comments: null }));
                    }
                  }}
                  disabled={isSubmitting}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-xs focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all text-slate-200 placeholder:text-slate-500 leading-relaxed"
                />
                {formErrors.comments && (
                  <p className="text-[10px] font-semibold text-red-400 mt-1 flex items-center gap-1">
                    ⚠️ {formErrors.comments}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedAssignment(null)}
                  disabled={isSubmitting}
                  className="px-4 py-2 text-xs font-bold border border-white/10 rounded-xl hover:bg-white/5 transition-all text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center gap-1.5"
                >
                  Submit Deliverable
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
}
