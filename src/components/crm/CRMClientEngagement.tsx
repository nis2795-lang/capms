import React from 'react';
import { Users, Phone, Mail, TrendingUp, AlertCircle, HeartHandshake } from 'lucide-react';
import { mockClients } from '../../data';

export default function CRMClientEngagement() {
  return (
    <div className="max-w-7xl mx-auto flex flex-col h-full space-y-6">
      <div className="flex items-end justify-between border-b border-zinc-200 pb-6">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center border border-zinc-200 shadow-sm">
            <span className="text-2xl">🤝</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tighter">CRM & Client Engagement</h1>
            <div className="flex gap-4 text-xs font-mono opacity-60 uppercase mt-2">
               <span>Retention: 98%</span>
               <span>At Risk: 3</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="bg-white border border-zinc-200 px-4 py-2 rounded-md text-sm font-medium">Bulk Email</button>
          <button className="bg-zinc-900 text-white px-4 py-2 rounded-md text-sm font-medium">New Follow-up</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white border border-zinc-200 rounded-lg p-4">
          <p className="text-[11px] font-mono uppercase text-zinc-500 tracking-wider mb-1">Active Leads</p>
          <p className="text-2xl font-bold tracking-tight">14</p>
          <p className="text-[11px] opacity-50 mt-2">Potential Revenue: ₹4.5L</p>
        </div>
        <div className="bg-white border border-zinc-200 rounded-lg p-4">
          <p className="text-[11px] font-mono uppercase text-zinc-500 tracking-wider mb-1">Pending Renewals</p>
          <p className="text-2xl font-bold tracking-tight text-blue-600">08</p>
          <p className="text-[11px] opacity-50 mt-2">Next 30 Days</p>
        </div>
        <div className="bg-white border border-zinc-200 rounded-lg p-4">
          <p className="text-[11px] font-mono uppercase text-zinc-500 tracking-wider mb-1">Inactive Clients</p>
          <p className="text-2xl font-bold tracking-tight text-yellow-600">03</p>
          <p className="text-[11px] opacity-50 mt-2">No activity in 90 days</p>
        </div>
        <div className="bg-white border border-zinc-200 rounded-lg p-4">
          <p className="text-[11px] font-mono uppercase text-zinc-500 tracking-wider mb-1">Upcoming Birthdays</p>
          <p className="text-2xl font-bold tracking-tight text-green-600">05</p>
          <p className="text-[11px] opacity-50 mt-2">Client Directors & Partners</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-2 bg-white rounded-lg border border-zinc-200">
           <h3 className="font-bold p-4 border-b border-zinc-100 flex justify-between items-center text-sm">
             Follow-ups & Action Items
           </h3>
           <table className="w-full text-sm">
             <thead>
               <tr className="text-left font-mono opacity-50 text-[10px] uppercase border-b border-zinc-200 bg-zinc-50">
                  <th className="px-4 py-2 font-semibold">Client</th>
                  <th className="px-4 py-2 font-semibold">Type</th>
                  <th className="px-4 py-2 font-semibold">Action</th>
                  <th className="px-4 py-2 font-semibold text-right">Status</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-zinc-100">
                <tr className="hover:bg-zinc-50 transition-colors">
                  <td className="px-4 py-3 font-bold text-xs text-zinc-900">Tech Solutions LLP</td>
                  <td className="px-4 py-3 text-xs"><span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[10px]">Renewal</span></td>
                  <td className="px-4 py-3 text-xs opacity-70">Follow up on Audit fee quotation</td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-[10px] font-bold border border-zinc-200 px-2 py-1 rounded hover:bg-zinc-100 uppercase">Complete</button>
                  </td>
                </tr>
                <tr className="hover:bg-zinc-50 transition-colors">
                  <td className="px-4 py-3 font-bold text-xs text-zinc-900">Rahul Sharma</td>
                  <td className="px-4 py-3 text-xs"><span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[10px]">Onboarding</span></td>
                  <td className="px-4 py-3 text-xs opacity-70">Collect signed engagement letter</td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-[10px] font-bold border border-zinc-200 px-2 py-1 rounded hover:bg-zinc-100 uppercase">Complete</button>
                  </td>
                </tr>
                <tr className="hover:bg-zinc-50 transition-colors">
                  <td className="px-4 py-3 font-bold text-xs text-zinc-900">Global Traders</td>
                  <td className="px-4 py-3 text-xs"><span className="bg-green-100 text-green-800 px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[10px]">Birthday</span></td>
                  <td className="px-4 py-3 text-xs opacity-70">Send greetings to Suresh Kumar</td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-[10px] font-bold border border-zinc-200 px-2 py-1 rounded hover:bg-zinc-100 uppercase">Complete</button>
                  </td>
                </tr>
             </tbody>
           </table>
        </div>

        <div className="bg-white rounded-lg border border-zinc-200 p-6">
           <h3 className="font-bold mb-4 text-sm flex items-center">
             <AlertCircle className="w-4 h-4 mr-2 text-yellow-500" />
             Client Retention Risk
           </h3>
           <div className="space-y-4">
             <div className="border border-zinc-200 rounded-lg p-3">
               <div className="flex justify-between items-center mb-1">
                 <p className="font-bold text-xs">Priya Desai</p>
                 <span className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded uppercase">High Risk</span>
               </div>
               <p className="text-[11px] opacity-60 font-mono mb-2">Last contact: 120 days ago</p>
               <button className="w-full text-[10px] font-bold border border-zinc-200 py-1.5 rounded bg-zinc-50 hover:bg-zinc-100 uppercase tracking-widest transition-colors">Schedule Check-in</button>
             </div>
             
             <div className="bg-zinc-950 p-4 rounded-xl shadow-xl mt-4">
               <p className="text-white font-bold text-xs mb-2 uppercase tracking-widest">AI Insight</p>
               <p className="text-white/70 text-[11px] leading-relaxed">
                 Clients in the "Individual" segment have shown a 15% drop in engagement this quarter. Consider a bulk advisory email on the new tax regime.
               </p>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
