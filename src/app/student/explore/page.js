"use client";

import { useState, useEffect } from "react";

export default function ExploreCourses() {
  useEffect(() => {
    document.title = "Explore Courses | LMS Studio";
  }, []);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [enrollSuccessMessage, setEnrollSuccessMessage] = useState("");

  const categories = ["All", "Development", "Design", "Data Science & AI", "Marketing"];

  const [courses, setCourses] = useState([
    {
      id: "nextjs15",
      title: "Next.js 15 Masterclass: App Router & Server Actions",
      instructor: "Alex Rivers",
      rating: 4.9,
      reviews: 1240,
      price: "$89.00",
      category: "Development",
      duration: "24h 45m",
      lessons: 20,
      enrolled: true,
      tag: "Bestseller",
      tagBg: "bg-indigo-600 text-white",
    },
    {
      id: "introai",
      title: "Intro to AI: Deep Neural Networks from Scratch",
      instructor: "Dr. Sarah Chen",
      rating: 4.8,
      reviews: 840,
      price: "$119.00",
      category: "Data Science & AI",
      duration: "18h 30m",
      lessons: 25,
      enrolled: false,
      tag: "New",
      tagBg: "bg-pink-600 text-white",
    },
    {
      id: "uiuxfigma",
      title: "UI/UX Design Systems with Figma: Scalable & Modern",
      instructor: "Marcus Vance",
      rating: 4.7,
      reviews: 910,
      price: "$79.00",
      category: "Design",
      duration: "15h 20m",
      lessons: 20,
      enrolled: true,
    },
    {
      id: "growthmarketing",
      title: "Growth Hacking: Modern SEO & Social Media Marketing",
      instructor: "Jane Doe",
      rating: 4.6,
      reviews: 190,
      price: "Free",
      category: "Marketing",
      duration: "8h 15m",
      lessons: 14,
      enrolled: false,
      tag: "Popular",
      tagBg: "bg-emerald-600 text-white",
    },
    {
      id: "tailwindcssv4",
      title: "Tailwind CSS v4 in Depth: From Utility to Production",
      instructor: "Brad Traversy",
      rating: 4.9,
      reviews: 320,
      price: "$49.00",
      category: "Development",
      duration: "12h 45m",
      lessons: 18,
      enrolled: false,
      tag: "Hot",
      tagBg: "bg-indigo-600 text-white",
    },
    {
      id: "reactnative",
      title: "React Native: Build Native Mobile Apps with JavaScript",
      instructor: "Maximilian Schwarz",
      rating: 4.8,
      reviews: 670,
      price: "$99.00",
      category: "Development",
      duration: "30h 10m",
      lessons: 32,
      enrolled: false,
    },
    {
      id: "productman",
      title: "Product Management: From Strategy to Product Launch",
      instructor: "Sarah Jenkins",
      rating: 4.5,
      reviews: 145,
      price: "$69.00",
      category: "Marketing",
      duration: "10h 30m",
      lessons: 12,
      enrolled: false,
    },
  ]);

  const handleEnroll = (courseId) => {
    const course = courses.find((c) => c.id === courseId);
    if (!course || course.enrolled) return;

    setCourses((prev) =>
      prev.map((c) => (c.id === courseId ? { ...c, enrolled: true } : c))
    );

    setEnrollSuccessMessage(`Successfully enrolled in "${course.title}"!`);
    setTimeout(() => {
      setEnrollSuccessMessage("");
    }, 4000);
  };

  // Filter courses based on search & category
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Toast Alert */}
      {enrollSuccessMessage && (
        <div className="fixed bottom-6 right-6 z-50 glass-panel border-emerald-500/30 bg-emerald-950/80 text-emerald-200 px-5 py-3 rounded-2xl flex items-center gap-3 shadow-lg shadow-emerald-500/10 animate-slide-up">
          <svg className="w-5 h-5 text-emerald-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-xs font-semibold">{enrollSuccessMessage}</span>
        </div>
      )}

      {/* Header Description */}
      <div className="space-y-2">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Explore Courses Catalog
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm max-w-xl">
          Search and filter through our selection of elite, professional courses. Start learning today to expand your portfolio.
        </p>
      </div>

      {/* Filter and Search Panel */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Search */}
        <div className="relative w-full md:max-w-md">
          <input
            type="text"
            placeholder="Search by course title or instructor name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 bg-white/5 border border-white/10 rounded-2xl px-4 pl-11 text-xs focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all text-slate-200 placeholder:text-slate-500"
          />
          <svg className="absolute left-4 top-3.5 w-4 h-4 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4.5 py-2 rounded-xl text-xs font-bold tracking-wide transition-all select-none whitespace-nowrap border shrink-0 ${
                selectedCategory === category
                  ? "bg-indigo-600 border-indigo-500 text-white shadow-md shadow-indigo-500/10"
                  : "bg-white/5 border-white/5 text-slate-400 hover:text-slate-200 hover:bg-white/8"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Courses Catalog Grid */}
      {filteredCourses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div
              key={course.id}
              className="glass-panel rounded-2xl overflow-hidden hover:border-white/15 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Card Banner */}
              <div className="h-32 bg-slate-800/40 border-b border-white/5 relative flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent z-10" />
                <span className="text-2xl font-black text-slate-700 select-none group-hover:scale-105 transition-transform duration-300">
                  {course.category}
                </span>

                {course.tag && (
                  <span className={`absolute top-3 left-3 z-20 font-bold text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-wider ${course.tagBg}`}>
                    {course.tag}
                  </span>
                )}

                <span className="absolute bottom-3 right-3 z-20 text-[10px] text-slate-400 font-bold bg-slate-900/60 backdrop-blur-md px-2 py-0.5 rounded-md border border-white/5">
                  {course.duration}
                </span>
              </div>

              {/* Card Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wide">
                    {course.category}
                  </span>
                  <h3 className="text-sm font-bold text-slate-200 group-hover:text-indigo-400 transition-colors leading-snug line-clamp-2 min-h-[40px]">
                    {course.title}
                  </h3>
                  <p className="text-[11px] text-slate-500">Instructor: {course.instructor}</p>
                </div>

                <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-yellow-400">{course.rating}</span>
                    <svg className="w-3.5 h-3.5 fill-current text-yellow-400" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-[10px] text-slate-500 font-medium">({course.reviews})</span>
                  </div>
                  <div className="text-sm font-black text-slate-200">{course.price}</div>
                </div>

                <div className="pt-2">
                  {course.enrolled ? (
                    <button
                      disabled
                      className="w-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 cursor-not-allowed"
                    >
                      <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Active Session (Resume)
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEnroll(course.id)}
                      className="w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 text-xs font-bold py-2.5 px-4 rounded-xl transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-1"
                    >
                      Enroll Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="glass-panel rounded-3xl p-12 text-center max-w-md mx-auto space-y-4 mt-6">
          <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mx-auto text-slate-400 border border-white/5">
            🔍
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-white">No courses matched your query</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              We couldn't find any courses matching "{searchQuery}" in category "{selectedCategory}". Try updating your query or selecting another category.
            </p>
          </div>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("All");
            }}
            className="text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-5 rounded-xl shadow-md transition-all inline-block"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
