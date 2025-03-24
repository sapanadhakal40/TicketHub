export interface Ticket {
    id: string;
    title: string;
    description: string;
    priority: number;
    progress: number;
    status: string;
    createdAt: string;
    category: string; 
    assignedTo?: string; 
  }
  
  export type TicketStatus = 'not started' | 'started' | 'done';
  
  export type TicketCategory = 'bug' | 'feature' | 'enhancement' | 'maintenance';