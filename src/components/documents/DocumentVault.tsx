import React, { useState } from 'react';
import { 
  Folder, FileText, Download, Eye, UploadCloud, 
  Search, Bell, CheckCircle2, AlertCircle, 
  ChevronDown, FileImage, FileSpreadsheet, Send
} from 'lucide-react';

interface ClientDocument {
  id: string;
  name: string;
  type: 'PDF' | 'Excel' | 'Image' | 'Word' | 'ZIP';
  uploadedOn: string;
  uploadedBy: string;
  size: string;
  category: string;
}

interface RequiredDoc {
  id: string;
  name: string;
  status: 'Received' | 'Missing';
}

const MOCK_DOCS: ClientDocument[] = [
  { id: '1', name: 'Sales Register.xlsx', type: 'Excel', uploadedOn: '10 Jul 2026', uploadedBy: 'Client', size: '2.3 MB', category: 'GST - July Return' },
  { id: '2', name: 'Bank Statement.pdf', type: 'PDF', uploadedOn: '10 Jul 2026', uploadedBy: 'Client', size: '8.5 MB', category: 'Income Tax - AY 2026-27' },
  { id: '3', name: 'Trial Balance.xlsx', type: 'Excel', uploadedOn: '11 Jul 2026', uploadedBy: 'Rahul', size: '950 KB', category: 'Audit' },
  { id: '4', name: 'Form 16.pdf', type: 'PDF', uploadedOn: '12 Jul 2026', uploadedBy: 'Client', size: '1.2 MB', category: 'Income Tax - AY 2026-27' },
  { id: '5', name: 'PAN Card.jpg', type: 'Image', uploadedOn: '01 Apr 2026', uploadedBy: 'Client', size: '400 KB', category: 'Other Documents' },
  { id: '6', name: 'Aadhaar.jpg', type: 'Image', uploadedOn: '01 Apr 2026', uploadedBy: 'Client', size: '500 KB', category: 'Other Documents' },
];

const REQUIRED_DOCS: RequiredDoc[] = [
  { id: 'r1', name: 'PAN', status: 'Received' },
  { id: 'r2', name: 'Aadhaar', status: 'Received' },
  { id: 'r3', name: 'Bank Statement', status: 'Missing' },
  { id: 'r4', name: 'Form 16', status: 'Received' },
  { id: 'r5', name: 'Capital Gain Statement', status: 'Missing' },
];

