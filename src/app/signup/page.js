"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

function SignupForm() {
  const router = useRouter();

  // Set document title dynamically
  useEffect(() => {
    document.title = "Create Your Account | LMS Studio";
  }, []);

  // Form fields
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student", // 'student' or 'instructor'
  });

  // Touched state to trigger validation warnings only after interaction
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  // Show/Hide password states
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Loading & success simulation state
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form validation checks
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const isEmailValid = emailRegex.test(formData.email);
  const isPasswordValid = formData.password.length >= 6;
  const isNameValid = formData.name.trim().length >= 2;
  const isConfirmPasswordValid = formData.confirmPassword === formData.password && formData.confirmPassword.length > 0;

  // Password Strength Logic
  const getPasswordStrength = (pass) => {
    if (!pass) return { score: 0, label: "None", color: "bg-slate-800", textColor: "text-slate-500" };
    
    let score = 0;
    if (pass.length >= 6) score += 1;
    if (pass.length >= 8) score += 1;
    if (/[0-9]/.test(pass)) score += 1;
    if (/[A-Z]/.test(pass)) score += 1;
    if (/[^A-Za-z0-9]/.test(pass)) score += 1;

    if (score <= 2) {
      return { score: 33, label: "Weak", color: "bg-red-500", textColor: "text-red-400" };
    } else if (score <= 4) {
      return { score: 66, label: "Medium", color: "bg-amber-500", textColor: "text-amber-400" };
    } else {
      return { score: 100, label: "Strong", color: "bg-emerald-500", textColor: "text-emerald-400" };
    }
  };

  const pwdStrength = getPasswordStrength(formData.password);

  // Derive error messages
  const errors = {
    name: touched.name && !isNameValid ? "Name must be at least 2 characters" : "",
    email: touched.email && !isEmailValid ? "Please enter a valid email address" : "",
    password: touched.password && !isPasswordValid ? "Password must be at least 6 characters" : "",
    confirmPassword: touched.confirmPassword && !isConfirmPasswordValid ? "Passwords do not match" : "",
  };

  // Determine if form is submittable
  const isFormValid = isNameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Mark all as touched to trigger any validation warnings
    setTouched({ name: true, email: true, password: true, confirmPassword: true });

    if (!isFormValid) return;

    setIsLoading(true);
    
    // Simulate API registration delay
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);

      // Simulate redirection to Dashboard after 2.5 seconds
      setTimeout(() => {
        if (formData.role === "instructor") {
          router.push("/instructor/dashboard");
        } else {
          router.push("/student/dashboard");
        }
      }, 2500);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex flex-col justify-center items-center px-4 relative overflow-hidden font-sans">
      {/* Premium Gradient Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[450px] h-[450px] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-fuchsia-500/10 blur-[130px] pointer-events-none" />
      <div className="absolute top-[35%] right-[15%] w-[350px] h-[350px] rounded-full bg-purple-500/5 blur-[100px] pointer-events-none" />

      {/* Header Logo */}
      <div className="absolute top-8 left-8">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            L
          </div>
          <span className="text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300">
            LMS Studio
          </span>
        </Link>
      </div>

      {/* Auth Card Container */}
      <div className="w-full max-w-[480px] glass-panel rounded-2xl p-8 relative z-10 transition-all duration-300 hover:border-white/12 shadow-indigo-500/5">
        
        {isSuccess ? (
          /* Authentication Success State */
          <div className="text-center py-8 space-y-6 animate-fade-in">
            <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto text-emerald-400">
              <svg className="w-8 h-8 animate-bounce" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white tracking-tight">
                Account Created Successfully!
              </h2>
              <p className="text-slate-400 text-sm mt-2">
                Welcome to LMS Studio, <span className="text-indigo-400 font-semibold">{formData.name}</span>.
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex justify-center items-center gap-2 text-indigo-400 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                Redirecting to your {formData.role === "instructor" ? "Instructor Studio" : "Student Dashboard"}
              </div>
              <div className="text-[11px] text-slate-500">
                (Click direct links below to bypass simulated redirect)
              </div>
              <div className="flex flex-wrap gap-2 justify-center pt-2">
                <Link href="/student/dashboard" className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3.5 py-2 rounded-lg border border-white/5 transition-all font-semibold">
                  Student Dashboard
                </Link>
                <Link href="/instructor/dashboard" className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3.5 py-2 rounded-lg border border-white/5 transition-all font-semibold">
                  Instructor Studio
                </Link>
              </div>
            </div>
          </div>
        ) : (
          /* Core Registration Form */
          <>
            <div className="text-center mb-8">
              <h1 className="text-2xl font-black text-white tracking-tight font-outfit">
                Create your account
              </h1>
              <p className="text-slate-400 text-xs mt-1.5">
                Join our premium community of learners and experts.
              </p>
            </div>

            {/* Custom Sliding Tab Selector */}
            <div className="flex bg-slate-900/60 p-1.5 rounded-xl border border-white/5 relative mb-6">
              <Link
                href="/login"
                className="flex-1 text-center py-2 text-xs font-bold rounded-lg transition-all duration-300 z-10 text-slate-400 hover:text-slate-200"
                id="tab-signin"
              >
                Sign In
              </Link>
              <button
                type="button"
                className="flex-1 text-center py-2 text-xs font-bold rounded-lg transition-all duration-300 z-10 text-white cursor-default"
                id="tab-signup"
              >
                Register
              </button>
              
              {/* Sliding Background Pill (Locked to Register tab) */}
              <div className="absolute top-1.5 bottom-1.5 left-1.5 w-[calc(50%-6px)] bg-indigo-600 rounded-lg shadow-md transition-all duration-300 ease-out pointer-events-none translate-x-full" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              
              {/* Full Name Field */}
              <div className="space-y-1.5">
                <label htmlFor="name-input" className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    id="name-input"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={() => handleBlur("name")}
                    placeholder="Jane Doe"
                    className={`w-full bg-slate-950/40 border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 transition-all ${
                      errors.name
                        ? "border-red-500/50 focus:border-red-500/60 focus:ring-red-500/20"
                        : touched.name && isNameValid
                        ? "border-emerald-500/50 focus:border-emerald-500/60 focus:ring-emerald-500/20"
                        : "border-white/10 focus:border-indigo-500/50 focus:ring-indigo-500/20"
                    }`}
                  />
                  {touched.name && (
                    <span className="absolute right-3.5 top-3 flex items-center">
                      {isNameValid ? (
                        <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      )}
                    </span>
                  )}
                </div>
                {errors.name && (
                  <p className="text-[11px] text-red-400 pl-1 font-medium">{errors.name}</p>
                )}
              </div>

              {/* Email Field */}
              <div className="space-y-1.5">
                <label htmlFor="email-input" className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email-input"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={() => handleBlur("email")}
                    placeholder="email@example.com"
                    className={`w-full bg-slate-950/40 border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-1 transition-all ${
                      errors.email
                        ? "border-red-500/50 focus:border-red-500/60 focus:ring-red-500/20"
                        : touched.email && isEmailValid
                        ? "border-emerald-500/50 focus:border-emerald-500/60 focus:ring-emerald-500/20"
                        : "border-white/10 focus:border-indigo-500/50 focus:ring-indigo-500/20"
                    }`}
                  />
                  {touched.email && (
                    <span className="absolute right-3.5 top-3 flex items-center">
                      {isEmailValid ? (
                        <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      )}
                    </span>
                  )}
                </div>
                {errors.email && (
                  <p className="text-[11px] text-red-400 pl-1 font-medium">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <label htmlFor="password-input" className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password-input"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={() => handleBlur("password")}
                    placeholder="••••••••"
                    className={`w-full bg-slate-950/40 border rounded-xl px-4 py-2.5 pr-11 text-sm focus:outline-none focus:ring-1 transition-all ${
                      errors.password
                        ? "border-red-500/50 focus:border-red-500/60 focus:ring-red-500/20"
                        : touched.password && isPasswordValid
                        ? "border-emerald-500/50 focus:border-emerald-500/60 focus:ring-emerald-500/20"
                        : "border-white/10 focus:border-indigo-500/50 focus:ring-indigo-500/20"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 p-1 text-slate-500 hover:text-slate-300 transition-colors focus:outline-none"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-[11px] text-red-400 pl-1 font-medium">{errors.password}</p>
                )}
                
                {/* Password Strength Meter */}
                {formData.password.length > 0 && (
                  <div className="space-y-1 pt-1.5 animate-fade-in">
                    <div className="flex justify-between items-center text-[10px] font-bold">
                      <span className="text-slate-400">Password Strength:</span>
                      <span className={`${pwdStrength.textColor} uppercase tracking-wider`}>{pwdStrength.label}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
                      <div 
                        className={`h-full ${pwdStrength.color} transition-all duration-500 ease-out`}
                        style={{ width: `${pwdStrength.score}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Confirm Password Field */}
              <div className="space-y-1.5">
                <label htmlFor="confirm-password-input" className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirm-password-input"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={() => handleBlur("confirmPassword")}
                    placeholder="••••••••"
                    className={`w-full bg-slate-950/40 border rounded-xl px-4 py-2.5 pr-11 text-sm focus:outline-none focus:ring-1 transition-all ${
                      errors.confirmPassword
                        ? "border-red-500/50 focus:border-red-500/60 focus:ring-red-500/20"
                        : touched.confirmPassword && isConfirmPasswordValid
                        ? "border-emerald-500/50 focus:border-emerald-500/60 focus:ring-emerald-500/20"
                        : "border-white/10 focus:border-indigo-500/50 focus:ring-indigo-500/20"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-2.5 p-1 text-slate-500 hover:text-slate-300 transition-colors focus:outline-none"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-[11px] text-red-400 pl-1 font-medium">{errors.confirmPassword}</p>
                )}
              </div>

              {/* Role Selector Tab Segment */}
              <div className="space-y-2 pt-1">
                <span className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  Select Your Role
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, role: "student" }))}
                    className={`py-2.5 px-4 rounded-xl border text-xs font-bold transition-all duration-300 ${
                      formData.role === "student"
                        ? "bg-indigo-600/10 border-indigo-500 text-indigo-400 shadow-md shadow-indigo-500/5"
                        : "bg-slate-950/20 border-white/5 text-slate-400 hover:border-white/10 hover:text-slate-300"
                    }`}
                  >
                    Student / Learner
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData((prev) => ({ ...prev, role: "instructor" }))}
                    className={`py-2.5 px-4 rounded-xl border text-xs font-bold transition-all duration-300 ${
                      formData.role === "instructor"
                        ? "bg-indigo-600/10 border-indigo-500 text-indigo-400 shadow-md shadow-indigo-500/5"
                        : "bg-slate-950/20 border-white/5 text-slate-400 hover:border-white/10 hover:text-slate-300"
                    }`}
                  >
                    Instructor / Tutor
                  </button>
                </div>
              </div>

              {/* Main Submit Action CTA */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 mt-6 text-xs font-extrabold uppercase tracking-widest rounded-xl transition-all duration-300 shadow-md ${
                  isFormValid && !isLoading
                    ? "bg-indigo-600 hover:bg-indigo-500 text-white cursor-pointer hover:scale-[1.01] hover:shadow-indigo-500/15"
                    : "bg-slate-800 text-slate-500 cursor-not-allowed border border-white/5"
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-4 w-4 text-slate-400" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Creating Account...
                  </span>
                ) : (
                  "Create Account"
                )}
              </button>

            </form>

            {/* Alternative Sign-In Separator */}
            <div className="relative my-6 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/5" />
              </div>
              <span className="relative bg-[#131b2e] px-3.5 text-[10px] uppercase font-bold tracking-wider text-slate-500">
                Or Continue With
              </span>
            </div>

            {/* Social Authentication Buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsSuccess(true);
                  setTimeout(() => router.push("/student/dashboard"), 2000);
                }}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/5 bg-slate-950/20 text-xs font-semibold text-slate-300 hover:bg-white/5 hover:border-white/10 transition-all duration-200"
              >
                <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                </svg>
                Google
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsSuccess(true);
                  setTimeout(() => router.push("/student/dashboard"), 2000);
                }}
                className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/5 bg-slate-950/20 text-xs font-semibold text-slate-300 hover:bg-white/5 hover:border-white/10 transition-all duration-200"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                GitHub
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0F172A] text-slate-300 flex items-center justify-center font-semibold">
        <div className="flex items-center gap-3">
          <svg className="animate-spin h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
          Loading workspace...
        </div>
      </div>
    }>
      <SignupForm />
    </Suspense>
  );
}
