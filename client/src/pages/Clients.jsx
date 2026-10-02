import React, { useState, useEffect, useCallback } from 'react';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  Mail, 
  Phone, 
  Building2, 
  DollarSign,
  ExternalLink,
  MoreVertical,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Edit2,
  Trash2,
  X,
  Globe,
  Tag,
  DollarSign as CurrencyIcon,
  TrendingUp,
  Clock,
  Sparkles
} from 'lucide-react';
import { clientsApi } from '../services/api';

// Initial fallback client data for demo/offline resilience
const fallbackClients = [
  { _id: '1', name: 'Dr. Sarah Mitchell', company: 'CarePulse Global', email: 'sarah@carepulse.io', phone: '+1 (555) 234-5678', status: 'active', currency: 'USD', totalBilled: 12500, totalPaid: 12500, tags: ['Healthcare', 'Enterprise'], notes: 'Key enterprise account' },
  { _id: '2', name: 'Marcus Vance', company: 'CloudScale Inc', email: 'marcus@cloudscale.net', phone: '+1 (555) 876-5432', status: 'active', currency: 'USD', totalBilled: 8400, totalPaid: 6300, tags: ['SaaS', 'Cloud'], notes: 'Monthly retainer contract' },
  { _id: '3', name: 'Elena Rostova', company: 'Aether Capital', email: 'elena@aethercap.com', phone: '+44 20 7946 0912', status: 'prospect', currency: 'USD', totalBilled: 18000, totalPaid: 6000, tags: ['Fintech', 'Crypto'], notes: 'Proposal submitted for Q4' },
  { _id: '4', name: 'Julian Drake', company: 'Nordic Apparel', email: 'julian@nordicapparel.se', phone: '+46 8 123 4567', status: 'active', currency: 'USD', totalBilled: 4200, totalPaid: 4200, tags: ['E-Commerce'], notes: 'Shopify Plus migration' },
  { _id: '5', name: 'Kenji Takahashi', company: 'NeoTokyo Interactive', email: 'kenji@neotokyo.jp', phone: '+81 3 5555 0143', status: 'lead', currency: 'USD', totalBilled: 0, totalPaid: 0, tags: ['Gaming', 'Web3'], notes: 'Initial outreach via LinkedIn' },
  { _id: '6', name: 'Amara Okafor', company: 'Sahara Logistics', email: 'amara@saharalog.ng', phone: '+234 1 234 5678', status: 'lead', currency: 'USD', totalBilled: 0, totalPaid: 0, tags: ['Logistics'], notes: 'Discovery call scheduled' },
];

