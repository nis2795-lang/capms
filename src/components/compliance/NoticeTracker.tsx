import React, { useState } from 'react';
import { 
  Landmark, AlertTriangle, Search, Filter, 
  Gavel, CheckCircle2, AlertCircle, Plus, 
  Clock, MoreVertical, ChevronRight, FileText
} from 'lucide-react';

interface Notice {
  id: string;
  clientName: string;
  department: 'Income Tax' | 'GST' | 'MCA' | 'TDS';
  section: string;
  ay: string;
  receivedDate: string;
  dueDate: string;
  status: 'Received' | 'Drafting Reply' | 'Client Review' | 'Submitted' | 'Closed';
  demandAmount: number;
  assignee: string;
  hasHearing: boolean;
  hearingDate?: string;
}

const MOCK_NOTICES: Notice[] = [
  {
    id: 'NOT-26-001',
    clientName: 'ABC Industries Pvt Ltd',
    department: 'Income Tax',
    section: 'Sec 143(2) - Scrutiny',
    ay: '2023-24',
    receivedDate: '01 Oct 2026',
    dueDate: '15 Oct 2026',
    status: 'Drafting Reply',
    demandAmount: 1250000,
    assignee: 'Vikram',
    hasHearing: true,
    hearingDate: '20 Oct 2026'
  },
  {
    id: 'NOT-26-002',
    clientName: 'XYZ Enterprises',
    department: 'GST',
    section: 'ASMT-10',
    ay: '2024-25',
    receivedDate: '05 Oct 2026',
    dueDate: '20 Oct 2026',
    status: 'Received',
    demandAmount: 0,
    assignee: 'Anita',
    hasHearing: false
  },
  {
    id: 'NOT-26-003',
    clientName: 'TechVision Solutions',
    department: 'TDS',
    section: 'Intimation 200A',
    ay: '2025-26',
    receivedDate: '28 Sep 2026',
    dueDate: '10 Oct 2026',
    status: 'Submitted',
    demandAmount: 45000,
    assignee: 'Rahul',
    hasHearing: false
  },
  {
    id: 'NOT-26-004',
    clientName: 'Global Exports',
    department: 'Income Tax',
    section: 'Sec 148 - Reassessment',
    ay: '2021-22',
    receivedDate: '15 Sep 2026',
    dueDate: '15 Oct 2026',
    status: 'Client Review',
    demandAmount: 3400000,
    assignee: 'Vikram',
    hasHearing: true,
    hearingDate: '25 Oct 2026'
  },
  {
    id: 'NOT-26-005',
    clientName: 'Sharma Family HUF',
    department: 'GST',
    section: 'DRC-01',
    ay: '2022-23',
    receivedDate: '10 Sep 2026',
    dueDate: '30 Sep 2026',
    status: 'Closed',
    demandAmount: 180000,
    assignee: 'Anita',
    hasHearing: false
  }
];

