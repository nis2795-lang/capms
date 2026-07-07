import React from 'react';
import { Users, FileCheck, CheckCircle2, AlertCircle } from 'lucide-react';
import { mockClients, mockComplianceTasks } from '../../data';

export default function Dashboard() {
  const pendingTasks = mockComplianceTasks.filter(t => t.status !== 'Filed').length;
  const overdueTasks = mockComplianceTasks.filter(t => t.status === 'Overdue').length;
  const totalClients = mockClients.length;
  const redClients = mockClients.filter(c => c.healthScore === 'Red').length;

  return (
    <div className="max-w-7xl mx-auto flex flex-col h-full space-y-6">
      <div className="flex items-end justify-between border-b border-zinc-200 pb-6">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center border border-zinc-200 shadow-sm">
            <span className="text-2xl">📊</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tighter">Overview Dashboard</h1>
            <div className="flex gap-4 text-xs font-mono opacity-60 uppercase mt-2">
               <span>Firm: CAPMS Demo</span>
               <span>Date: Oct 2023</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="bg-zinc-900 text-white px-4 py-2 rounded-md text-sm font-medium">Generate Report</button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white border border-zinc-200 rounded-lg p-4">
          <p className="text-[11px] font-mono uppercase text-zinc-500 tracking-wider mb-1">Total Clients</p>
          <p className="text-2xl font-bold tracking-tight">{totalClients}</p>
          <p className="text-[11px] opacity-50 mt-2">Active portfolios managed</p>
        </div>

        <div className="bg-white border border-zinc-200 rounded-lg p-4">
          <p className="text-[11px] font-mono uppercase text-zinc-500 tracking-wider mb-1">Active Compliances</p>
          <p className="text-2xl font-bold tracking-tight text-blue-600">{pendingTasks}</p>
          <p className="text-[11px] opacity-50 mt-2">Pending across all modules</p>
        </div>

        <div className="bg-white border border-zinc-200 rounded-lg p-4">
          <p className="text-[11px] font-mono uppercase text-zinc-500 tracking-wider mb-1">Overdue Deadlines</p>
          <p className="text-2xl font-bold tracking-tight text-red-600">{overdueTasks}</p>
          <p className="text-[11px] opacity-50 mt-2">Requires immediate action</p>
        </div>

        <div className="bg-white border border-zinc-200 rounded-lg p-4">
          <p className="text-[11px] font-mono uppercase text-zinc-500 tracking-wider mb-1">Clients at Risk</p>
          <p className="text-2xl font-bold tracking-tight text-yellow-600">{redClients}</p>
          <p className="text-[11px] opacity-50 mt-2">Health score critical</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg border border-zinc-200">
          <h3 className="font-bold p-4 border-b border-zinc-100 flex justify-between items-center text-sm">
            Recent Workflow Activity
            <span className="text-[11px] font-normal opacity-50 font-mono uppercase tracking-widest">Last 24h</span>
          </h3>
          <table className="w-full text-sm font-mono">
             <thead>
               <tr className="text-left opacity-40 text-[10px] uppercase border-b border-zinc-100 bg-zinc-50">
                  <th className="py-2 pl-4">Client</th>
                  <th className="py-2">Type</th>
                  <th className="py-2">Due</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-zinc-50">
               {mockComplianceTasks.slice(0, 4).map((task) => (
                 <tr key={task.id} className="hover:bg-zinc-50">
                   <td className="py-3 pl-4 font-bold font-sans text-xs text-zinc-900">{task.clientName}</td>
                   <td className="py-3 text-xs">{task.type}</td>
                   <td className="py-3 opacity-60 text-xs">{task.dueDate}</td>
                 </tr>
               ))}
             </tbody>
          </table>
        </div>
        
        {/* Quick Links or AI Insights */}
        <div className="bg-zinc-950 rounded-lg shadow-xl shadow-zinc-200 p-6 flex flex-col justify-center border border-zinc-800 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-blue-600 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
          <p className="text-white font-bold text-xs mb-3 tracking-widest uppercase">AI Risk Recommendation</p>
          <p className="text-white/70 text-sm leading-relaxed mb-6">
            The system has analyzed your current portfolio. You have 2 GST returns pending review, and 1 ROC filing is overdue for Tech Solutions LLP. We recommend prioritizing Karan's review queue.
          </p>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-[11px] font-bold uppercase tracking-widest transition-colors shadow-lg shadow-blue-900/50">
            Generate Full Risk Report
          </button>
        </div>
      </div>
    </div>
  );
}
