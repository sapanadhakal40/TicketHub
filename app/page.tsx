"use client";


import { useEffect, useState } from 'react';
import TicketCard from './(components)/ticket-card';
import { Ticket } from './types/ticket';
import Link from 'next/link';



const Dashboard = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTickets = async () => {
      try{
      const res = await fetch('/api/tickets', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });
      
      if (!res.ok) {
        throw new Error('Failed to fetch tickets');
      }
      
      const data = await res.json();
      
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const formattedTickets = data.map((ticket: any) => ({
          id: ticket._id.toString(),
          title: ticket.title,
          description: ticket.description,
          category: ticket.category,
          priority: ticket.priority,
          progress: ticket.progress || 0,
          status: ticket.status,
          active: ticket.active,
          createdAt: ticket.createdAt,
          updatedAt: ticket.updatedAt
        }));
        
        setTickets(formattedTickets);
        setError("");
      } catch (error) {
        console.error("Error fetching tickets:", error);
        setError("Failed to load tickets. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);


  return (
    <div className="min-h-screen bg-card-bg dark:bg-primary-900">
      <div className="max-w-7xl mx-auto py-6 sm:px-4 lg:px-6">
        <div className="flex justify-between items-center px-8 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Tickets Dashboard</h1>
          <Link 
            href="ticket-page/new" 
            className="bg-primary-600 hover:bg-primary-700 text-gray-800 dark:text-white px-4 py-2 rounded-md transition-colors underline"
          >
            Create New Ticket
          </Link>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-primary-600 dark:text-primary-300">Loading tickets...</p>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-red-500">{error}</p>
          </div>
        ) : tickets.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <p className="text-primary-600 dark:text-primary-300 mb-4">No tickets found.</p>
              <Link 
                href="/new" 
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                Create Your First Ticket
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8">
            {tickets.map((ticket) => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Dashboard