export default function NoticeTracker() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDept, setFilterDept] = useState<string>('All');
  
  const filtered = MOCK_NOTICES.filter(notice => {
    const matchesSearch = notice.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          notice.section.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = filterDept === 'All' ? true : notice.department === filterDept;
    return matchesSearch && matchesDept;
  });

  const activeNotices = MOCK_NOTICES.filter(n => n.status !== 'Closed').length;
  const highPriority = MOCK_NOTICES.filter(n => n.status !== 'Closed' && n.dueDate === '15 Oct 2026').length;
  const upcomingHearings = MOCK_NOTICES.filter(n => n.hasHearing && n.status !== 'Closed').length;
  const totalRisk = MOCK_NOTICES.filter(n => n.status !== 'Closed').reduce((sum, n) => sum + n.demandAmount, 0);

  const formatCurrency = (amount: number) => {
    if (amount === 0) return '-';
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col h-full space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between border-b border-zinc-200 pb-6">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center border border-zinc-200 shadow-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10"></div>
            <Landmark className="h-8 w-8 text-amber-600 relative z-10" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tighter">Tax Notice & Hearing Tracker</h1>
            <div className="flex items-center gap-2 text-xs font-mono opacity-60 uppercase mt-2">
               <span>Manage Department Notices & Deadlines</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center bg-zinc-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-800 transition-colors">
            <Plus className="h-4 w-4 mr-2" />
            Log New Notice
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Notices', value: activeNotices, color: 'bg-white border border-zinc-200 text-zinc-900' },
          { label: 'Due < 7 Days', value: highPriority, color: 'bg-red-50 text-red-700 border border-red-200' },
          { label: 'Upcoming Hearings', value: upcomingHearings, color: 'bg-orange-50 text-orange-700 border border-orange-200' },
          { label: 'Total Demand Risk', value: formatCurrency(totalRisk), color: 'bg-zinc-900 text-white border border-zinc-800' },
        ].map((stat, i) => (
          <div key={i} className={`p-4 rounded-xl flex flex-col justify-center items-center text-center shadow-sm ${stat.color}`}>
            <span className="text-[10px] uppercase font-bold tracking-wider opacity-70 mb-1">{stat.label}</span>
            <span className="text-2xl font-black tracking-tight">{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white border border-zinc-200 rounded-lg flex flex-col overflow-hidden">
        {/* Filters & Search */}
        <div className="border-b border-zinc-200 px-4 py-3 flex justify-between items-center bg-zinc-50/50">
          <div className="flex space-x-1">
            {['All', 'Income Tax', 'GST', 'TDS', 'MCA'].map(dept => (
              <button 
                key={dept}
                onClick={() => setFilterDept(dept)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filterDept === dept ? 'bg-white text-zinc-900 shadow-sm border border-zinc-200' : 'text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100'}`}
              >
                {dept}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white rounded-md px-3 py-1.5 flex items-center text-[13px] text-zinc-500 w-64 border border-zinc-200 focus-within:border-zinc-400 focus-within:ring-1 focus-within:ring-zinc-400 transition-all">
              <Search className="h-4 w-4 mr-2 opacity-50" />
              <input 
                type="text" 
                placeholder="Search clients or section..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent border-none outline-none w-full text-zinc-900" 
              />
            </div>
            <button className="p-1.5 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-md transition-colors border border-zinc-200 bg-white">
              <Filter className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Notice List */}
        <div className="flex-1 overflow-auto bg-zinc-50">
          <table className="w-full text-sm text-left border-collapse">
            <thead className="sticky top-0 bg-white shadow-sm z-10">
              <tr className="text-[10px] font-mono text-zinc-500 uppercase bg-zinc-50 border-b border-zinc-200">
                <th className="py-3 px-4 font-semibold border-r border-zinc-200">Client & Notice Detail</th>
                <th className="py-3 px-4 font-semibold border-r border-zinc-200">Dates & Hearing</th>
                <th className="py-3 px-4 font-semibold text-right w-32 border-r border-zinc-200">Demand Risk</th>
                <th className="py-3 px-4 font-semibold w-40 border-r border-zinc-200">Status</th>
                <th className="py-3 px-4 font-semibold w-24 text-center border-r border-zinc-200">Assignee</th>
                <th className="py-3 px-4 font-semibold w-16 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200 bg-white">
              {filtered.map((notice) => (
                <tr key={notice.id} className="hover:bg-zinc-50/50 transition-colors">
                  <td className="py-3 px-4 border-r border-zinc-200">
                    <div className="font-bold text-zinc-900 mb-1">{notice.clientName}</div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border ${
                        notice.department === 'Income Tax' ? 'bg-blue-50 text-blue-700 border-blue-200' :
                        notice.department === 'GST' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' :
                        'bg-zinc-100 text-zinc-700 border-zinc-200'
                      }`}>
                        {notice.department}
                      </span>
                      <span className="text-xs font-medium text-zinc-700">{notice.section}</span>
                    </div>
                    <div className="text-[11px] text-zinc-500">AY: {notice.ay}</div>
                  </td>
                  
                  <td className="py-3 px-4 border-r border-zinc-200">
                    <div className="flex flex-col gap-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-500">Received:</span>
                        <span className="font-mono">{notice.receivedDate}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-zinc-500">Reply Due:</span>
                        <span className={`font-mono font-bold ${notice.status !== 'Closed' && notice.dueDate === '15 Oct 2026' ? 'text-red-600' : 'text-zinc-900'}`}>
                          {notice.dueDate}
                        </span>
                      </div>
                      {notice.hasHearing && (
                        <div className="flex items-center justify-between mt-1 pt-1 border-t border-zinc-100">
                          <span className="flex items-center text-orange-600 font-medium">
                            <Gavel className="h-3 w-3 mr-1" /> Hearing:
                          </span>
                          <span className="font-mono text-orange-700 font-bold">{notice.hearingDate}</span>
                        </div>
                      )}
                    </div>
                  </td>

                  <td className="py-3 px-4 border-r border-zinc-200 text-right">
                    <div className="font-mono font-medium text-zinc-900">{formatCurrency(notice.demandAmount)}</div>
                  </td>

                  <td className="py-3 px-4 border-r border-zinc-200">
                    <div className="flex items-center gap-2">
                      {notice.status === 'Received' && <AlertCircle className="h-4 w-4 text-red-500" />}
                      {notice.status === 'Drafting Reply' && <Clock className="h-4 w-4 text-amber-500" />}
                      {notice.status === 'Client Review' && <FileText className="h-4 w-4 text-blue-500" />}
                      {notice.status === 'Submitted' && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                      {notice.status === 'Closed' && <CheckCircle2 className="h-4 w-4 text-zinc-400" />}
                      <span className={`text-xs font-bold uppercase tracking-wider ${
                        notice.status === 'Received' ? 'text-red-700' :
                        notice.status === 'Drafting Reply' ? 'text-amber-700' :
                        notice.status === 'Client Review' ? 'text-blue-700' :
                        notice.status === 'Submitted' ? 'text-emerald-700' :
                        'text-zinc-500'
                      }`}>
                        {notice.status}
                      </span>
                    </div>
                  </td>

                  <td className="py-3 px-4 border-r border-zinc-200">
                    <div className="flex justify-center">
                      <div className="h-7 w-7 rounded-full bg-zinc-100 text-zinc-700 flex items-center justify-center text-xs font-bold border border-zinc-200" title={notice.assignee}>
                        {notice.assignee.charAt(0)}
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <button className="text-zinc-400 hover:text-zinc-900 transition-colors p-1.5 rounded hover:bg-zinc-100">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-12 text-center">
                    <div className="w-16 h-16 bg-zinc-100 text-zinc-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="h-8 w-8" />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-900">No Notices Found</h3>
                    <p className="text-zinc-500 mt-1">Try adjusting your filters or search query.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
