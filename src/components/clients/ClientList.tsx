import React, { useState } from 'react';
import { Search, Filter, MoreVertical } from 'lucide-react';
import { mockClients } from '../../data';
import { Client } from '../../types';
import AddClientForm from './AddClientForm';

interface ClientListProps {
  onClientSelect: (clientId: string) => void;
}

export default function ClientList({ onClientSelect }: ClientListProps) {
  const [isAddingClient, setIsAddingClient] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [clients, setClients] = useState<Client[]>(mockClients);

  if (isAddingClient) {
    return (
      <AddClientForm 
        onCancel={() => setIsAddingClient(false)} 
        onSave={(newClient) => {
          setClients([...clients, newClient]);
          setIsAddingClient(false);
        }} 
      />
    );
  }

  const filteredClients = clients.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.pan.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (client.gstin && client.gstin.toLowerCase().includes(searchTerm.toLowerCase())) ||
    client.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto flex flex-col h-full space-y-6">
      <div className="flex items-end justify-between border-b border-zinc-200 pb-6">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center border border-zinc-200 shadow-sm">
            <span className="text-2xl">👥</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tighter">Client 360° Workspace</h1>
            <div className="flex gap-4 text-xs font-mono opacity-60 uppercase mt-2">
               <span>Total Clients: {clients.length}</span>
               <span>Active Modules: 4</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setIsAddingClient(true)} className="bg-zinc-900 text-white px-4 py-2 rounded-md text-sm font-medium">Add New Client</button>
          <button className="bg-white border border-zinc-200 px-4 py-2 rounded-md text-sm font-medium">Export CSV</button>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-zinc-200">
        <div className="p-4 border-b border-zinc-200 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="bg-zinc-100 rounded-md px-3 py-1.5 flex items-center text-[13px] text-zinc-500 w-full max-w-md border border-transparent focus-within:border-zinc-300 focus-within:bg-white transition-colors">
             <Search className="h-4 w-4 mr-2" />
             <input 
               type="text" 
               placeholder="Filter clients..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="bg-transparent border-none outline-none w-full" 
             />
          </div>
          <button className="inline-flex items-center px-3 py-1.5 border border-zinc-200 rounded-md text-[13px] font-medium text-zinc-700 bg-white hover:bg-zinc-50 transition-colors">
            <Filter className="h-4 w-4 mr-2 text-zinc-400" />
            Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left font-mono opacity-50 text-[10px] uppercase border-b border-zinc-200 bg-zinc-50">
                <th className="px-6 py-3 font-semibold tracking-wider">Client Name</th>
                <th className="px-6 py-3 font-semibold tracking-wider">Identifiers</th>
                <th className="px-6 py-3 font-semibold tracking-wider">Contact</th>

                <th className="px-6 py-3 font-semibold tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {filteredClients.map((client) => (
                <tr 
                  key={client.id} 
                  className="hover:bg-zinc-50 cursor-pointer transition-colors"
                  onClick={() => onClientSelect(client.id)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-8 w-8 bg-zinc-100 border border-zinc-200 rounded flex items-center justify-center font-bold text-xs text-zinc-600">
                        {client.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-bold text-zinc-900 tracking-tight">{client.name}</div>
                        <div className="text-[11px] text-zinc-500 font-mono mt-0.5">{client.type}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-xs font-mono text-zinc-900">PAN: {client.pan}</div>
                    <div className="text-[11px] font-mono text-zinc-500 mt-0.5">GST: {client.gstin || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-xs text-zinc-600">
                    <div className="font-medium text-zinc-900">{client.contactPerson}</div>
                    <div className="opacity-70 mt-0.5">{client.phone}</div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button className="text-zinc-400 hover:text-zinc-900 transition-colors p-1" onClick={(e) => { e.stopPropagation(); }}>
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
