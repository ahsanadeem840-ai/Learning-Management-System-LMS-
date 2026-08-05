"use client";

import { useState, useEffect, useRef } from "react";

export default function QuizPlayer({ quiz, onClose, onComplete }) {
  const [quizState, setQuizState] = useState("start"); // "start" | "active" | "results"
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { [questionId]: answer }
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimit);
  const [timeSpent, setTimeSpent] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [shuffledSequence, setShuffledSequence] = useState({}); // { [questionId]: items_array }
  
  const timerRef = useRef(null);

  const questions = quiz.questions;
  const currentQuestion = questions[currentIdx];

  // Initialize sequence questions with a shuffled order
  useEffect(() => {
    const sequences = {};
    questions.forEach((q) => {
      if (q.type === "sequence") {
        // Create an array of objects tracking original index and text
        const items = q.items.map((text, index) => ({ originalIndex: index, text }));
        // Deterministic shuffle or simple sort shuffle
        const shuffled = [...items].sort(() => 0.5 - Math.random());
        sequences[q.id] = shuffled;
        
        // Initialize user answer with the shuffled originalIndices
        setUserAnswers((prev) => ({
          ...prev,
          [q.id]: shuffled.map(item => item.originalIndex)
        }));
      }
    });
    setShuffledSequence(sequences);
  }, [questions]);

  // Timer Effect
  useEffect(() => {
    if (isTimerRunning && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
        setTimeSpent((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning, timeLeft]);

  // Keyboard Shortcuts for single choice questions
  useEffect(() => {
    if (quizState !== "active" || !currentQuestion || currentQuestion.type !== "single") return;

    const handleKeyDown = (e) => {
      const num = parseInt(e.key);
      if (num >= 1 && num <= currentQuestion.options.length) {
        handleSelectSingle(num - 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [quizState, currentIdx, currentQuestion]);

  const handleStartQuiz = () => {
    setQuizState("active");
    setIsTimerRunning(true);
  };

  const handleAutoSubmit = () => {
    setIsTimerRunning(false);
    setQuizState("results");
  };

  const handleSelectSingle = (optionIndex) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIndex
    }));
  };

  const handleSelectMultiple = (optionIndex) => {
    const currentSelection = userAnswers[currentQuestion.id] || [];
    let updated;
    if (currentSelection.includes(optionIndex)) {
      updated = currentSelection.filter((i) => i !== optionIndex);
    } else {
      updated = [...currentSelection, optionIndex];
    }
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: updated
    }));
  };

  const handleTextChange = (text) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: text
    }));
  };

  // Reordering controls for Sequence questions
  const moveSequenceItem = (questionId, fromIndex, direction) => {
    const items = [...shuffledSequence[questionId]];
    const toIndex = direction === "up" ? fromIndex - 1 : fromIndex + 1;

    if (toIndex < 0 || toIndex >= items.length) return;

    // Swap items
    const temp = items[fromIndex];
    items[fromIndex] = items[toIndex];
    items[toIndex] = temp;

    setShuffledSequence((prev) => ({
      ...prev,
      [questionId]: items
    }));

    // Update answer
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: items.map(item => item.originalIndex)
    }));
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      // Last question - Finish Quiz!
      setIsTimerRunning(false);
      setQuizState("results");
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx((prev) => prev - 1);
    }
  };

  // Calculate results
  const checkAnswer = (q, answer) => {
    if (answer === undefined || answer === null) return false;

    if (q.type === "single") {
      return answer === q.answer;
    }
    if (q.type === "multiple") {
      if (!Array.isArray(answer)) return false;
      if (answer.length !== q.answer.length) return false;
      return answer.every((val) => q.answer.includes(val)) && q.answer.every((val) => answer.includes(val));
    }
    if (q.type === "text") {
      const normInput = String(answer).trim().toLowerCase();
      return (
        normInput === q.answer.toLowerCase() ||
        (q.acceptedAnswers && q.acceptedAnswers.map(a => a.toLowerCase().trim()).includes(normInput))
      );
    }
    if (q.type === "sequence") {
      if (!Array.isArray(answer)) return false;
      return answer.every((val, index) => val === q.correctSequence[index]);
    }
    return false;
  };

  const scoreStats = (() => {
    let correct = 0;
    questions.forEach((q) => {
      if (checkAnswer(q, userAnswers[q.id])) {
        correct++;
      }
    });

    const percent = Math.round((correct / questions.length) * 100);
    const passed = percent >= quiz.passingScore;

    return {
      correct,
      total: questions.length,
      percent,
      passed
    };
  })();

  const handleFinishAndSave = () => {
    if (onComplete) {
      onComplete(scoreStats.percent, scoreStats.passed);
    }
  };

  const handleResetQuiz = () => {
    // Reset states
    setQuizState("start");
    setCurrentIdx(0);
    setUserAnswers({});
    setTimeLeft(quiz.timeLimit);
    setTimeSpent(0);
    setIsTimerRunning(false);
    
    // Re-shuffle sequence questions
    const sequences = {};
    questions.forEach((q) => {
      if (q.type === "sequence") {
        const items = q.items.map((text, index) => ({ originalIndex: index, text }));
        const shuffled = [...items].sort(() => 0.5 - Math.random());
        sequences[q.id] = shuffled;
        setUserAnswers((prev) => ({
          ...prev,
          [q.id]: shuffled.map(item => item.originalIndex)
        }));
      }
    });
    setShuffledSequence(sequences);
  };

  // Emojis for confetti / success animations
  const renderConfetti = () => {
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-20">
        {[...Array(24)].map((_, i) => {
          const left = Math.random() * 100;
          const delay = Math.random() * 3;
          const duration = 2.5 + Math.random() * 2;
          const size = 12 + Math.random() * 16;
          const emojis = ["🎉", "✨", "🏆", "🌟", "🔥", "🎓", "⭐"];
          const emoji = emojis[Math.floor(Math.random() * emojis.length)];
          return (
            <span
              key={i}
              className="absolute text-center animate-confetti-fall"
              style={{
                left: `${left}%`,
                top: `-5%`,
                fontSize: `${size}px`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`,
                animationIterationCount: "infinite"
              }}
            >
              {emoji}
            </span>
          );
        })}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-3xl bg-slate-900/90 border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative flex flex-col max-h-[90vh]">
        
        {/* Confetti overlay for pass state */}
        {quizState === "results" && scoreStats.passed && renderConfetti()}

        {/* START SCREEN */}
        {quizState === "start" && (
          <div className="p-8 sm:p-12 text-center space-y-6 flex-1 overflow-y-auto scrollbar-thin">
            <div className="w-16 h-16 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center text-3xl mx-auto shadow-md">
              📝
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-indigo-500/25 border border-indigo-500/10 text-indigo-400">
                Assessment Module
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-white">{quiz.title}</h2>
              <p className="text-slate-400 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
                {quiz.description}
              </p>
            </div>

            {/* Assessment specs table */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl mx-auto pt-4">
              <div className="p-3 bg-white/3 border border-white/5 rounded-2xl">
                <div className="text-[9px] text-slate-500 font-bold uppercase">Questions</div>
                <div className="text-sm font-black text-white mt-1">{questions.length}</div>
              </div>
              <div className="p-3 bg-white/3 border border-white/5 rounded-2xl">
                <div className="text-[9px] text-slate-500 font-bold uppercase">Time Limit</div>
                <div className="text-sm font-black text-white mt-1">{formatTime(quiz.timeLimit)}</div>
              </div>
              <div className="p-3 bg-white/3 border border-white/5 rounded-2xl">
                <div className="text-[9px] text-slate-500 font-bold uppercase">Passing Grade</div>
                <div className="text-sm font-black text-emerald-400 mt-1">{quiz.passingScore}%</div>
              </div>
              <div className="p-3 bg-white/3 border border-white/5 rounded-2xl">
                <div className="text-[9px] text-slate-500 font-bold uppercase">Attempts</div>
                <div className="text-sm font-black text-white mt-1">Unlimited</div>
              </div>
            </div>

            {/* Instruction box */}
            <div className="p-4 bg-yellow-500/5 border border-yellow-500/10 rounded-2xl text-left text-xs max-w-xl mx-auto space-y-2 leading-relaxed text-slate-400">
              <div className="font-bold text-yellow-400 flex items-center gap-1.5">
                <span>⚠️ Important Instructions:</span>
              </div>
              <ul className="list-disc pl-4 space-y-1 text-[11px]">
                <li>This quiz is timed. The clock will start ticking the moment you press start.</li>
                <li>Closing or reloading the window will lose your current active progress.</li>
                <li>You need at least <strong>{quiz.passingScore}%</strong> to pass and mark this lesson as completed.</li>
              </ul>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-xs font-bold text-slate-300 transition-all"
              >
                Back to Syllabus
              </button>
              <button
                onClick={handleStartQuiz}
                className="w-full sm:w-auto px-8 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg shadow-indigo-500/15 hover:shadow-indigo-500/25 hover:scale-[1.01] transition-all"
              >
                Start Assessment
              </button>
            </div>
          </div>
        )}

        {/* ACTIVE QUIZ SCREEN */}
        {quizState === "active" && (
          <>
            {/* Header HUD */}
            <div className="p-5 border-b border-white/5 bg-slate-950/20 flex justify-between items-center gap-4 shrink-0">
              <div>
                <span className="text-[9px] text-indigo-400 font-extrabold uppercase tracking-wide">
                  {quiz.title}
                </span>
                <div className="text-xs text-slate-400 font-semibold mt-0.5">
                  Question <strong className="text-white">{currentIdx + 1}</strong> of {questions.length}
                </div>
              </div>

              {/* Timer HUD */}
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold ${
                timeLeft < 60 
                  ? "bg-red-500/10 border-red-500/20 text-red-400 animate-pulse" 
                  : "bg-white/5 border-white/5 text-slate-200"
              }`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {formatTime(timeLeft)}
              </div>
            </div>

            {/* Progress Bar indicator */}
            <div className="w-full h-1 bg-white/5 shrink-0">
              <div
                className="h-full bg-indigo-500 transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
              />
            </div>

            {/* Question Workspace */}
            <div className="p-6 sm:p-8 flex-1 overflow-y-auto scrollbar-thin space-y-6">
              {/* Question Text */}
              <div className="space-y-1.5">
                <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider">
                  Type: {currentQuestion.type === "single" ? "Single Choice" : currentQuestion.type === "multiple" ? "Multiple Choice (Select all)" : currentQuestion.type === "text" ? "Code Input / Fill in" : "Sequencing / Reordering"}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white leading-relaxed">
                  {currentQuestion.question}
                </h3>
              </div>

              {/* Dynamic Question Renders */}
              {/* SINGLE CHOICE */}
              {currentQuestion.type === "single" && (
                <div className="grid grid-cols-1 gap-3">
                  {currentQuestion.options.map((option, oIdx) => {
                    const isSelected = userAnswers[currentQuestion.id] === oIdx;
                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleSelectSingle(oIdx)}
                        className={`w-full p-4 rounded-2xl border text-left text-xs transition-all relative flex items-center gap-4 ${
                          isSelected
                            ? "bg-indigo-600/10 border-indigo-500 text-indigo-200 shadow-md shadow-indigo-500/5"
                            : "bg-white/3 border-white/5 text-slate-350 hover:bg-white/5 hover:border-white/10"
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                          isSelected ? "border-indigo-400 bg-indigo-500" : "border-white/15"
                        }`}>
                          {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                        </div>
                        <span className="font-medium flex-1">{option}</span>
                        <span className="text-[10px] text-slate-600 font-mono hidden sm:block">Key [{oIdx + 1}]</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* MULTIPLE CHOICE */}
              {currentQuestion.type === "multiple" && (
                <div className="grid grid-cols-1 gap-3">
                  {currentQuestion.options.map((option, oIdx) => {
                    const selectedList = userAnswers[currentQuestion.id] || [];
                    const isSelected = selectedList.includes(oIdx);
                    return (
                      <button
                        key={oIdx}
                        onClick={() => handleSelectMultiple(oIdx)}
                        className={`w-full p-4 rounded-2xl border text-left text-xs transition-all relative flex items-center gap-4 ${
                          isSelected
                            ? "bg-indigo-600/10 border-indigo-500 text-indigo-200 shadow-md"
                            : "bg-white/3 border-white/5 text-slate-350 hover:bg-white/5 hover:border-white/10"
                        }`}
                      >
                        <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                          isSelected ? "border-indigo-400 bg-indigo-500 text-white" : "border-white/15"
                        }`}>
                          {isSelected && (
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className="font-medium flex-1">{option}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* TEXT/CODE INPUT */}
              {currentQuestion.type === "text" && (
                <div className="space-y-4">
                  <div className="bg-slate-950/60 border border-white/5 rounded-2xl p-4.5 font-mono text-[11px] text-slate-400 select-none">
                    <span className="text-slate-500">// Fill in the missing identifier convention below:</span>
                    <div className="mt-2 text-slate-300">
                      <span className="text-indigo-400">import</span> segment <span className="text-indigo-400">from</span> <span className="text-emerald-400">&quot;./route&quot;</span>;
                      <br />
                      <span className="text-slate-500">// Segment custom convention definition...</span>
                      <br />
                      File: <span className="bg-white/10 px-2 py-0.5 rounded text-white font-bold inline-block border border-white/5 ml-1">{userAnswers[currentQuestion.id] || "_________"}</span>
                    </div>
                  </div>

                  <input
                    type="text"
                    placeholder="Type your answer here (e.g. layout.js)..."
                    value={userAnswers[currentQuestion.id] || ""}
                    onChange={(e) => handleTextChange(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-xs focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all text-slate-200 placeholder:text-slate-500 font-mono"
                    autoFocus
                  />
                </div>
              )}

              {/* SEQUENCING/SORTING */}
              {currentQuestion.type === "sequence" && shuffledSequence[currentQuestion.id] && (
                <div className="space-y-3">
                  <p className="text-[10px] text-slate-500 italic mb-2">Use the up and down arrow buttons on each card to arrange the items in the correct execution order.</p>
                  
                  {shuffledSequence[currentQuestion.id].map((item, index) => (
                    <div
                      key={item.originalIndex}
                      className="p-4 bg-white/3 border border-white/5 rounded-2xl flex items-center justify-between gap-4 transition-all hover:bg-white/5"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-300 flex items-center justify-center font-bold text-xs">
                          {index + 1}
                        </div>
                        <span className="text-xs text-slate-200 leading-snug">{item.text}</span>
                      </div>

                      {/* Control buttons */}
                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          type="button"
                          onClick={() => moveSequenceItem(currentQuestion.id, index, "up")}
                          disabled={index === 0}
                          className={`w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-all disabled:opacity-30 disabled:pointer-events-none`}
                        >
                          ▲
                        </button>
                        <button
                          type="button"
                          onClick={() => moveSequenceItem(currentQuestion.id, index, "down")}
                          disabled={index === shuffledSequence[currentQuestion.id].length - 1}
                          className={`w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/5 transition-all disabled:opacity-30 disabled:pointer-events-none`}
                        >
                          ▼
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation Footer */}
            <div className="p-5 border-t border-white/5 bg-slate-950/20 flex justify-between items-center gap-4 shrink-0">
              <button
                onClick={handlePrev}
                disabled={currentIdx === 0}
                className="px-4 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-xs font-bold text-slate-350 disabled:opacity-30 disabled:pointer-events-none transition-all"
              >
                Previous
              </button>

              <button
                onClick={handleNext}
                disabled={
                  userAnswers[currentQuestion.id] === undefined ||
                  (currentQuestion.type === "multiple" && userAnswers[currentQuestion.id].length === 0) ||
                  (currentQuestion.type === "text" && !userAnswers[currentQuestion.id].trim())
                }
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:opacity-50 disabled:pointer-events-none text-white text-xs font-bold shadow-md shadow-indigo-500/10 transition-all flex items-center gap-1"
              >
                {currentIdx === questions.length - 1 ? "Submit Assessment" : "Next Question"}
              </button>
            </div>
          </>
        )}

        {/* RESULTS DASHBOARD SCREEN */}
        {quizState === "results" && (
          <div className="p-6 sm:p-8 flex-1 overflow-y-auto scrollbar-thin space-y-8">
            
            {/* Summary Banner */}
            <div className="text-center space-y-4 pt-4 relative">
              <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center border-4 relative z-10 animate-scale-up">
                {scoreStats.passed ? (
                  // Passed Ring
                  <div className="absolute inset-0 rounded-full border-4 border-emerald-500/20 shadow-lg shadow-emerald-500/20 animate-ping" />
                ) : (
                  // Failed Ring
                  <div className="absolute inset-0 rounded-full border-4 border-red-500/20 shadow-lg shadow-red-500/20" />
                )}
                
                <div className={`w-full h-full rounded-full flex items-center justify-center text-3xl ${
                  scoreStats.passed 
                    ? "bg-emerald-950/80 border-emerald-500 text-emerald-400" 
                    : "bg-red-950/80 border-red-500 text-red-400"
                }`}>
                  {scoreStats.passed ? "🏆" : "❌"}
                </div>
              </div>

              <div className="space-y-1">
                <span className={`text-[9px] font-extrabold uppercase px-2.5 py-0.5 rounded-full border ${
                  scoreStats.passed 
                    ? "bg-emerald-500/10 border-emerald-500/25 text-emerald-400" 
                    : "bg-red-500/10 border-red-500/25 text-red-450"
                }`}>
                  {scoreStats.passed ? "Assessment Passed" : "Assessment Failed"}
                </span>
                <h2 className="text-lg sm:text-xl font-black text-white">{quiz.title}</h2>
                <p className="text-slate-400 text-xs max-w-md mx-auto leading-relaxed">
                  {scoreStats.passed 
                    ? "Excellent work! You have successfully certified your knowledge in this curriculum module."
                    : "You didn't reach the passing threshold of this module. Review the course materials and try again."
                  }
                </p>
              </div>
            </div>

            {/* Performance Stats Widgets */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl mx-auto">
              <div className="p-4 bg-white/3 border border-white/5 rounded-2xl text-center">
                <div className="text-[9px] text-slate-500 font-bold uppercase">Accuracy Score</div>
                <div className={`text-xl font-black mt-1 ${scoreStats.passed ? "text-emerald-400" : "text-red-400"}`}>
                  {scoreStats.percent}%
                </div>
              </div>
              <div className="p-4 bg-white/3 border border-white/5 rounded-2xl text-center">
                <div className="text-[9px] text-slate-500 font-bold uppercase">Passing Grade</div>
                <div className="text-xl font-black text-slate-350 mt-1">{quiz.passingScore}%</div>
              </div>
              <div className="p-4 bg-white/3 border border-white/5 rounded-2xl text-center">
                <div className="text-[9px] text-slate-500 font-bold uppercase">Correct Answers</div>
                <div className="text-xl font-black text-white mt-1">
                  {scoreStats.correct} / {scoreStats.total}
                </div>
              </div>
              <div className="p-4 bg-white/3 border border-white/5 rounded-2xl text-center">
                <div className="text-[9px] text-slate-500 font-bold uppercase">Time Elapsed</div>
                <div className="text-xl font-black text-white mt-1">{formatTime(timeSpent)}</div>
              </div>
            </div>

            {/* Detailed Question Review List */}
            <div className="space-y-4 pt-4 border-t border-white/5">
              <h3 className="text-sm font-bold text-slate-200">Question-by-Question Review</h3>
              
              <div className="space-y-4">
                {questions.map((q, idx) => {
                  const uAns = userAnswers[q.id];
                  const isCorrect = checkAnswer(q, uAns);
                  return (
                    <div
                      key={q.id}
                      className={`p-5 rounded-2xl border text-xs leading-relaxed space-y-3.5 ${
                        isCorrect 
                          ? "bg-emerald-500/2 border-emerald-500/10" 
                          : "bg-red-500/2 border-red-500/10"
                      }`}
                    >
                      {/* Q Header */}
                      <div className="flex justify-between items-start gap-4">
                        <div className="space-y-0.5">
                          <span className="text-[9px] font-extrabold text-slate-500 uppercase tracking-wider">Question {idx + 1}</span>
                          <h4 className="font-bold text-slate-200">{q.question}</h4>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded shrink-0 uppercase tracking-wide ${
                          isCorrect 
                            ? "bg-emerald-500/15 text-emerald-400" 
                            : "bg-red-500/15 text-red-400"
                        }`}>
                          {isCorrect ? "Correct ✓" : "Incorrect ❌"}
                        </span>
                      </div>

                      {/* Display what user answered vs correct */}
                      <div className="p-3 bg-slate-950/45 border border-white/5 rounded-xl space-y-1.5 font-mono text-[10px]">
                        <div>
                          <span className="text-slate-500">Your Answer: </span>
                          <span className={isCorrect ? "text-emerald-400" : "text-red-400"}>
                            {q.type === "single" && q.options[uAns] !== undefined && q.options[uAns]}
                            {q.type === "multiple" && Array.isArray(uAns) && uAns.map((i) => q.options[i]).join(", ")}
                            {q.type === "text" && (uAns || "(No response)")}
                            {q.type === "sequence" && Array.isArray(uAns) && uAns.map((i) => q.items[i]).join(" → ")}
                            {uAns === undefined && "(No response)"}
                          </span>
                        </div>
                        
                        {!isCorrect && (
                          <div>
                            <span className="text-slate-500">Correct Answer: </span>
                            <span className="text-emerald-400">
                              {q.type === "single" && q.options[q.answer]}
                              {q.type === "multiple" && q.answer.map((i) => q.options[i]).join(", ")}
                              {q.type === "text" && q.answer}
                              {q.type === "sequence" && q.correctSequence.map((i) => q.items[i]).join(" → ")}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Explanation box */}
                      <div className="p-3.5 rounded-xl bg-white/2 border border-white/5 text-[11px] text-slate-400 italic">
                        <strong className="text-slate-300 font-bold block mb-1 font-sans not-italic">Explanation:</strong>
                        {q.explanation}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Results Action Footer */}
            <div className="pt-6 flex flex-col sm:flex-row items-center justify-end gap-3.5 border-t border-white/5">
              {!scoreStats.passed && (
                <button
                  onClick={handleResetQuiz}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-white/10 hover:bg-white/5 text-xs font-bold text-slate-300 transition-all"
                >
                  🔄 Retake Assessment
                </button>
              )}
              
              <button
                onClick={handleFinishAndSave}
                className="w-full sm:w-auto px-7 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-md shadow-indigo-500/10 hover:scale-[1.01] transition-all"
              >
                {scoreStats.passed ? "Save Grade & Continue" : "Exit Assessment"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
