import React, { useState, useEffect } from 'react';
import {
  Shield,
  Key,
  User,
  LogOut,
  Search,
  Filter,
  Building2,
  Trash2,
  Eye,
  RefreshCw,
  AlertCircle,
  ArrowLeft,
  Inbox,
  CheckCheck,
  Send
} from 'lucide-react';
import { apiService } from '../services/api';
import type { EnquiryItem, EnquiryStats } from '../services/api';

interface AdminPageProps {
  onBackToPortfolio: () => void;
}

export const AdminPage: React.FC<AdminPageProps> = ({ onBackToPortfolio }) => {
  const [token, setToken] = useState<string | null>(() => sessionStorage.getItem('admin_token'));
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('Abbas@Demo2026!');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Dashboard Data State
  const [stats, setStats] = useState<EnquiryStats>({ total: 0, new: 0, read: 0, replied: 0 });
  const [enquiries, setEnquiries] = useState<EnquiryItem[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('desc');
  const [selectedEnquiry, setSelectedEnquiry] = useState<EnquiryItem | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [adminNoteInput, setAdminNoteInput] = useState('');

  // Handle Login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setLoginLoading(true);

    try {
      const res = await apiService.login(username, password);
      sessionStorage.setItem('admin_token', res.access_token);
      setToken(res.access_token);
    } catch (err: any) {
      setLoginError(err.message || 'Login failed. Please verify credentials.');
    } finally {
      setLoginLoading(false);
    }
  };

  // Handle Logout
  const handleLogout = () => {
    sessionStorage.removeItem('admin_token');
    setToken(null);
    setSelectedEnquiry(null);
  };

  // Fetch Dashboard Data
  const fetchDashboardData = async () => {
    if (!token) return;
    setLoadingData(true);
    try {
      const [statsRes, enquiriesRes] = await Promise.all([
        apiService.getStats(token),
        apiService.getEnquiries(token, {
          search: searchQuery,
          status: statusFilter,
          sort_order: sortOrder,
        }),
      ]);
      setStats(statsRes);
      setEnquiries(enquiriesRes);
    } catch (err: any) {
      if (err.message.includes('expired') || err.message.includes('401')) {
        handleLogout();
      }
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchDashboardData();
    }
  }, [token, statusFilter, sortOrder]);

  // Handle Search on Enter
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchDashboardData();
  };

  // View Enquiry Detail
  const handleOpenDetail = async (item: EnquiryItem) => {
    setSelectedEnquiry(item);
    setAdminNoteInput(item.admin_notes || '');
    if (token && item.status === 'New') {
      try {
        const updated = await apiService.getEnquiry(token, item.id);
        setSelectedEnquiry(updated);
        // Refresh local list
        setEnquiries((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
        setStats((prev) => ({ ...prev, new: Math.max(0, prev.new - 1), read: prev.read + 1 }));
      } catch (e) {
        // Silent update
      }
    }
  };

  // Update Status
  const handleStatusChange = async (enquiryId: number | string, newStatus: string) => {
    if (!token) return;
    setActionLoading(true);
    try {
      const updated = await apiService.updateEnquiry(token, enquiryId, { status: newStatus });
      setEnquiries((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
      if (selectedEnquiry && selectedEnquiry.id === updated.id) {
        setSelectedEnquiry(updated);
      }
      const statsRes = await apiService.getStats(token);
      setStats(statsRes);
    } catch (err: any) {
      alert(err.message || 'Failed to update status');
    } finally {
      setActionLoading(false);
    }
  };

  // Save Admin Note
  const handleSaveNotes = async () => {
    if (!token || !selectedEnquiry) return;
    setActionLoading(true);
    try {
      const updated = await apiService.updateEnquiry(token, selectedEnquiry.id, {
        admin_notes: adminNoteInput,
      });
      setSelectedEnquiry(updated);
      setEnquiries((prev) => prev.map((e) => (e.id === updated.id ? updated : e)));
    } catch (err: any) {
      alert(err.message || 'Failed to save notes');
    } finally {
      setActionLoading(false);
    }
  };

  // Delete Enquiry
  const handleDelete = async (enquiryId: number | string) => {
    if (!token) return;
    if (!confirm('Are you sure you want to permanently delete this visitor enquiry?')) return;
    setActionLoading(true);
    try {
      await apiService.deleteEnquiry(token, enquiryId);
      setEnquiries((prev) => prev.filter((e) => e.id !== enquiryId && e.enquiry_id !== enquiryId));
      if (selectedEnquiry && (selectedEnquiry.id === enquiryId || selectedEnquiry.enquiry_id === enquiryId)) {
        setSelectedEnquiry(null);
      }
      const statsRes = await apiService.getStats(token);
      setStats(statsRes);
    } catch (err: any) {
      alert(err.message || 'Failed to delete enquiry');
    } finally {
      setActionLoading(false);
    }
  };

  // 1. Render Login Screen if not authenticated
  if (!token) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Ambient Cobalt Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cobalt-600/15 rounded-full blur-[140px] pointer-events-none" />

        <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 rounded-2xl bg-cobalt-600/30 border border-cobalt-500/50 flex items-center justify-center text-cobalt-300 shadow-[0_0_25px_rgba(0,71,171,0.5)]">
              <Shield className="w-7 h-7 text-white" />
            </div>
          </div>
          <h2 className="text-center text-3xl font-extrabold text-white tracking-tight">
            Admin Authentication Portal
          </h2>
          <p className="mt-2 text-center text-xs text-gray-400 font-mono">
            Private Access for Mohammed Abbas S Portfolio Inquiries
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10 px-4">
          <div className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl shadow-2xl space-y-6">
            
            {/* Demo Credentials Note Banner */}
            <div className="p-4 rounded-xl bg-cobalt-950/60 border border-cobalt-500/40 text-xs text-cobalt-200 space-y-1 font-mono">
              <div className="font-semibold text-white flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-cobalt-400" />
                <span>Local Development Demo Credentials:</span>
              </div>
              <div>Username: <span className="text-white font-bold">admin</span></div>
              <div>Password: <span className="text-white font-bold">Abbas@Demo2026!</span></div>
            </div>

            {loginError && (
              <div className="p-3.5 rounded-xl bg-red-950/70 border border-red-500/40 text-xs text-red-200 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-gray-300 mb-1">Admin Username</label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-950 border border-white/10 text-white text-sm focus:border-cobalt-500 focus:ring-1 focus:ring-cobalt-500 outline-none"
                    placeholder="admin"
                  />
                  <User className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-gray-300 mb-1">Admin Password</label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-gray-950 border border-white/10 text-white text-sm focus:border-cobalt-500 focus:ring-1 focus:ring-cobalt-500 outline-none"
                    placeholder="••••••••••••"
                  />
                  <Key className="w-4 h-4 text-gray-500 absolute left-3.5 top-3" />
                </div>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-3 px-4 rounded-xl font-semibold text-white bg-cobalt-600 hover:bg-cobalt-500 shadow-[0_0_20px_rgba(0,71,171,0.5)] transition-all flex items-center justify-center gap-2 mt-2"
              >
                {loginLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Enter Secure Dashboard</span>
                    <Shield className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            <div className="pt-4 border-t border-white/10 text-center">
              <button
                onClick={onBackToPortfolio}
                className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Public Portfolio</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // 2. Render Full Authenticated Admin Dashboard
  return (
    <div className="min-h-screen bg-gray-950 text-white pb-20">
      
      {/* Top Admin Header Bar */}
      <header className="sticky top-0 z-40 bg-gray-950/90 border-b border-white/10 backdrop-blur-md px-4 sm:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToPortfolio}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-colors flex items-center gap-1 text-xs"
              title="Return to Portfolio"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Portfolio</span>
            </button>
            
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-cobalt-600/30 border border-cobalt-500/50 flex items-center justify-center text-cobalt-300">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-bold text-sm sm:text-base tracking-tight">
                Mohammed Abbas S <span className="text-cobalt-400 font-mono text-xs font-normal">| Admin CRM</span>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={fetchDashboardData}
              disabled={loadingData}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-300 hover:text-white transition-colors"
              title="Refresh Records"
            >
              <RefreshCw className={`w-4 h-4 ${loadingData ? 'animate-spin text-cobalt-400' : ''}`} />
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600/20 hover:bg-red-600/30 border border-red-500/30 text-red-300 text-xs font-medium transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Metric Cards (Analytics Overview) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-gray-400">Total Enquiries</span>
              <Inbox className="w-4 h-4 text-cobalt-400" />
            </div>
            <div className="text-3xl font-extrabold text-white mt-2 font-mono">{stats.total}</div>
            <div className="text-[11px] text-gray-400 mt-1">All time inbound submissions</div>
          </div>

          <div className="p-5 rounded-2xl bg-cobalt-950/40 border border-cobalt-500/30 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-cobalt-300">New / Unread</span>
              <div className="w-2.5 h-2.5 rounded-full bg-cobalt-400 animate-pulse" />
            </div>
            <div className="text-3xl font-extrabold text-cobalt-300 mt-2 font-mono">{stats.new}</div>
            <div className="text-[11px] text-cobalt-200/70 mt-1">Pending review</div>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-gray-400">Read Enquiries</span>
              <Eye className="w-4 h-4 text-gray-400" />
            </div>
            <div className="text-3xl font-extrabold text-white mt-2 font-mono">{stats.read}</div>
            <div className="text-[11px] text-gray-400 mt-1">Reviewed by admin</div>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 backdrop-blur-md">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-emerald-300">Replied</span>
              <CheckCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-extrabold text-emerald-300 mt-2 font-mono">{stats.replied}</div>
            <div className="text-[11px] text-emerald-200/70 mt-1">Action completed</div>
          </div>

        </div>

        {/* Search, Filter & Controls Toolbar */}
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-4">
          
          <form onSubmit={handleSearchSubmit} className="relative w-full md:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search name, email, subject, ID..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-gray-900 border border-white/10 text-white text-xs placeholder:text-gray-500 focus:border-cobalt-500 outline-none"
            />
            <Search className="w-4 h-4 text-gray-500 absolute left-3 top-2.5" />
          </form>

          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            {/* Status Filter */}
            <div className="flex items-center gap-1.5 text-xs">
              <Filter className="w-3.5 h-3.5 text-gray-400" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-gray-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:border-cobalt-500 outline-none font-mono"
              >
                <option value="all">All Statuses</option>
                <option value="New">New Only</option>
                <option value="Read">Read Only</option>
                <option value="Replied">Replied Only</option>
              </select>
            </div>

            {/* Sort Order */}
            <div className="flex items-center gap-1.5 text-xs">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="bg-gray-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:border-cobalt-500 outline-none font-mono"
              >
                <option value="desc">Newest First</option>
                <option value="asc">Oldest First</option>
              </select>
            </div>
          </div>

        </div>

        {/* Enquiries Management Table */}
        <div className="rounded-2xl border border-white/10 bg-white/[0.02] overflow-hidden shadow-2xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              
              <thead className="bg-white/5 border-b border-white/10 text-gray-400 font-mono uppercase text-[11px]">
                <tr>
                  <th className="px-5 py-3.5">ID / Status</th>
                  <th className="px-5 py-3.5">Visitor</th>
                  <th className="px-5 py-3.5">Subject & Preview</th>
                  <th className="px-5 py-3.5">Date Received</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-white/5">
                {enquiries.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-400">
                      {loadingData ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-cobalt-500 border-t-transparent rounded-full animate-spin" />
                          <span>Loading enquiries from backend...</span>
                        </div>
                      ) : (
                        'No visitor enquiries found matching current filters.'
                      )}
                    </td>
                  </tr>
                ) : (
                  enquiries.map((enquiry) => (
                    <tr
                      key={enquiry.id}
                      onClick={() => handleOpenDetail(enquiry)}
                      className="hover:bg-white/[0.04] cursor-pointer transition-colors"
                    >
                      {/* ID and Status Badge */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="font-mono text-cobalt-300 font-semibold">{enquiry.enquiry_id}</div>
                        <span
                          className={`inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-mono border ${
                            enquiry.status === 'New'
                              ? 'bg-cobalt-500/20 text-cobalt-300 border-cobalt-500/40'
                              : enquiry.status === 'Replied'
                              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                              : 'bg-white/10 text-gray-300 border-white/20'
                          }`}
                        >
                          {enquiry.status}
                        </span>
                      </td>

                      {/* Visitor Details */}
                      <td className="px-5 py-4 whitespace-nowrap">
                        <div className="font-semibold text-white">{enquiry.full_name}</div>
                        <div className="text-gray-400 text-[11px]">{enquiry.email}</div>
                        {enquiry.organization && (
                          <div className="text-cobalt-400 text-[10px] flex items-center gap-1 mt-0.5">
                            <Building2 className="w-3 h-3" />
                            <span>{enquiry.organization}</span>
                          </div>
                        )}
                      </td>

                      {/* Subject and Message Snippet */}
                      <td className="px-5 py-4">
                        <div className="font-medium text-white line-clamp-1">{enquiry.subject}</div>
                        <div className="text-gray-400 text-[11px] line-clamp-1 mt-0.5 font-light">
                          {enquiry.message}
                        </div>
                      </td>

                      {/* Date */}
                      <td className="px-5 py-4 whitespace-nowrap text-gray-400 font-mono text-[11px]">
                        <div>{new Date(enquiry.created_at).toLocaleDateString()}</div>
                        <div className="text-gray-500 text-[10px]">
                          {new Date(enquiry.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4 whitespace-nowrap text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenDetail(enquiry)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white"
                            title="Read Message"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(enquiry.id)}
                            className="p-1.5 rounded-lg bg-red-600/10 hover:bg-red-600/20 text-red-400 hover:text-red-300"
                            title="Delete Enquiry"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </div>
        </div>

        {/* Message Detail Modal */}
        {selectedEnquiry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
            <div className="w-full max-w-2xl p-6 sm:p-8 rounded-3xl bg-gray-900 border border-white/20 shadow-2xl space-y-6 my-8">
              
              {/* Header */}
              <div className="flex items-start justify-between pb-4 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-bold text-cobalt-400">
                      {selectedEnquiry.enquiry_id}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                        selectedEnquiry.status === 'New'
                          ? 'bg-cobalt-500/20 text-cobalt-300 border-cobalt-500/40'
                          : selectedEnquiry.status === 'Replied'
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                          : 'bg-white/10 text-gray-300 border-white/20'
                      }`}
                    >
                      {selectedEnquiry.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight mt-1">
                    {selectedEnquiry.subject}
                  </h3>
                </div>

                <button
                  onClick={() => setSelectedEnquiry(null)}
                  className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/10"
                >
                  ✕
                </button>
              </div>

              {/* Visitor Contact Info Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-gray-950 border border-white/10">
                  <div className="text-gray-400 font-mono text-[10px] uppercase">Visitor Name</div>
                  <div className="font-semibold text-white mt-0.5">{selectedEnquiry.full_name}</div>
                  <a
                    href={`mailto:${selectedEnquiry.email}`}
                    className="text-cobalt-300 hover:underline block mt-1"
                  >
                    {selectedEnquiry.email}
                  </a>
                </div>

                <div className="p-3.5 rounded-xl bg-gray-950 border border-white/10">
                  <div className="text-gray-400 font-mono text-[10px] uppercase">Organization & Phone</div>
                  <div className="text-white mt-0.5">{selectedEnquiry.organization || 'Not specified'}</div>
                  <div className="text-gray-300 mt-1">{selectedEnquiry.phone || 'No phone provided'}</div>
                </div>
              </div>

              {/* Complete Message Content */}
              <div>
                <div className="text-xs font-mono uppercase text-gray-400 mb-2">Message Body</div>
                <div className="p-5 rounded-2xl bg-gray-950 border border-white/10 text-sm text-gray-200 leading-relaxed font-light whitespace-pre-wrap">
                  {selectedEnquiry.message}
                </div>
              </div>

              {/* Status Updater Buttons */}
              <div className="space-y-2">
                <div className="text-xs font-mono uppercase text-gray-400">Manage Status</div>
                <div className="flex flex-wrap gap-2">
                  <button
                    disabled={actionLoading}
                    onClick={() => handleStatusChange(selectedEnquiry.id, 'New')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono border transition-all ${
                      selectedEnquiry.status === 'New'
                        ? 'bg-cobalt-600 border-cobalt-400 text-white'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                    }`}
                  >
                    Mark as New
                  </button>

                  <button
                    disabled={actionLoading}
                    onClick={() => handleStatusChange(selectedEnquiry.id, 'Read')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono border transition-all ${
                      selectedEnquiry.status === 'Read'
                        ? 'bg-blue-600 border-blue-400 text-white'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                    }`}
                  >
                    Mark as Read
                  </button>

                  <button
                    disabled={actionLoading}
                    onClick={() => handleStatusChange(selectedEnquiry.id, 'Replied')}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono border transition-all ${
                      selectedEnquiry.status === 'Replied'
                        ? 'bg-emerald-600 border-emerald-400 text-white'
                        : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'
                    }`}
                  >
                    Mark as Replied
                  </button>
                </div>
              </div>

              {/* Admin Internal Notes */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="uppercase text-gray-400">Internal Admin Notes</span>
                  <button
                    onClick={handleSaveNotes}
                    disabled={actionLoading}
                    className="text-cobalt-400 hover:text-cobalt-300 font-semibold"
                  >
                    Save Notes
                  </button>
                </div>
                <textarea
                  rows={2}
                  value={adminNoteInput}
                  onChange={(e) => setAdminNoteInput(e.target.value)}
                  placeholder="Record interview date, followup remarks, or internal logs..."
                  className="w-full px-3 py-2 rounded-xl bg-gray-950 border border-white/10 text-xs text-white focus:border-cobalt-500 outline-none resize-none"
                />
              </div>

              {/* Footer Modal Actions */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => handleDelete(selectedEnquiry.id)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-red-400 hover:bg-red-500/10 border border-red-500/20"
                >
                  Delete Record
                </button>

                <div className="flex items-center gap-3">
                  <a
                    href={`mailto:${selectedEnquiry.email}?subject=Re: ${encodeURIComponent(selectedEnquiry.subject)}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium text-white bg-cobalt-600 hover:bg-cobalt-500 shadow-md"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Reply via Email</span>
                  </a>

                  <button
                    onClick={() => setSelectedEnquiry(null)}
                    className="px-4 py-2 rounded-xl text-xs text-gray-400 hover:text-white"
                  >
                    Close
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </main>

    </div>
  );
};
