import React, { useState } from 'react';
import { RefreshCw, AlertCircle, CheckCircle, Search, Mail, Download, Filter, ArrowRightLeft } from 'lucide-react';

interface ReconTask {
  id: string;
  clientName: string;
  type: 'GSTR-2B vs Books (ITC)' | '26AS vs Books (TDS)' | 'AIS vs ITR (Income)' | 'GSTR-1 vs 3B (Sales)';
  period: string;
  portalAmount: number;
  booksAmount: number;
  status: 'Matched' | 'Mismatch' | 'Processing';
  alertMsg?: string;
}

const initialRecons: ReconTask[] = [
  { 
    id: 'R-1', clientName: 'TechVision Solutions', type: 'GSTR-2B vs Books (ITC)', period: 'June 2026', 
    portalAmount: 420000, booksAmount: 450000, status: 'Mismatch', 
    alertMsg: '₹30,000 ITC missing in Portal (GSTR-2B)' 
  },
  { 
    id: 'R-2', clientName: 'Acme Corp', type: '26AS vs Books (TDS)', period: 'Q1 FY26-27', 
    portalAmount: 125000, booksAmount: 125000, status: 'Matched' 
  },
  { 
    id: 'R-3', clientName: 'Rajesh Kumar', type: 'AIS vs ITR (Income)', period: 'FY25-26', 
    portalAmount: 2500000, booksAmount: 2100000, status: 'Mismatch', 
    alertMsg: '₹4,00,000 unreported Mutual Fund sale in AIS' 
  },
  { 
    id: 'R-4', clientName: 'Global Exports', type: 'GSTR-1 vs 3B (Sales)', period: 'June 2026', 
    portalAmount: 1850000, booksAmount: 1850000, status: 'Matched' 
  },
  { 
    id: 'R-5', clientName: 'Nisha Enterprises', type: '26AS vs Books (TDS)', period: 'Q1 FY26-27', 
    portalAmount: 0, booksAmount: 0, status: 'Processing' 
  },
];

export default function ComplianceEngine() {
  const [recons, setRecons] = useState(initialRecons);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<'All' | 'Matched' | 'Mismatch'>('All');

  const filteredRecons = recons.filter(recon => 
    (activeFilter === 'All' || recon.status === activeFilter) &&
    (recon.clientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
     recon.type.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900">Compliance & Reconciliation Engine</h2>
          <p className="text-sm text-zinc-500 mt-1">Automated matching of Government Portal data (26AS, AIS, GST) against Client Books.</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center px-4 py-2 bg-zinc-900 text-white rounded-md text-sm font-medium hover:bg-zinc-800 shadow-sm transition-colors">
            <RefreshCw className="w-4 h-4 mr-2" />
            Run Auto-Reconciliation
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-sm flex justify-between items-center">
          <div>
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Total Reconciliations</p>
            <p className="text-3xl font-bold text-zinc-900">{recons.length}</p>
          </div>
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
            <ArrowRightLeft className="w-6 h-6" />
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-sm flex justify-between items-center">
          <div>
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Perfect Matches</p>
            <p className="text-3xl font-bold text-green-600">{recons.filter(r => r.status === 'Matched').length}</p>
          </div>
          <div className="w-12 h-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl border border-zinc-200 shadow-sm flex justify-between items-center">
          <div>
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1">Mismatches Found</p>
            <p className="text-3xl font-bold text-red-600">{recons.filter(r => r.status === 'Mismatch').length}</p>
          </div>
          <div className="w-12 h-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center">
            <AlertCircle className="w-6 h-6" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-zinc-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-50/50">
          <div className="flex space-x-2">
            {['All', 'Mismatch', 'Matched'].map((tab) => (
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
              placeholder="Search clients or recon type..." 
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
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider">Client & Recon Type</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider text-right">Portal Data</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider text-right">Client Books</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider text-right">Variance</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider text-center">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-zinc-500 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-200">
              {filteredRecons.map((recon) => {
                const variance = recon.portalAmount - recon.booksAmount;
                const isMismatch = recon.status === 'Mismatch';
                
                return (
                  <tr key={recon.id} className="hover:bg-zinc-50 transition-colors group">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-zinc-900 text-sm mb-0.5">{recon.clientName}</p>
                      <div className="flex items-center text-xs text-zinc-500 space-x-2">
                        <span className="bg-zinc-100 px-1.5 py-0.5 rounded font-mono text-[10px] uppercase text-zinc-600 border border-zinc-200">
                          {recon.period}
                        </span>
                        <span>{recon.type}</span>
                      </div>
                      {recon.alertMsg && (
                        <p className="text-xs text-red-600 font-medium mt-1.5 flex items-center">
                          <AlertCircle className="w-3 h-3 mr-1" /> {recon.alertMsg}
                        </p>
                      )}
                    </td>
                    
                    <td className="px-6 py-4 text-right">
                      {recon.status === 'Processing' ? (
                        <span className="text-zinc-400 font-mono text-sm">--</span>
                      ) : (
                        <p className="font-mono text-sm text-zinc-900">{formatCurrency(recon.portalAmount)}</p>
                      )}
                    </td>
                    
                    <td className="px-6 py-4 text-right">
                      {recon.status === 'Processing' ? (
                        <span className="text-zinc-400 font-mono text-sm">--</span>
                      ) : (
                        <p className="font-mono text-sm text-zinc-900">{formatCurrency(recon.booksAmount)}</p>
                      )}
                    </td>
                    
                    <td className="px-6 py-4 text-right">
                      {recon.status === 'Processing' ? (
                        <span className="text-zinc-400 font-mono text-sm">--</span>
                      ) : (
                        <p className={`font-mono text-sm font-bold ${variance !== 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {variance > 0 ? '+' : ''}{formatCurrency(variance)}
                        </p>
                      )}
                    </td>
                    
                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center">
                        {recon.status === 'Matched' ? (
                          <span className="flex items-center text-xs font-bold text-green-700 bg-green-100 px-2.5 py-1 rounded-full border border-green-200">
                            <CheckCircle className="w-3 h-3 mr-1" /> Matched
                          </span>
                        ) : recon.status === 'Mismatch' ? (
                          <span className="flex items-center text-xs font-bold text-red-700 bg-red-100 px-2.5 py-1 rounded-full border border-red-200">
                            <AlertCircle className="w-3 h-3 mr-1" /> Mismatch
                          </span>
                        ) : (
                          <span className="flex items-center text-xs font-bold text-zinc-600 bg-zinc-100 px-2.5 py-1 rounded-full border border-zinc-200">
                            <RefreshCw className="w-3 h-3 mr-1 animate-spin" /> Processing
                          </span>
                        )}
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        {isMismatch && (
                          <button 
                            className="p-1.5 text-blue-600 hover:bg-blue-50 rounded border border-transparent hover:border-blue-200 transition-colors"
                            title="Email discrepancy report to client"
                          >
                            <Mail className="w-4 h-4" />
                          </button>
                        )}
                        <button 
                          className="p-1.5 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded border border-transparent hover:border-zinc-200 transition-colors"
                          title="Download Recon Report"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          
          {filteredRecons.length === 0 && (
            <div className="p-12 text-center text-zinc-500">
              <CheckCircle className="w-12 h-12 mx-auto text-zinc-300 mb-4" />
              <p className="font-medium text-zinc-900">All caught up!</p>
              <p className="text-sm mt-1">No matching criteria found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
