import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Ticket from '@/models/Ticket';
import User from '@/models/User';
import { sendTicketClosedEmail, sendTicketStatusUpdateEmail } from '@/lib/email';



export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await dbConnect();

    const ticket = await Ticket.findById(id)
      .populate('createdBy', 'name email')
      .populate('assignedTo', 'name email');

    if (!ticket) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
    }

    // Access control
    if (session.user.role === 'client' && ticket.createdBy._id.toString() !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    return NextResponse.json(ticket);
  } catch (error) {
    console.error('Error fetching ticket:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only agents can update ticket status/priority/assignment
    if (session.user.role !== 'agent') {
      return NextResponse.json({ error: 'Forbidden: Only agents can update tickets' }, { status: 403 });
    }

    const { id } = await params;
    const body = await req.json();
    const { status, priority, assignedTo } = body;

    await dbConnect();

    const ticket = await Ticket.findById(id);
    if (!ticket) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
    }

    if (status) ticket.status = status;
    if (priority) ticket.priority = priority;
    if (assignedTo) ticket.assignedTo = assignedTo;

    await ticket.save();

    // Send email notification if status changed
    if (status) {
      const fullTicket = await Ticket.findById(id).populate('createdBy');
      if (fullTicket && fullTicket.createdBy) {
        if (status === 'closed') {
          await sendTicketClosedEmail(fullTicket.createdBy.email, fullTicket._id.toString(), fullTicket.title);
        } else {
          await sendTicketStatusUpdateEmail(fullTicket.createdBy.email, fullTicket._id.toString(), fullTicket.title, status);
        }
      }
    }

    return NextResponse.json(ticket);
  } catch (error) {
    console.error('Error updating ticket:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only agents can delete tickets
    if (session.user.role !== 'agent') {
      return NextResponse.json({ error: 'Forbidden: Only agents can delete tickets' }, { status: 403 });
    }

    const { id } = await params;
    await dbConnect();

    const ticket = await Ticket.findByIdAndDelete(id);

    if (!ticket) {
      return NextResponse.json({ error: 'Ticket not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Ticket deleted successfully' });
  } catch (error) {
    console.error('Error deleting ticket:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
