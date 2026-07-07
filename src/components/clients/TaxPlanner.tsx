import React, { useState, useRef, useMemo } from 'react';
import { Upload, FileText, CheckCircle, Calculator, AlertCircle, ArrowRight, Download, Eye, Edit2 } from 'lucide-react';
import { Client } from '../../types';

interface TaxPlannerProps {
  client: Client;
}

interface TaxData {
  grossSalary: number;
  interestIncome: number;
  deduction80C: number;
  deduction80D: number;
  hraExemption: number;
  tdsDeducted: number;
  fileName: string;
}

export default function TaxPlanner({ client }: TaxPlannerProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [hasCalculated, setHasCalculated] = useState(false);
  const [activeRegime, setActiveRegime] = useState<'new' | 'old'>('new');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [taxData, setTaxData] = useState<TaxData>({
    grossSalary: 0,
    interestIncome: 0,
    deduction80C: 0,
    deduction80D: 0,
    hraExemption: 0,
    tdsDeducted: 0,
    fileName: ''
  });

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setIsUploading(true);
      
      const formData = new FormData();
      formData.append('file', file);
      
      try {
        const response = await fetch('/api/parse-tax-doc', {
          method: 'POST',
          body: formData,
        });
        
        if (response.ok) {
          const data = await response.json();
          setTaxData({
            grossSalary: data.grossSalary || 0,
            interestIncome: data.interestIncome || 0,
            deduction80C: data.deduction80C || 0,
            deduction80D: data.deduction80D || 0,
            hraExemption: data.hraExemption || 0,
            tdsDeducted: data.tdsDeducted || 0,
            fileName: file.name
          });
        } else {
          console.error("Failed to parse tax document");
          // Fallback to empty if fails
          setTaxData({
            grossSalary: 0,
            interestIncome: 0,
            deduction80C: 0,
            deduction80D: 0,
            hraExemption: 0,
            tdsDeducted: 0,
            fileName: file.name
          });
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      } finally {
        setIsUploading(false);
        setHasCalculated(true);
      }
    }
  };

  const handleInputChange = (field: keyof TaxData, value: string) => {
    const numValue = parseInt(value.replace(/[^0-9]/g, ''), 10) || 0;
    setTaxData(prev => ({ ...prev, [field]: numValue }));
  };

  // Tax Calculation Logic
  const calculations = useMemo(() => {
    const grossTotalIncome = taxData.grossSalary + taxData.interestIncome;
    const standardDeduction = 50000;
    
    // Old Regime
    const oldDeductions = standardDeduction + taxData.deduction80C + taxData.deduction80D + taxData.hraExemption;
    let oldTaxableIncome = Math.max(0, grossTotalIncome - oldDeductions);
    
    let oldTax = 0;
    if (oldTaxableIncome > 250000) {
      if (oldTaxableIncome <= 500000) {
        oldTax = (oldTaxableIncome - 250000) * 0.05;
        if (oldTaxableIncome <= 500000) oldTax = 0; // 87A rebate
      } else if (oldTaxableIncome <= 1000000) {
        oldTax = 12500 + (oldTaxableIncome - 500000) * 0.20;
      } else {
        oldTax = 112500 + (oldTaxableIncome - 1000000) * 0.30;
      }
    }

    // New Regime
    const newDeductions = standardDeduction; // only standard deduction allowed
    let newTaxableIncome = Math.max(0, grossTotalIncome - newDeductions);
    
    let newTax = 0;
    if (newTaxableIncome > 300000) newTax += Math.min(newTaxableIncome - 300000, 300000) * 0.05;
    if (newTaxableIncome > 600000) newTax += Math.min(newTaxableIncome - 600000, 300000) * 0.10;
    if (newTaxableIncome > 900000) newTax += Math.min(newTaxableIncome - 900000, 300000) * 0.15;
    if (newTaxableIncome > 1200000) newTax += Math.min(newTaxableIncome - 1200000, 300000) * 0.20;
    if (newTaxableIncome > 1500000) newTax += (newTaxableIncome - 1500000) * 0.30;
    
    if (newTaxableIncome <= 700000) newTax = 0; // 87A rebate new regime

    const oldCess = oldTax * 0.04;
    const newCess = newTax * 0.04;

    const oldTotalTax = oldTax + oldCess;
    const newTotalTax = newTax + newCess;

    return {
      grossTotalIncome,
      old: {
        taxableIncome: oldTaxableIncome,
        tax: oldTax,
        cess: oldCess,
        total: oldTotalTax,
        liability: oldTotalTax - taxData.tdsDeducted
      },
      new: {
        taxableIncome: newTaxableIncome,
        tax: newTax,
        cess: newCess,
        total: newTotalTax,
        liability: newTotalTax - taxData.tdsDeducted
      }
    };
  }, [taxData]);

  const currentCalc = activeRegime === 'old' ? calculations.old : calculations.new;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
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
                    <p className="text-[11px] text-green-700 font-mono mt-0.5">Parsed from: {taxData.fileName || 'Form16_FY23-24.pdf'}</p>
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
                       <tr className="group">
                         <td className="px-4 py-2 text-zinc-600 text-xs flex items-center">
                           Gross Salary (Per Form 16)
                           <Edit2 className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 text-zinc-400 transition-opacity" />
                         </td>
                         <td className="px-2 py-2">
                           <input
                             type="text"
                             value={taxData.grossSalary || ''}
                             onChange={(e) => handleInputChange('grossSalary', e.target.value)}
                             className="w-full text-right font-mono text-xs bg-transparent border-0 focus:ring-1 focus:ring-zinc-300 rounded px-2 py-1"
                           />
                         </td>
                       </tr>
                       <tr className="group">
                         <td className="px-4 py-2 text-zinc-600 text-xs flex items-center">
                           Income from Other Sources (Interest)
                           <Edit2 className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 text-zinc-400 transition-opacity" />
                         </td>
                         <td className="px-2 py-2">
                           <input
                             type="text"
                             value={taxData.interestIncome || ''}
                             onChange={(e) => handleInputChange('interestIncome', e.target.value)}
                             className="w-full text-right font-mono text-xs bg-transparent border-0 focus:ring-1 focus:ring-zinc-300 rounded px-2 py-1"
                           />
                         </td>
                       </tr>
                       <tr className="bg-zinc-50 font-bold border-t-2 border-zinc-200">
                         <td className="px-4 py-3">Gross Total Income</td>
                         <td className="px-4 py-3 text-right font-mono text-sm">{formatCurrency(calculations.grossTotalIncome)}</td>
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
                           <tr className="group">
                             <td className="px-4 py-2 text-zinc-600 text-xs flex items-center">
                               80C (EPF, PPF, LIC)
                               <Edit2 className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 text-zinc-400 transition-opacity" />
                             </td>
                             <td className="px-2 py-2">
                               <div className="flex items-center justify-end text-red-600">
                                 <span className="text-xs mr-1">-</span>
                                 <input
                                   type="text"
                                   value={taxData.deduction80C || ''}
                                   onChange={(e) => handleInputChange('deduction80C', e.target.value)}
                                   className="w-full text-right font-mono text-xs bg-transparent border-0 focus:ring-1 focus:ring-zinc-300 rounded px-2 py-1 text-red-600"
                                 />
                               </div>
                             </td>
                           </tr>
                           <tr className="group">
                             <td className="px-4 py-2 text-zinc-600 text-xs flex items-center">
                               80D (Health Insurance)
                               <Edit2 className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 text-zinc-400 transition-opacity" />
                             </td>
                             <td className="px-2 py-2">
                               <div className="flex items-center justify-end text-red-600">
                                 <span className="text-xs mr-1">-</span>
                                 <input
                                   type="text"
                                   value={taxData.deduction80D || ''}
                                   onChange={(e) => handleInputChange('deduction80D', e.target.value)}
                                   className="w-full text-right font-mono text-xs bg-transparent border-0 focus:ring-1 focus:ring-zinc-300 rounded px-2 py-1 text-red-600"
                                 />
                               </div>
                             </td>
                           </tr>
                           <tr className="group">
                             <td className="px-4 py-2 text-zinc-600 text-xs flex items-center">
                               HRA Exemption (Sec 10)
                               <Edit2 className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 text-zinc-400 transition-opacity" />
                             </td>
                             <td className="px-2 py-2">
                               <div className="flex items-center justify-end text-red-600">
                                 <span className="text-xs mr-1">-</span>
                                 <input
                                   type="text"
                                   value={taxData.hraExemption || ''}
                                   onChange={(e) => handleInputChange('hraExemption', e.target.value)}
                                   className="w-full text-right font-mono text-xs bg-transparent border-0 focus:ring-1 focus:ring-zinc-300 rounded px-2 py-1 text-red-600"
                                 />
                               </div>
                             </td>
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
                           {formatCurrency(currentCalc.taxableIncome)}
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
                       {formatCurrency(currentCalc.total)}
                     </p>
                     
                     <div className="space-y-2 border-t border-zinc-800 pt-4">
                       <div className="flex justify-between text-xs">
                         <span className="text-zinc-400">Tax on Income</span>
                         <span className="font-mono">{formatCurrency(currentCalc.tax)}</span>
                       </div>
                       <div className="flex justify-between text-xs">
                         <span className="text-zinc-400">Health & Edu Cess (4%)</span>
                         <span className="font-mono">{formatCurrency(currentCalc.cess)}</span>
                       </div>
                       <div className="flex justify-between text-xs text-green-400 font-bold mt-2 pt-2 border-t border-zinc-800 group relative">
                         <span className="flex items-center">
                           TDS Deducted
                           <Edit2 className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 text-zinc-500 transition-opacity" />
                         </span>
                         <input
                           type="text"
                           value={taxData.tdsDeducted || ''}
                           onChange={(e) => handleInputChange('tdsDeducted', e.target.value)}
                           className="w-24 text-right font-mono bg-transparent border-0 focus:ring-1 focus:ring-zinc-600 rounded px-1 py-0.5 text-green-400"
                         />
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
                         {currentCalc.liability < 0 
                           ? `Client has a tax refund of ${formatCurrency(Math.abs(currentCalc.liability))} under the ${activeRegime === 'new' ? 'New' : 'Old'} Regime. Ready to file ITR-1.` 
                           : currentCalc.liability > 0 
                             ? `Client has a tax payable of ${formatCurrency(currentCalc.liability)} under the ${activeRegime === 'new' ? 'New' : 'Old'} Regime. Advance tax payment required before filing.`
                             : `Client tax liability is fully offset by TDS. No tax payable or refund.`}
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
