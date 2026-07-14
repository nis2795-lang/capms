import React, { useState } from 'react';
import Layout from './components/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';
import ClientList from './components/clients/ClientList';
import ClientDetails from './components/clients/ClientDetails';
import EmployeeList from './components/employees/EmployeeList';
import ComplianceCalendar from './components/calendar/ComplianceCalendar';
import CRMClientEngagement from './components/crm/CRMClientEngagement';
import BillingDashboard from './components/billing/BillingDashboard';
import AIChatBot from './components/ai/AIChatBot';
import ComplianceOpsCenter from './components/compliance/ComplianceOpsCenter';
import TaskKanban from './components/tasks/TaskKanban';
import DocumentVault from './components/documents/DocumentVault';
import NoticeTracker from './components/compliance/NoticeTracker';
import { ViewState } from './types';

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
      case 'ai-chat':
        return <AIChatBot />;
      case 'compliance-ops':
        return <ComplianceOpsCenter />;
      case 'notice-tracker':
        return <NoticeTracker />;
      case 'documents':
        return <DocumentVault />;
      case 'tasks':
        return <TaskKanban />;
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
