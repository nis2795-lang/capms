import React, { useState } from 'react';
import Layout from './components/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';
import ClientList from './components/clients/ClientList';
import ClientDetails from './components/clients/ClientDetails';
import EmployeeList from './components/employees/EmployeeList';
import ComplianceCalendar from './components/calendar/ComplianceCalendar';
import CRMClientEngagement from './components/crm/CRMClientEngagement';
import BillingDashboard from './components/billing/BillingDashboard';
import RiskHealthDashboard from './components/ai/RiskHealthDashboard';
import AIAssistant from './components/ai/AIAssistant';
import { ViewState } from './types';
import { AlertCircle } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);

  const handleNavigate = (view: ViewState) => {
    if (view !== 'client-details') {
      setSelectedClientId(null);
    }
    setCurrentView(view);
  };

  const handleClientSelect = (id: string) => {
    setSelectedClientId(id);
    setCurrentView('client-details');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'clients':
        return <ClientList onClientSelect={handleClientSelect} />;
      case 'client-details':
        if (selectedClientId) {
          return <ClientDetails clientId={selectedClientId} onBack={() => handleNavigate('clients')} />;
        }
        return <ClientList onClientSelect={handleClientSelect} />;
      case 'employees':
        return <EmployeeList />;
      case 'calendar':
        return <ComplianceCalendar />;
      case 'crm':
        return <CRMClientEngagement />;
      case 'billing':
        return <BillingDashboard />;
      case 'risk-health':
        return <RiskHealthDashboard />;
      case 'assistant':
        return <AIAssistant />;
      case 'compliance':
      case 'documents':
      case 'tasks':
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-zinc-500">
            <AlertCircle className="w-12 h-12 mb-4 text-zinc-300" />
            <h2 className="text-lg font-bold tracking-tight text-zinc-700">Module Under Construction</h2>
            <p className="mt-2 text-[13px] text-center max-w-md opacity-80">
              This module is part of the CAPMS Phase 1 rollout but is currently a placeholder in this prototype. Navigate to <strong>Dashboard</strong> or <strong>Client 360 Workspace</strong> to see core features.
            </p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout 
      currentView={currentView} 
      onNavigate={handleNavigate}
      onLogout={() => console.log('Logout clicked')}
    >
      {renderContent()}
    </Layout>
  );
}
