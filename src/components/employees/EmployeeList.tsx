import React from 'react';
import { Search } from 'lucide-react';
import { mockEmployees } from '../../data';

export default function EmployeeList() {
  return (
    <div className="max-w-7xl mx-auto flex flex-col h-full space-y-6">
      <div className="flex items-end justify-between border-b border-zinc-200 pb-6">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center border border-zinc-200 shadow-sm">
            <span className="text-2xl">👥</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tighter">Resources</h1>
            <div className="flex gap-4 text-xs font-mono opacity-60 uppercase mt-2">
               <span>Total Staff: {mockEmployees.length}</span>
               <span>Active: {mockEmployees.filter(e => e.status === 'Active').length}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="bg-zinc-900 text-white px-4 py-2 rounded-md text-sm font-medium">Add Employee</button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-zinc-200">
        <div className="p-4 border-b border-zinc-200">
          <div className="bg-zinc-100 rounded-md px-3 py-1.5 flex items-center text-[13px] text-zinc-500 w-full max-w-md border border-transparent focus-within:border-zinc-300 focus-within:bg-white transition-colors">
             <Search className="h-4 w-4 mr-2" />
             <input type="text" placeholder="Search employees..." className="bg-transparent border-none outline-none w-full" />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left font-mono opacity-50 text-[10px] uppercase border-b border-zinc-200 bg-zinc-50">
                <th className="px-6 py-3 font-semibold tracking-wider">Name</th>
                <th className="px-6 py-3 font-semibold tracking-wider">Role & Dept</th>
                <th className="px-6 py-3 font-semibold tracking-wider">Workload</th>
                <th className="px-6 py-3 font-semibold tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {mockEmployees.map((employee) => (
                <tr key={employee.id} className="hover:bg-zinc-50 transition-colors cursor-pointer">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 bg-zinc-900 rounded flex items-center justify-center text-white font-bold text-xs">
                        {employee.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-bold text-zinc-900 tracking-tight">{employee.name}</div>
                        <div className="text-[11px] text-zinc-500 font-mono mt-0.5">{employee.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-xs font-bold text-zinc-900 uppercase tracking-wider">{employee.role}</div>
                    <div className="text-[11px] font-mono text-zinc-500 mt-0.5">{employee.department}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-mono font-medium">{employee.activeClients} <span className="text-[10px] opacity-50 uppercase ml-1">Clients</span></div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                      employee.status === 'Active' ? 'text-green-800 bg-green-100' : 'text-zinc-600 bg-zinc-200'
                    }`}>
                      {employee.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
