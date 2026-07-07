import React from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { mockComplianceTasks } from '../../data';

export default function ComplianceCalendar() {
  return (
    <div className="max-w-7xl mx-auto flex flex-col h-full space-y-6">
      <div className="flex items-end justify-between border-b border-zinc-200 pb-6">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center border border-zinc-200 shadow-sm">
            <span className="text-2xl">📅</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tighter">Smart Compliance Calendar</h1>
            <div className="flex gap-4 text-xs font-mono opacity-60 uppercase mt-2">
               <span>Upcoming: 12</span>
               <span>Overdue: 2</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="bg-zinc-900 text-white px-4 py-2 rounded-md text-sm font-medium">Sync with Google Calendar</button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-zinc-200 flex flex-col flex-1 min-h-[500px]">
        <div className="p-4 border-b border-zinc-200 flex items-center justify-between">
           <div className="flex items-center gap-4">
             <button className="p-1 text-zinc-400 hover:text-zinc-900 transition-colors"><ChevronLeft className="w-5 h-5" /></button>
             <h2 className="text-lg font-bold">October 2023</h2>
             <button className="p-1 text-zinc-400 hover:text-zinc-900 transition-colors"><ChevronRight className="w-5 h-5" /></button>
           </div>
           <div className="flex gap-2">
             <button className="inline-flex items-center px-3 py-1.5 border border-zinc-200 rounded-md text-[13px] font-medium text-zinc-700 bg-white hover:bg-zinc-50 transition-colors">
               <Filter className="h-4 w-4 mr-2 text-zinc-400" />
               Filter: GST
             </button>
             <button className="inline-flex items-center px-3 py-1.5 border border-zinc-200 rounded-md text-[13px] font-medium text-zinc-700 bg-white hover:bg-zinc-50 transition-colors">
               Today
             </button>
           </div>
        </div>

        <div className="flex-1 p-6">
           <div className="grid grid-cols-7 gap-px bg-zinc-200 rounded-lg overflow-hidden border border-zinc-200">
             {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
               <div key={day} className="bg-zinc-50 py-2 text-center text-xs font-bold uppercase tracking-wider text-zinc-500">
                 {day}
               </div>
             ))}
             
             {/* Simple Calendar Grid Mockup */}
             {Array.from({length: 35}).map((_, i) => {
               const day = i - 2; // Offset for starting day
               const isCurrentMonth = day > 0 && day <= 31;
               return (
                 <div key={i} className={`min-h-[100px] bg-white p-2 ${!isCurrentMonth ? 'bg-zinc-50 opacity-50' : ''}`}>
                   <span className="text-xs font-bold text-zinc-500">{isCurrentMonth ? day : ''}</span>
                   
                   {/* Mock Events */}
                   {day === 11 && isCurrentMonth && (
                     <div className="mt-1 px-2 py-1 text-[10px] font-bold bg-green-100 text-green-800 rounded mb-1 truncate">
                       GSTR-1 Due (45)
                     </div>
                   )}
                   {day === 20 && isCurrentMonth && (
                     <div className="mt-1 px-2 py-1 text-[10px] font-bold bg-blue-100 text-blue-800 rounded mb-1 truncate">
                       GSTR-3B Due (40)
                     </div>
                   )}
                   {day === 30 && isCurrentMonth && (
                     <div className="mt-1 px-2 py-1 text-[10px] font-bold bg-yellow-100 text-yellow-800 rounded mb-1 truncate">
                       ROC AOC-4 (12)
                     </div>
                   )}
                   {day === 31 && isCurrentMonth && (
                     <div className="mt-1 px-2 py-1 text-[10px] font-bold bg-red-100 text-red-800 rounded mb-1 truncate">
                       ITR-6 Due (22)
                     </div>
                   )}
                 </div>
               );
             })}
           </div>
        </div>
      </div>
    </div>
  );
}