export default function Clients() {
  const [clients, setClients] = useState([]);
  const [stats, setStats] = useState({ total: 0, active: 0, prospects: 0, leads: 0, totalBilled: 0, totalPaid: 0, balanceOutstanding: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [viewingClient, setViewingClient] = useState(null);
  const [deletingClientId, setDeletingClientId] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    website: '',
    status: 'lead',
    currency: 'USD',
    notes: '',
    tags: '',
  });

  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Fetch Clients & Pipeline Stats from Axios API
  const fetchClientsAndStats = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = {};
      if (statusFilter !== 'all') params.status = statusFilter;
      if (searchQuery.trim()) params.search = searchQuery.trim();

      const [clientsRes, statsRes] = await Promise.all([
        clientsApi.getAll(params),
        clientsApi.getStats().catch(() => null)
      ]);

      if (clientsRes.data && clientsRes.data.success) {
        setClients(clientsRes.data.data || []);
      } else {
        setClients(clientsRes.data || []);
      }

      if (statsRes?.data?.data) {
        const s = statsRes.data.data;
        setStats({
          total: s.total || 0,
          active: s.active || 0,
          prospects: s.prospects || 0,
          leads: s.leads || 0,
          totalBilled: s.financials?.totalBilled || 0,
          totalPaid: s.financials?.totalPaid || 0,
          balanceOutstanding: s.financials?.balanceOutstanding || 0,
        });
      } else {
        // Compute stats locally if stats endpoint unavailable
        const list = clientsRes.data?.data || fallbackClients;
        const totalBilled = list.reduce((acc, c) => acc + (c.totalBilled || 0), 0);
        const totalPaid = list.reduce((acc, c) => acc + (c.totalPaid || 0), 0);
        setStats({
          total: list.length,
          active: list.filter(c => c.status === 'active').length,
          prospects: list.filter(c => c.status === 'prospect').length,
          leads: list.filter(c => c.status === 'lead').length,
          totalBilled,
          totalPaid,
          balanceOutstanding: totalBilled - totalPaid,
        });
      }
    } catch (err) {
      console.warn('Backend API connection failed, loading fallback client state:', err.message);
      // Fallback for seamless demo/testing
      const filtered = fallbackClients.filter(c => {
        const matchStatus = statusFilter === 'all' || c.status === statusFilter;
        const matchSearch = searchQuery === '' || 
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.email.toLowerCase().includes(searchQuery.toLowerCase());
        return matchStatus && matchSearch;
      });

      setClients(filtered);
      const totalBilled = fallbackClients.reduce((acc, c) => acc + c.totalBilled, 0);
      const totalPaid = fallbackClients.reduce((acc, c) => acc + c.totalPaid, 0);
      setStats({
        total: fallbackClients.length,
        active: fallbackClients.filter(c => c.status === 'active').length,
        prospects: fallbackClients.filter(c => c.status === 'prospect').length,
        leads: fallbackClients.filter(c => c.status === 'lead').length,
        totalBilled,
        totalPaid,
        balanceOutstanding: totalBilled - totalPaid,
      });
      setError('Live backend API offline. Displaying local cache & mock clients.');
    } finally {
      setLoading(false);
    }
  }, [statusFilter, searchQuery]);

  useEffect(() => {
    fetchClientsAndStats();
  }, [fetchClientsAndStats]);

  // Open Modal Helpers
  const handleOpenAddModal = () => {
    setFormData({
      name: '',
      email: '',
      company: '',
      phone: '',
      website: '',
      status: 'lead',
      currency: 'USD',
      notes: '',
      tags: '',
    });
    setFormError('');
    setEditingClient(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (client) => {
    setFormData({
      name: client.name || '',
      email: client.email || '',
      company: client.company || '',
      phone: client.phone || '',
      website: client.website || '',
      status: client.status || 'lead',
      currency: client.currency || 'USD',
      notes: client.notes || '',
      tags: Array.isArray(client.tags) ? client.tags.join(', ') : client.tags || '',
    });
    setFormError('');
    setEditingClient(client);
    setIsAddModalOpen(true);
  };

  // Submit Handler for Add / Edit Client via Axios
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.name.trim() || !formData.email.trim()) {
      setFormError('Client name and email address are required.');
      return;
    }

    setSubmitting(true);

    const payload = {
      ...formData,
      tags: formData.tags ? formData.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
    };

    try {
      if (editingClient) {
        await clientsApi.update(editingClient._id, payload);
      } else {
        await clientsApi.create(payload);
      }
      setIsAddModalOpen(false);
      fetchClientsAndStats();
    } catch (err) {
      const errMsg = err.response?.data?.message || err.message || 'Failed to save client';
      
      // Fallback local state update if backend offline
      if (editingClient) {
        setClients(prev => prev.map(c => c._id === editingClient._id ? { ...c, ...payload } : c));
      } else {
        const newClient = {
          _id: Date.now().toString(),
          ...payload,
          totalBilled: 0,
          totalPaid: 0,
        };
        setClients(prev => [newClient, ...prev]);
      }
      setIsAddModalOpen(false);
    } finally {
      setSubmitting(false);
    }
  };

  // Delete Client Handler via Axios
  const handleDeleteClient = async (id) => {
    try {
      await clientsApi.delete(id);
    } catch (err) {
      console.warn('Axios delete failed, updating local state:', err.message);
    } finally {
      setClients(prev => prev.filter(c => c._id !== id));
      setDeletingClientId(null);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active': return <span className="badge badge-active">Active</span>;
      case 'prospect': return <span className="badge badge-prospect">Prospect</span>;
      case 'lead': return <span className="badge badge-lead">Lead</span>;
      default: return <span className="badge badge-inactive">Inactive</span>;
    }
  };

  const getInitials = (name) => {
    if (!name) return 'C';
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      
      {/* Header Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#818cf8', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <Sparkles size={14} /> CRM Pipeline &amp; Client Directory
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#fff', margin: '0.2rem 0 0 0', letterSpacing: '-0.02em' }}>
            Clients Management
          </h2>
          <p style={{ fontSize: '0.85rem', color: '#94a3b8', margin: 0 }}>
            Track client accounts, leads, deals, and revenue balances connected to backend REST API (`/api/clients`)
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button className="btn-secondary" onClick={fetchClientsAndStats} title="Refresh Client List">
            <RefreshCw size={16} className={loading ? 'spin-icon' : ''} />
            <span>Sync API</span>
          </button>
          <button className="btn-primary" onClick={handleOpenAddModal}>
            <UserPlus size={16} />
            <span>Add New Client</span>
          </button>
        </div>
      </div>

      {/* Backend API Notice Banner */}
      {error && (
        <div style={{
          padding: '0.85rem 1.2rem',
          background: 'rgba(245, 158, 11, 0.1)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          borderRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          color: '#fbbf24',
          fontSize: '0.85rem',
        }}>
          <AlertCircle size={18} />
          <div style={{ flex: 1 }}>{error}</div>
          <button onClick={fetchClientsAndStats} style={{ background: 'none', border: 'none', color: '#fbbf24', cursor: 'pointer', fontWeight: 700, fontSize: '0.8rem' }}>
            Retry
          </button>
        </div>
      )}

      {/* 4 Overview Stat Cards */}
      <div className="grid-4">
        <div className="glass-card stat-card stat-indigo">
          <div className="stat-info">
            <span className="stat-label">Total Clients</span>
            <span className="stat-value">{stats.total}</span>
            <div className="stat-trend positive">
              <span>{stats.active} Active accounts</span>
            </div>
          </div>
          <div className="stat-icon-wrapper stat-icon-indigo">
            <Users size={24} />
          </div>
        </div>

        <div className="glass-card stat-card stat-cyan">
          <div className="stat-info">
            <span className="stat-label">Active Prospects</span>
            <span className="stat-value">{stats.prospects}</span>
            <div className="stat-trend neutral">
              <span>High conversion potential</span>
            </div>
          </div>
          <div className="stat-icon-wrapper stat-icon-cyan">
            <TrendingUp size={24} />
          </div>
        </div>

        <div className="glass-card stat-card stat-emerald">
          <div className="stat-info">
            <span className="stat-label">Total Billed</span>
            <span className="stat-value">${(stats.totalBilled || 0).toLocaleString()}</span>
            <div className="stat-trend positive">
              <span>${(stats.totalPaid || 0).toLocaleString()} Collected</span>
            </div>
          </div>
          <div className="stat-icon-wrapper stat-icon-emerald">
            <DollarSign size={24} />
          </div>
        </div>

        <div className="glass-card stat-card stat-amber">
          <div className="stat-info">
            <span className="stat-label">Balance Outstanding</span>
            <span className="stat-value">${(stats.balanceOutstanding || 0).toLocaleString()}</span>
            <div className="stat-trend neutral">
              <span>Pending invoice collection</span>
            </div>
          </div>
          <div className="stat-icon-wrapper stat-icon-amber">
            <Clock size={24} />
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="glass-card" style={{ padding: '1rem 1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        
        {/* Pipeline Stage Tabs */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'All Clients', count: stats.total },
            { id: 'active', label: 'Active', count: stats.active },
            { id: 'prospect', label: 'Prospects', count: stats.prospects },
            { id: 'lead', label: 'Leads', count: stats.leads },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setStatusFilter(tab.id)}
              style={{
                padding: '0.45rem 0.9rem',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: 600,
                background: statusFilter === tab.id ? 'var(--primary-gradient)' : 'rgba(255,255,255,0.04)',
                color: statusFilter === tab.id ? '#fff' : '#94a3b8',
                border: statusFilter === tab.id ? 'none' : '1px solid var(--border-subtle)',
                transition: 'all 0.15s ease',
                cursor: 'pointer',
              }}
            >
              {tab.label} ({tab.count})
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div style={{ position: 'relative', width: '280px' }}>
          <Search size={15} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
          <input
            type="text"
            className="form-control"
            style={{ paddingLeft: '2.2rem', paddingBottom: '0.45rem', paddingTop: '0.45rem', fontSize: '0.82rem' }}
            placeholder="Search by name, company or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Clients Table View */}
      <div className="glass-card" style={{ padding: 0, overflow: 'hidden' }}>
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: '#94a3b8' }}>
            <RefreshCw size={24} className="spin-icon" style={{ marginBottom: '0.5rem' }} />
            <div>Loading clients directory via Axios API...</div>
          </div>
        ) : clients.length === 0 ? (
          <div style={{ padding: '3.5rem 1.5rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
            <Users size={42} style={{ color: '#475569' }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#f8fafc', margin: 0 }}>No Clients Found</h3>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', maxWidth: '400px', margin: 0 }}>
              {searchQuery || statusFilter !== 'all' 
                ? 'No clients match your selected filter or search query.'
                : 'Your CRM pipeline is empty. Click below to add your first client.'}
            </p>
            <button className="btn-primary" onClick={handleOpenAddModal} style={{ marginTop: '0.5rem' }}>
              <UserPlus size={16} />
              <span>Add First Client</span>
            </button>
          </div>
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Client &amp; Company</th>
                  <th>Contact Info</th>
                  <th>Pipeline Stage</th>
                  <th>Total Billed</th>
                  <th>Total Paid</th>
                  <th>Tags</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {clients.map((client) => (
                  <tr key={client._id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.35), rgba(139, 92, 246, 0.45))',
                          border: '1px solid rgba(99, 102, 241, 0.4)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          color: '#c7d2fe',
                          flexShrink: 0,
                        }}>
                          {getInitials(client.name)}
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <span style={{ fontWeight: 600, color: '#fff', fontSize: '0.9rem' }}>{client.name}</span>
                          <span style={{ fontSize: '0.75rem', color: '#94a3b8', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                            <Building2 size={12} /> {client.company || 'Individual Client'}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', fontSize: '0.78rem' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#cbd5e1' }}>
                          <Mail size={12} color="#818cf8" /> {client.email}
                        </span>
                        {client.phone && (
                          <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#94a3b8' }}>
                            <Phone size={12} color="#34d399" /> {client.phone}
                          </span>
                        )}
                      </div>
                    </td>
                    <td>{getStatusBadge(client.status)}</td>
                    <td style={{ color: '#fff', fontWeight: 700 }}>
                      ${(client.totalBilled || 0).toLocaleString()}
                    </td>
                    <td>
                      <span style={{ color: '#34d399', fontWeight: 700 }}>${(client.totalPaid || 0).toLocaleString()}</span>
                      {(client.totalBilled || 0) > (client.totalPaid || 0) && (
                        <span style={{ display: 'block', fontSize: '0.7rem', color: '#fb7185' }}>
                          ${((client.totalBilled || 0) - (client.totalPaid || 0)).toLocaleString()} due
                        </span>
                      )}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '0.3rem', flexWrap: 'wrap' }}>
                        {Array.isArray(client.tags) && client.tags.length > 0 ? (
                          client.tags.slice(0, 2).map((t, idx) => (
                            <span key={idx} style={{
                              fontSize: '0.7rem',
                              padding: '2px 7px',
                              borderRadius: '4px',
                              background: 'rgba(255,255,255,0.05)',
                              border: '1px solid rgba(255,255,255,0.1)',
                              color: '#94a3b8',
                            }}>
                              {t}
                            </span>
                          ))
                        ) : (
                          <span style={{ fontSize: '0.72rem', color: '#64748b' }}>-</span>
                        )}
                      </div>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.4rem' }}>
                        <button className="btn-secondary btn-sm" onClick={() => setViewingClient(client)} title="View Details">
                          <ExternalLink size={14} />
                        </button>
                        <button className="btn-secondary btn-sm" onClick={() => handleOpenEditModal(client)} title="Edit Client">
                          <Edit2 size={14} />
                        </button>
                        <button className="btn-secondary btn-sm" onClick={() => setDeletingClientId(client._id)} title="Delete Client" style={{ color: '#fb7185' }}>
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ADD / EDIT CLIENT MODAL */}
      {isAddModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '1rem',
        }}>
          <div className="glass-card" style={{ width: '100%', maxWidth: '580px', maxHeight: '90vh', overflowY: 'auto', border: '1px solid var(--border-subtle)', background: '#0f172a' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                {editingClient ? 'Edit Client Account' : 'Add New Client to CRM'}
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            {formError && (
              <div style={{ padding: '0.75rem', background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.3)', borderRadius: '8px', color: '#fb7185', fontSize: '0.82rem', marginBottom: '1rem' }}>
                {formError}
              </div>
            )}

            <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Contact Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="e.g. Dr. Sarah Mitchell"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="sarah@carepulse.io"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Company Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="CarePulse Global"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="+1 (555) 234-5678"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="form-group">
                  <label className="form-label">Pipeline Stage</label>
                  <select
                    className="form-control"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="lead">Lead (Initial Contact)</option>
                    <option value="prospect">Prospect (Proposal Sent)</option>
                    <option value="active">Active (Contract Signed)</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Currency</label>
                  <select
                    className="form-control"
                    value={formData.currency}
                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="CAD">CAD ($)</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Tags (comma separated)</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Healthcare, Enterprise, Retainer"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Notes &amp; Requirements</label>
                <textarea
                  className="form-control"
                  rows="3"
                  placeholder="Add background context, budget expectations, or notes..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" className="btn-secondary" onClick={() => setIsAddModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={submitting}>
                  {submitting ? 'Saving...' : editingClient ? 'Update Client' : 'Create Client'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW CLIENT DETAILS MODAL */}
      {viewingClient && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '1rem',
        }}>
          <div className="glass-card" style={{ width: '100%', maxWidth: '520px', background: '#0f172a' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <div style={{
                  width: '42px', height: '42px', borderRadius: '50%',
                  background: 'var(--primary-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, color: '#fff'
                }}>
                  {getInitials(viewingClient.name)}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', margin: 0 }}>{viewingClient.name}</h3>
                  <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{viewingClient.company || 'Individual Account'}</span>
                </div>
              </div>
              <button onClick={() => setViewingClient(null)} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
                <span style={{ color: '#94a3b8' }}>Pipeline Status</span>
                {getStatusBadge(viewingClient.status)}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div style={{ padding: '0.75rem', background: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.2)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.75rem', color: '#a5b4fc' }}>Total Billed</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>${(viewingClient.totalBilled || 0).toLocaleString()}</div>
                </div>
                <div style={{ padding: '0.75rem', background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '8px' }}>
                  <div style={{ fontSize: '0.75rem', color: '#6ee7b7' }}>Total Paid</div>
                  <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff' }}>${(viewingClient.totalPaid || 0).toLocaleString()}</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', color: '#cbd5e1' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Mail size={14} color="#818cf8" /> {viewingClient.email}
                </div>
                {viewingClient.phone && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Phone size={14} color="#34d399" /> {viewingClient.phone}
                  </div>
                )}
                {viewingClient.notes && (
                  <div style={{ marginTop: '0.5rem', padding: '0.75rem', background: 'rgba(255,255,255,0.02)', borderRadius: '8px', color: '#94a3b8', fontSize: '0.8rem' }}>
                    <strong>Notes:</strong> {viewingClient.notes}
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '0.5rem' }}>
                <button className="btn-secondary" onClick={() => setViewingClient(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deletingClientId && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(5px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          padding: '1rem',
        }}>
          <div className="glass-card" style={{ width: '100%', maxWidth: '400px', background: '#0f172a', textAlign: 'center', padding: '1.75rem' }}>
            <Trash2 size={40} style={{ color: '#fb7185', marginBottom: '0.75rem' }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fff', margin: 0 }}>Delete Client Account?</h3>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', margin: '0.5rem 0 1.25rem 0' }}>
              Are you sure you want to delete this client? This action cannot be undone.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem' }}>
              <button className="btn-secondary" onClick={() => setDeletingClientId(null)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={() => handleDeleteClient(deletingClientId)} style={{ background: '#e11d48' }}>
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
