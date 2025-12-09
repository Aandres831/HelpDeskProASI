import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Ticket from '@/models/Ticket';
import User from '@/models/User';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== 'agent') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();

    // Aggregate tickets by assignedTo
    const stats = await Ticket.aggregate([
      {
        $group: {
          _id: '$assignedTo',
          count: { $sum: 1 },
        },
      },
    ]);

    // Populate user details manually since aggregate doesn't support populate directly in the same way
    const populatedStats = await Promise.all(
      stats.map(async (stat) => {
        if (!stat._id) {
          return {
            agentName: 'Unassigned',
            count: stat.count,
          };
        }
        const user = await User.findById(stat._id).select('name');
        return {
          agentName: user ? user.name : 'Unknown Agent',
          count: stat.count,
        };
      })
    );

    return NextResponse.json(populatedStats);
  } catch (error) {
    console.error('Error fetching agent stats:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
