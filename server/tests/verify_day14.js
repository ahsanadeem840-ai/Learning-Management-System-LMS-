/**
 * Automated Verification Test Suite for Din 14 (Dashboard Layout & Navigation)
 * Project: Freelancer CRM & Project Tracker
 */

const fs = require('fs');
const path = require('path');

let testsPassed = 0;
let testsFailed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  \x1b[32m✔\x1b[0m ${message}`);
    testsPassed++;
  } else {
    console.error(`  \x1b[31m✖\x1b[0m ${message}`);
    testsFailed++;
  }
}

async function runDay14Tests() {
  console.log('\n======================================================');
  console.log('🚀 Running Din 14 Automated Verification Test Suite');
  console.log('   Dashboard Layout, Sidebar, Navbar & Dynamic Stats Cards');
  console.log('======================================================\n');

  const rootDir = path.resolve(__dirname, '../..');
  const clientDir = path.join(rootDir, 'client');

  // Test 1: Layout Wrapper Component
  console.log('--- Step 1: App Layout Component Structure ---');
  const layoutPath = path.join(clientDir, 'src/components/layout/Layout.jsx');
  assert(fs.existsSync(layoutPath), 'client/src/components/layout/Layout.jsx exists');

  if (fs.existsSync(layoutPath)) {
    const layoutContent = fs.readFileSync(layoutPath, 'utf8');
    assert(layoutContent.includes('Sidebar'), 'Layout.jsx imports & mounts Sidebar component');
    assert(layoutContent.includes('Navbar'), 'Layout.jsx imports & mounts Navbar component');
    assert(layoutContent.includes('Outlet'), 'Layout.jsx includes React Router Outlet for page rendering');
    assert(layoutContent.includes('sidebarOpen'), 'Layout.jsx manages responsive sidebar toggle state');
  }

  // Test 2: Sidebar Component & Navigation Links
  console.log('\n--- Step 2: Sidebar Navigation & User Profile ---');
  const sidebarPath = path.join(clientDir, 'src/components/layout/Sidebar.jsx');
  assert(fs.existsSync(sidebarPath), 'client/src/components/layout/Sidebar.jsx exists');

  if (fs.existsSync(sidebarPath)) {
    const sidebarContent = fs.readFileSync(sidebarPath, 'utf8');
    assert(sidebarContent.includes('NavLink') || sidebarContent.includes('Link'), 'Sidebar uses React Router links');
    assert(sidebarContent.includes("path: '/'") && sidebarContent.includes("Dashboard"), 'Sidebar includes Dashboard route link');
    assert(sidebarContent.includes("path: '/clients'"), 'Sidebar includes Clients CRM route link');
    assert(sidebarContent.includes("path: '/projects'"), 'Sidebar includes Projects route link');
    assert(sidebarContent.includes("path: '/tasks'"), 'Sidebar includes Kanban Tasks route link');
    assert(sidebarContent.includes("path: '/invoices'"), 'Sidebar includes Invoices route link');
    assert(sidebarContent.includes('useAuth'), 'Sidebar integrates with AuthContext for user profile');
    assert(sidebarContent.includes('getInitials'), 'Sidebar generates user avatar initials');
    assert(sidebarContent.includes('logout'), 'Sidebar includes session logout action handler');
  }

  // Test 3: Navbar Component, Breadcrumbs & Search
  console.log('\n--- Step 3: Topbar Navbar & Breadcrumb Engine ---');
  const navbarPath = path.join(clientDir, 'src/components/layout/Navbar.jsx');
  assert(fs.existsSync(navbarPath), 'client/src/components/layout/Navbar.jsx exists');

  if (fs.existsSync(navbarPath)) {
    const navbarContent = fs.readFileSync(navbarPath, 'utf8');
    assert(navbarContent.includes('useLocation'), 'Navbar reads current location for dynamic breadcrumbs');
    assert(navbarContent.includes('onToggleSidebar'), 'Navbar provides mobile drawer toggle trigger');
    assert(navbarContent.includes('API :5000') || navbarContent.includes('status-dot'), 'Navbar displays live API connection status badge');
    assert(navbarContent.includes('search-input'), 'Navbar includes global search input element');
    assert(navbarContent.includes('notificationsOpen') || navbarContent.includes('Bell'), 'Navbar includes interactive notification bell menu');
    assert(navbarContent.includes('/invoices'), 'Navbar includes quick action shortcut to Invoices');
  }

  // Test 4: Dashboard Page & 4 Metric Stats Cards
  console.log('\n--- Step 4: Dashboard Page Structure & Stats Cards ---');
  const dashboardPath = path.join(clientDir, 'src/pages/Dashboard.jsx');
  assert(fs.existsSync(dashboardPath), 'client/src/pages/Dashboard.jsx exists');

  if (fs.existsSync(dashboardPath)) {
    const dashboardContent = fs.readFileSync(dashboardPath, 'utf8');
    assert(dashboardContent.includes('Welcome back'), 'Dashboard includes welcome hero banner');
    assert(dashboardContent.includes('Total Clients') || dashboardContent.includes('stat-indigo'), 'Dashboard includes Total Clients stat card');
    assert(dashboardContent.includes('Active Projects') || dashboardContent.includes('stat-cyan'), 'Dashboard includes Active Projects stat card');
    assert(dashboardContent.includes('Kanban Tasks') || dashboardContent.includes('stat-emerald'), 'Dashboard includes Kanban Tasks stat card');
    assert(dashboardContent.includes('Total Revenue') || dashboardContent.includes('stat-amber'), 'Dashboard includes Total Revenue stat card');
    assert(dashboardContent.includes('grid-4'), 'Dashboard uses 4-column responsive stats grid layout');
    assert(dashboardContent.includes('data-table'), 'Dashboard includes project & invoice activity tables');
  }

  // Test 5: Production Build Output
  console.log('\n--- Step 5: Vite Build Artifact Verification ---');
  const distDir = path.join(clientDir, 'dist');
  assert(fs.existsSync(distDir), 'client/dist build directory exists');

  if (fs.existsSync(distDir)) {
    const assetsDir = path.join(distDir, 'assets');
    assert(fs.existsSync(assetsDir), 'client/dist/assets directory exists');
  }

  // Summary
  console.log('\n======================================================');
  console.log(`Results: ${testsPassed} passed, ${testsFailed} failed`);
  console.log('======================================================\n');

  if (testsFailed > 0) {
    process.exit(1);
  } else {
    console.log('🎉 Din 14 Dashboard Layout & Navigation verification SUCCESSFUL!\n');
    process.exit(0);
  }
}

runDay14Tests();
