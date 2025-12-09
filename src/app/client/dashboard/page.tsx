'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getTickets } from '@/lib/api';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function ClientDashboard() {
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const data = await getTickets();
      setTickets(data);
    } catch (error) {
      console.error('Failed to fetch tickets', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'open': return 'info';
      case 'in_progress': return 'warning';
      case 'resolved': return 'success';
      case 'closed': return 'neutral';
      default: return 'default';
    }
  };

  const getPriorityVariant = (priority: string) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
            HelpDeskPro
          </Link>
          <div className="flex gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">Home</Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={() => window.location.href = '/api/auth/signout'}>
              Sign Out
            </Button>
          </div>
        </div>
      </nav>

      <div className="p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Tickets</h1>
              <p className="text-gray-500 mt-1">Manage and track your support requests</p>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={fetchTickets} isLoading={loading}>
                ↻ Refresh List
              </Button>
              <Link href="/client/tickets/create">
                <Button>Create New Ticket</Button>
              </Link>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mx-auto"></div>
            </div>
          ) : tickets.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">No tickets found</h3>
              <p className="text-gray-500 mt-2 mb-6">You haven't created any support tickets yet.</p>
              <Link href="/client/tickets/create">
                <Button>Create Your First Ticket</Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {tickets.map((ticket) => (
                <Card key={ticket._id} title={ticket.title} variant="comic" className="hover:shadow-md transition-shadow">
                  <p className="text-gray-600 mb-4 line-clamp-2">{ticket.description}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant={getStatusVariant(ticket.status)}>
                      {ticket.status.replace('_', ' ')}
                    </Badge>
                    <Badge variant={getPriorityVariant(ticket.priority)}>
                      {ticket.priority} priority
                    </Badge>
                  </div>

                  <div className="text-sm text-gray-400 mb-4">
                    Created: {new Date(ticket.createdAt).toLocaleDateString()}
                  </div>

                  <Link href={`/client/tickets/${ticket._id}`} className="block">
                    <Button variant="outline" size="sm" className="w-full">
                      View Details
                    </Button>
                  </Link>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
