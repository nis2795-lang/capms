import { Client, Employee, ComplianceTask, Document, Task } from './types';

export const mockClients: Client[] = [
  { id: 'C001', name: 'Reliance Industries Ltd', type: 'Company', pan: 'AAACR1234F', gstin: '27AAACR1234F1Z5', contactPerson: 'Mukesh Ambani', email: 'contact@ril.com', phone: '9876543210', healthScore: 'Green', lastActivity: '2023-10-25' },
  { id: 'C002', name: 'Rahul Sharma', type: 'Individual', pan: 'ABCDE1234F', contactPerson: 'Rahul Sharma', email: 'rahul.s@example.com', phone: '9876543211', healthScore: 'Yellow', lastActivity: '2023-10-24' },
  { id: 'C003', name: 'Tech Solutions LLP', type: 'LLP', pan: 'AAACT1234F', gstin: '27AAACT1234F1Z5', contactPerson: 'Amit Patel', email: 'amit@techsolutions.com', phone: '9876543212', healthScore: 'Red', lastActivity: '2023-10-20' },
  { id: 'C004', name: 'Global Traders', type: 'Partnership', pan: 'AAACG1234F', gstin: '27AAACG1234F1Z5', contactPerson: 'Suresh Kumar', email: 'suresh@globaltraders.in', phone: '9876543213', healthScore: 'Green', lastActivity: '2023-10-26' },
  { id: 'C005', name: 'Priya Desai', type: 'Individual', pan: 'FGHIJ5678K', contactPerson: 'Priya Desai', email: 'priya.d@example.com', phone: '9876543214', healthScore: 'Green', lastActivity: '2023-10-26' },
];

export const mockEmployees: Employee[] = [
  { id: 'E001', name: 'Vikram Singh', role: 'Partner', department: 'Tax', email: 'vikram@capms.in', phone: '9000000001', activeClients: 45, status: 'Active' },
  { id: 'E002', name: 'Neha Gupta', role: 'Manager', department: 'Audit', email: 'neha@capms.in', phone: '9000000002', activeClients: 30, status: 'Active' },
  { id: 'E003', name: 'Karan Mehra', role: 'Senior Article', department: 'Compliance', email: 'karan@capms.in', phone: '9000000003', activeClients: 15, status: 'Active' },
  { id: 'E004', name: 'Sneha Reddy', role: 'Article', department: 'Tax', email: 'sneha@capms.in', phone: '9000000004', activeClients: 10, status: 'On Leave' },
];

export const mockComplianceTasks: ComplianceTask[] = [
  { id: 'CT001', clientId: 'C001', clientName: 'Reliance Industries Ltd', type: 'GST Return', dueDate: '2023-11-20', status: 'In Progress', assigneeId: 'E003', assigneeName: 'Karan Mehra' },
  { id: 'CT002', clientId: 'C002', clientName: 'Rahul Sharma', type: 'Income Tax', dueDate: '2023-12-31', status: 'Not Started', assigneeId: 'E004', assigneeName: 'Sneha Reddy' },
  { id: 'CT003', clientId: 'C003', clientName: 'Tech Solutions LLP', type: 'ROC', dueDate: '2023-10-30', status: 'Overdue', assigneeId: 'E002', assigneeName: 'Neha Gupta' },
  { id: 'CT004', clientId: 'C004', clientName: 'Global Traders', type: 'TDS', dueDate: '2023-11-07', status: 'Under Review', assigneeId: 'E001', assigneeName: 'Vikram Singh' },
  { id: 'CT005', clientId: 'C001', clientName: 'Reliance Industries Ltd', type: 'Audit', dueDate: '2023-11-30', status: 'In Progress', assigneeId: 'E002', assigneeName: 'Neha Gupta' },
];

export const mockDocuments: Document[] = [
  { id: 'D001', name: 'FY23-24_Bank_Statement.pdf', type: 'PDF', uploadDate: '2023-10-25', status: 'Approved', category: 'ITR', size: '2.4 MB' },
  { id: 'D002', name: 'Form16_Rahul.pdf', type: 'PDF', uploadDate: '2023-10-24', status: 'Approved', category: 'ITR', size: '1.1 MB' },
  { id: 'D003', name: 'Oct_Sales_Register.xlsx', type: 'Excel', uploadDate: '2023-10-26', status: 'Pending Review', category: 'GST', size: '4.5 MB' },
  { id: 'D004', name: 'Home_Loan_Certificate', type: 'PDF', uploadDate: '-', status: 'Missing', category: 'ITR', size: '-' },
  { id: 'D005', name: 'Aadhaar_Card.jpeg', type: 'Image', uploadDate: '2023-01-15', status: 'Approved', category: 'KYC', size: '0.8 MB' },
];

export const mockTasks: Task[] = [
  { id: 'T001', title: 'Collect Sales Data for Oct', clientId: 'C001', clientName: 'Reliance Industries Ltd', assigneeId: 'E003', assigneeName: 'Karan Mehra', status: 'Done', priority: 'High', dueDate: '2023-11-05' },
  { id: 'T002', title: 'Reconcile 26AS', clientId: 'C002', clientName: 'Rahul Sharma', assigneeId: 'E004', assigneeName: 'Sneha Reddy', status: 'Todo', priority: 'Medium', dueDate: '2023-11-15' },
  { id: 'T003', title: 'Draft Directors Report', clientId: 'C003', clientName: 'Tech Solutions LLP', assigneeId: 'E002', assigneeName: 'Neha Gupta', status: 'In Progress', priority: 'High', dueDate: '2023-10-28' },
  { id: 'T004', title: 'Review TDS Challans', clientId: 'C004', clientName: 'Global Traders', assigneeId: 'E001', assigneeName: 'Vikram Singh', status: 'Review', priority: 'Medium', dueDate: '2023-11-06' },
];
