import React from 'react';
import { ShieldAlert, Activity, AlertTriangle, TrendingUp, TrendingDown, RefreshCcw } from 'lucide-react';
import { mockClients } from '../../data';

export default function RiskHealthDashboard() {
  return (
    <div className="max-w-7xl mx-auto flex flex-col h-full space-y-6">
      <div className="flex items-end justify-between border-b border-zinc-200 pb-6">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center border border-zinc-200 shadow-sm">
            <span className="text-2xl">🧠</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tighter">AI Risk & Health Intelligence</h1>
            <div className="flex gap-4 text-xs font-mono opacity-60 uppercase mt-2">
               <span>System: Online</span>
               <span>Scanned: 42 Clients</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="bg-purple-900 text-white px-4 py-2 rounded-md text-sm font-medium flex items-center">
            <RefreshCcw className="w-4 h-4 mr-2" />
            Run Full Scan
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white border border-zinc-200 rounded-lg p-4">
          <p className="text-[11px] font-mono uppercase text-zinc-500 tracking-wider mb-1">Avg Health Score</p>
          <p className="text-2xl font-bold tracking-tight text-green-600">82/100</p>
          <div className="w-full bg-zinc-100 h-1.5 rounded-full mt-2 overflow-hidden">
             <div className="bg-green-500 h-full w-[82%]"></div>
          </div>
        </div>
        <div className="bg-white border border-zinc-200 rounded-lg p-4">
          <p className="text-[11px] font-mono uppercase text-zinc-500 tracking-wider mb-1">High Risk Clients</p>
          <p className="text-2xl font-bold tracking-tight text-red-600">3</p>
          <p className="text-[11px] opacity-50 mt-2">Require immediate attention</p>
        </div>
        <div className="bg-white border border-zinc-200 rounded-lg p-4">
          <p className="text-[11px] font-mono uppercase text-zinc-500 tracking-wider mb-1">Compliance Gaps</p>
          <p className="text-2xl font-bold tracking-tight text-yellow-600">14</p>
          <p className="text-[11px] opacity-50 mt-2">Across all portfolios</p>
        </div>
        <div className="bg-white border border-zinc-200 rounded-lg p-4">
          <p className="text-[11px] font-mono uppercase text-zinc-500 tracking-wider mb-1">AI Interventions</p>
          <p className="text-2xl font-bold tracking-tight text-purple-600">28</p>
          <p className="text-[11px] opacity-50 mt-2">Automated alerts sent</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-2">
        <div className="col-span-2 bg-white rounded-lg border border-zinc-200">
           <h3 className="font-bold p-4 border-b border-zinc-100 flex justify-between items-center text-sm">
             Client Risk Matrix
             <span className="text-[11px] font-normal opacity-50 font-mono uppercase tracking-widest">Sorted by Risk</span>
           </h3>
           <table className="w-full text-sm">
             <thead>
               <tr className="text-left opacity-40 text-[10px] uppercase border-b border-zinc-100 bg-zinc-50">
                  <th className="py-2 pl-4">Client</th>
                  <th className="py-2">Health Score</th>
                  <th className="py-2">Risk Level</th>
                  <th className="py-2 pr-4">AI Recommendation</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-zinc-50">
               <tr className="hover:bg-zinc-50 transition-colors">
                 <td className="py-4 pl-4">
                   <p className="font-bold text-xs text-zinc-900">Global Traders</p>
                   <p className="text-[10px] text-zinc-500 font-mono">Retail & E-commerce</p>
                 </td>
                 <td className="py-4">
                   <div className="flex items-center">
                     <span className="text-xs font-bold text-red-600 w-8">42</span>
                     <div className="w-16 bg-zinc-100 h-1.5 rounded-full overflow-hidden">
                       <div className="bg-red-500 h-full w-[42%]"></div>
                     </div>
                   </div>
                 </td>
                 <td className="py-4">
                   <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[10px]">High</span>
                 </td>
                 <td className="py-4 pr-4">
                   <p className="text-[11px] text-zinc-600 leading-relaxed">Multiple GST mismatches in GSTR-2A vs 3B. Setup meeting to reconcile Q2 data.</p>
                 </td>
               </tr>
               <tr className="hover:bg-zinc-50 transition-colors">
                 <td className="py-4 pl-4">
                   <p className="font-bold text-xs text-zinc-900">Tech Solutions LLP</p>
                   <p className="text-[10px] text-zinc-500 font-mono">IT Services</p>
                 </td>
                 <td className="py-4">
                   <div className="flex items-center">
                     <span className="text-xs font-bold text-yellow-600 w-8">68</span>
                     <div className="w-16 bg-zinc-100 h-1.5 rounded-full overflow-hidden">
                       <div className="bg-yellow-500 h-full w-[68%]"></div>
                     </div>
                   </div>
                 </td>
                 <td className="py-4">
                   <span className="bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[10px]">Medium</span>
                 </td>
                 <td className="py-4 pr-4">
                   <p className="text-[11px] text-zinc-600 leading-relaxed">Delayed response to document requests. Automate follow-ups via WhatsApp.</p>
                 </td>
               </tr>
               <tr className="hover:bg-zinc-50 transition-colors">
                 <td className="py-4 pl-4">
                   <p className="font-bold text-xs text-zinc-900">Reliance Industries Ltd</p>
                   <p className="text-[10px] text-zinc-500 font-mono">Manufacturing</p>
                 </td>
                 <td className="py-4">
                   <div className="flex items-center">
                     <span className="text-xs font-bold text-green-600 w-8">94</span>
                     <div className="w-16 bg-zinc-100 h-1.5 rounded-full overflow-hidden">
                       <div className="bg-green-500 h-full w-[94%]"></div>
                     </div>
                   </div>
                 </td>
                 <td className="py-4">
                   <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[10px]">Low</span>
                 </td>
                 <td className="py-4 pr-4">
                   <p className="text-[11px] text-zinc-600 leading-relaxed">Excellent compliance record. Suggest cross-selling advisory services for new plant setup.</p>
                 </td>
               </tr>
             </tbody>
           </table>
        </div>

        <div className="bg-purple-950 text-white rounded-lg border border-purple-800 p-6 flex flex-col relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10">
             <ShieldAlert className="w-32 h-32" />
           </div>
           
           <h3 className="font-bold mb-4 text-sm flex items-center text-purple-200 relative z-10">
             AI Insights Feed
           </h3>
           
           <div className="space-y-4 flex-1 relative z-10">
             <div className="border border-purple-800/50 bg-purple-900/40 rounded-lg p-3">
               <div className="flex items-start gap-3">
                 <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                 <div>
                   <h4 className="text-xs font-bold text-purple-100 mb-1">New Tax Regime Default</h4>
                   <p className="text-[11px] text-purple-300 leading-relaxed">
                     12 individual clients might benefit more from the old tax regime based on their investment history. Auto-generating comparison reports.
                   </p>
                   <button className="mt-2 text-[10px] font-bold bg-white text-purple-950 px-2 py-1 rounded uppercase tracking-widest hover:bg-purple-100 transition-colors">Review Reports</button>
                 </div>
               </div>
             </div>

             <div className="border border-purple-800/50 bg-purple-900/40 rounded-lg p-3">
               <div className="flex items-start gap-3">
                 <Activity className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                 <div>
                   <h4 className="text-xs font-bold text-purple-100 mb-1">Unusual Bank Transactions</h4>
                   <p className="text-[11px] text-purple-300 leading-relaxed">
                     Detected 5 high-value transactions in Global Traders' latest bank statement that lack matching invoices.
                   </p>
                   <button className="mt-2 text-[10px] font-bold border border-purple-700 text-purple-200 px-2 py-1 rounded uppercase tracking-widest hover:bg-purple-800 transition-colors">Flag to Client</button>
                 </div>
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}
