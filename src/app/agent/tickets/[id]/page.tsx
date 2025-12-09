'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { getTicket, getComments, createComment, updateTicket, getAgents } from '@/lib/api';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

export default function AgentTicketPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [ticket, setTicket] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [agents, setAgents] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [updating, setUpdating] = useState(false);
  
  // Unwrap params
  const { id } = use(params);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const [ticketData, commentsData, agentsData] = await Promise.all([
        getTicket(id),
        getComments(id),
        getAgents()
      ]);
      setTicket(ticketData);
      setComments(commentsData);
      setAgents(agentsData);
    } catch (error) {
      console.error('Failed to fetch ticket data', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setSubmitting(true);
    try {
      await createComment(id, newComment);
      setNewComment('');
      const updatedComments = await getComments(id);
      setComments(updatedComments);
    } catch (error) {
      console.error('Failed to post comment', error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusChange = async (newStatus: string) => {
    setUpdating(true);
    try {
      const updatedTicket = await updateTicket(id, { status: newStatus });
      setTicket(updatedTicket);
    } catch (error) {
      console.error('Failed to update status', error);
    } finally {
      setUpdating(false);
    }
  };

  const handlePriorityChange = async (newPriority: string) => {
    setUpdating(true);
    try {
      const updatedTicket = await updateTicket(id, { priority: newPriority });
      setTicket(updatedTicket);
    } catch (error) {
      console.error('Failed to update priority', error);
    } finally {
      setUpdating(false);
    }
  };

  const handleAssignmentChange = async (agentId: string) => {
    setUpdating(true);
    try {
      const updatedTicket = await updateTicket(id, { assignedTo: agentId });
      setTicket(updatedTicket);
    } catch (error) {
      console.error('Failed to update assignment', error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Ticket not found</h1>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          ← Back to Dashboard
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{ticket.title}</h1>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <span>Created by {ticket.createdBy?.name}</span>
                  <span>•</span>
                  <span>{new Date(ticket.createdAt).toLocaleString()}</span>
                </div>
              </div>
              
              <div className="prose max-w-none text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-100">
                {ticket.description}
              </div>
            </Card>

            <div className="space-y-6">
              <h2 className="text-xl font-bold text-gray-900">Discussion History</h2>
              
              {comments.map((comment) => (
                <div 
                  key={comment._id} 
                  className={`flex gap-4 ${comment.author.role === 'agent' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`flex-1 max-w-2xl ${comment.author.role === 'agent' ? 'text-right' : ''}`}>
                    <div className="flex items-center gap-2 mb-1 justify-end">
                      <span className="font-semibold text-gray-900">
                        {comment.author.name}
                      </span>
                      <Badge variant={comment.author.role === 'agent' ? 'info' : 'neutral'} className="text-xs">
                        {comment.author.role}
                      </Badge>
                      <span className="text-xs text-gray-400">
                        {new Date(comment.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <div className={`p-4 rounded-xl inline-block text-left ${
                      comment.author.role === 'agent' 
                        ? 'bg-blue-50 border border-blue-100 text-blue-900' 
                        : 'bg-white border border-gray-200 text-gray-800'
                    }`}>
                      {comment.message}
                    </div>
                  </div>
                </div>
              ))}

              <Card>
                <form onSubmit={handleCommentSubmit}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reply to Customer
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none mb-4"
                    placeholder="Type your response here..."
                  />
                  <div className="flex justify-end">
                    <Button type="submit" isLoading={submitting}>
                      Send Response
                    </Button>
                  </div>
                </form>
              </Card>
            </div>
          </div>

          {/* Sidebar Controls */}
          <div className="space-y-6">
            <Card title="Ticket Management">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={ticket.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    disabled={updating}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                  <select
                    value={ticket.priority}
                    onChange={(e) => handlePriorityChange(e.target.value)}
                    disabled={updating}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Owner</label>
                  <select
                    value={ticket.assignedTo?._id || ''}
                    onChange={(e) => handleAssignmentChange(e.target.value)}
                    disabled={updating}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  >
                    <option value="">Unassigned</option>
                    {agents.map((agent) => (
                      <option key={agent._id} value={agent._id}>
                        {agent.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
