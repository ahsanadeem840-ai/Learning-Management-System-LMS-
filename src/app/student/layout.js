"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function StudentLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  
  // Responsive sidebar toggles
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  // Dynamic header dropdowns
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  // Sidebar Menu Items
  const menuItems = [
    {
      name: "Dashboard",
      path: "/student/dashboard",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
        </svg>
      ),
    },
    {
      name: "Explore",
      path: "/student/explore",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
    },
    {
      name: "My Learning",
      path: "/student/my-learning",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      name: "Assignments",
      path: "/student/assignments",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
    },
    {
      name: "Certificates",
      path: "/student/certificates",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
    },
    {
      name: "Profile",
      path: "/student/profile",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
    },
  ];

  const handleLogout = () => {
    router.push("/login?mode=signin");
  };

  const navHeader = (
    <header className="h-16 border-b border-white/5 bg-slate-900/50 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-6">
      {/* Left: Mobile hamburger & breadcrumb / search */}
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Collapsible toggle for desktop */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h10M4 18h16" />
          </svg>
        </button>

        {/* Search Bar */}
        <div className="max-w-md w-full relative hidden sm:block">
          <input
            type="text"
            placeholder="Search lessons, mentors, files..."
            className="w-full h-9 bg-white/5 border border-white/10 rounded-xl px-4 pl-10 text-xs focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all text-slate-200 placeholder:text-slate-500"
          />
          <svg className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {/* Notifications Toggle */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className="p-2 rounded-xl bg-white/5 border border-white/5 text-slate-300 hover:text-white hover:bg-white/10 hover:border-white/10 transition-all relative"
          >
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2.5 w-80 glass-panel rounded-2xl p-4 z-50 animate-fade-in space-y-3">
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <span className="text-xs font-bold text-white">Notifications</span>
                <button className="text-[10px] text-indigo-400 hover:underline">Mark all read</button>
              </div>
              <div className="space-y-2.5 max-h-60 overflow-y-auto">
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 hover:bg-white/8 transition-all">
                  <div className="text-[11px] font-bold text-slate-200">Welcome to LMS Studio!</div>
                  <div className="text-[10px] text-slate-400 mt-1">Explore custom UI layouts designed in Module 2.</div>
                  <div className="text-[9px] text-indigo-400 font-semibold mt-1.5">5 mins ago</div>
                </div>
                <div className="p-2.5 rounded-lg bg-white/5 border border-white/5 hover:bg-white/8 transition-all">
                  <div className="text-[11px] font-bold text-slate-200">Next.js 15 course updated</div>
                  <div className="text-[10px] text-slate-400 mt-1">New modules added for server layout structures.</div>
                  <div className="text-[9px] text-indigo-400 font-semibold mt-1.5">2 hours ago</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Trigger */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2.5 p-1 px-2 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all text-left"
          >
            <div className="w-7.5 h-7.5 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-xs text-white uppercase shadow-md shadow-indigo-500/20">
              AA
            </div>
            <div className="hidden lg:block text-xs leading-none">
              <div className="font-bold text-slate-200">Ahsan Adeem</div>
              <div className="text-[10px] text-slate-500 mt-0.5">Student</div>
            </div>
            <svg className="w-4 h-4 text-slate-400 hidden lg:block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2.5 w-52 glass-panel rounded-2xl p-2.5 z-50 animate-fade-in">
              <div className="px-3.5 py-2 border-b border-white/5 text-xs lg:hidden">
                <div className="font-bold text-slate-200">Ahsan Adeem</div>
                <div className="text-[10px] text-slate-500 mt-0.5">ahsanadeem840@gmail.com</div>
              </div>
              <div className="space-y-1 py-1">
                <Link href="/student/profile" className="flex items-center gap-2.5 px-3.5 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  My Profile
                </Link>
                <Link href="/" className="flex items-center gap-2.5 px-3.5 py-2 text-xs text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                  Back to Portal
                </Link>
              </div>
              <div className="border-t border-white/5 pt-1.5 mt-1.5">
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs text-red-400 hover:bg-red-500/10 rounded-xl transition-all text-left font-semibold"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );

  return (
    <div className="min-h-screen bg-[#0F172A] text-slate-100 flex relative overflow-hidden font-sans">
      {/* Background Glow Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[450px] h-[450px] rounded-full bg-indigo-500/5 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[550px] h-[550px] rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col border-r border-white/5 bg-slate-950/20 backdrop-blur-md transition-all duration-300 ease-out h-screen sticky top-0 shrink-0 ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 flex items-center gap-3 px-6 border-b border-white/5 shrink-0 overflow-hidden">
          <div className="w-8.5 h-8.5 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shrink-0 shadow-lg shadow-indigo-500/20">
            L
          </div>
          {!isCollapsed && (
            <span className="text-base font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-indigo-400 select-none whitespace-nowrap animate-fade-in">
              LMS Studio
            </span>
          )}
        </div>

        {/* Sidebar Nav Links */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = pathname === item.path || (item.path !== "/student/dashboard" && pathname.startsWith(item.path));
            return (
              <Link
                key={item.name}
                href={item.path}
                className={`flex items-center gap-3.5 py-3 px-4 rounded-xl text-xs font-semibold tracking-wide transition-all group relative ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/15"
                    : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                }`}
              >
                <div className={`${isActive ? "text-white" : "text-slate-400 group-hover:text-slate-200 transition-colors"}`}>
                  {item.icon}
                </div>
                {!isCollapsed && <span className="animate-fade-in">{item.name}</span>}
                
                {/* Collapsed Tooltip */}
                {isCollapsed && (
                  <div className="absolute left-22 scale-0 group-hover:scale-100 bg-slate-900 border border-white/10 text-white text-[10px] font-bold py-1.5 px-3 rounded-lg shadow-lg pointer-events-none transition-all duration-150 origin-left whitespace-nowrap z-50">
                    {item.name}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer User Card */}
        <div className="p-4 border-t border-white/5 shrink-0">
          <div className={`flex items-center gap-3 ${isCollapsed ? "justify-center" : "bg-white/5 border border-white/5 rounded-2xl p-3"}`}>
            <div className="w-8.5 h-8.5 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-xs text-white uppercase shrink-0">
              AA
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0 animate-fade-in">
                <div className="text-xs font-bold text-white truncate">Ahsan Adeem</div>
                <div className="text-[9px] text-slate-500 truncate mt-0.5">ahsanadeem840@gmail.com</div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Mobile Drawer (backdrop layer + menu panel) */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop blur */}
          <div
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileOpen(false)}
          />

          {/* Drawer content */}
          <aside className="relative w-72 max-w-[80vw] bg-[#0E1628] border-r border-white/5 h-full flex flex-col p-6 animate-slide-right z-50">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-3">
                <div className="w-8.5 h-8.5 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white shadow-md shadow-indigo-500/20">
                  L
                </div>
                <span className="text-base font-extrabold text-white">LMS Studio</span>
              </div>
              <button
                onClick={() => setIsMobileOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="flex-1 space-y-2">
              {menuItems.map((item) => {
                const isActive = pathname === item.path || (item.path !== "/student/dashboard" && pathname.startsWith(item.path));
                return (
                  <Link
                    key={item.name}
                    href={item.path}
                    onClick={() => setIsMobileOpen(false)}
                    className={`flex items-center gap-3.5 py-3.5 px-4 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/15"
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/5"
                    }`}
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="border-t border-white/5 pt-4 mt-auto">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-xs text-white uppercase">
                  AA
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Ahsan Adeem</div>
                  <div className="text-[10px] text-slate-500">ahsanadeem840@gmail.com</div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="w-full py-2.5 rounded-xl border border-red-500/20 text-red-400 bg-red-500/5 hover:bg-red-500/10 text-xs font-bold transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Sign Out
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main View Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto h-screen">
        {navHeader}
        <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full relative z-10">
          {children}
        </main>
      </div>
    </div>
  );
}
