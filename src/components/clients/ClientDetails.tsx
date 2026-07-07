import React, { useState } from 'react';
import { ArrowLeft, FileText, CheckSquare, Activity, Folder, UploadCloud, AlertCircle } from 'lucide-react';
import { mockClients, mockComplianceTasks, mockDocuments, mockTasks } from '../../data';
import TaxPlanner from './TaxPlanner';

interface ClientDetailsProps {
  clientId: string;
  onBack: () => void;
}

export default function ClientDetails({ clientId, onBack }: ClientDetailsProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'compliance' | 'tax-planner' | 'documents' | 'tasks' | 'timeline' | 'graph'>('compliance');
  const client = mockClients.find(c => c.id === clientId);
  
  if (!client) return <div>Client not found</div>;

  const clientTasks = mockTasks.filter(t => t.clientId === clientId);
  const clientDocs = mockDocuments.slice(0, 3); // Simulating docs for this client
  const clientCompliances = mockComplianceTasks.filter(c => c.clientId === clientId);

  const getHealthColor = (score: string) => {
    switch (score) {
      case 'Green': return 'text-green-800 bg-green-100';
      case 'Yellow': return 'text-yellow-800 bg-yellow-100';
      case 'Red': return 'text-red-800 bg-red-100';
      default: return 'text-zinc-800 bg-zinc-100';
    }
  };

  return (
    <div className="max-w-7xl mx-auto flex flex-col h-full space-y-6 pb-12">
      <div className="flex items-center gap-4 text-sm text-zinc-500 font-medium mb-2">
         <button onClick={onBack} className="hover:text-zinc-900 transition-colors flex items-center">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Clients
         </button>
         <span>/</span>
         <span className="text-zinc-900 font-bold">{client.name}</span>
      </div>

      <div className="flex items-end justify-between border-b border-zinc-200 pb-6">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center border border-zinc-200 shadow-sm">
            <span className="text-2xl">{client.type === 'Company' || client.type === 'LLP' ? '🏢' : '👤'}</span>
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl font-bold tracking-tighter">{client.name}</h1>
              <span className={`text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider ${getHealthColor(client.healthScore)}`}>
                Health: {client.healthScore}
              </span>
            </div>
            <div className="flex gap-4 text-xs font-mono opacity-60 uppercase mt-2">
               <span>PAN: {client.pan}</span>
               {client.gstin && <span>GST: {client.gstin}</span>}
               <span>Type: {client.type}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="bg-zinc-900 text-white px-4 py-2 rounded-md text-sm font-medium">Generate Report</button>
          <button className="bg-white border border-zinc-200 px-4 py-2 rounded-md text-sm font-medium">Quick Action</button>
        </div>
      </div>

      {/* KPI Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border border-zinc-200 rounded-lg p-4">
          <p className="text-[11px] font-mono uppercase text-zinc-500 tracking-wider mb-1">Compliance Rate</p>
          <p className="text-2xl font-bold tracking-tight text-green-600">100%</p>
          <p className="text-[11px] opacity-50 mt-2">8/8 Filings Completed (FY23-24)</p>
        </div>
        <div className="bg-white border border-zinc-200 rounded-lg p-4">
          <p className="text-[11px] font-mono uppercase text-zinc-500 tracking-wider mb-1">Pending Docs</p>
          <p className="text-2xl font-bold tracking-tight">02</p>
          <p className="text-[11px] opacity-50 mt-2">Form 16B & Bank Statement Missing</p>
        </div>
        <div className="bg-white border border-zinc-200 rounded-lg p-4">
          <p className="text-[11px] font-mono uppercase text-zinc-500 tracking-wider mb-1">Risk Index</p>
          <p className="text-2xl font-bold tracking-tight text-yellow-600">Low (1.2)</p>
          <p className="text-[11px] opacity-50 mt-2">Probability of notice: 2.1%</p>
        </div>
      </div>

      <div className="border-b border-zinc-200 mt-4">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'compliance', label: 'Smart Compliance' },
            { id: 'tax-planner', label: 'Tax Planner & ITR' },
            { id: 'documents', label: 'Intelligent Docs' },
            { id: 'tasks', label: 'Workflow' },
            { id: 'timeline', label: 'Timeline' },
            { id: 'graph', label: 'Relationship Graph' },
            { id: 'profile', label: 'Profile' },
          ].map((tab) => {
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`
                  whitespace-nowrap flex items-center py-3 px-1 border-b-2 text-[13px] font-bold uppercase tracking-wider transition-colors
                  ${activeTab === tab.id 
                    ? 'border-zinc-900 text-zinc-900' 
                    : 'border-transparent text-zinc-500 hover:text-zinc-700 hover:border-zinc-300'}
                `}
              >
                {tab.label}
              </button>
            )
          })}
        </nav>
      </div>

      <div className="mt-4">
        {activeTab === 'compliance' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg border border-zinc-200 p-6">
              <h3 className="font-bold mb-4 flex items-center justify-between text-sm">
                Smart Compliance Engine
                <span className="text-[11px] font-normal opacity-50 font-mono uppercase tracking-widest">Current Window</span>
              </h3>
              <table className="w-full text-sm font-mono">
                <thead>
                  <tr className="text-left opacity-40 text-[10px] uppercase border-b border-zinc-100">
                    <th className="pb-2">Tax Type</th>
                    <th className="pb-2">Due Date</th>
                    <th className="pb-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {clientCompliances.map((comp) => (
                    <tr key={comp.id}>
                      <td className="py-3 font-bold font-sans text-xs text-zinc-900">{comp.type}</td>
                      <td className="py-3 opacity-60 text-xs">{comp.dueDate}</td>
                      <td className="py-3 text-right">
                         <span className={`text-[10px] font-bold uppercase tracking-wider ${
                            comp.status === 'Filed' ? 'text-green-600' :
                            comp.status === 'Overdue' ? 'text-red-600' :
                            'text-blue-600'
                          }`}>
                            {comp.status === 'Filed' ? '● FILED' : comp.status}
                          </span>
                      </td>
                    </tr>
                  ))}
                  {clientCompliances.length === 0 && (
                    <tr>
                      <td colSpan={3} className="py-8 text-center text-xs font-mono opacity-50 uppercase tracking-widest">No active compliances</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="bg-white rounded-lg border border-zinc-200 p-6">
               <h3 className="font-bold mb-4 text-sm">Compliance Timeline</h3>
               <div className="space-y-6">
                 <div className="pl-4 border-l border-zinc-200 relative pb-2">
                   <div className="absolute left-[-4.5px] top-1 w-2 h-2 rounded-full bg-zinc-300 border border-white"></div>
                   <p className="text-[11px] font-bold uppercase tracking-wide opacity-50 mb-1">Next Week</p>
                   <p className="text-xs">TDS Q2 Return is due on 31 Oct. Currently in DRAFT state.</p>
                 </div>
                 <div className="pl-4 border-l border-zinc-200 relative pb-2">
                   <div className="absolute left-[-4.5px] top-1 w-2 h-2 rounded-full bg-zinc-300 border border-white"></div>
                   <p className="text-[11px] font-bold uppercase tracking-wide opacity-50 mb-1">Yesterday</p>
                   <p className="text-xs">GSTR-1 for September was successfully filed by Neha Gupta.</p>
                 </div>
                 <div className="bg-zinc-950 p-4 rounded-xl mt-4 shadow-xl border border-zinc-800">
                   <p className="text-white font-bold text-xs mb-3 uppercase tracking-widest">AI Action Required</p>
                   <p className="text-white/70 text-[11px] leading-relaxed mb-4">Advance Tax calculation pending for Q3. Last year's liability suggests a 15% increase.</p>
                   <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-[10px] font-bold uppercase tracking-widest transition-colors shadow-lg shadow-blue-900/50">Run Calculation</button>
                 </div>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'tax-planner' && (
          <TaxPlanner client={client} />
        )}

        {activeTab === 'documents' && (
          <div className="space-y-6">
             <div className="bg-zinc-50 p-4 border border-zinc-200 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">Document Checklist (FY23-24)</span>
                  <span className="text-[10px] font-mono font-bold">66% COMPLETE</span>
                </div>
                <div className="w-full bg-zinc-200 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-green-500 h-full" style={{ width: '66%' }}></div>
                </div>
                <div className="flex justify-between mt-3 text-[11px] opacity-60">
                  <span>2/3 Uploaded</span>
                  <button className="text-blue-600 font-bold hover:underline cursor-pointer">Request Missing</button>
                </div>
             </div>

             <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden">
                <ul className="divide-y divide-zinc-100">
                  {clientDocs.map((doc) => (
                    <li key={doc.id} className="p-4 hover:bg-zinc-50 flex items-center justify-between transition-colors">
                      <div className="flex items-center gap-4">
                        <span className={`text-xl ${doc.status === 'Missing' ? 'opacity-30' : ''}`}>📄</span>
                        <div>
                          <p className={`text-xs font-bold ${doc.status === 'Missing' ? 'text-zinc-400 line-through' : 'text-zinc-900'}`}>{doc.name}</p>
                          <p className="text-[10px] font-mono opacity-50 mt-1 uppercase">{doc.category} • {doc.size} {doc.uploadDate !== '-' && `• ${doc.uploadDate}`}</p>
                        </div>
                      </div>
                      <button className="text-[10px] font-bold border border-zinc-200 px-3 py-1.5 rounded hover:bg-zinc-100 uppercase tracking-widest text-zinc-600 transition-colors">
                        {doc.status === 'Missing' ? 'Upload' : 'Preview'}
                      </button>
                    </li>
                  ))}
                </ul>
             </div>
          </div>
        )}

        {activeTab === 'tasks' && (
          <div className="bg-white border border-zinc-200 rounded-lg overflow-hidden">
             <ul className="divide-y divide-zinc-100">
               {clientTasks.map(task => (
                 <li key={task.id} className="p-4 hover:bg-zinc-50 flex justify-between items-center transition-colors">
                   <div>
                     <h4 className="text-sm font-bold text-zinc-900">{task.title}</h4>
                     <p className="text-[11px] font-mono text-zinc-500 mt-1 uppercase">Due: {task.dueDate} • By: {task.assigneeName}</p>
                   </div>
                   <span className={`text-[10px] font-bold border px-2 py-1 rounded uppercase tracking-widest ${
                      task.status === 'Done' ? 'bg-green-50 border-green-200 text-green-700' :
                      task.status === 'In Progress' ? 'bg-blue-50 border-blue-200 text-blue-700' :
                      'bg-zinc-50 border-zinc-200 text-zinc-700'
                   }`}>
                      {task.status}
                   </span>
                 </li>
               ))}
               {clientTasks.length === 0 && (
                 <li className="p-8 text-center text-xs font-mono uppercase tracking-widest opacity-50">No active tasks</li>
               )}
             </ul>
          </div>
        )}

        {activeTab === 'profile' && (
           <div className="bg-white border border-zinc-200 rounded-lg p-6">
              <h3 className="text-sm font-bold mb-4 uppercase tracking-wider">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider mb-1">Contact Person</p>
                  <p className="text-sm font-medium text-zinc-900">{client.contactPerson}</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider mb-1">Email Address</p>
                  <p className="text-sm font-medium text-zinc-900">{client.email}</p>
                </div>
                <div>
                  <p className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider mb-1">Phone</p>
                  <p className="text-sm font-medium font-mono text-zinc-900">{client.phone}</p>
                </div>
              </div>
           </div>
        )}

        {activeTab === 'timeline' && (
           <div className="bg-white border border-zinc-200 rounded-lg p-6">
              <h3 className="text-sm font-bold mb-6 flex items-center">
                Client History & Timeline
              </h3>
              <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-zinc-200 before:to-transparent">
                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-blue-100 text-blue-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    <span className="text-lg">✅</span>
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-zinc-50 border border-zinc-200 p-4 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-sm text-zinc-900">GST Registration Restored</h4>
                      <time className="text-[10px] font-mono opacity-50 uppercase tracking-widest">Oct 2024</time>
                    </div>
                    <p className="text-xs text-zinc-600 leading-relaxed">Successfully appealed and restored the cancelled GST registration due to non-filing. All pending returns were cleared with penalty.</p>
                  </div>
                </div>

                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-green-100 text-green-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    <span className="text-lg">💰</span>
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-zinc-50 border border-zinc-200 p-4 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-sm text-zinc-900">Income Tax Refund Processed</h4>
                      <time className="text-[10px] font-mono opacity-50 uppercase tracking-widest">Aug 2023</time>
                    </div>
                    <p className="text-xs text-zinc-600 leading-relaxed">Resolved the grievance regarding delayed refund for AY 2022-23. Refund of ₹1.4L credited to client's account.</p>
                  </div>
                </div>

                <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-red-100 text-red-600 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                    <span className="text-lg">⚠️</span>
                  </div>
                  <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-zinc-50 border border-zinc-200 p-4 rounded-lg shadow-sm">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-bold text-sm text-zinc-900">Section 143(1) Notice Responded</h4>
                      <time className="text-[10px] font-mono opacity-50 uppercase tracking-widest">Feb 2022</time>
                    </div>
                    <p className="text-xs text-zinc-600 leading-relaxed">Submitted response to defective return notice under section 139(9) regarding mismatch in 26AS. Dropped successfully.</p>
                  </div>
                </div>
              </div>
           </div>
        )}
        {activeTab === 'graph' && (
           <div className="bg-white border border-zinc-200 rounded-lg p-6 min-h-[500px] flex flex-col relative overflow-hidden">
             <div className="absolute top-4 right-4 flex gap-2 z-10">
               <button className="text-[10px] bg-white border border-zinc-200 px-3 py-1.5 rounded-md font-bold uppercase tracking-widest shadow-sm">Reset View</button>
               <button className="text-[10px] bg-zinc-900 text-white border border-zinc-900 px-3 py-1.5 rounded-md font-bold uppercase tracking-widest shadow-sm">Export</button>
             </div>
             
             <h3 className="text-sm font-bold mb-6 flex items-center z-10">
               Entity Relationship Graph
             </h3>

             <div className="flex-1 w-full bg-zinc-50 rounded-lg border border-zinc-100 flex items-center justify-center relative bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
               {/* Center Node */}
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                 <div className="bg-zinc-900 text-white px-6 py-4 rounded-xl shadow-xl flex flex-col items-center border-2 border-zinc-900 w-48 text-center cursor-pointer hover:scale-105 transition-transform">
                   <span className="text-2xl mb-2">🏢</span>
                   <span className="font-bold text-sm leading-tight">{client.name}</span>
                   <span className="text-[10px] opacity-60 font-mono mt-1">{client.pan}</span>
                 </div>
               </div>

               {/* Director Nodes */}
               <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 z-20">
                 <div className="bg-white px-4 py-3 rounded-lg shadow-lg flex flex-col items-center border border-zinc-200 w-40 text-center cursor-pointer hover:scale-105 transition-transform">
                   <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mb-2 font-bold text-xs">MK</div>
                   <span className="font-bold text-xs">Mukesh Kumar</span>
                   <span className="text-[10px] text-zinc-500 font-mono mt-1">Director (DIN: 012)</span>
                 </div>
               </div>

               <div className="absolute top-1/4 right-1/4 translate-x-1/2 -translate-y-1/2 z-20">
                 <div className="bg-white px-4 py-3 rounded-lg shadow-lg flex flex-col items-center border border-zinc-200 w-40 text-center cursor-pointer hover:scale-105 transition-transform">
                   <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center mb-2 font-bold text-xs">RJ</div>
                   <span className="font-bold text-xs">Ramesh Jain</span>
                   <span className="text-[10px] text-zinc-500 font-mono mt-1">Partner (DIN: 034)</span>
                 </div>
               </div>

               {/* GST Nodes */}
               <div className="absolute bottom-1/4 left-1/3 -translate-x-1/2 translate-y-1/2 z-20">
                 <div className="bg-white px-4 py-3 rounded-lg shadow-lg flex flex-col items-center border border-zinc-200 w-40 text-center cursor-pointer hover:scale-105 transition-transform">
                   <span className="text-lg mb-1">📝</span>
                   <span className="font-bold text-xs">GSTIN (Maharashtra)</span>
                   <span className="text-[10px] text-zinc-500 font-mono mt-1">27AAACP1234Q1Z5</span>
                 </div>
               </div>

               <div className="absolute bottom-1/4 right-1/3 translate-x-1/2 translate-y-1/2 z-20">
                 <div className="bg-white px-4 py-3 rounded-lg shadow-lg flex flex-col items-center border border-zinc-200 w-40 text-center cursor-pointer hover:scale-105 transition-transform">
                   <span className="text-lg mb-1">🏭</span>
                   <span className="font-bold text-xs">GSTIN (Gujarat)</span>
                   <span className="text-[10px] text-zinc-500 font-mono mt-1">24AAACP1234Q1Z2</span>
                 </div>
               </div>

               {/* Drawing Lines using SVG */}
               <svg className="absolute inset-0 w-full h-full z-10 pointer-events-none">
                 {/* Line to Director 1 */}
                 <path d="M 50% 50% Q 30% 40% 25% 25%" fill="none" stroke="#d4d4d8" strokeWidth="2" strokeDasharray="4 4" />
                 {/* Line to Director 2 */}
                 <path d="M 50% 50% Q 70% 40% 75% 25%" fill="none" stroke="#d4d4d8" strokeWidth="2" strokeDasharray="4 4" />
                 {/* Line to GST 1 */}
                 <path d="M 50% 50% Q 40% 60% 33% 75%" fill="none" stroke="#d4d4d8" strokeWidth="2" strokeDasharray="4 4" />
                 {/* Line to GST 2 */}
                 <path d="M 50% 50% Q 60% 60% 67% 75%" fill="none" stroke="#d4d4d8" strokeWidth="2" strokeDasharray="4 4" />
               </svg>
             </div>
           </div>
        )}
      </div>
    </div>
  );
}