export default function DocumentVault() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedClient, setSelectedClient] = useState('ABC Industries');
  const [showUploadMsg, setShowUploadMsg] = useState(false);

  const categories = ['All', 'GST - July Return', 'Income Tax - AY 2026-27', 'Audit', 'Notices', 'Other Documents'];

  const filteredDocs = MOCK_DOCS.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' ? true : doc.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'PDF': return <FileText className="h-5 w-5 text-red-500" />;
      case 'Excel': return <FileSpreadsheet className="h-5 w-5 text-green-600" />;
      case 'Image': return <FileImage className="h-5 w-5 text-blue-500" />;
      default: return <FileText className="h-5 w-5 text-zinc-500" />;
    }
  };

  const handleUploadClick = () => {
    setShowUploadMsg(true);
    setTimeout(() => setShowUploadMsg(false), 3000);
  };

  const receivedCount = REQUIRED_DOCS.filter(d => d.status === 'Received').length;
  const progressPercent = Math.round((receivedCount / REQUIRED_DOCS.length) * 100);

  return (
    <div className="max-w-7xl mx-auto flex flex-col h-full space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between border-b border-zinc-200 pb-6">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center border border-zinc-200 shadow-sm relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-blue-500/10"></div>
            <Folder className="h-8 w-8 text-indigo-600 relative z-10" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tighter">Client Document Workspace</h1>
            <div className="flex items-center gap-2 text-xs font-mono opacity-60 uppercase mt-2">
               <span>One Client. One Workspace. Every Document.</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column - Main Document Area */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Action Bar */}
          <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-zinc-500">Client:</span>
              <button className="flex items-center gap-2 bg-zinc-50 border border-zinc-200 px-3 py-1.5 rounded-md text-sm font-bold text-zinc-900 hover:bg-zinc-100 transition-colors">
                {selectedClient} <ChevronDown className="h-4 w-4" />
              </button>
            </div>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                <input 
                  type="text" 
                  placeholder="Search documents..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-white border border-zinc-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 w-full sm:w-64 transition-all"
                />
              </div>
              <button 
                onClick={handleUploadClick}
                className="flex items-center bg-zinc-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-800 transition-colors whitespace-nowrap"
              >
                <UploadCloud className="h-4 w-4 mr-2" />
                Upload
              </button>
            </div>
          </div>
          {showUploadMsg && (
             <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-md text-sm font-medium flex items-center shadow-sm">
               <CheckCircle2 className="h-4 w-4 mr-2" />
               Upload initiated for {selectedClient} workspace.
             </div>
          )}

          {/* Folder Navigation */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat 
                  ? 'bg-zinc-900 text-white shadow-sm' 
                  : 'bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Document List */}
          <div className="bg-white border border-zinc-200 rounded-xl overflow-hidden shadow-sm">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-zinc-50 border-b border-zinc-200 text-zinc-500">
                  <th className="px-4 py-3 font-semibold uppercase tracking-wider text-[10px]">File Name</th>
                  <th className="px-4 py-3 font-semibold uppercase tracking-wider text-[10px]">Uploaded On</th>
                  <th className="px-4 py-3 font-semibold uppercase tracking-wider text-[10px]">Uploaded By</th>
                  <th className="px-4 py-3 font-semibold uppercase tracking-wider text-[10px]">Size</th>
                  <th className="px-4 py-3 font-semibold uppercase tracking-wider text-[10px] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200">
                {filteredDocs.map(doc => (
                  <tr key={doc.id} className="hover:bg-zinc-50/50 transition-colors group">
                    <td className="px-4 py-3 flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-zinc-100 flex items-center justify-center shrink-0 border border-zinc-200">
                        {getFileIcon(doc.type)}
                      </div>
                      <div>
                        <p className="font-bold text-zinc-900 text-[13px]">{doc.name}</p>
                        {selectedCategory === 'All' && (
                          <p className="text-[10px] text-zinc-500 uppercase tracking-wide mt-0.5">{doc.category}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-zinc-600 font-mono text-xs">{doc.uploadedOn}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                        doc.uploadedBy === 'Client' ? 'bg-indigo-50 text-indigo-700 border border-indigo-100' : 'bg-zinc-100 text-zinc-700 border border-zinc-200'
                      }`}>
                        {doc.uploadedBy}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-zinc-500 font-mono text-xs">{doc.size}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-zinc-500 hover:text-indigo-600 p-1.5 rounded hover:bg-indigo-50 transition-colors" title="Preview">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-zinc-500 hover:text-indigo-600 p-1.5 rounded hover:bg-indigo-50 transition-colors" title="Download">
                          <Download className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredDocs.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-12 text-center text-zinc-500">
                      <Folder className="w-10 h-10 mx-auto text-zinc-300 mb-3" />
                      <p className="text-sm font-medium text-zinc-900">No documents found</p>
                      <p className="text-xs mt-1">Try a different search term or category</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column - Checklist & Reminders */}
        <div className="space-y-6">
          <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-sm">
            <h3 className="font-bold text-zinc-900 text-sm mb-4">Required Documents Checklist</h3>
            <div className="mb-6">
               <div className="flex justify-between items-center mb-2">
                 <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Completion Progress</span>
                 <span className="text-xs font-black text-indigo-600">{progressPercent}%</span>
               </div>
               <div className="w-full bg-zinc-100 rounded-full h-2 overflow-hidden">
                 <div className="bg-indigo-600 h-2 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
               </div>
            </div>

            <div className="space-y-3">
              {REQUIRED_DOCS.map(doc => (
                <div key={doc.id} className="flex items-center justify-between py-1.5 border-b border-zinc-50 last:border-0">
                  <span className={`text-sm ${doc.status === 'Received' ? 'text-zinc-900 font-medium' : 'text-zinc-500'}`}>{doc.name}</span>
                  {doc.status === 'Received' ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  )}
                </div>
              ))}
            </div>

            <button className="w-full mt-6 flex items-center justify-center bg-zinc-900 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-zinc-800 transition-colors">
              <Send className="h-4 w-4 mr-2" />
              Send Reminder
            </button>
          </div>

          <div className="bg-zinc-950 rounded-xl p-5 border border-zinc-800 text-white overflow-hidden relative shadow-lg">
            <div className="absolute -right-6 -top-6 w-32 h-32 bg-indigo-600 rounded-full blur-3xl opacity-20 pointer-events-none"></div>
            <h3 className="font-bold text-sm mb-2 uppercase tracking-widest text-indigo-400">Client Portal Status</h3>
            <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
              ABC Industries is active on the client portal. They last logged in 2 hours ago.
            </p>
            <div className="flex items-center gap-2">
               <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
               <span className="text-xs font-mono font-bold text-emerald-400">Portal Link Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
