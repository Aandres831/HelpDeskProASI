import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Comment from '@/models/Comment';
import Ticket from '@/models/Ticket';
import User from '@/models/User';
import { sendTicketReplyEmail } from '@/lib/email';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const ticketId = searchParams.get('ticketId');

    if (!ticketId) {
      return NextResponse.json({ error: 'Ticket ID is required' }, { status: 400 });
    }

    await dbConnect();

    // Check if user has access to this ticket
    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
    }

    if (session.user.role === 'client' && ticket.createdBy.toString() !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const comments = await Comment.find({ ticketId })
      .populate('author', 'name email role')
      .sort({ createdAt: 1 });

    return NextResponse.json(comments);
  } catch (error) {
    console.error('Error fetching comments:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { ticketId, message } = body;

    if (!ticketId || !message) {
      return NextResponse.json({ error: 'Ticket ID and message are required' }, { status: 400 });
    }

    await dbConnect();

    const ticket = await Ticket.findById(ticketId);
    if (!ticket) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
    }

    if (session.user.role === 'client' && ticket.createdBy.toString() !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    const comment = await Comment.create({
      ticketId,
      author: session.user.id,
      message,
    });

    // Send email notification
    // If agent replies, send to client. If client replies, maybe send to agent (optional, not strictly required by prompt but good practice)
    // Prompt says: "Un agente agrega una respuesta/comentario al ticket." -> Send to client.
    
    if (session.user.role === 'agent') {
      const fullTicket = await Ticket.findById(ticketId).populate('createdBy');
      if (fullTicket && fullTicket.createdBy) {
        await sendTicketReplyEmail(
          fullTicket.createdBy.email, 
          fullTicket._id.toString(), 
          fullTicket.title, 
          message, 
          session.user.name || 'Support Agent'
        );
      }
    }

    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error('Error creating comment:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
