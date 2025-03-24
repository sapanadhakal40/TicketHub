import React from 'react'
import TicketCard from './(components)/ticket-card'
import { Ticket } from './types/ticket'

const Dashboard = () => {
  const dummyTickets: Ticket[] = [
      { id: "1", title: "Bug Fix", description: "Fix login issue", priority: 2, progress: 70, status: "in-progress", category: "bug", createdAt: new Date().toISOString() },
      { id: "2", title: "New Feature", description: "Add dark mode", priority: 1, progress: 40, status: "pending", category: "feature", createdAt: new Date().toISOString() },
      { id: "3", title: "Update Docs", description: "Update API documentation", priority: 3, progress: 90, status: "completed", category: "maintenance", createdAt: new Date().toISOString() },
      { id: "4", title: "Performance", description: "Optimize loading time", priority: 2, progress: 20, status: "not_started", category: "enhancement", createdAt: new Date().toISOString() },
    ];


  return (
    <div className="min-h-screen bg-card-bg dark:bg-primary-900">
      <div className="max-w-7xl mx-auto py-6 sm:px-4 lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8">
          {dummyTickets.map((ticket) => (
            <TicketCard 
              key={ticket.id} 
              ticket={ticket}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
