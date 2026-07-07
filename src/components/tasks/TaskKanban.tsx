import React, { useState } from 'react';
import { Plus, Search, Filter, Clock, AlertCircle, CheckCircle, MoreHorizontal } from 'lucide-react';
import { Task } from '../../types';

const initialTasks: Task[] = [
  { id: 'T-1001', title: 'Prepare FY24 ITR', clientId: 'C1', clientName: 'Acme Corp', assigneeId: 'E1', assigneeName: 'Rajesh Kumar', status: 'Todo', priority: 'High', dueDate: '2026-07-25' },
  { id: 'T-1002', title: 'GSTR-3B Filing', clientId: 'C2', clientName: 'TechVision Solutions', assigneeId: 'E2', assigneeName: 'Anita Sharma', status: 'In Progress', priority: 'Medium', dueDate: '2026-07-20' },
  { id: 'T-1003', title: 'Statutory Audit Planning', clientId: 'C3', clientName: 'Global Exports', assigneeId: 'E1', assigneeName: 'Rajesh Kumar', status: 'Review', priority: 'High', dueDate: '2026-07-15' },
  { id: 'T-1004', title: 'TDS Return Q1', clientId: 'C1', clientName: 'Acme Corp', assigneeId: 'E3', assigneeName: 'Vikram Singh', status: 'Done', priority: 'Medium', dueDate: '2026-07-10' },
  { id: 'T-1005', title: 'Bank Reconciliation', clientId: 'C4', clientName: 'Nisha Enterprises', assigneeId: 'E4', assigneeName: 'Priya Desai', status: 'Todo', priority: 'Low', dueDate: '2026-07-30' },
  { id: 'T-1006', title: 'Respond to Tax Notice', clientId: 'C2', clientName: 'TechVision Solutions', assigneeId: 'E1', assigneeName: 'Rajesh Kumar', status: 'In Progress', priority: 'High', dueDate: '2026-07-18' },
];

const PriorityBadge = ({ priority }: { priority: string }) => {
  const colors = {
    'High': 'bg-red-100 text-red-700 border-red-200',
    'Medium': 'bg-yellow-100 text-yellow-700 border-yellow-200',
    'Low': 'bg-green-100 text-green-700 border-green-200',
  };
  const colorClass = colors[priority as keyof typeof colors] || 'bg-zinc-100 text-zinc-700 border-zinc-200';
  
  return (
    <span className={`px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase border rounded ${colorClass}`}>
      {priority}
    </span>
  );
};

export default function TaskKanban() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [searchTerm, setSearchTerm] = useState('');

  const columns = ['Todo', 'In Progress', 'Review', 'Done'];

  const filteredTasks = tasks.filter(task => 
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    task.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.assigneeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Workflow & Tasks</h2>
          <p className="text-sm text-zinc-500 mt-1">Manage project workflows and track internal task progress.</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Search tasks..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-zinc-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 w-64"
            />
          </div>
          <button className="flex items-center px-3 py-2 bg-white border border-zinc-300 rounded-md text-sm font-medium hover:bg-zinc-50">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          <button className="flex items-center px-4 py-2 bg-zinc-900 text-white rounded-md text-sm font-medium hover:bg-zinc-800">
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </button>
        </div>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4 h-[calc(100vh-220px)]">
        {columns.map(column => {
          const columnTasks = filteredTasks.filter(t => t.status === column);
          
          return (
            <div key={column} className="flex-1 min-w-[300px] flex flex-col bg-zinc-50/50 rounded-lg border border-zinc-200">
              <div className="p-4 border-b border-zinc-200 flex justify-between items-center bg-zinc-50 rounded-t-lg">
                <h3 className="font-bold text-sm tracking-wide text-zinc-700 uppercase">{column}</h3>
                <span className="bg-zinc-200 text-zinc-700 text-xs font-bold px-2 py-0.5 rounded-full">
                  {columnTasks.length}
                </span>
              </div>
              
              <div className="p-3 flex-1 overflow-y-auto space-y-3">
                {columnTasks.map(task => (
                  <div key={task.id} className="bg-white p-4 rounded-lg border border-zinc-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex justify-between items-start mb-2">
                      <PriorityBadge priority={task.priority} />
                      <button className="text-zinc-400 hover:text-zinc-600">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <h4 className="font-semibold text-zinc-900 mb-1">{task.title}</h4>
                    <p className="text-xs text-zinc-500 mb-4">{task.clientName}</p>
                    
                    <div className="flex items-center justify-between mt-4 pt-3 border-t border-zinc-100">
                      <div className="flex items-center text-xs text-zinc-500">
                        <div className="w-6 h-6 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold text-[10px] mr-2">
                          {task.assigneeName.split(' ').map(n => n[0]).join('')}
                        </div>
                        {task.assigneeName}
                      </div>
                      
                      <div className={`flex items-center text-[10px] font-mono ${new Date(task.dueDate) < new Date() && task.status !== 'Done' ? 'text-red-500 font-bold' : 'text-zinc-400'}`}>
                        {task.status === 'Done' ? (
                          <CheckCircle className="w-3 h-3 mr-1 text-green-500" />
                        ) : (
                          <Clock className="w-3 h-3 mr-1" />
                        )}
                        {task.dueDate}
                      </div>
                    </div>
                  </div>
                ))}
                
                {columnTasks.length === 0 && (
                  <div className="text-center py-8 text-zinc-400 text-sm border-2 border-dashed border-zinc-200 rounded-lg">
                    No tasks
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
