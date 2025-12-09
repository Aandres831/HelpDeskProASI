'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { getTicket, getComments, createComment } from '@/lib/api';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import { useSession } from 'next-auth/react';

export default function TicketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { data: session } = useSession();
  const [ticket, setTicket] = useState<any>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  // Unwrap params
  const { id } = use(params);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const [ticketData, commentsData] = await Promise.all([
        getTicket(id),
        getComments(id)
      ]);
      setTicket(ticketData);
      setComments(commentsData);
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
      // Refresh comments
      const updatedComments = await getComments(id);
      setComments(updatedComments);
    } catch (error) {
      console.error('Failed to post comment', error);
    } finally {
      setSubmitting(false);
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
      <div className="max-w-4xl mx-auto">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          ← Back to Dashboard
        </Button>

        <div className="grid gap-6">
          {/* Ticket Info */}
          <Card>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{ticket.title}</h1>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <span>Created {new Date(ticket.createdAt).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>ID: {ticket._id}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Badge variant={ticket.status === 'open' ? 'info' : ticket.status === 'resolved' ? 'success' : 'default'}>
                  {ticket.status.replace('_', ' ')}
                </Badge>
                <Badge variant={ticket.priority === 'high' ? 'error' : 'warning'}>
                  {ticket.priority}
                </Badge>
              </div>
            </div>
            
            <div className="prose max-w-none text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-100">
              {ticket.description}
            </div>
          </Card>

          {/* Comments Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Discussion</h2>
            
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

            {/* Add Comment Form */}
            <Card className="mt-8">
              <form onSubmit={handleCommentSubmit}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Add a reply
                </label>
                <textarea
                  required
                  rows={4}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none mb-4"
                  placeholder="Type your message here..."
                />
                <div className="flex justify-end">
                  <Button type="submit" isLoading={submitting}>
                    Post Reply
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
