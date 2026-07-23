import { useState } from 'react'

function App() {
  // Navigation & active view tabs
  const [activeTab, setActiveTab] = useState('home')
  
  // Auth state
  const [authMode, setAuthMode] = useState('login') // 'login' or 'register'
  const [userRole, setUserRole] = useState('student') // 'student' or 'instructor'
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('Alex Carter')
  const [userEmail, setUserEmail] = useState('alex.carter@auralms.com')
  
  // Search query & category filter
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  
  // Interactive Modals State
  const [showCourseWizard, setShowCourseWizard] = useState(false)
  const [wizardStep, setWizardStep] = useState(1)
  const [newCourseTitle, setNewCourseTitle] = useState('')
  const [newCourseCategory, setNewCourseCategory] = useState('Development')
  const [newCoursePrice, setNewCoursePrice] = useState('$59.99')
  const [newCourseLessons, setNewCourseLessons] = useState(['Introduction', 'Environment Setup'])
  const [newLessonInput, setNewLessonInput] = useState('')

  // Student Learning Console Modal
  const [showLearningConsole, setShowLearningConsole] = useState(false)
  const [activeLessonIndex, setActiveLessonIndex] = useState(0)
  const [currentNotes, setCurrentNotes] = useState('')
  const [savedNotes, setSavedNotes] = useState([
    { timestamp: '02:15', text: 'Set up variables using CSS custom properties' },
    { timestamp: '08:42', text: 'Use backdrop-filter for premium glassmorphism blur' }
  ])
  const [newQuestionInput, setNewQuestionInput] = useState('')
  const [discussionQuestions, setDiscussionQuestions] = useState([
    { user: 'Sarah Connor', text: 'Does this outline support flexbox grid systems too?', replies: 1 },
    { user: 'James Smith', text: 'How do you prevent background bleed-through in Safari?', replies: 2 }
  ])

  // Admin Rejection Modal State
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [rejectCourseId, setRejectCourseId] = useState(null)
  const [rejectFeedback, setRejectFeedback] = useState('')

  // Dummy courses data
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: 'Complete Web Development Bootcamp',
      instructor: 'Dr. Angela Yu',
      rating: 4.8,
      reviews: 1450,
      price: '$99.99',
      category: 'Development',
      tag: 'Bestseller',
      hours: '42 hrs',
      lessonsCount: 42
    },
    {
      id: 2,
      title: 'Advanced UI/UX Design Masterclass',
      instructor: 'Figma Academy',
      rating: 4.9,
      reviews: 820,
      price: '$129.99',
      category: 'Design',
      tag: 'New',
      hours: '28 hrs',
      lessonsCount: 30
    },
    {
      id: 3,
      title: 'The AI & Machine Learning Handbook',
      instructor: 'Andrew Ng',
      rating: 4.7,
      reviews: 3200,
      price: 'Free',
      category: 'AI & Science',
      tag: 'Popular',
      hours: '35 hrs',
      lessonsCount: 20
    },
    {
      id: 4,
      title: 'Strategic Marketing for Business Growth',
      instructor: 'Harvard Business School',
      rating: 4.6,
      reviews: 450,
      price: '$79.99',
      category: 'Business',
      tag: 'Trending',
      hours: '15 hrs',
      lessonsCount: 15
    }
  ])

  // Student progress
  const studentProgress = [
    { title: 'Complete Web Development Bootcamp', progress: 75, completedLessons: 32, totalLessons: 42, activeLesson: 'Building custom React hooks' },
    { title: 'The AI & Machine Learning Handbook', progress: 40, completedLessons: 8, totalLessons: 20, activeLesson: 'Introduction to Gradient Descent' }
  ]

  // Instructor metrics & courses
  const instructorCourses = [
    { title: 'Next.js 15 Deep Dive', students: 342, status: 'Published', revenue: '$3,420.00' },
    { title: 'TypeScript Advanced Patterns', students: 104, status: 'Pending Review', revenue: '$0.00' },
    { title: 'React Compiler & Performance Optimization', students: 0, status: 'Draft', revenue: '$0.00' }
  ]

  // Admin approval queue
  const [adminQueue, setAdminQueue] = useState([
    { id: 101, title: 'Rust Systems Programming', instructor: 'Marcus Aurelius', date: '2026-07-20', status: 'Pending', comments: '' },
    { id: 102, title: 'Product Management Essentials', instructor: 'Sophia Chen', date: '2026-07-21', status: 'Pending', comments: '' },
    { id: 103, title: 'Introduction to Web3 & Solidity', instructor: 'Vitalik Buterin', date: '2026-07-22', status: 'Pending', comments: '' }
  ])

  const handleApprove = (id) => {
    setAdminQueue(prev => prev.map(item => item.id === id ? { ...item, status: 'Approved' } : item))
  }

  const openRejectModal = (id) => {
    setRejectCourseId(id)
    setRejectFeedback('')
    setShowRejectModal(true)
  }

  const handleConfirmReject = () => {
    setAdminQueue(prev => prev.map(item => 
      item.id === rejectCourseId ? { ...item, status: 'Needs Revision', comments: rejectFeedback } : item
    ))
    setShowRejectModal(false)
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleAddLesson = () => {
    if (newLessonInput.trim()) {
      setNewCourseLessons([...newCourseLessons, newLessonInput.trim()])
      setNewLessonInput('')
    }
  }

  const handleWizardSubmit = () => {
    // Add to instructor courses & system courses
    const newId = courses.length + 1
    const newCourseObj = {
      id: newId,
      title: newCourseTitle || 'Untitled Course',
      instructor: userName,
      rating: 5.0,
      reviews: 0,
      price: newCoursePrice,
      category: newCourseCategory,
      tag: 'New',
      hours: `${newCourseLessons.length * 0.75} hrs`,
      lessonsCount: newCourseLessons.length
    }
    setCourses([...courses, newCourseObj])
    
    // Add to admin queue
    const today = new Date().toISOString().split('T')[0]
    setAdminQueue([...adminQueue, {
      id: 100 + newId,
      title: newCourseTitle || 'Untitled Course',
      instructor: userName,
      date: today,
      status: 'Pending',
      comments: ''
    }])

    // Reset wizard
    setNewCourseTitle('')
    setNewCourseCategory('Development')
    setNewCoursePrice('$59.99')
    setNewCourseLessons(['Introduction', 'Environment Setup'])
    setShowCourseWizard(false)
    setWizardStep(1)
    
    alert('Success! Your course proposal has been submitted to the Admin Moderation Queue.');
  }

  const handlePostQuestion = (e) => {
    e.preventDefault()
    if (newQuestionInput.trim()) {
      setDiscussionQuestions([{ user: userName, text: newQuestionInput.trim(), replies: 0 }, ...discussionQuestions])
      setNewQuestionInput('')
    }
  }

  const handleSaveNote = () => {
    if (currentNotes.trim()) {
      const minutes = Math.floor(Math.random() * 15).toString().padStart(2, '0')
      const seconds = Math.floor(Math.random() * 60).toString().padStart(2, '0')
      setSavedNotes([...savedNotes, { timestamp: `${minutes}:${seconds}`, text: currentNotes.trim() }])
      setCurrentNotes('')
    }
  }

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          course.category.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  // Beautiful SVG Icons definitions
  const StarIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ verticalAlign: 'middle', marginRight: '2px' }}>
      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
    </svg>
  )

  const SearchIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: '#818cf8', marginLeft: '8px' }}>
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  )

  const GoogleIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24">
      <path fill="#EA4335" d="M12 5.04c1.62 0 3.08.56 4.22 1.65l3.15-3.15C17.45 1.84 14.97 1 12 1 7.35 1 3.39 3.65 1.5 7.5l3.6 2.8C5.95 7.42 8.78 5.04 12 5.04z"/>
      <path fill="#4285F4" d="M23.5 12.25c0-.82-.07-1.6-.22-2.35H12v4.45h6.45c-.28 1.48-1.12 2.73-2.38 3.58l3.6 2.8c2.1-1.94 3.33-4.8 3.33-8.48z"/>
      <path fill="#FBBC05" d="M5.1 10.3c-.25-.75-.4-1.55-.4-2.38s.15-1.63.4-2.38L1.5 2.74C.54 4.67 0 6.83 0 9.1s.54 4.43 1.5 6.36l3.6-2.8c-.25-.75-.4-1.55-.4-2.38z"/>
      <path fill="#34A853" d="M12 23c3.24 0 5.97-1.07 7.96-2.92l-3.6-2.8c-1.1.74-2.52 1.18-4.36 1.18-3.22 0-6.05-2.38-7.02-5.46l-3.6 2.8C3.39 20.35 7.35 23 12 23z"/>
    </svg>
  )

  const GithubIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.167 22 16.418 22 12c0-5.523-4.478-10-10-10z" />
    </svg>
  )

  return (
    <>
      {/* Decorative Blur Blobs */}
      <div className="glow-circle glow-circle-1"></div>
      <div className="glow-circle glow-circle-2"></div>
      <div className="glow-circle glow-circle-3"></div>

      {/* Navigation Header */}
      <header className="lms-navbar glass-panel container">
        <a href="#" className="logo-container" onClick={() => setActiveTab('home')}>
          <div className="logo-dot"></div>
          <span>AuraLMS</span>
        </a>
        <nav className="nav-links">
          <button 
            className={`nav-tab ${activeTab === 'home' ? 'active' : ''}`} 
            onClick={() => setActiveTab('home')}
          >
            Explore
          </button>
          
          <button 
            className={`nav-tab ${activeTab === 'auth' ? 'active' : ''}`} 
            onClick={() => setActiveTab('auth')}
          >
            {isLoggedIn ? `Account (${userName})` : 'Join / Login'}
          </button>

          {isLoggedIn && userRole === 'student' && (
            <button 
              className={`nav-tab ${activeTab === 'student' ? 'active' : ''}`} 
              onClick={() => setActiveTab('student')}
            >
              Student Console
            </button>
          )}

          {isLoggedIn && userRole === 'instructor' && (
            <button 
              className={`nav-tab ${activeTab === 'instructor' ? 'active' : ''}`} 
              onClick={() => setActiveTab('instructor')}
            >
              Studio
            </button>
          )}

          <button 
            className={`nav-tab ${activeTab === 'admin' ? 'active' : ''}`} 
            onClick={() => setActiveTab('admin')}
          >
            Admin Panel
          </button>
        </nav>
      </header>

      {/* Main Content Area */}
      <main className="container">
        
        {/* ================= HOME / EXPLORE VIEW ================= */}
        {activeTab === 'home' && (
          <div>
            <section className="hero-section">
              <div className="hero-content">
                <h1>Learn Without Limits.<br />Build Your <span>Future</span>.</h1>
                <p>
                  Access premium courses designed by industry experts. Experience a modern, 
                  glassmorphic learning system customized for Student growth, Instructor freedom, 
                  and Admin governance.
                </p>
                
                {/* Sleek Search Bar */}
                <div className="search-box">
                  <SearchIcon />
                  <input 
                    type="text" 
                    placeholder="Search courses (e.g. Web Dev, Design, UI)..." 
                    className="search-input"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                  <button className="search-button">Search</button>
                </div>
              </div>

              {/* Global Network stats */}
              <div className="hero-stats-card glass-panel">
                <h3>Global Learning Network</h3>
                <div className="stat-row">
                  <span style={{ color: 'var(--text-muted)', fontWeight: 5 }}>Active Learners</span>
                  <span className="stat-val">12,450+</span>
                </div>
                <div className="stat-row">
                  <span style={{ color: 'var(--text-muted)', fontWeight: 5 }}>Expert Mentors</span>
                  <span className="stat-val">480+</span>
                </div>
                <div className="stat-row">
                  <span style={{ color: 'var(--text-muted)', fontWeight: 5 }}>Total Courses</span>
                  <span className="stat-val">1,200+</span>
                </div>
              </div>
            </section>

            {/* Premium Category Pills */}
            <section style={{ marginBottom: '3.5rem' }}>
              <h2 className="section-title">Explore Top Categories</h2>
              <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                {['All', 'Development', 'Design', 'AI & Science', 'Business'].map(cat => (
                  <button
                    key={cat}
                    className={`nav-tab ${selectedCategory === cat ? 'active' : ''}`}
                    style={{ padding: '0.5rem 1.25rem', border: '1px solid rgba(255,255,255,0.05)' }}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="categories-grid">
                <div className="category-card glass-panel" onClick={() => setSelectedCategory('Development')}>
                  <div className="category-icon-wrapper">💻</div>
                  <h3 className="category-title">Development</h3>
                  <span className="category-count">420 Courses</span>
                </div>
                <div className="category-card glass-panel" onClick={() => setSelectedCategory('Design')}>
                  <div className="category-icon-wrapper">🎨</div>
                  <h3 className="category-title">Design</h3>
                  <span className="category-count">280 Courses</span>
                </div>
                <div className="category-card glass-panel" onClick={() => setSelectedCategory('AI & Science')}>
                  <div className="category-icon-wrapper">🧠</div>
                  <h3 className="category-title">AI & Science</h3>
                  <span className="category-count">190 Courses</span>
                </div>
                <div className="category-card glass-panel" onClick={() => setSelectedCategory('Business')}>
                  <div className="category-icon-wrapper">📈</div>
                  <h3 className="category-title">Business</h3>
                  <span className="category-count">310 Courses</span>
                </div>
              </div>
            </section>

            {/* Courses Display Catalog */}
            <section>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.75rem' }}>
                <h2 className="section-title" style={{ margin: 0 }}>Discover Popular Courses</h2>
                {(searchQuery || selectedCategory !== 'All') && (
                  <button 
                    className="action-btn" 
                    onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                    style={{ background: 'var(--accent-glow)', borderColor: 'rgba(99,102,241,0.3)' }}
                  >
                    Reset Filters
                  </button>
                )}
              </div>
              
              {filteredCourses.length > 0 ? (
                <div className="courses-grid">
                  {filteredCourses.map(course => (
                    <div className="course-card glass-panel" key={course.id}>
                      <div className="course-thumb-placeholder">
                        {course.category === 'Development' && '💻'}
                        {course.category === 'Design' && '🎨'}
                        {course.category === 'AI & Science' && '🧠'}
                        {course.category === 'Business' && '📈'}
                        <div className="course-thumb-overlay">{course.hours}</div>
                      </div>
                      <div className="course-card-content">
                        <span className="course-tag">{course.tag}</span>
                        <h3 className="course-title">{course.title}</h3>
                        <div className="course-instructor">
                          <div className="course-instructor-avatar"></div>
                          <span>By {course.instructor}</span>
                        </div>
                        <div className="course-footer">
                          <span className="course-rating">
                            <StarIcon /> {course.rating} <span className="reviews">({course.reviews})</span>
                          </span>
                          <span className="course-price">{course.price}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ padding: '4rem 2rem', textAlign: 'center', background: 'rgba(255,255,255,0.01)', border: '1px dashed var(--border-color)', borderRadius: '16px' }}>
                  <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>No courses found matching current filters</p>
                  <button className="search-button" style={{ marginTop: '1.25rem' }} onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}>Clear All Search Filters</button>
                </div>
              )}
            </section>
          </div>
        )}

        {/* ================= AUTHENTICATION VIEW ================= */}
        {activeTab === 'auth' && (
          <div className="auth-container">
            <div className="auth-card glass-panel">
              <div className="auth-tabs">
                <button 
                  className={`auth-tab-btn ${authMode === 'login' ? 'active' : ''}`}
                  onClick={() => setAuthMode('login')}
                >
                  Sign In
                </button>
                <button 
                  className={`auth-tab-btn ${authMode === 'register' ? 'active' : ''}`}
                  onClick={() => setAuthMode('register')}
                >
                  Register
                </button>
              </div>

              {isLoggedIn ? (
                <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--accent-gradient)', margin: '0 auto 1.25rem auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem' }}>👤</div>
                  <h3 className="section-title" style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>Active Session</h3>
                  <p style={{ color: 'var(--text-main)', fontWeight: 6 }}>{userName}</p>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '2.5rem' }}>{userEmail}</p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <button 
                      className="auth-submit-btn"
                      onClick={() => setActiveTab(userRole === 'student' ? 'student' : 'instructor')}
                    >
                      Go to Dashboard
                    </button>
                    <button 
                      className="action-btn"
                      style={{ padding: '0.85rem', width: '100%', borderColor: 'rgba(239, 68, 68, 0.3)', color: '#f87171' }}
                      onClick={() => setIsLoggedIn(false)}
                    >
                      Logout Account
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={(e) => { 
                  e.preventDefault(); 
                  setIsLoggedIn(true); 
                  setActiveTab(userRole === 'student' ? 'student' : 'instructor'); 
                }}>
                  {authMode === 'register' && (
                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="Alex Carter" 
                        className="form-input" 
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                      />
                    </div>
                  )}
                  
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input 
                      type="email" 
                      required 
                      placeholder="alex.carter@auralms.com" 
                      className="form-input" 
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                    />
                  </div>
                  
                  <div className="form-group" style={{ marginBottom: '1.75rem' }}>
                    <label className="form-label">Password</label>
                    <input type="password" required placeholder="••••••••" className="form-input" />
                  </div>

                  {authMode === 'register' && (
                    <div>
                      <label className="form-label">Choose Profile Persona</label>
                      <div className="role-selector">
                        <button 
                          type="button"
                          className={`role-btn ${userRole === 'student' ? 'active' : ''}`}
                          onClick={() => setUserRole('student')}
                        >
                          <span>👨‍🎓</span>
                          <span>Student</span>
                          <span style={{ fontSize: '0.7rem', fontWeight: 4, opacity: 0.7, textAlign: 'center' }}>Learn & earn certificates</span>
                        </button>
                        <button 
                          type="button"
                          className={`role-btn ${userRole === 'instructor' ? 'active' : ''}`}
                          onClick={() => setUserRole('instructor')}
                        >
                          <span>👩‍🏫</span>
                          <span>Instructor</span>
                          <span style={{ fontSize: '0.7rem', fontWeight: 4, opacity: 0.7, textAlign: 'center' }}>Teach & track revenue</span>
                        </button>
                      </div>
                    </div>
                  )}

                  <button type="submit" className="auth-submit-btn">
                    {authMode === 'login' ? 'Access AuraLMS Portal' : 'Create Premium Account'}
                  </button>

                  <div className="social-auth-container">
                    <div className="social-divider">
                      <span>or continue with</span>
                    </div>
                    <div className="social-buttons">
                      <button type="button" className="social-auth-btn" onClick={() => { setIsLoggedIn(true); setActiveTab('student'); }}>
                        <GoogleIcon />
                        <span>Google</span>
                      </button>
                      <button type="button" className="social-auth-btn" onClick={() => { setIsLoggedIn(true); setActiveTab('student'); }}>
                        <GithubIcon />
                        <span>GitHub</span>
                      </button>
                    </div>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* ================= STUDENT DASHBOARD ================= */}
        {activeTab === 'student' && (
          <div className="dashboard-layout">
            <aside className="dashboard-sidebar glass-panel">
              <h3 className="sidebar-title">Student Dashboard</h3>
              <button className="sidebar-link active">
                <span>📚</span> My Curriculum
              </button>
              <button className="sidebar-link" onClick={() => { setActiveTab('home'); setSelectedCategory('All'); }}>
                <span>🔍</span> Explore Courses
              </button>
              <button className="sidebar-link">
                <span>🏆</span> Credentials
              </button>
              <hr style={{ border: 'none', height: '1px', background: 'rgba(255,255,255,0.06)', margin: '1rem 0' }} />
              <button className="sidebar-link" style={{ color: '#f87171' }} onClick={() => setIsLoggedIn(false)}>
                <span>🚪</span> Sign Out
              </button>
            </aside>
            
            <div className="dashboard-content">
              <div className="welcome-banner glass-panel">
                <h2>Welcome Back, {userName}! 👋</h2>
                <p>Keep up the great momentum! You completed 4 lessons this week. Your 5-day study streak is currently active.</p>
              </div>

              <div className="metrics-row">
                <div className="metric-card glass-panel">
                  <span className="metric-label">In Progress</span>
                  <span className="metric-value">
                    {studentProgress.length}
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 5 }}>Courses</span>
                  </span>
                </div>
                <div className="metric-card glass-panel">
                  <span className="metric-label">Completed Courses</span>
                  <span className="metric-value">1</span>
                </div>
                <div className="metric-card glass-panel">
                  <span className="metric-label">Learning Streak</span>
                  <span className="metric-value" style={{ color: '#fb7185' }}>5 Days 🔥</span>
                </div>
              </div>

              <div>
                <h3 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1.25rem' }}>Active Learning Curriculum</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {studentProgress.map((course, idx) => (
                    <div className="glass-panel" style={{ padding: '1.75rem', position: 'relative' }} key={idx}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                        <div>
                          <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem', fontWeight: 7, color: '#ffffff', marginBottom: '0.3rem' }}>{course.title}</h4>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Current lesson: <span style={{ color: 'var(--text-glow)', fontWeight: 6 }}>{course.activeLesson}</span></p>
                        </div>
                        <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 6, background: 'rgba(255,255,255,0.03)', padding: '0.3rem 0.75rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                          {course.completedLessons}/{course.totalLessons} Lessons
                        </span>
                      </div>
                      <div className="progress-container" style={{ marginBottom: '1.5rem' }}>
                        <div className="progress-bar-bg">
                          <div className="progress-bar-fill" style={{ width: `${course.progress}%` }}></div>
                        </div>
                        <span style={{ fontWeight: 7, color: 'var(--text-glow)', fontSize: '1.05rem', minWidth: '45px', textAlign: 'right' }}>{course.progress}%</span>
                      </div>
                      <button 
                        className="search-button" 
                        style={{ padding: '0.6rem 1.5rem', fontSize: '0.9rem' }}
                        onClick={() => setShowLearningConsole(true)}
                      >
                        Resume Lesson
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= INSTRUCTOR DASHBOARD ================= */}
        {activeTab === 'instructor' && (
          <div className="dashboard-layout">
            <aside className="dashboard-sidebar glass-panel">
              <h3 className="sidebar-title">Studio Hub</h3>
              <button className="sidebar-link active">
                <span>📽️</span> Course Studio
              </button>
              <button className="sidebar-link">
                <span>📝</span> Gradebook
              </button>
              <button className="sidebar-link">
                <span>📊</span> Sales Analytics
              </button>
              <hr style={{ border: 'none', height: '1px', background: 'rgba(255,255,255,0.06)', margin: '1rem 0' }} />
              <button className="sidebar-link" style={{ color: '#f87171' }} onClick={() => setIsLoggedIn(false)}>
                <span>🚪</span> Sign Out
              </button>
            </aside>
            
            <div className="dashboard-content">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <h2 className="section-title" style={{ margin: 0 }}>Instructor Dashboard</h2>
                <button 
                  className="search-button" 
                  onClick={() => {
                    setShowCourseWizard(true)
                    setWizardStep(1)
                  }}
                >
                  + Create New Course
                </button>
              </div>

              {/* Metrics Grid with SVG sparklines */}
              <div className="metrics-row">
                <div className="metric-card glass-panel">
                  <span className="metric-label">Total Revenue</span>
                  <span className="metric-value">
                    $4,280.00
                    <span className="metric-delta up">+12.4%</span>
                  </span>
                  <div className="sparkline-container">
                    <svg viewBox="0 0 100 30" width="100%" height="100%">
                      <path d="M0,25 Q15,10 30,18 T60,5 T90,20 L100,8" className="sparkline-path" />
                    </svg>
                  </div>
                </div>
                <div className="metric-card glass-panel">
                  <span className="metric-label">Enrollments</span>
                  <span className="metric-value">
                    446 Students
                    <span className="metric-delta up">+8.1%</span>
                  </span>
                  <div className="sparkline-container">
                    <svg viewBox="0 0 100 30" width="100%" height="100%">
                      <path d="M0,20 Q20,25 40,15 T80,8 L100,5" className="sparkline-path" style={{ stroke: 'var(--accent-secondary)' }} />
                    </svg>
                  </div>
                </div>
                <div className="metric-card glass-panel">
                  <span className="metric-label">Instructor Score</span>
                  <span className="metric-value">4.85 ⭐</span>
                  <div className="sparkline-container">
                    <svg viewBox="0 0 100 30" width="100%" height="100%">
                      <path d="M0,15 Q30,12 60,14 L100,10" className="sparkline-path" style={{ stroke: '#34d399' }} />
                    </svg>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1.25rem' }}>Active Studio Catalog</h3>
                <div className="table-container glass-panel">
                  <table className="lms-table">
                    <thead>
                      <tr>
                        <th>Course Title</th>
                        <th>Students</th>
                        <th>Status</th>
                        <th>Revenue</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {instructorCourses.map((course, idx) => (
                        <tr key={idx}>
                          <td style={{ fontWeight: 6, color: '#ffffff' }}>{course.title}</td>
                          <td>{course.students}</td>
                          <td>
                            <span className={`badge ${
                              course.status === 'Published' ? 'badge-published' : 
                              course.status === 'Pending Review' ? 'badge-review' : 'badge-draft'
                            }`}>
                              {course.status}
                            </span>
                          </td>
                          <td style={{ fontWeight: 7, color: 'var(--text-glow)' }}>{course.revenue}</td>
                          <td>
                            <button className="action-btn">Edit Details</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ================= ADMIN APPROVAL SYSTEM ================= */}
        {activeTab === 'admin' && (
          <div className="dashboard-content">
            <h2 className="section-title">Moderation & Platform Governance</h2>

            <div className="metrics-row">
              <div className="metric-card glass-panel">
                <span className="metric-label">Pending Reviews</span>
                <span className="metric-value">
                  {adminQueue.filter(item => item.status === 'Pending').length} Courses
                </span>
              </div>
              <div className="metric-card glass-panel">
                <span className="metric-label">Total Platform Users</span>
                <span className="metric-value">13,248</span>
              </div>
              <div className="metric-card glass-panel">
                <span className="metric-label">Moderation Health</span>
                <span className="metric-value" style={{ color: '#34d399' }}>99.98% SLA</span>
              </div>
            </div>

            <div>
              <h3 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1.25rem' }}>Course Approvals Queue</h3>
              <div className="table-container glass-panel">
                <table className="lms-table">
                  <thead>
                    <tr>
                      <th>Course Title</th>
                      <th>Instructor</th>
                      <th>Submission Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {adminQueue.map(item => (
                      <tr key={item.id}>
                        <td style={{ fontWeight: 6, color: '#ffffff' }}>
                          <div>{item.title}</div>
                          {item.comments && (
                            <div style={{ fontSize: '0.8rem', color: '#f87171', marginTop: '0.25rem' }}>
                              Feedback: "{item.comments}"
                            </div>
                          )}
                        </td>
                        <td>{item.instructor}</td>
                        <td>{item.date}</td>
                        <td>
                          <span className={`badge ${
                            item.status === 'Approved' ? 'badge-published' : 
                            item.status === 'Pending' ? 'badge-review' : 'badge-draft'
                          }`} style={{
                            backgroundColor: item.status === 'Needs Revision' ? 'rgba(239, 68, 68, 0.12)' : undefined,
                            color: item.status === 'Needs Revision' ? '#f87171' : undefined,
                            borderColor: item.status === 'Needs Revision' ? 'rgba(239, 68, 68, 0.25)' : undefined
                          }}>
                            {item.status}
                          </span>
                        </td>
                        <td>
                          {item.status === 'Pending' ? (
                            <div style={{ display: 'flex' }}>
                              <button 
                                className="action-btn action-btn-approve"
                                onClick={() => handleApprove(item.id)}
                              >
                                Approve
                              </button>
                              <button 
                                className="action-btn action-btn-reject"
                                onClick={() => openRejectModal(item.id)}
                              >
                                Reject
                              </button>
                            </div>
                          ) : (
                            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 5 }}>Locked Decision</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ================= MODAL: MULTI-STEP COURSE CREATION WIZARD ================= */}
      {showCourseWizard && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Create New Course</h3>
              <button className="modal-close-btn" onClick={() => setShowCourseWizard(false)}>✕</button>
            </div>

            {/* Step Indicators */}
            <div className="step-indicator">
              <div className={`step-bubble ${wizardStep >= 1 ? 'active' : ''} ${wizardStep > 1 ? 'completed' : ''}`}>
                1
                <span className="step-label">Basic Info</span>
              </div>
              <div className={`step-bubble ${wizardStep >= 2 ? 'active' : ''} ${wizardStep > 2 ? 'completed' : ''}`}>
                2
                <span className="step-label">Syllabus Builder</span>
              </div>
              <div className={`step-bubble ${wizardStep >= 3 ? 'active' : ''}`}>
                3
                <span className="step-label">Pricing & Submit</span>
              </div>
            </div>

            {/* Step Content */}
            {wizardStep === 1 && (
              <div style={{ marginTop: '2.5rem' }}>
                <div className="form-group">
                  <label className="form-label">Course Title</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Mastering Advanced Tailwind CSS" 
                    className="form-input" 
                    value={newCourseTitle}
                    onChange={(e) => setNewCourseTitle(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select 
                    className="form-input" 
                    value={newCourseCategory}
                    onChange={(e) => setNewCourseCategory(e.target.value)}
                    style={{ background: 'rgba(9, 15, 26, 0.8)', color: 'white' }}
                  >
                    <option value="Development">Development</option>
                    <option value="Design">Design</option>
                    <option value="AI & Science">AI & Science</option>
                    <option value="Business">Business</option>
                  </select>
                </div>
              </div>
            )}

            {wizardStep === 2 && (
              <div style={{ marginTop: '2.5rem' }}>
                <label className="form-label">Add Course Lessons</label>
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  <input 
                    type="text" 
                    placeholder="e.g. Lesson 3: CSS Grid Integration" 
                    className="form-input"
                    value={newLessonInput}
                    onChange={(e) => setNewLessonInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddLesson()}
                  />
                  <button type="button" className="search-button" onClick={handleAddLesson} style={{ padding: '0.5rem 1.25rem' }}>Add</button>
                </div>
                <div style={{ maxHeight: '180px', overflowY: 'auto', background: 'rgba(9,15,26,0.3)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '8px', padding: '0.75rem' }}>
                  {newCourseLessons.length === 0 ? (
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No lessons added yet.</span>
                  ) : (
                    <ol style={{ paddingLeft: '1.2rem', color: 'var(--text-glow)' }}>
                      {newCourseLessons.map((lesson, idx) => (
                        <li key={idx} style={{ marginBottom: '0.4rem', fontSize: '0.95rem' }}>{lesson}</li>
                      ))}
                    </ol>
                  )}
                </div>
              </div>
            )}

            {wizardStep === 3 && (
              <div style={{ marginTop: '2.5rem' }}>
                <div className="form-group">
                  <label className="form-label">Set Course Pricing Tier</label>
                  <select 
                    className="form-input"
                    value={newCoursePrice}
                    onChange={(e) => setNewCoursePrice(e.target.value)}
                    style={{ background: 'rgba(9, 15, 26, 0.8)', color: 'white' }}
                  >
                    <option value="Free">Free Tier</option>
                    <option value="$19.99">$19.99 USD</option>
                    <option value="$49.99">$49.99 USD</option>
                    <option value="$99.99">$99.99 USD</option>
                    <option value="$149.99">$149.99 USD</option>
                  </select>
                </div>
                <div style={{ padding: '1rem', background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: '10px', fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
                  <strong style={{ color: '#ffffff' }}>Notice:</strong> After submission, the course curriculum enters platform moderation queue. An admin reviews the content against AuraLMS publication guidelines within 24 hours.
                </div>
              </div>
            )}

            {/* Modal Navigation Buttons */}
            <div className="modal-actions">
              {wizardStep > 1 ? (
                <button className="modal-cancel-btn" onClick={() => setWizardStep(wizardStep - 1)}>Back</button>
              ) : (
                <button className="modal-cancel-btn" onClick={() => setShowCourseWizard(false)}>Cancel</button>
              )}

              {wizardStep < 3 ? (
                <button className="modal-submit-btn" onClick={() => setWizardStep(wizardStep + 1)}>Continue</button>
              ) : (
                <button className="modal-submit-btn" onClick={handleWizardSubmit}>Submit for Review</button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: STUDENT LEARNING CONSOLE (VIDEO PLAYER) ================= */}
      {showLearningConsole && (
        <div className="modal-backdrop">
          <div className="modal-content" style={{ maxWidth: '900px', padding: '2rem' }}>
            <div className="modal-header" style={{ marginBottom: '1.5rem' }}>
              <div>
                <span className="course-tag" style={{ margin: 0, marginBottom: '0.5rem' }}>Learning Console</span>
                <h3 className="modal-title" style={{ fontSize: '1.4rem' }}>Complete Web Development Bootcamp</h3>
              </div>
              <button className="modal-close-btn" onClick={() => setShowLearningConsole(false)}>✕</button>
            </div>

            {/* Main Learning Console Layout Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: '1.5rem' }}>
              
              {/* Left Column: Simulated Video Player & Tabs */}
              <div>
                <div style={{ width: '100%', height: '260px', background: 'black', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(135deg, rgba(99,102,241,0.2), rgba(168,85,247,0.2))', zIndex: 1 }}></div>
                  <button style={{ zIndex: 10, width: '60px', height: '60px', borderRadius: '50%', border: 'none', background: 'var(--accent-gradient)', color: 'white', fontSize: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 0 20px rgba(99,102,241,0.4)' }}>
                    ▶
                  </button>
                  <div style={{ position: 'absolute', bottom: '12px', left: '12px', zIndex: 10, fontSize: '0.85rem', color: 'white', background: 'rgba(0,0,0,0.5)', padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                    03:42 / 18:50
                  </div>
                </div>

                {/* Sub Tab selection (Notes, Discussion Q&A) */}
                <div style={{ marginTop: '1.5rem' }}>
                  <div style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', display: 'flex', gap: '1.25rem', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
                    <span style={{ fontWeight: 7, color: 'var(--text-glow)', borderBottom: '2px solid var(--accent-primary)', paddingBottom: '0.5rem', cursor: 'pointer' }}>My Lesson Notes</span>
                    <span style={{ fontWeight: 6, color: 'var(--text-muted)', cursor: 'pointer' }}>Q&A Discussions</span>
                  </div>

                  {/* Notes interface */}
                  <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                    <input 
                      type="text" 
                      placeholder="Add a timestamped study note..." 
                      className="form-input"
                      value={currentNotes}
                      onChange={(e) => setCurrentNotes(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSaveNote()}
                    />
                    <button className="search-button" onClick={handleSaveNote} style={{ padding: '0.5rem 1rem' }}>Save</button>
                  </div>
                  <div style={{ maxHeight: '110px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {savedNotes.map((note, idx) => (
                      <div key={idx} style={{ padding: '0.5rem 0.75rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: '8px', fontSize: '0.85rem', display: 'flex', gap: '0.6rem' }}>
                        <span style={{ color: 'var(--accent-primary)', fontWeight: 7 }}>{note.timestamp}</span>
                        <span style={{ color: 'var(--text-main)' }}>{note.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Interactive Course Syllabus list */}
              <div>
                <h4 style={{ fontFamily: 'var(--font-heading)', color: '#ffffff', fontSize: '1.1rem', fontWeight: 7, marginBottom: '0.75rem' }}>Curriculum Schedule</h4>
                <div style={{ maxHeight: '350px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingRight: '0.25rem' }}>
                  {[
                    { title: '1. Section Intro & Setup', duration: '08:14', completed: true },
                    { title: '2. Understanding HTML Boilerplates', duration: '12:35', completed: true },
                    { title: '3. CSS Variables & Deep Architecture', duration: '18:50', completed: false, active: true },
                    { title: '4. Flexbox Layout Deep Dive', duration: '24:10', completed: false },
                    { title: '5. Introduction to React state', duration: '15:20', completed: false },
                    { title: '6. Quiz: CSS & HTML Grid System', duration: '10:00', completed: false }
                  ].map((lesson, idx) => (
                    <div 
                      key={idx} 
                      style={{ 
                        padding: '0.65rem 0.85rem', 
                        background: lesson.active ? 'var(--accent-glow)' : 'rgba(255,255,255,0.01)', 
                        border: lesson.active ? '1px solid rgba(99,102,241,0.3)' : '1px solid rgba(255,255,255,0.03)',
                        borderRadius: '10px',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '0.85rem',
                        cursor: 'pointer'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '1rem' }}>{lesson.completed ? '🟢' : lesson.active ? '⚡' : '🔒'}</span>
                        <span style={{ fontWeight: lesson.active ? 7 : 5, color: lesson.active ? 'var(--text-glow)' : '#ffffff' }}>{lesson.title}</span>
                      </div>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{lesson.duration}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: ADMIN REJECTION COMMENTS FEEDBACK PANEL ================= */}
      {showRejectModal && (
        <div className="modal-backdrop">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="modal-title">Moderator Feedback</h3>
              <button className="modal-close-btn" onClick={() => setShowRejectModal(false)}>✕</button>
            </div>
            
            <div style={{ marginTop: '1.5rem' }}>
              <div className="form-group">
                <label className="form-label">Reason for Requesting Revision</label>
                <textarea 
                  placeholder="e.g. Please clarify lesson 3. The audio quality has background hiss, and syllabus files are missing links." 
                  className="form-input"
                  style={{ minHeight: '110px', resize: 'vertical', background: 'rgba(9, 15, 26, 0.8)', fontFamily: 'inherit' }}
                  value={rejectFeedback}
                  onChange={(e) => setRejectFeedback(e.target.value)}
                />
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                This message will be sent directly to the instructor. The status will transition to <strong style={{ color: '#f87171' }}>Needs Revision</strong>.
              </p>
            </div>

            <div className="modal-actions">
              <button className="modal-cancel-btn" onClick={() => setShowRejectModal(false)}>Cancel</button>
              <button className="modal-submit-btn" style={{ background: 'var(--danger)', boxShadow: '0 4px 12px rgba(239, 68, 68, 0.25)' }} onClick={handleConfirmReject}>Confirm Revision Request</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default App
