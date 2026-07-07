import React from 'react';
import { IndianRupee, TrendingUp, TrendingDown, ArrowUpRight, Clock, FileText } from 'lucide-react';

export default function BillingDashboard() {
  return (
    <div className="max-w-7xl mx-auto flex flex-col h-full space-y-6">
      <div className="flex items-end justify-between border-b border-zinc-200 pb-6">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center border border-zinc-200 shadow-sm">
            <span className="text-2xl">₹</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tighter">Billing & Profitability</h1>
            <div className="flex gap-4 text-xs font-mono opacity-60 uppercase mt-2">
               <span>FY 2023-24</span>
               <span>Currency: INR</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="bg-white border border-zinc-200 px-4 py-2 rounded-md text-sm font-medium">Export Tally</button>
          <button className="bg-zinc-900 text-white px-4 py-2 rounded-md text-sm font-medium">Create Invoice</button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white border border-zinc-200 rounded-lg p-4">
          <p className="text-[11px] font-mono uppercase text-zinc-500 tracking-wider mb-1">Total Billed YTD</p>
          <p className="text-2xl font-bold tracking-tight">₹42.5L</p>
          <div className="flex items-center mt-2 text-[11px] text-green-600 font-medium">
             <TrendingUp className="w-3 h-3 mr-1" />
             <span>+12.5% vs last year</span>
          </div>
        </div>
        <div className="bg-white border border-zinc-200 rounded-lg p-4">
          <p className="text-[11px] font-mono uppercase text-zinc-500 tracking-wider mb-1">Outstanding</p>
          <p className="text-2xl font-bold tracking-tight text-red-600">₹8.2L</p>
          <div className="flex items-center mt-2 text-[11px] text-red-600 font-medium">
             <TrendingUp className="w-3 h-3 mr-1" />
             <span>+5% vs last month</span>
          </div>
        </div>
        <div className="bg-white border border-zinc-200 rounded-lg p-4">
          <p className="text-[11px] font-mono uppercase text-zinc-500 tracking-wider mb-1">Realization Rate</p>
          <p className="text-2xl font-bold tracking-tight text-blue-600">84%</p>
          <div className="flex items-center mt-2 text-[11px] text-zinc-500 font-medium">
             <span>Target: 90%</span>
          </div>
        </div>
        <div className="bg-white border border-zinc-200 rounded-lg p-4">
          <p className="text-[11px] font-mono uppercase text-zinc-500 tracking-wider mb-1">Avg Hourly Yield</p>
          <p className="text-2xl font-bold tracking-tight text-green-600">₹2,450</p>
          <div className="flex items-center mt-2 text-[11px] text-green-600 font-medium">
             <TrendingUp className="w-3 h-3 mr-1" />
             <span>+₹150 from Q1</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-4">
         <div className="bg-white rounded-lg border border-zinc-200">
           <h3 className="font-bold p-4 border-b border-zinc-100 flex justify-between items-center text-sm">
             Recent Invoices
             <span className="text-[11px] font-normal opacity-50 font-mono uppercase tracking-widest">Last 30 Days</span>
           </h3>
           <table className="w-full text-sm font-mono">
             <thead>
               <tr className="text-left opacity-40 text-[10px] uppercase border-b border-zinc-100 bg-zinc-50">
                  <th className="py-2 pl-4">Client</th>
                  <th className="py-2">Amount</th>
                  <th className="py-2 text-right pr-4">Status</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-zinc-50">
               <tr className="hover:bg-zinc-50">
                 <td className="py-3 pl-4 font-bold font-sans text-xs text-zinc-900">Reliance Industries Ltd</td>
                 <td className="py-3 text-xs">₹1,50,000</td>
                 <td className="py-3 pr-4 text-right">
                   <span className="text-[10px] font-bold text-green-600 uppercase tracking-wider">● PAID</span>
                 </td>
               </tr>
               <tr className="hover:bg-zinc-50">
                 <td className="py-3 pl-4 font-bold font-sans text-xs text-zinc-900">Tech Solutions LLP</td>
                 <td className="py-3 text-xs">₹45,000</td>
                 <td className="py-3 pr-4 text-right">
                   <span className="text-[10px] font-bold text-yellow-600 uppercase tracking-wider">● OVERDUE</span>
                 </td>
               </tr>
               <tr className="hover:bg-zinc-50">
                 <td className="py-3 pl-4 font-bold font-sans text-xs text-zinc-900">Global Traders</td>
                 <td className="py-3 text-xs">₹25,000</td>
                 <td className="py-3 pr-4 text-right">
                   <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">● SENT</span>
                 </td>
               </tr>
             </tbody>
           </table>
           <div className="p-3 border-t border-zinc-100 bg-zinc-50 text-center">
             <button className="text-xs font-bold text-zinc-600 hover:text-zinc-900 uppercase tracking-widest">View All Invoices</button>
           </div>
         </div>

         <div className="bg-white rounded-lg border border-zinc-200 p-6 flex flex-col">
            <h3 className="font-bold mb-4 text-sm flex items-center">
              Client Profitability Analysis
            </h3>
            
            <div className="space-y-4 flex-1">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-bold text-zinc-900">Reliance Industries Ltd</span>
                  <span className="font-mono text-green-600 font-bold">42% Margin</span>
                </div>
                <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-green-500 h-full" style={{ width: '85%' }}></div>
                </div>
                <div className="flex justify-between mt-1 text-[10px] font-mono opacity-50">
                  <span>Billed: ₹4.5L</span>
                  <span>Cost: ₹2.6L</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-bold text-zinc-900">Tech Solutions LLP</span>
                  <span className="font-mono text-yellow-600 font-bold">15% Margin</span>
                </div>
                <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-yellow-500 h-full" style={{ width: '60%' }}></div>
                </div>
                <div className="flex justify-between mt-1 text-[10px] font-mono opacity-50">
                  <span>Billed: ₹1.2L</span>
                  <span>Cost: ₹1.0L</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-bold text-zinc-900">Rahul Sharma</span>
                  <span className="font-mono text-red-600 font-bold">-5% Margin (Loss)</span>
                </div>
                <div className="w-full bg-zinc-100 h-2 rounded-full overflow-hidden flex">
                  <div className="bg-zinc-300 h-full" style={{ width: '40%' }}></div>
                  <div className="bg-red-500 h-full" style={{ width: '60%' }}></div>
                </div>
                <div className="flex justify-between mt-1 text-[10px] font-mono opacity-50">
                  <span>Billed: ₹15K</span>
                  <span>Cost: ₹16.5K</span>
                </div>
              </div>
            </div>

            <div className="bg-zinc-950 p-4 rounded-xl shadow-xl mt-4 border border-zinc-800">
               <p className="text-white font-bold text-xs mb-2 uppercase tracking-widest">AI Pricing Insight</p>
               <p className="text-white/70 text-[11px] leading-relaxed">
                 Individual tax returns are consuming 3x more partner hours than budgeted. Suggest increasing standard ITR fee by 15% for next financial year.
               </p>
            </div>
         </div>
      </div>
    </div>
  );
}
