import React, { useState, useRef } from 'react';
import { Upload, FileText, CheckCircle, Calculator, AlertCircle, ArrowRight, Download, Eye } from 'lucide-react';
import { Client } from '../../types';

interface TaxPlannerProps {
  client: Client;
}

export default function TaxPlanner({ client }: TaxPlannerProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [activeRegime, setActiveRegime] = useState<'new' | 'old'>('new');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setIsUploading(true);
      // Simulate parsing and calculating after file selection
      setTimeout(() => {
        setIsUploading(false);
        setHasCalculated(true);
      }, 2000);
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="bg-white border border-zinc-200 rounded-lg p-6">
        <h3 className="text-sm font-bold mb-4 flex items-center">
          <Calculator className="w-4 h-4 mr-2" />
          Smart Tax Computation & ITR Planner
        </h3>
        
        {!hasCalculated ? (
          <div className="border-2 border-dashed border-zinc-200 rounded-xl p-8 flex flex-col items-center justify-center bg-zinc-50 hover:bg-zinc-100 transition-colors cursor-pointer" onClick={handleUploadClick}>
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png"
            />
            {isUploading ? (
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-900">Parsing Form 16 & Calculating Tax...</p>
                <p className="text-[10px] text-zinc-500 font-mono mt-2">Extracting data via OCR...</p>
              </div>
            ) : (
              <>
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border border-zinc-200">
                  <Upload className="w-5 h-5 text-zinc-500" />
                </div>
                <p className="text-sm font-bold text-zinc-900 mb-1">Upload Form 16 or Tax Documents</p>
                <p className="text-xs text-zinc-500 mb-6">Supports PDF, JPG, PNG (Max 10MB)</p>
                <button className="bg-zinc-900 text-white px-6 py-2 rounded-md text-sm font-medium">Browse Files</button>
              </>
            )}
          </div>
        ) : (
          <div className="space-y-6">
             <div className="flex items-center justify-between border border-green-200 bg-green-50 rounded-lg p-4">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                  <div>
                    <h4 className="text-sm font-bold text-green-900">Tax Computation Successful</h4>
                    <p className="text-[11px] text-green-700 font-mono mt-0.5">Parsed from: Form16_FY23-24.pdf</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="text-[11px] font-bold bg-white border border-green-200 px-3 py-1.5 rounded text-green-800 hover:bg-green-100 transition-colors flex items-center uppercase tracking-widest">
                    <Eye className="w-3 h-3 mr-1.5" /> View Source
                  </button>
                  <button className="text-[11px] font-bold bg-green-600 text-white px-3 py-1.5 rounded hover:bg-green-700 transition-colors flex items-center uppercase tracking-widest">
                    <Download className="w-3 h-3 mr-1.5" /> Export ITR-1
                  </button>
                </div>
             </div>

             <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
               <div className="lg:col-span-2 space-y-6">
                 {/* Regime Selector */}
                 <div className="flex p-1 bg-zinc-100 rounded-lg">
                   <button 
                     onClick={() => setActiveRegime('new')}
                     className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-colors ${activeRegime === 'new' ? 'bg-white shadow-sm text-zinc-900' : 'text-zinc-500 hover:text-zinc-700'}`}
                   >
                     New Tax Regime
                     {activeRegime === 'new' && <span className="ml-2 inline-block bg-green-100 text-green-700 px-1.5 py-0.5 rounded-sm text-[8px]">RECOMMENDED</span>}
                   </button>
                   <button 
                     onClick={() => setActiveRegime('old')}
                     className={`flex-1 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-colors ${activeRegime === 'old' ? 'bg-white shadow-sm text-zinc-900' : 'text-zinc-500 hover:text-zinc-700'}`}
                   >
                     Old Tax Regime
                     {activeRegime === 'old' && <span className="ml-2 inline-block bg-green-100 text-green-700 px-1.5 py-0.5 rounded-sm text-[8px]">RECOMMENDED</span>}
                   </button>
                 </div>

                 {/* Computation Table */}
                 <div className="border border-zinc-200 rounded-lg overflow-hidden">
                   <table className="w-full text-sm">
                     <tbody className="divide-y divide-zinc-100">
                       <tr className="bg-zinc-50 font-bold">
                         <td className="px-4 py-3">Income Sources</td>
                         <td className="px-4 py-3 text-right">Amount (₹)</td>
                       </tr>
                       <tr>
                         <td className="px-4 py-3 text-zinc-600 text-xs">Gross Salary (Per Form 16)</td>
                         <td className="px-4 py-3 text-right font-mono text-xs">15,50,000</td>
                       </tr>
                       <tr>
                         <td className="px-4 py-3 text-zinc-600 text-xs">Income from Other Sources (Interest)</td>
                         <td className="px-4 py-3 text-right font-mono text-xs">45,000</td>
                       </tr>
                       <tr className="bg-zinc-50 font-bold border-t-2 border-zinc-200">
                         <td className="px-4 py-3">Gross Total Income</td>
                         <td className="px-4 py-3 text-right font-mono text-sm">15,95,000</td>
                       </tr>
                       
                       <tr className="bg-zinc-50 font-bold mt-4 border-t border-zinc-200">
                         <td className="px-4 py-3">Deductions & Exemptions</td>
                         <td className="px-4 py-3 text-right"></td>
                       </tr>
                       {activeRegime === 'old' ? (
                         <>
                           <tr>
                             <td className="px-4 py-3 text-zinc-600 text-xs">Standard Deduction (Sec 16)</td>
                             <td className="px-4 py-3 text-right font-mono text-xs text-red-600">- 50,000</td>
                           </tr>
                           <tr>
                             <td className="px-4 py-3 text-zinc-600 text-xs">80C (EPF, PPF, LIC)</td>
                             <td className="px-4 py-3 text-right font-mono text-xs text-red-600">- 1,50,000</td>
                           </tr>
                           <tr>
                             <td className="px-4 py-3 text-zinc-600 text-xs">80D (Health Insurance)</td>
                             <td className="px-4 py-3 text-right font-mono text-xs text-red-600">- 25,000</td>
                           </tr>
                           <tr>
                             <td className="px-4 py-3 text-zinc-600 text-xs">HRA Exemption (Sec 10)</td>
                             <td className="px-4 py-3 text-right font-mono text-xs text-red-600">- 1,20,000</td>
                           </tr>
                         </>
                       ) : (
                         <>
                           <tr>
                             <td className="px-4 py-3 text-zinc-600 text-xs">Standard Deduction (Sec 16)</td>
                             <td className="px-4 py-3 text-right font-mono text-xs text-red-600">- 50,000</td>
                           </tr>
                           <tr>
                             <td className="px-4 py-3 text-zinc-600 text-xs opacity-50 italic">Other deductions not applicable in New Regime</td>
                             <td className="px-4 py-3 text-right font-mono text-xs text-zinc-400">0</td>
                           </tr>
                         </>
                       )}
                       
                       <tr className="bg-zinc-50 font-bold border-t-2 border-zinc-200">
                         <td className="px-4 py-3">Total Taxable Income</td>
                         <td className="px-4 py-3 text-right font-mono text-sm">
                           {activeRegime === 'old' ? '12,50,000' : '15,45,000'}
                         </td>
                       </tr>
                     </tbody>
                   </table>
                 </div>
               </div>

               {/* Summary Panel */}
               <div className="space-y-4">
                 <div className="bg-zinc-950 text-white rounded-xl p-6 relative overflow-hidden shadow-xl">
                   <div className="relative z-10">
                     <p className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-1">Total Tax Liability</p>
                     <p className="text-3xl font-bold tracking-tight mb-4">
                       {activeRegime === 'old' ? '₹ 1,95,000' : '₹ 1,54,500'}
                     </p>
                     
                     <div className="space-y-2 border-t border-zinc-800 pt-4">
                       <div className="flex justify-between text-xs">
                         <span className="text-zinc-400">Tax on Income</span>
                         <span className="font-mono">
                           {activeRegime === 'old' ? '₹ 1,87,500' : '₹ 1,48,557'}
                         </span>
                       </div>
                       <div className="flex justify-between text-xs">
                         <span className="text-zinc-400">Health & Edu Cess (4%)</span>
                         <span className="font-mono">
                           {activeRegime === 'old' ? '₹ 7,500' : '₹ 5,943'}
                         </span>
                       </div>
                       <div className="flex justify-between text-xs text-green-400 font-bold mt-2 pt-2 border-t border-zinc-800">
                         <span>TDS Deducted (Form 16)</span>
                         <span className="font-mono">₹ 1,60,000</span>
                       </div>
                     </div>
                   </div>
                 </div>

                 {/* Action Box */}
                 <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                   <div className="flex items-start">
                     <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 mr-2 shrink-0" />
                     <div>
                       <h4 className="text-xs font-bold text-blue-900 mb-1">Tax Action Required</h4>
                       <p className="text-[11px] text-blue-800 leading-relaxed">
                         {activeRegime === 'new' 
                           ? 'Client has a tax refund of ₹5,500 under the New Regime. Ready to file ITR-1.' 
                           : 'Client has a tax payable of ₹35,000 under the Old Regime. Advance tax payment required before filing.'}
                       </p>
                     </div>
                   </div>
                 </div>
               </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
}
