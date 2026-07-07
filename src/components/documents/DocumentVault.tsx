import React, { useState } from 'react';
import { FileText, File, FileSpreadsheet, Search, Filter, Upload, Download, Share2, MoreVertical, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Document } from '../../types';

const initialDocuments: (Document & { clientName: string; parsedData?: any })[] = [
  { id: 'D-101', name: 'Form16_FY23-24.pdf', type: 'PDF', uploadDate: '2026-07-06', status: 'Approved', category: 'ITR', size: '1.2 MB', clientName: 'Rajesh Kumar', parsedData: { 'Gross Salary': '₹15,50,000' } },
  { id: 'D-102', name: 'BankStatement_Q1.xlsx', type: 'Excel', uploadDate: '2026-07-05', status: 'Pending Review', category: 'Audit', size: '4.5 MB', clientName: 'Acme Corp' },
  { id: 'D-103', name: 'PAN_Card.jpg', type: 'Image', uploadDate: '2026-07-04', status: 'Approved', category: 'KYC', size: '850 KB', clientName: 'Nisha Enterprises', parsedData: { 'PAN Number': 'ABCDE1234F' } },
  { id: 'D-104', name: 'GST_Invoices_June.zip', type: 'PDF', uploadDate: '2026-07-07', status: 'Missing', category: 'GST', size: '12 MB', clientName: 'TechVision Solutions' },
  { id: 'D-105', name: 'Rent_Agreement.pdf', type: 'PDF', uploadDate: '2026-07-02', status: 'Approved', category: 'ITR', size: '2.1 MB', clientName: 'Rajesh Kumar' },
];

export default function DocumentVault() {
  const [documents, setDocuments] = useState(initialDocuments);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'All' | 'ITR' | 'GST' | 'Audit' | 'KYC'>('All');

  const filteredDocs = documents.filter(doc => 
    (activeTab === 'All' || doc.category === activeTab) &&
    (doc.name.toLowerCase().includes(searchTerm.toLowerCase()) || doc.clientName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const getFileIcon = (type: string) => {
    switch(type) {
      case 'PDF': return <FileText className="w-8 h-8 text-red-500" />;
      case 'Excel': return <FileSpreadsheet className="w-8 h-8 text-green-500" />;
      case 'Image': return <File className="w-8 h-8 text-blue-500" />;
      default: return <File className="w-8 h-8 text-zinc-500" />;
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Approved': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'Pending Review': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'Missing': return <AlertCircle className="w-4 h-4 text-red-500" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Document Management</h2>
          <p className="text-sm text-zinc-500 mt-1">Secure cloud vault with automated OCR categorization.</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Search documents..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-zinc-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 w-64"
            />
          </div>
          <button className="flex items-center px-4 py-2 bg-zinc-900 text-white rounded-md text-sm font-medium hover:bg-zinc-800 shadow-sm">
            <Upload className="w-4 h-4 mr-2" />
            Upload File
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="flex border-b border-zinc-200">
          {['All', 'ITR', 'GST', 'Audit', 'KYC'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab 
                  ? 'border-zinc-900 text-zinc-900' 
                  : 'border-transparent text-zinc-500 hover:text-zinc-700 hover:bg-zinc-50'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="p-0">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-50/80 border-b border-zinc-200">
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">File Details</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Client</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Status & OCR</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {filteredDocs.map((doc) => (
                <tr key={doc.id} className="hover:bg-zinc-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded bg-zinc-100 flex items-center justify-center mr-4">
                        {getFileIcon(doc.type)}
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-zinc-900">{doc.name}</p>
                        <p className="text-xs text-zinc-500 font-mono mt-0.5">{doc.size} • Uploaded {doc.uploadDate}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-zinc-900">{doc.clientName}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2.5 py-1 bg-zinc-100 text-zinc-700 border border-zinc-200 rounded text-xs font-bold uppercase tracking-wider">
                      {doc.category}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(doc.status)}
                      <span className={`text-sm font-medium ${
                        doc.status === 'Approved' ? 'text-green-700' :
                        doc.status === 'Pending Review' ? 'text-yellow-700' : 'text-red-700'
                      }`}>
                        {doc.status}
                      </span>
                    </div>
                    {doc.parsedData && (
                      <div className="mt-2 text-[10px] font-mono text-zinc-500 bg-zinc-100 px-2 py-1 rounded w-fit">
                        OCR: {Object.entries(doc.parsedData).map(([k, v]) => `${k}: ${v}`).join(', ')}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-zinc-400 hover:text-blue-600 hover:bg-blue-50 rounded" title="Secure Share">
                        <Share2 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded" title="Download">
                        <Download className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredDocs.length === 0 && (
            <div className="p-12 text-center text-zinc-500">
              <File className="w-12 h-12 mx-auto text-zinc-300 mb-4" />
              <p className="font-medium text-zinc-900">No documents found</p>
              <p className="text-sm mt-1">Try adjusting your search or filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
