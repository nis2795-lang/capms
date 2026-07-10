import React, { useState } from 'react';
import { 
  Activity, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Send,
  MoreVertical,
  Check
} from 'lucide-react';

interface ComplianceJob {
  id: string;
  clientName: string;
  type: string;
  dataReceived: boolean;
  booksCompleted: boolean;
  prepared: boolean;
  partnerReview: boolean;
  filed: boolean;
  dueDate: string;
  assignee: string;
}

const MOCK_JOBS: ComplianceJob[] = [
  { id: '1', clientName: 'ABC Pvt Ltd', type: 'GSTR-3B', dataReceived: true, booksCompleted: true, prepared: true, partnerReview: false, filed: false, dueDate: '20 Jul 2026', assignee: 'Anita' },
  { id: '2', clientName: 'XYZ Ltd', type: 'GSTR-1', dataReceived: false, booksCompleted: false, prepared: false, partnerReview: false, filed: false, dueDate: '20 Jul 2026', assignee: 'Rahul' },
  { id: '3', clientName: 'PQR LLP', type: 'TDS Return', dataReceived: true, booksCompleted: true, prepared: true, partnerReview: true, filed: true, dueDate: '15 Jul 2026', assignee: 'Anita' },
  { id: '4', clientName: 'TechVision LLP', type: 'Income Tax', dataReceived: true, booksCompleted: true, prepared: false, partnerReview: false, filed: false, dueDate: '30 Sep 2026', assignee: 'Vikram' },
  { id: '5', clientName: 'Sharma Family HUF', type: 'GSTR-3B', dataReceived: true, booksCompleted: true, prepared: true, partnerReview: true, filed: false, dueDate: '20 Jul 2026', assignee: 'Rahul' },
];

