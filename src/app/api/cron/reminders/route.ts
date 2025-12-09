import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Ticket from '@/models/Ticket';
import User from '@/models/User';
import { sendReminderEmail } from '@/lib/email';

export async function GET(req: Request) {
  // Verify cron secret to prevent unauthorized access
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get('secret');
  
  // In production, you should set a CRON_SECRET env var and check it
  // if (secret !== process.env.CRON_SECRET) {
  //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  // }

  try {
    await dbConnect();

    // Find tickets that are open or in_progress and haven't been updated in 24 hours
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    const staleTickets = await Ticket.find({
      status: { $in: ['open', 'in_progress'] },
      updatedAt: { $lt: twentyFourHoursAgo },
    }).populate('assignedTo');

    let remindersSent = 0;

    // Get all agents to send reminders if ticket is unassigned
    const agents = await User.find({ role: 'agent' });
    const agentEmails = agents.map(a => a.email);

    for (const ticket of staleTickets) {
      if (ticket.assignedTo) {
        // Send to assigned agent
        await sendReminderEmail(ticket.assignedTo.email, ticket._id, ticket.title);
      } else {
        // Send to all agents if unassigned (or a specific distribution list)
        // For simplicity, we'll just log it or send to the first agent found as a fallback
        // In a real app, you might have a shared inbox or send to all agents
        if (agentEmails.length > 0) {
           // Just send to the first agent for this demo to avoid spamming
           await sendReminderEmail(agentEmails[0], ticket._id, ticket.title);
        }
      }
      remindersSent++;
    }

    return NextResponse.json({ success: true, remindersSent });
  } catch (error) {
    console.error('Cron job failed:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
