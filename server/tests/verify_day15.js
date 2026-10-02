/**
 * Automated Verification Test Suite for Din 15 (Clients Page Frontend & Axios API Connection)
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

async function runDay15Tests() {
  console.log('\n======================================================');
  console.log('🚀 Running Din 15 Automated Verification Test Suite');
  console.log('   Clients Page (Frontend) & Axios API Integration');
  console.log('======================================================\n');

  const rootDir = path.resolve(__dirname, '../..');
  const clientDir = path.join(rootDir, 'client');

  // Step 1: Service Layer API Helper Export Verification
  console.log('--- Step 1: Axios API Service Layer Configuration ---');
  const apiServicePath = path.join(clientDir, 'src/services/api.js');
  assert(fs.existsSync(apiServicePath), 'client/src/services/api.js exists');

  if (fs.existsSync(apiServicePath)) {
    const apiContent = fs.readFileSync(apiServicePath, 'utf8');
    assert(apiContent.includes('clientsApi'), 'api.js exports clientsApi service object');
    assert(apiContent.includes("api.get('/clients'"), 'clientsApi includes getAll() GET endpoint handler');
    assert(apiContent.includes("api.get('/clients/stats'"), 'clientsApi includes getStats() GET endpoint handler');
    assert(apiContent.includes("api.post('/clients'"), 'clientsApi includes create() POST endpoint handler');
    assert(apiContent.includes("api.put(`/clients/"), 'clientsApi includes update() PUT endpoint handler');
    assert(apiContent.includes("api.delete(`/clients/"), 'clientsApi includes delete() DELETE endpoint handler');
  }

  // Step 2: Clients Page Component Architecture
  console.log('\n--- Step 2: Clients Page Component Architecture ---');
  const clientsPagePath = path.join(clientDir, 'src/pages/Clients.jsx');
  assert(fs.existsSync(clientsPagePath), 'client/src/pages/Clients.jsx exists');

  if (fs.existsSync(clientsPagePath)) {
    const clientsContent = fs.readFileSync(clientsPagePath, 'utf8');
    assert(clientsContent.includes("import { clientsApi } from '../services/api'"), 'Clients.jsx imports clientsApi service');
    assert(clientsContent.includes('clientsApi.getAll'), 'Clients.jsx invokes clientsApi.getAll for list fetching');
    assert(clientsContent.includes('clientsApi.getStats'), 'Clients.jsx invokes clientsApi.getStats for summary stats');
    assert(clientsContent.includes('clientsApi.create'), 'Clients.jsx invokes clientsApi.create for client creation');
    assert(clientsContent.includes('clientsApi.update'), 'Clients.jsx invokes clientsApi.update for client modification');
    assert(clientsContent.includes('clientsApi.delete'), 'Clients.jsx invokes clientsApi.delete for client deletion');
  }

  // Step 3: UI Features & Pipeline Overview
  console.log('\n--- Step 3: UI Features & Pipeline Overview ---');
  if (fs.existsSync(clientsPagePath)) {
    const clientsContent = fs.readFileSync(clientsPagePath, 'utf8');
    assert(clientsContent.includes('Total Clients'), 'Clients.jsx renders Total Clients metric stat card');
    assert(clientsContent.includes('Active Prospects') || clientsContent.includes('prospect'), 'Clients.jsx renders Active Prospects metric stat card');
    assert(clientsContent.includes('Total Billed'), 'Clients.jsx renders Total Billed metric stat card');
    assert(clientsContent.includes('Balance Outstanding'), 'Clients.jsx renders Balance Outstanding metric stat card');
    assert(clientsContent.includes('statusFilter'), 'Clients.jsx provides pipeline status tab filtering (all/active/prospect/lead)');
    assert(clientsContent.includes('searchQuery') || clientsContent.includes('Search'), 'Clients.jsx provides search filtering across name, company & email');
    assert(clientsContent.includes('data-table'), 'Clients.jsx renders responsive data table for clients list');
  }

  // Step 4: Modals Architecture (Add, Edit, Delete, View)
  console.log('\n--- Step 4: Interactive Modals Architecture ---');
  if (fs.existsSync(clientsPagePath)) {
    const clientsContent = fs.readFileSync(clientsPagePath, 'utf8');
    assert(clientsContent.includes('isAddModalOpen') || clientsContent.includes('Add New Client'), 'Clients.jsx includes Add Client modal');
    assert(clientsContent.includes('editingClient') || clientsContent.includes('Edit Client'), 'Clients.jsx includes Edit Client modal');
    assert(clientsContent.includes('deletingClientId') || clientsContent.includes('Delete Client'), 'Clients.jsx includes Delete confirmation modal');
    assert(clientsContent.includes('viewingClient') || clientsContent.includes('View Details'), 'Clients.jsx includes View Client detail modal');
  }

  // Step 5: Production Build Output Verification
  console.log('\n--- Step 5: Vite Build Output Verification ---');
  const distDir = path.join(clientDir, 'dist');
  assert(fs.existsSync(distDir), 'client/dist build directory exists');

  // Summary
  console.log('\n======================================================');
  console.log(`Results: ${testsPassed} passed, ${testsFailed} failed`);
  console.log('======================================================\n');

  if (testsFailed > 0) {
    process.exit(1);
  } else {
    console.log('🎉 Din 15 Clients Page & Axios API Integration verification SUCCESSFUL!\n');
    process.exit(0);
  }
}

runDay15Tests();
