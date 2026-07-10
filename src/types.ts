export type ViewState = 
  | 'dashboard' 
  | 'clients' 
  | 'client-details'
  | 'employees' 
  | 'compliance' 
  | 'documents' 
  | 'tasks'
  | 'calendar'
  | 'crm'
  | 'billing'
  | 'ai-chat'
  | 'compliance-ops';

export interface Client {
  id: string;
  name: string;
  type: 'Individual' | 'Company' | 'Partnership' | 'LLP' | 'Trust';
  pan: string;
  gstin?: string;
  contactPerson: string;
  email: string;
  phone: string;
  healthScore: 'Green' | 'Yellow' | 'Red';
  lastActivity: string;
}

export interface Employee {
  id: string;
  name: string;
  role: 'Partner' | 'Manager' | 'Senior Article' | 'Article' | 'Staff';
  department: 'Audit' | 'Tax' | 'Compliance' | 'Advisory';
  email: string;
  phone: string;
  activeClients: number;
  status: 'Active' | 'On Leave';
}

export interface ComplianceTask {
  id: string;
  clientId: string;
  clientName: string;
  type: 'GST Return' | 'Income Tax' | 'TDS' | 'ROC' | 'Audit';
  dueDate: string;
  status: 'Not Started' | 'In Progress' | 'Under Review' | 'Filed' | 'Overdue';
  assigneeId: string;
  assigneeName: string;
}

export interface Document {
  id: string;
  name: string;
  type: 'PDF' | 'Excel' | 'Image';
  uploadDate: string;
  status: 'Approved' | 'Pending Review' | 'Missing';
  category: 'ITR' | 'GST' | 'Audit' | 'KYC';
  size: string;
}

export interface Task {
  id: string;
  title: string;
  clientId: string;
  clientName: string;
  assigneeId: string;
  assigneeName: string;
  status: 'Todo' | 'In Progress' | 'Review' | 'Done';
  priority: 'High' | 'Medium' | 'Low';
  dueDate: string;
}
