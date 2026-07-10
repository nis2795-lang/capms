import React, { useState } from 'react';
import { Search, Plus, UserPlus, Clock, Calendar, BarChart2, Briefcase, ChevronRight, CheckCircle, AlertCircle } from 'lucide-react';

interface StaffMember {
  id: string;
  name: string;
  role: 'Partner' | 'Manager' | 'Senior Article' | 'Article Assistant' | 'Accountant';
  department: 'Audit' | 'Direct Tax' | 'Indirect Tax' | 'Corporate Law';
  email: string;
  activeTasks: number;
  completedTasksThisWeek: number;
  bandwidth: number; // 0 to 100%
  status: 'Active' | 'Study Leave' | 'Vacation';
  leaveDates?: string;
}

const mockStaff: StaffMember[] = [
  { id: 'E1', name: 'Rajesh Kumar', role: 'Manager', department: 'Direct Tax', email: 'rajesh.k@capms.com', activeTasks: 18, completedTasksThisWeek: 24, bandwidth: 90, status: 'Active' },
  { id: 'E2', name: 'Priya Desai', role: 'Senior Article', department: 'Indirect Tax', email: 'priya.d@capms.com', activeTasks: 12, completedTasksThisWeek: 15, bandwidth: 60, status: 'Active' },
  { id: 'E3', name: 'Rahul Mehta', role: 'Article Assistant', department: 'Audit', email: 'rahul.m@capms.com', activeTasks: 0, completedTasksThisWeek: 0, bandwidth: 0, status: 'Study Leave', leaveDates: 'Till Nov 2026' },
  { id: 'E4', name: 'Anita Sharma', role: 'Accountant', department: 'Direct Tax', email: 'anita.s@capms.com', activeTasks: 25, completedTasksThisWeek: 10, bandwidth: 110, status: 'Active' }, // Overloaded
  { id: 'E5', name: 'Vikram Singh', role: 'Partner', department: 'Corporate Law', email: 'vikram.s@capms.com', activeTasks: 5, completedTasksThisWeek: 8, bandwidth: 40, status: 'Active' },
  { id: 'E6', name: 'Sneha Patel', role: 'Article Assistant', department: 'Indirect Tax', email: 'sneha.p@capms.com', activeTasks: 15, completedTasksThisWeek: 20, bandwidth: 75, status: 'Active' },
];

