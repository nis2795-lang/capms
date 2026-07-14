import React, { useState } from 'react';
import { ChevronRight, Shield, FileText, CheckCircle, Search, Upload } from 'lucide-react';
import { Client } from '../../types';

interface AddClientFormProps {
  onCancel: () => void;
  onSave: (client: Client) => void;
}

export default function AddClientForm({ onCancel, onSave }: AddClientFormProps) {
  const [activeTab, setActiveTab] = useState('Basic Details');

  // Form State
  const [clientName, setClientName] = useState('');
  const [businessType, setBusinessType] = useState<Client['type']>('Individual');
  const [panNumber, setPanNumber] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  
  const handleSave = () => {
    const newClient: Client = {
      id: `C-${Math.floor(Math.random() * 10000)}`,
      name: clientName || 'New Client',
      type: businessType,
      pan: panNumber || 'XXXXX0000X',
      contactPerson: contactName || clientName || 'Contact Person',
      email: email || 'contact@example.com',
      phone: phone ? `+91 ${phone}` : '+91 9876543210',
      healthScore: 'Green',
      lastActivity: 'Just now'
    };
    onSave(newClient);
  };

  const tabs = [
    'Basic Details',
    'Contact Persons'
  ];

  return (
    <div className="max-w-7xl mx-auto flex flex-col h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-zinc-200 pb-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Add New Client</h1>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-zinc-700 bg-white border border-zinc-300 rounded-md hover:bg-zinc-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-zinc-900 rounded-md hover:bg-zinc-800 transition-colors"
          >
            Save Client
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden bg-white border border-zinc-200 rounded-xl shadow-sm">
        {/* Sidebar Tabs */}
        <div className="w-64 border-r border-zinc-200 bg-zinc-50/50 p-4 flex flex-col overflow-y-auto shrink-0">
          <div className="space-y-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab
                    ? 'bg-zinc-200 text-zinc-900 shadow-sm'
                    : 'text-zinc-600 hover:bg-zinc-100'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-3xl space-y-10">
            {/* Basic Details Section */}
            <section>
              <h2 className="text-lg font-bold text-zinc-900 mb-6 pb-2 border-b border-zinc-100">Basic Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">File No</label>
                  <input 
                    type="text" 
                    placeholder="AUTO-ASSIGNED IF LEFT BLANK" 
                    className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 placeholder:text-zinc-400 placeholder:text-xs font-mono"
                  />
                </div>
                <div></div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">Business Name</label>
                  <input 
                    type="text" 
                    placeholder="Enter legal business name" 
                    className="w-full px-3 py-2 bg-white border border-zinc-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">Trade Name</label>
                  <input 
                    type="text" 
                    placeholder="Trade name if different" 
                    className="w-full px-3 py-2 bg-white border border-zinc-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">Business Type</label>
                  <select 
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value as Client['type'])}
                    className="w-full px-3 py-2 bg-white border border-zinc-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 text-zinc-600"
                  >
                    <option value="" disabled>Select business type</option>
                    <option value="Individual">Individual</option>
                    <option value="Proprietorship">Proprietorship</option>
                    <option value="Partnership">Partnership</option>
                    <option value="LLP">LLP</option>
                    <option value="Company">Private Limited Company</option>
                    <option value="Company">Public Limited Company</option>
                    <option value="Individual">HUF</option>
                    <option value="Trust">Trust</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">Client Name *</label>
                  <input 
                    type="text" 
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="Primary client / owner name" 
                    className="w-full px-3 py-2 bg-white border border-zinc-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">Date of Commencement</label>
                  <input 
                    type="date" 
                    className="w-full px-3 py-2 bg-white border border-zinc-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 text-zinc-600"
                  />
                </div>
                <div></div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">PAN Number</label>
                  <input 
                    type="text" 
                    value={panNumber}
                    onChange={(e) => setPanNumber(e.target.value)}
                    placeholder="Permanent Account Number" 
                    className="w-full px-3 py-2 bg-white border border-zinc-300 rounded-md text-sm font-mono focus:outline-none focus:ring-2 focus:ring-zinc-900 uppercase"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">TAN Number</label>
                  <input 
                    type="text" 
                    placeholder="Tax Deduction Account Number" 
                    className="w-full px-3 py-2 bg-white border border-zinc-300 rounded-md text-sm font-mono focus:outline-none focus:ring-2 focus:ring-zinc-900 uppercase"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">Client Group</label>
                  <select defaultValue="" className="w-full px-3 py-2 bg-white border border-zinc-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 text-zinc-600 mb-1">
                    <option value="" disabled>Not part of any group</option>
                    <option>Tech Solutions Group</option>
                    <option>Sharma Family</option>
                  </select>
                  <p className="text-xs text-zinc-500">Group related entities (family ITRs, proprietorship, HUF, Pvt Ltd) for consolidated billing and compliance views.</p>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">Client Tags</label>
                  <input 
                    type="text" 
                    placeholder="Select or create tags..." 
                    className="w-full px-3 py-2 bg-white border border-zinc-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 mb-1"
                  />
                  <p className="text-xs text-zinc-500">Categorise clients (e.g. VIP, NRI, Priority) for quick filtering across lists.</p>
                </div>
                
                <div className="md:col-span-2">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider">Custom Fields</label>
                    <button className="text-[10px] font-bold text-blue-600 hover:text-blue-800 uppercase tracking-widest bg-blue-50 px-2 py-1 rounded">Add custom field</button>
                  </div>
                  <div className="bg-zinc-50 border border-zinc-200 border-dashed rounded-md p-6 text-center">
                    <p className="text-sm text-zinc-500">No custom fields defined yet. Add one to start collecting firm-specific data on every client.</p>
                  </div>
                </div>

                <div className="md:col-span-2 mt-4 pt-6 border-t border-zinc-100">
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">GSTIN</label>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="15-DIGIT GSTIN" 
                      className="flex-1 px-3 py-2 bg-white border border-zinc-300 rounded-md text-sm font-mono focus:outline-none focus:ring-2 focus:ring-zinc-900 uppercase"
                    />
                    <button className="px-4 py-2 bg-zinc-100 border border-zinc-300 text-zinc-700 rounded-md text-sm font-medium hover:bg-zinc-200 transition-colors">
                      Verify
                    </button>
                  </div>
                </div>

                <div className="md:col-span-2 mt-4 pt-6 border-t border-zinc-100">
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-4">Address</label>
                  <div className="space-y-4">
                    <div>
                      <input 
                        type="text" 
                        placeholder="Building / Door No., Street, Locality, Area" 
                        className="w-full px-3 py-2 bg-white border border-zinc-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input 
                        type="text" 
                        placeholder="City" 
                        className="w-full px-3 py-2 bg-white border border-zinc-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
                      />
                      <input 
                        type="text" 
                        placeholder="State" 
                        className="w-full px-3 py-2 bg-white border border-zinc-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
                      />
                      <input 
                        type="text" 
                        placeholder="Pincode" 
                        className="w-full px-3 py-2 bg-white border border-zinc-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
                      />
                      <select className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 text-zinc-600">
                        <option>India</option>
                      </select>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* Primary Contact Person Section */}
            <section className="pt-6">
              <h2 className="text-lg font-bold text-zinc-900 mb-6 pb-2 border-b border-zinc-100">Primary Contact Person</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">Name</label>
                  <input 
                    type="text" 
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="Defaults to client name" 
                    className="w-full px-3 py-2 bg-white border border-zinc-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">Email</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Search or enter contact email" 
                    className="w-full px-3 py-2 bg-white border border-zinc-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2">Phone</label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 border border-r-0 border-zinc-300 bg-zinc-50 text-zinc-500 sm:text-sm rounded-l-md">
                      +91
                    </span>
                    <input 
                      type="tel" 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="9876543210" 
                      className="flex-1 w-full px-3 py-2 bg-white border border-zinc-300 rounded-none rounded-r-md text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 font-mono"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider">Designation</label>
                    <button className="text-[10px] font-bold text-blue-600 hover:text-blue-800 uppercase tracking-widest">Add designation</button>
                  </div>
                  <select defaultValue="" className="w-full px-3 py-2 bg-white border border-zinc-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 text-zinc-600">
                    <option value="" disabled>Select designation</option>
                    <option>Director</option>
                    <option>Partner</option>
                    <option>Proprietor</option>
                    <option>Manager</option>
                    <option>Accountant</option>
                    <option>Authorized Signatory</option>
                  </select>
                </div>
              </div>
            </section>
            
            {/* Space at the bottom for scrolling past the end */}
            <div className="pb-24"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
