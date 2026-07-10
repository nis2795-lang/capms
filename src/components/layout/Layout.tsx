import React, { useState, useEffect, useRef } from 'react';
import { ViewState } from '../../types';
import { mockClients } from '../../data';
import { 
  LayoutDashboard, 
  Users, 
  Briefcase, 
  FileCheck, 
  Files, 
  CheckSquare, 
  LogOut,
  Bell,
  Search,
  Settings,
  Calendar,
  HeartHandshake,
  IndianRupee,
  MessageSquareWarning,
  Activity,
  Bot
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentView: ViewState;
  onNavigate: (view: ViewState) => void;
  onLogout: () => void;
}

export default function Layout({ children, currentView, onNavigate, onLogout }: LayoutProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('universal-search')?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const searchResults = searchQuery
    ? mockClients.filter(
        (c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.pan.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (c.gstin && c.gstin.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'clients', label: 'Client 360° Workspace', icon: Briefcase },
    { id: 'employees', label: 'Employee Management', icon: Users },
    { id: 'compliance', label: 'Compliance Engine', icon: FileCheck },
    { id: 'documents', label: 'Document Management', icon: Files },
    { id: 'tasks', label: 'Workflow & Tasks', icon: CheckSquare },
  ];

  const phase2Items = [
    { id: 'calendar', label: 'Compliance Calendar', icon: Calendar },
    { id: 'crm', label: 'CRM & Engagement', icon: HeartHandshake },
    { id: 'billing', label: 'Billing & Profitability', icon: IndianRupee },
  ];

  const phase3Items = [
    { id: 'ai-chat', label: 'AI Firm Assistant', icon: Bot },
    { id: 'compliance-ops', label: 'Compliance Ops Center', icon: Activity },
  ];

  return (
    <div className="flex h-screen bg-zinc-100 font-sans text-zinc-950 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-[240px] bg-zinc-900 text-zinc-50 flex flex-col border-r border-zinc-200 z-10 flex-shrink-0">
        <div className="h-16 flex items-center px-6 bg-zinc-900">
          <div className="bg-zinc-950 text-white w-8 h-8 rounded flex items-center justify-center font-bold text-xs mr-3">CP</div>
          <h1 className="font-bold tracking-tight text-lg">CAPMS <span className="font-normal opacity-50 text-sm">v2.0</span></h1>
        </div>
        
        <div className="flex-1 overflow-y-auto py-4">
          <div className="px-6 mb-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
            Core Modules
          </div>
          <nav className="space-y-1 px-3 mb-6">
            {navItems.map((item, index) => {
              const Icon = item.icon;
              const isActive = currentView === item.id || (currentView === 'client-details' && item.id === 'clients');
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id as ViewState)}
                  className={`w-full flex items-center px-3 py-2.5 text-[13px] rounded-md transition-all ${
                    isActive
                      ? 'bg-white/10 text-white font-medium opacity-100'
                      : 'text-zinc-300 opacity-70 hover:opacity-100 hover:bg-white/5'
                  }`}
                >
                  <Icon className="mr-3 h-4 w-4 opacity-70" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="px-6 mb-4 text-[10px] font-bold text-blue-400 uppercase tracking-widest flex justify-between items-center">
            Phase 2 Features
          </div>
          <nav className="space-y-1 px-3 mb-6">
            {phase2Items.map((item, index) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id as ViewState)}
                  className={`w-full flex items-center px-3 py-2.5 text-[13px] rounded-md transition-all ${
                    isActive
                      ? 'bg-blue-900/40 text-blue-200 font-medium opacity-100 border border-blue-800/50'
                      : 'text-zinc-300 opacity-70 hover:opacity-100 hover:bg-blue-900/20'
                  }`}
                >
                  <Icon className="mr-3 h-4 w-4 opacity-70 text-blue-400" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          <div className="px-6 mb-4 text-[10px] font-bold text-purple-400 uppercase tracking-widest flex justify-between items-center">
            Phase 3 (AI Layer)
            <span className="bg-purple-500/20 text-purple-300 px-1.5 py-0.5 rounded text-[8px]">NEW</span>
          </div>
          <nav className="space-y-1 px-3">
            {phase3Items.map((item, index) => {
              const Icon = item.icon;
              const isActive = currentView === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id as ViewState)}
                  className={`w-full flex items-center px-3 py-2.5 text-[13px] rounded-md transition-all ${
                    isActive
                      ? 'bg-purple-900/40 text-purple-200 font-medium opacity-100 border border-purple-800/50'
                      : 'text-zinc-300 opacity-70 hover:opacity-100 hover:bg-purple-900/20'
                  }`}
                >
                  <Icon className="mr-3 h-4 w-4 opacity-70 text-purple-400" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6 mt-auto">
           <div className="bg-blue-900/20 border border-blue-500/30 p-3 rounded-lg mb-4">
             <p className="text-[11px] text-blue-200 mb-2 font-bold uppercase">AI Assistant Active</p>
             <p className="text-[10px] opacity-70 leading-relaxed text-blue-100">Ready to analyze Tax Liability & compliances.</p>
           </div>
          <button
            onClick={onLogout}
            className="flex items-center w-full px-3 py-2 text-[13px] font-medium rounded-md text-zinc-400 hover:text-white transition-colors"
          >
            <LogOut className="mr-3 h-4 w-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-zinc-200 flex items-center justify-between px-6 z-0 flex-shrink-0">
          <div className="flex-1 max-w-xl relative flex items-center" ref={searchRef}>
            <div className="bg-zinc-100 rounded-md px-3 py-2 w-[400px] flex items-center text-[13px] text-zinc-500 border border-transparent focus-within:border-zinc-300 focus-within:bg-white transition-colors relative">
               <Search className="h-4 w-4 mr-2" />
               <input
                 id="universal-search"
                 type="text"
                 value={searchQuery}
                 onChange={(e) => {
                   setSearchQuery(e.target.value);
                   setIsSearchOpen(true);
                 }}
                 onFocus={() => setIsSearchOpen(true)}
                 placeholder='Universal Search (⌘ + K) — Try "PAN AHQ..."'
                 className="bg-transparent border-none outline-none w-full text-zinc-900 placeholder:text-zinc-500"
               />
               
               {isSearchOpen && searchQuery && (
                 <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-zinc-200 rounded-md shadow-lg overflow-hidden z-50">
                   {searchResults.length > 0 ? (
                     <ul className="max-h-64 overflow-y-auto">
                       {searchResults.map((client) => (
                         <li 
                           key={client.id}
                           className="px-4 py-3 hover:bg-zinc-50 cursor-pointer border-b border-zinc-100 last:border-0"
                           onClick={() => {
                             setSearchQuery('');
                             setIsSearchOpen(false);
                             onNavigate('clients');
                           }}
                         >
                           <div className="font-medium text-zinc-900">{client.name}</div>
                           <div className="text-xs text-zinc-500 font-mono mt-1">PAN: {client.pan} {client.gstin && `| GSTIN: ${client.gstin}`}</div>
                         </li>
                       ))}
                     </ul>
                   ) : (
                     <div className="px-4 py-8 text-center text-sm text-zinc-500">
                       No results found for "{searchQuery}"
                     </div>
                   )}
                 </div>
               )}
            </div>
          </div>
          
          <div className="ml-4 flex items-center space-x-6 text-sm font-medium">
            <div className="flex items-center text-zinc-500 font-mono text-xs uppercase tracking-wider">
               <span>Module: {currentView}</span>
            </div>
            <div className="flex items-center space-x-4 border-l border-zinc-200 pl-6">
              <button className="text-zinc-400 hover:text-zinc-600 transition-colors relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-blue-500 ring-2 ring-white"></span>
              </button>
              <div className="h-8 w-8 rounded-full bg-zinc-200 border border-zinc-300 flex items-center justify-center text-xs font-bold text-zinc-600">
                VS
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto bg-zinc-100 p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