export default function EmployeeList() {
  const [staff, setStaff] = useState(mockStaff);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'All' | 'Overloaded' | 'On Leave'>('All');

  const filteredStaff = staff.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || s.department.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;
    
    if (activeFilter === 'Overloaded') return s.bandwidth >= 95;
    if (activeFilter === 'On Leave') return s.status !== 'Active';
    return true;
  });

  const overloadedCount = staff.filter(s => s.bandwidth >= 95).length;
  const onLeaveCount = staff.filter(s => s.status !== 'Active').length;

  const getBandwidthColor = (percent: number) => {
    if (percent >= 95) return 'bg-red-500';
    if (percent >= 75) return 'bg-yellow-500';
    if (percent > 0) return 'bg-green-500';
    return 'bg-zinc-200';
  };

  const getStatusBadge = (status: string, leaveDates?: string) => {
    if (status === 'Active') {
      return <span className="inline-flex items-center text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider text-green-700 bg-green-100 border border-green-200"><CheckCircle className="w-3 h-3 mr-1" /> Active</span>;
    }
    if (status === 'Study Leave') {
      return (
        <div className="flex flex-col items-start">
          <span className="inline-flex items-center text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider text-purple-700 bg-purple-100 border border-purple-200"><Clock className="w-3 h-3 mr-1" /> Study Leave</span>
          <span className="text-[9px] font-mono text-zinc-500 mt-1">{leaveDates}</span>
        </div>
      );
    }
    return <span className="inline-flex items-center text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider text-zinc-700 bg-zinc-100 border border-zinc-200"><Calendar className="w-3 h-3 mr-1" /> {status}</span>;
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Resource & Team Management</h2>
          <p className="text-sm text-zinc-500 mt-1">Track staff bandwidth, allocate tasks, and manage article study leaves.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 bg-zinc-900 text-white rounded-md text-sm font-medium hover:bg-zinc-800 shadow-sm transition-colors">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Staff Member
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Total Team Size</p>
              <p className="text-3xl font-bold text-zinc-900">{staff.length}</p>
            </div>
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center"><Briefcase className="w-5 h-5" /></div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-sm cursor-pointer hover:border-red-300 transition-colors" onClick={() => setActiveFilter('Overloaded')}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Overloaded Staff</p>
              <p className="text-3xl font-bold text-red-600">{overloadedCount}</p>
            </div>
            <div className="w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center"><AlertCircle className="w-5 h-5" /></div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-sm cursor-pointer hover:border-purple-300 transition-colors" onClick={() => setActiveFilter('On Leave')}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">On Study Leave</p>
              <p className="text-3xl font-bold text-purple-600">{onLeaveCount}</p>
            </div>
            <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center"><Calendar className="w-5 h-5" /></div>
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Avg Efficiency</p>
              <p className="text-3xl font-bold text-green-600">84%</p>
            </div>
            <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center"><BarChart2 className="w-5 h-5" /></div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-50/50">
          <div className="flex space-x-2">
            {['All', 'Overloaded', 'On Leave'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab as any)}
                className={`px-4 py-1.5 text-sm font-medium rounded-full transition-colors ${
                  activeFilter === tab 
                    ? 'bg-zinc-900 text-white shadow-sm' 
                    : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Search staff or department..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-1.5 bg-white border border-zinc-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 w-full sm:w-64"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-200">
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Staff Details</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Department</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Capacity / Bandwidth</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider text-right">Performance (Week)</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {filteredStaff.map((employee) => (
                <tr key={employee.id} className="hover:bg-zinc-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-zinc-900 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-sm">
                        {employee.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-bold text-zinc-900 tracking-tight mb-0.5">{employee.name}</div>
                        <div className="text-xs text-zinc-500">{employee.role}</div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <span className="bg-zinc-100 border border-zinc-200 px-2 py-1 rounded text-xs font-mono font-medium text-zinc-700">
                      {employee.department}
                    </span>
                  </td>
                  
                  <td className="px-6 py-4">
                    {getStatusBadge(employee.status, employee.leaveDates)}
                  </td>
                  
                  <td className="px-6 py-4 min-w-[200px]">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-[10px] font-bold text-zinc-500 uppercase">{employee.activeTasks} Active Tasks</span>
                      <span className={`text-[10px] font-bold ${employee.bandwidth >= 95 ? 'text-red-600' : 'text-zinc-700'}`}>{employee.bandwidth}%</span>
                    </div>
                    <div className="w-full bg-zinc-100 rounded-full h-2 overflow-hidden border border-zinc-200">
                      <div 
                        className={`h-2 rounded-full ${getBandwidthColor(employee.bandwidth)}`} 
                        style={{ width: `${Math.min(employee.bandwidth, 100)}%` }}
                      ></div>
                    </div>
                    {employee.bandwidth >= 95 && (
                      <p className="text-[10px] text-red-600 font-medium mt-1">Reallocation recommended</p>
                    )}
                  </td>
                  
                  <td className="px-6 py-4 text-right">
                    <div className="text-sm font-bold text-zinc-900">{employee.completedTasksThisWeek}</div>
                    <div className="text-[10px] text-zinc-500 uppercase tracking-widest mt-0.5">Tasks Done</div>
                  </td>
                  
                  <td className="px-6 py-4 text-center">
                    <button className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-lg transition-colors border border-transparent hover:border-zinc-200 shadow-sm opacity-0 group-hover:opacity-100">
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredStaff.length === 0 && (
            <div className="p-12 text-center text-zinc-500">
              <Briefcase className="w-12 h-12 mx-auto text-zinc-300 mb-4" />
              <p className="font-medium text-zinc-900">No staff found</p>
              <p className="text-sm mt-1">Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
