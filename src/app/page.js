import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex flex-col selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-purple-500/10 blur-[150px] pointer-events-none" />

      {/* Global Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-[#0F172A]/70 backdrop-blur-md transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/30">
              L
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-indigo-400">
              LMS Studio
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
            <a href="#" className="hover:text-indigo-400 transition-colors">Explore</a>
            <a href="#" className="hover:text-indigo-400 transition-colors">Become Instructor</a>
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-sm relative">
            <input
              type="text"
              placeholder="Search courses, topics, skills..."
              className="w-full h-9 bg-white/5 border border-white/10 rounded-full px-4 pl-10 text-sm focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all text-slate-200 placeholder:text-slate-500"
            />
            <svg
              className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <button className="text-sm font-medium hover:text-white transition-colors px-4 py-2 text-slate-300">
              Login
            </button>
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-full px-5 py-2 transition-all duration-200 shadow-md shadow-indigo-500/20">
              Join Now
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Left */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-400 text-xs font-semibold tracking-wider uppercase mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              Day 5: Next.js + Tailwind Setup Complete
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              Master New Skills <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
                Elevate Your Future
              </span>
            </h1>
            <p className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Access premium courses taught by industry experts. Experience a modern, glassmorphic learning environment designed for Students, Instructors, and Administrators.
            </p>

            {/* Search Input Container */}
            <div className="max-w-md mx-auto lg:mx-0 flex flex-col sm:flex-row gap-2 bg-slate-900/50 p-2 rounded-xl sm:rounded-full border border-white/5 backdrop-blur-sm">
              <input
                type="text"
                placeholder="What do you want to learn today?"
                className="flex-1 bg-transparent px-4 py-2.5 text-sm focus:outline-none placeholder:text-slate-500 text-slate-200"
              />
              <button className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg sm:rounded-full px-6 py-2.5 transition-all duration-200 shadow-lg shadow-indigo-500/20 shrink-0">
                Search
              </button>
            </div>
          </div>

          {/* Hero Right: Glassmorphic Stats Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-sm glass-panel rounded-2xl p-6 relative group transition-all duration-300 hover:border-white/15">
              <div className="absolute top-[-10px] right-[-10px] w-20 h-20 bg-indigo-500/20 rounded-full blur-2xl pointer-events-none group-hover:bg-indigo-500/35 transition-all" />
              
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                LMS Platform Stats
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-white/5 border border-white/5 rounded-xl text-center">
                  <div className="text-2xl font-extrabold text-white">10k+</div>
                  <div className="text-xs text-slate-400 mt-1">Active Learners</div>
                </div>
                <div className="p-4 bg-white/5 border border-white/5 rounded-xl text-center">
                  <div className="text-2xl font-extrabold text-white">250+</div>
                  <div className="text-xs text-slate-400 mt-1">Instructors</div>
                </div>
                <div className="p-4 bg-white/5 border border-white/5 rounded-xl text-center">
                  <div className="text-2xl font-extrabold text-white">1.2k+</div>
                  <div className="text-xs text-slate-400 mt-1">Premium Courses</div>
                </div>
                <div className="p-4 bg-white/5 border border-white/5 rounded-xl text-center">
                  <div className="text-2xl font-extrabold text-indigo-400">4.9★</div>
                  <div className="text-xs text-slate-400 mt-1">Course Rating</div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                <span>Verified Data</span>
                <span className="flex items-center gap-1.5 text-indigo-400 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
                  Live Sync
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 border-t border-white/5 bg-slate-950/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-white">Featured Categories</h2>
            <p className="text-slate-400 text-sm mt-2">Explore courses across multiple fields and build high-demand skills.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Category Card 1 */}
            <div className="glass-panel hover:bg-slate-800/40 p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:border-indigo-500/30 group">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white">Development</h3>
              <p className="text-slate-400 text-xs mt-1">React, Next.js, Node.js, Web3</p>
              <div className="text-indigo-400 text-xs font-semibold mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Browse 450+ Courses &rarr;
              </div>
            </div>

            {/* Category Card 2 */}
            <div className="glass-panel hover:bg-slate-800/40 p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:border-purple-500/30 group">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4 group-hover:bg-purple-600 group-hover:text-white transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white">Design & UI/UX</h3>
              <p className="text-slate-400 text-xs mt-1">Figma, Design Systems, Typography</p>
              <div className="text-purple-400 text-xs font-semibold mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Browse 280+ Courses &rarr;
              </div>
            </div>

            {/* Category Card 3 */}
            <div className="glass-panel hover:bg-slate-800/40 p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:border-pink-500/30 group">
              <div className="w-12 h-12 rounded-xl bg-pink-500/10 text-pink-400 flex items-center justify-center mb-4 group-hover:bg-pink-600 group-hover:text-white transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white">Data Science & AI</h3>
              <p className="text-slate-400 text-xs mt-1">Python, Neural Networks, PyTorch</p>
              <div className="text-pink-400 text-xs font-semibold mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Browse 310+ Courses &rarr;
              </div>
            </div>

            {/* Category Card 4 */}
            <div className="glass-panel hover:bg-slate-800/40 p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:border-emerald-500/30 group">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white">Marketing & Sales</h3>
              <p className="text-slate-400 text-xs mt-1">SEO, Social Media, Growth Hacking</p>
              <div className="text-emerald-400 text-xs font-semibold mt-4 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Browse 190+ Courses &rarr;
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Courses Grid */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-extrabold text-white">Popular Premium Courses</h2>
            <p className="text-slate-400 text-sm mt-1">Taught by highly rated industry instructors.</p>
          </div>
          <button className="text-sm font-semibold text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1">
            See all courses &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Course 1 */}
          <div className="glass-panel rounded-2xl overflow-hidden group hover:border-indigo-500/25 transition-all duration-300 flex flex-col">
            <div className="relative h-48 w-full bg-slate-800 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-60 z-10" />
              <span className="text-5xl font-black text-indigo-500/20 group-hover:scale-105 transition-transform duration-300">Next.js 15</span>
              <div className="absolute top-4 left-4 z-20 bg-indigo-600 text-white font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                Bestseller
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-xs text-indigo-400 font-semibold uppercase">Development</span>
                <h3 className="text-lg font-bold text-white mt-1 group-hover:text-indigo-300 transition-colors leading-snug">
                  Next.js 15 Masterclass: App Router & Server Actions
                </h3>
                <p className="text-xs text-slate-400 mt-2">By Alex Rivers, Senior Web Engineer</p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-1 text-yellow-400 text-sm font-bold">
                  <span>4.9</span>
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  <span className="text-slate-500 font-normal text-xs">(1,240 reviews)</span>
                </div>
                <div className="text-lg font-black text-white">$89.00</div>
              </div>
            </div>
          </div>

          {/* Course 2 */}
          <div className="glass-panel rounded-2xl overflow-hidden group hover:border-pink-500/25 transition-all duration-300 flex flex-col">
            <div className="relative h-48 w-full bg-slate-800 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-60 z-10" />
              <span className="text-5xl font-black text-pink-500/20 group-hover:scale-105 transition-transform duration-300">Neural Nets</span>
              <div className="absolute top-4 left-4 z-20 bg-pink-600 text-white font-bold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider">
                New
              </div>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-xs text-pink-400 font-semibold uppercase">Data Science & AI</span>
                <h3 className="text-lg font-bold text-white mt-1 group-hover:text-pink-300 transition-colors leading-snug">
                  Intro to AI: Deep Neural Networks from Scratch
                </h3>
                <p className="text-xs text-slate-400 mt-2">By Dr. Sarah Chen, AI Researcher</p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-1 text-yellow-400 text-sm font-bold">
                  <span>4.8</span>
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  <span className="text-slate-500 font-normal text-xs">(840 reviews)</span>
                </div>
                <div className="text-lg font-black text-white">$119.00</div>
              </div>
            </div>
          </div>

          {/* Course 3 */}
          <div className="glass-panel rounded-2xl overflow-hidden group hover:border-purple-500/25 transition-all duration-300 flex flex-col">
            <div className="relative h-48 w-full bg-slate-800 flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent opacity-60 z-10" />
              <span className="text-5xl font-black text-purple-500/20 group-hover:scale-105 transition-transform duration-300">UI Figma</span>
            </div>
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-xs text-purple-400 font-semibold uppercase">Design & UI/UX</span>
                <h3 className="text-lg font-bold text-white mt-1 group-hover:text-purple-300 transition-colors leading-snug">
                  UI/UX Design Systems with Figma: Scalable & Modern
                </h3>
                <p className="text-xs text-slate-400 mt-2">By Marcus Vance, Product Designer</p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-1 text-yellow-400 text-sm font-bold">
                  <span>4.7</span>
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  <span className="text-slate-500 font-normal text-xs">(910 reviews)</span>
                </div>
                <div className="text-lg font-black text-white">$79.00</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Footer */}
      <footer className="mt-auto py-8 border-t border-white/5 bg-slate-950/40 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>&copy; {new Date().getFullYear()} LMS Studio. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
