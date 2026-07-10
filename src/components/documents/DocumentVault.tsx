import React, { useState } from 'react';
import { Search, Upload, Download, Share2, MoreVertical, FileText, FileSpreadsheet, File, AlertCircle, CheckCircle, Clock, Shield, Key, FileSignature, Send } from 'lucide-react';

interface VaultDocument {
  id: string;
  name: string;
  clientName: string;
  type: 'PDF' | 'Excel' | 'Image';
  category: 'ITR' | 'GST' | 'Audit' | 'KYC';
  uploadDate: string;
  status: 'Verified' | 'Signature Pending' | 'Action Required' | 'Missing';
  size: string;
  extractedData?: Record<string, string>;
  alertMsg?: string;
}

const initialDocuments: VaultDocument[] = [
  { 
    id: 'D-101', name: 'Form16_FY23-24.pdf', clientName: 'Rajesh Kumar', type: 'PDF', category: 'ITR', 
    uploadDate: '2026-07-06', status: 'Verified', size: '1.2 MB', 
    extractedData: { 'Gross Salary': '₹15,50,000', 'TDS': '₹1,20,000' } 
  },
  { 
    id: 'D-102', name: 'BankStatement_Q1.xlsx', clientName: 'Acme Corp', type: 'Excel', category: 'Audit', 
    uploadDate: '2026-07-05', status: 'Action Required', size: '4.5 MB',
    alertMsg: 'Password protected. Awaiting password from client.'
  },
  { 
    id: 'D-103', name: 'PAN_Card.jpg', clientName: 'Nisha Enterprises', type: 'Image', category: 'KYC', 
    uploadDate: '2026-07-04', status: 'Verified', size: '850 KB', 
    extractedData: { 'PAN': 'ABCDE1234F' } 
  },
  { 
    id: 'D-104', name: 'GST_Invoices_June (Expected)', clientName: 'TechVision Solutions', type: 'PDF', category: 'GST', 
    uploadDate: '--', status: 'Missing', size: '--',
    alertMsg: 'Required for June GSTR-1 filing.'
  },
  { 
    id: 'D-105', name: 'Audit_Report_FY24.pdf', clientName: 'Global Exports', type: 'PDF', category: 'Audit', 
    uploadDate: '2026-07-02', status: 'Signature Pending', size: '3.1 MB',
    alertMsg: 'Awaiting Director e-Signature.'
  },
];