export default function ComplianceOpsCenter() {
  const [activeTab, setActiveTab] = useState<'pipeline' | 'followup'>('pipeline');
  const [searchQuery, setSearchQuery] = useState('');

  const renderStatusIcon = (status: boolean, isCurrentPending = false) => {
    if (status) return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
    if (isCurrentPending) return <Clock className="h-4 w-4 text-orange-400" />;
    return <div className="h-4 w-4 rounded-full border-2 border-zinc-200" />;
  };

  const getJobStatus = (job: ComplianceJob) => {
    if (job.filed) return 'Completed';
    if (job.partnerReview) return 'Ready to File';
    if (job.prepared) return 'Pending Review';
    if (job.booksCompleted) return 'GST Prepared';
    if (job.dataReceived) return 'Books in Progress';
    return 'Waiting Client Docs';
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col h-full space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between border-b border-zinc-200 pb-6">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center border border-zinc-200 shadow-sm">
            <Activity className="h-8 w-8 text-zinc-700" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tighter">Compliance Ops Center</h1>
            <div className="flex gap-4 text-xs font-mono opacity-60 uppercase mt-2">
               <span>Firm Internal Workflow Tracker</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center bg-zinc-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-800 transition-colors">
            Create Compliance Task
          </button>
        </div>
      </div>

      {/* Smart Dashboard Cards */}
      <div className="grid grid-cols-7 gap-4">
        {[
          { label: 'Total Clients', value: '520', color: 'bg-zinc-100', text: 'text-zinc-900' },
          { label: 'Completed', value: '340', color: 'bg-emerald-50 text-emerald-700 border border-emerald-200', text: 'text-emerald-700' },
          { label: 'Waiting Docs', value: '65', color: 'bg-red-50 text-red-700 border border-red-200', text: 'text-red-700' },
          { label: 'In Progress', value: '42', color: 'bg-blue-50 text-blue-700 border border-blue-200', text: 'text-blue-700' },
          { label: 'Pending Review', value: '31', color: 'bg-purple-50 text-purple-700 border border-purple-200', text: 'text-purple-700' },
          { label: 'Ready to File', value: '24', color: 'bg-orange-50 text-orange-700 border border-orange-200', text: 'text-orange-700' },
          { label: 'Overdue', value: '18', color: 'bg-zinc-900 text-white', text: 'text-white' },
        ].map((stat, i) => (
          <div key={i} className={`p-4 rounded-xl flex flex-col justify-center items-center text-center shadow-sm ${stat.color || 'bg-white border border-zinc-200'}`}>
            <span className={`text-[10px] uppercase font-bold tracking-wider opacity-70 mb-1 ${stat.text}`}>{stat.label}</span>
            <span className={`text-2xl font-black tracking-tight ${stat.text}`}>{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-white border border-zinc-200 rounded-lg flex flex-col overflow-hidden">
        {/* Tabs & Search */}
        <div className="border-b border-zinc-200 px-4 py-3 flex justify-between items-center bg-zinc-50/50">
          <div className="flex space-x-1">
            <button 
              onClick={() => setActiveTab('pipeline')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'pipeline' ? 'bg-white text-zinc-900 shadow-sm border border-zinc-200' : 'text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100'}`}
            >
              Compliance Pipeline
            </button>
            <button 
              onClick={() => setActiveTab('followup')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'followup' ? 'bg-white text-zinc-900 shadow-sm border border-zinc-200' : 'text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100'}`}
            >
              Client Follow-up Center
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-white rounded-md px-3 py-1.5 flex items-center text-[13px] text-zinc-500 w-64 border border-zinc-200 focus-within:border-zinc-400 focus-within:ring-1 focus-within:ring-zinc-400 transition-all">
              <Search className="h-4 w-4 mr-2 opacity-50" />
              <input 
                type="text" 
                placeholder="Search clients..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none w-full text-zinc-900" 
              />
            </div>
            <button className="p-1.5 text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 rounded-md transition-colors border border-zinc-200 bg-white">
              <Filter className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-auto bg-zinc-50">
          {activeTab === 'pipeline' ? (
            <table className="w-full text-sm text-left border-collapse">
              <thead className="sticky top-0 bg-white shadow-sm z-10">
                <tr className="text-[10px] font-mono text-zinc-500 uppercase bg-zinc-50 border-b border-zinc-200">
                  <th className="py-3 px-4 font-semibold border-r border-zinc-200">Client & Task</th>
                  <th className="py-3 px-4 font-semibold text-center w-24">Data Received</th>
                  <th className="py-3 px-4 font-semibold text-center w-24">Books Completed</th>
                  <th className="py-3 px-4 font-semibold text-center w-24">Prepared</th>
                  <th className="py-3 px-4 font-semibold text-center w-24">Partner Review</th>
                  <th className="py-3 px-4 font-semibold text-center w-24 border-r border-zinc-200">Filed</th>
                  <th className="py-3 px-4 font-semibold w-32 border-r border-zinc-200">Due Date</th>
                  <th className="py-3 px-4 font-semibold w-24">Assignee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 bg-white">
                {MOCK_JOBS.map((job) => {
                  const status = getJobStatus(job);
                  return (
                    <tr key={job.id} className="hover:bg-zinc-50/50 transition-colors">
                      <td className="py-3 px-4 border-r border-zinc-200">
                        <div className="font-bold text-zinc-900">{job.clientName}</div>
                        <div className="text-xs text-zinc-500 mt-1 flex items-center gap-2">
                          <span className="font-mono bg-zinc-100 px-1.5 py-0.5 rounded text-zinc-600">{job.type}</span>
                          <span className="text-[10px] uppercase font-bold text-zinc-400">{status}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-center border-r border-zinc-50">
                        <div className="flex justify-center">{renderStatusIcon(job.dataReceived, !job.dataReceived)}</div>
                      </td>
                      <td className="py-3 px-4 text-center border-r border-zinc-50">
                        <div className="flex justify-center">{renderStatusIcon(job.booksCompleted, job.dataReceived && !job.booksCompleted)}</div>
                      </td>
                      <td className="py-3 px-4 text-center border-r border-zinc-50">
                        <div className="flex justify-center">{renderStatusIcon(job.prepared, job.booksCompleted && !job.prepared)}</div>
                      </td>
                      <td className="py-3 px-4 text-center border-r border-zinc-50">
                        <div className="flex justify-center">{renderStatusIcon(job.partnerReview, job.prepared && !job.partnerReview)}</div>
                      </td>
                      <td className="py-3 px-4 text-center border-r border-zinc-200">
                        <div className="flex justify-center">{renderStatusIcon(job.filed, job.partnerReview && !job.filed)}</div>
                      </td>
                      <td className="py-3 px-4 border-r border-zinc-200">
                        <div className="text-[11px] font-mono font-medium text-zinc-900">{job.dueDate}</div>
                        {job.dueDate === '20 Jul 2026' && !job.filed && (
                          <div className="text-[10px] font-bold text-red-600 uppercase mt-1">Due in 10 Days</div>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                            {job.assignee.charAt(0)}
                          </div>
                          <span className="text-xs font-medium text-zinc-700">{job.assignee}</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <div className="p-6 grid grid-cols-2 gap-6">
              <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden flex flex-col">
                <div className="p-4 border-b border-zinc-200 bg-zinc-50 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-zinc-900 text-sm">ABC Pvt Ltd</h3>
                    <p className="text-xs text-zinc-500 mt-0.5 font-mono uppercase tracking-wider">GST Data Request</p>
                  </div>
                  <span className="bg-red-100 text-red-800 text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wider">Missing Docs</span>
                </div>
                <div className="p-4 flex-1">
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-emerald-600"><Check className="h-4 w-4 mr-2" /> Purchase Register</div>
                      <span className="text-xs text-zinc-400">Received 2 Jul</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center text-emerald-600"><Check className="h-4 w-4 mr-2" /> Sales Register</div>
                      <span className="text-xs text-zinc-400">Received 2 Jul</span>
                    </div>
                    <div className="flex items-center justify-between text-sm font-medium">
                      <div className="flex items-center text-red-600"><AlertCircle className="h-4 w-4 mr-2" /> Bank Statement</div>
                      <span className="text-xs text-red-500 uppercase tracking-wider">Pending</span>
                    </div>
                    <div className="flex items-center justify-between text-sm font-medium">
                      <div className="flex items-center text-red-600"><AlertCircle className="h-4 w-4 mr-2" /> Expense Bills</div>
                      <span className="text-xs text-red-500 uppercase tracking-wider">Pending</span>
                    </div>
                  </div>
                  <div className="bg-zinc-50 rounded-lg p-3 text-xs text-zinc-600 border border-zinc-100">
                    <div className="flex justify-between mb-1">
                      <span>Last Reminder: <strong className="text-zinc-900">5 July</strong></span>
                      <span>Reminder Count: <strong className="text-zinc-900">2</strong></span>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-t border-zinc-200 bg-zinc-50">
                  <button className="w-full flex items-center justify-center bg-zinc-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-800 transition-colors">
                    <Send className="h-4 w-4 mr-2" />
                    Send Reminder (WhatsApp + Email)
                  </button>
                </div>
              </div>
              
              <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden flex flex-col opacity-60">
                <div className="p-4 border-b border-zinc-200 bg-zinc-50 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-zinc-900 text-sm">XYZ Ltd</h3>
                    <p className="text-xs text-zinc-500 mt-0.5 font-mono uppercase tracking-wider">GST Data Request</p>
                  </div>
                  <span className="bg-red-100 text-red-800 text-[10px] px-2 py-1 rounded font-bold uppercase tracking-wider">Missing Docs</span>
                </div>
                <div className="p-4 flex-1">
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm font-medium">
                      <div className="flex items-center text-red-600"><AlertCircle className="h-4 w-4 mr-2" /> All Documents Pending</div>
                    </div>
                  </div>
                  <div className="bg-zinc-50 rounded-lg p-3 text-xs text-zinc-600 border border-zinc-100">
                    <div className="flex justify-between mb-1">
                      <span>Last Reminder: <strong className="text-zinc-900">-</strong></span>
                      <span>Reminder Count: <strong className="text-zinc-900">0</strong></span>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-t border-zinc-200 bg-zinc-50">
                  <button className="w-full flex items-center justify-center bg-zinc-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-800 transition-colors">
                    <Send className="h-4 w-4 mr-2" />
                    Send Initial Request
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
