import React, { useState } from 'react';
import { Calculator, CheckCircle, Clock, AlertTriangle, FileText, Search, Play, Pause, ChevronRight } from 'lucide-react';
import { Client } from '../../types';

interface ComplianceTask {
  id: string;
  clientName: string;
  type: string;
  status: 'Ready' | 'Processing' | 'Validated' | 'Error';
  dueDate: string;
  progress: number;
}

const initialTasks: ComplianceTask[] = [
  { id: 'COMP-1', clientName: 'Rajesh Kumar', type: 'ITR-1 Auto Computation', status: 'Validated', dueDate: '2026-07-31', progress: 100 },
  { id: 'COMP-2', clientName: 'Acme Corp', type: 'GSTR-3B Reconciliation', status: 'Processing', dueDate: '2026-07-20', progress: 45 },
  { id: 'COMP-3', clientName: 'TechVision Solutions', type: 'TDS Returns Q1', status: 'Ready', dueDate: '2026-07-15', progress: 0 },
  { id: 'COMP-4', clientName: 'Global Exports', type: 'Form 16 Generation', status: 'Error', dueDate: '2026-07-10', progress: 80 },
];

export default function ComplianceEngine() {
  const [tasks, setTasks] = useState(initialTasks);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTasks = tasks.filter(task => 
    task.clientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    task.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Ready': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Processing': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Validated': return 'bg-green-100 text-green-700 border-green-200';
      case 'Error': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-zinc-100 text-zinc-700 border-zinc-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Ready': return <Play className="w-4 h-4 text-blue-500" />;
      case 'Processing': return <Clock className="w-4 h-4 text-yellow-500 animate-pulse" />;
      case 'Validated': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Error': return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Compliance Engine</h2>
          <p className="text-sm text-zinc-500 mt-1">Automated tax computations and statutory rule validations.</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Search computations..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-zinc-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 w-64"
            />
          </div>
          <button className="flex items-center px-4 py-2 bg-zinc-900 text-white rounded-md text-sm font-medium hover:bg-zinc-800 shadow-sm">
            <Calculator className="w-4 h-4 mr-2" />
            Run Batch Compute
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm flex items-center">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center mr-4">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Computations Run</p>
            <p className="text-2xl font-bold text-zinc-900">1,248</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm flex items-center">
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-lg flex items-center justify-center mr-4">
            <CheckCircle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Rules Validated</p>
            <p className="text-2xl font-bold text-zinc-900">14.5k</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm flex items-center">
          <div className="w-12 h-12 bg-red-50 text-red-600 rounded-lg flex items-center justify-center mr-4">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Anomalies Detected</p>
            <p className="text-2xl font-bold text-zinc-900">32</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm flex items-center">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center mr-4">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Ready to File</p>
            <p className="text-2xl font-bold text-zinc-900">89</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-zinc-200 bg-zinc-50">
          <h3 className="font-bold tracking-tight text-zinc-800">Active Computation Jobs</h3>
        </div>
        <div className="divide-y divide-zinc-200">
          {filteredTasks.map((task) => (
            <div key={task.id} className="p-5 hover:bg-zinc-50 transition-colors flex items-center justify-between group">
              <div className="flex-1 flex items-center">
                <div className="w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center mr-4">
                  {getStatusIcon(task.status)}
                </div>
                <div>
                  <h4 className="font-semibold text-zinc-900">{task.type}</h4>
                  <p className="text-sm text-zinc-500">{task.clientName}</p>
                </div>
              </div>
              
              <div className="flex-1 px-8">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Progress</span>
                  <span className="text-xs font-mono text-zinc-700">{task.progress}%</span>
                </div>
                <div className="w-full bg-zinc-100 rounded-full h-1.5 overflow-hidden">
                  <div 
                    className={`h-1.5 rounded-full ${
                      task.status === 'Validated' ? 'bg-green-500' :
                      task.status === 'Error' ? 'bg-red-500' :
                      task.status === 'Processing' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`} 
                    style={{ width: `${task.progress}%` }}
                  ></div>
                </div>
                {task.status === 'Error' && (
                  <p className="text-[10px] text-red-500 mt-1">Rule #402 Validation failed: Mismatched PAN across documents.</p>
                )}
              </div>
              
              <div className="flex items-center space-x-6 justify-end flex-1">
                <div className="text-right">
                  <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Due Date</p>
                  <p className="text-sm font-medium font-mono text-zinc-700">{task.dueDate}</p>
                </div>
                <span className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wider border rounded w-24 text-center ${getStatusColor(task.status)}`}>
                  {task.status}
                </span>
                <button className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-full transition-colors opacity-0 group-hover:opacity-100">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
          
          {filteredTasks.length === 0 && (
            <div className="p-12 text-center text-zinc-500">
              <Calculator className="w-12 h-12 mx-auto text-zinc-300 mb-4" />
              <p className="font-medium text-zinc-900">No active computations</p>
              <p className="text-sm mt-1">Run a new batch compute to start processing.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