export default function DocumentVault() {
  const [documents, setDocuments] = useState(initialDocuments);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'All' | 'ITR' | 'GST' | 'Audit' | 'KYC'>('All');

  const filteredDocs = documents.filter(doc => 
    (activeTab === 'All' || doc.category === activeTab) &&
    (doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || doc.clientName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const missingCount = documents.filter(d => d.status === 'Missing').length;
  const pendingSigCount = documents.filter(d => d.status === 'Signature Pending').length;

  const getFileIcon = (type: string, status: string) => {
    if (status === 'Missing') return <File className="w-8 h-8 text-zinc-300 border-2 border-dashed border-zinc-300 rounded" />;
    switch(type) {
      case 'PDF': return <FileText className="w-8 h-8 text-red-500" />;
      case 'Excel': return <FileSpreadsheet className="w-8 h-8 text-green-500" />;
      case 'Image': return <File className="w-8 h-8 text-blue-500" />;
      default: return <File className="w-8 h-8 text-zinc-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Verified': 
        return <span className="inline-flex items-center text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider text-green-700 bg-green-100 border border-green-200"><CheckCircle className="w-3 h-3 mr-1" /> Verified</span>;
      case 'Signature Pending': 
        return <span className="inline-flex items-center text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider text-purple-700 bg-purple-100 border border-purple-200"><FileSignature className="w-3 h-3 mr-1" /> Sig Pending</span>;
      case 'Action Required': 
        return <span className="inline-flex items-center text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider text-yellow-700 bg-yellow-100 border border-yellow-200"><Key className="w-3 h-3 mr-1" /> Action Req</span>;
      case 'Missing': 
        return <span className="inline-flex items-center text-[10px] px-2 py-0.5 rounded font-bold uppercase tracking-wider text-red-700 bg-red-100 border border-red-200"><AlertCircle className="w-3 h-3 mr-1" /> Missing</span>;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Secure Document Vault</h2>
          <p className="text-sm text-zinc-500 mt-1">Smart OCR extraction, missing document tracking, and secure client sharing.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 bg-zinc-900 text-white rounded-md text-sm font-medium hover:bg-zinc-800 shadow-sm transition-colors">
            <Upload className="w-4 h-4 mr-2" />
            Upload File
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Total Stored</p>
              <p className="text-3xl font-bold text-zinc-900">14.2k</p>
            </div>
            <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center"><Shield className="w-5 h-5" /></div>
          </div>
          <p className="text-xs text-zinc-500 mt-2 font-mono">1.2 TB Encrypted Data</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-sm border-l-4 border-l-red-500 cursor-pointer hover:bg-red-50 transition-colors" onClick={() => setSearchTerm('Missing')}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Missing Documents</p>
              <p className="text-3xl font-bold text-red-600">{missingCount}</p>
            </div>
            <div className="w-10 h-10 bg-red-50 text-red-600 rounded-lg flex items-center justify-center"><AlertCircle className="w-5 h-5" /></div>
          </div>
          <p className="text-xs text-zinc-500 mt-2">Blocking 2 compliance tasks</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-sm border-l-4 border-l-purple-500 cursor-pointer hover:bg-purple-50 transition-colors" onClick={() => setSearchTerm('Signature Pending')}>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Pending Signatures</p>
              <p className="text-3xl font-bold text-purple-600">{pendingSigCount}</p>
            </div>
            <div className="w-10 h-10 bg-purple-50 text-purple-600 rounded-lg flex items-center justify-center"><FileSignature className="w-5 h-5" /></div>
          </div>
          <p className="text-xs text-zinc-500 mt-2">Awaiting client e-Sign</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Auto-Extracted (OCR)</p>
              <p className="text-3xl font-bold text-green-600">89%</p>
            </div>
            <div className="w-10 h-10 bg-green-50 text-green-600 rounded-lg flex items-center justify-center"><CheckCircle className="w-5 h-5" /></div>
          </div>
          <p className="text-xs text-zinc-500 mt-2">Data successfully parsed</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="flex border-b border-zinc-200 overflow-x-auto bg-zinc-50/50">
          {['All', 'ITR', 'GST', 'Audit', 'KYC'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab 
                  ? 'border-zinc-900 text-zinc-900 bg-white' 
                  : 'border-transparent text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-4 border-b border-zinc-200 bg-white flex flex-col sm:flex-row justify-end">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Search by name, client or status..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-1.5 bg-white border border-zinc-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 w-full sm:w-80"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50 border-b border-zinc-200">
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">File Details</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Client & Category</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Status & Insights</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {filteredDocs.map((doc) => (
                <tr key={doc.id} className={`hover:bg-zinc-50 transition-colors group ${doc.status === 'Missing' ? 'bg-red-50/20' : ''}`}>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded bg-white border border-zinc-200 shadow-sm flex items-center justify-center mr-4 shrink-0">
                        {getFileIcon(doc.type, doc.status)}
                      </div>
                      <div>
                        <p className={`font-semibold text-sm mb-0.5 ${doc.status === 'Missing' ? 'text-zinc-500 italic' : 'text-zinc-900'}`}>{doc.name}</p>
                        <div className="flex items-center text-xs text-zinc-500 font-mono">
                          <span>{doc.size}</span>
                          <span className="mx-2">•</span>
                          <span>{doc.uploadDate !== '--' ? `Uploaded ${doc.uploadDate}` : 'Not Uploaded'}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-zinc-900 mb-1">{doc.clientName}</p>
                    <span className="px-2 py-0.5 bg-zinc-100 text-zinc-600 border border-zinc-200 rounded text-[10px] font-bold uppercase tracking-wider">
                      {doc.category}
                    </span>
                  </td>
                  
                  <td className="px-6 py-4">
                    <div className="mb-2">
                      {getStatusBadge(doc.status)}
                    </div>
                    
                    {doc.alertMsg && (
                      <p className={`text-[11px] font-medium ${doc.status === 'Missing' || doc.status === 'Action Required' ? 'text-red-600' : 'text-purple-600'}`}>
                        {doc.alertMsg}
                      </p>
                    )}
                    
                    {doc.extractedData && (
                      <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {Object.entries(doc.extractedData).map(([k, v]) => (
                          <span key={k} className="text-[10px] font-mono text-zinc-600 bg-green-50 border border-green-200 px-1.5 py-0.5 rounded">
                            <span className="font-bold opacity-60 mr-1">{k}:</span>{v}
                          </span>
                        ))}
                      </div>
                    )}
                  </td>
                  
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      {doc.status === 'Missing' || doc.status === 'Action Required' || doc.status === 'Signature Pending' ? (
                        <button className="flex items-center px-3 py-1.5 bg-white border border-zinc-300 text-zinc-700 rounded text-xs font-medium hover:bg-zinc-50 shadow-sm">
                          <Send className="w-3 h-3 mr-1.5" />
                          Remind Client
                        </button>
                      ) : (
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                          <button className="p-1.5 text-zinc-400 hover:text-blue-600 hover:bg-blue-50 rounded border border-transparent hover:border-blue-200 transition-colors" title="Create Secure Share Link">
                            <Share2 className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded border border-transparent hover:border-zinc-200 transition-colors" title="Download">
                            <Download className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded border border-transparent hover:border-zinc-200 transition-colors">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredDocs.length === 0 && (
            <div className="p-12 text-center text-zinc-500">
              <Shield className="w-12 h-12 mx-auto text-zinc-300 mb-4" />
              <p className="font-medium text-zinc-900">No documents found</p>
              <p className="text-sm mt-1">Adjust your filters or search term.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
