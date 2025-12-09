import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Ticket from '@/models/Ticket';
import User from '@/models/User'; // Ensure User model is registered
import { sendTicketCreatedEmail } from '@/lib/email';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const priority = searchParams.get('priority');

    let query: any = {};

    // If client, only show their tickets
    if (session.user.role === 'client') {
      query.createdBy = session.user.id;
    }

    // Filters for agents (or clients filtering their own)
    if (status) query.status = status;
    if (priority) query.priority = priority;

    const tickets = await Ticket.find(query)
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 });

    return NextResponse.json(tickets);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only clients can create tickets (per requirements, though agents could too technically)
    // Requirements say: "Crear nuevos tickets desde el panel de usuario cliente."
    // Let's allow both but typically clients.
    
    const body = await req.json();
    const { title, description, priority } = body;

    if (!title || !description) {
      return NextResponse.json({ error: 'Title and description are required' }, { status: 400 });
    }

    await dbConnect();

    const ticket = await Ticket.create({
      title,
      description,
      priority: priority || 'low',
      createdBy: session.user.id,
      status: 'open',
    });

    // Send email notification
    if (session.user.email) {
      await sendTicketCreatedEmail(session.user.email, ticket._id.toString(), ticket.title);
    }

    return NextResponse.json(ticket, { status: 201 });
  } catch (error) {
    console.error('Error creating ticket:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
