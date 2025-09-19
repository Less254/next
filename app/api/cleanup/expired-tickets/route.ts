import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

// Vercel Cron job to cleanup expired tickets
export async function GET(request: NextRequest) {
  try {
    // Verify this is a cron request
    const authHeader = request.headers.get('authorization')
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Delete tickets for events that ended more than 30 days ago
    const result = await sql`
      DELETE FROM tickets 
      WHERE event_id IN (
        SELECT id FROM events 
        WHERE date < NOW() - INTERVAL '30 days'
      )
      AND status = 'used'
    `

    // Delete old unused tickets (older than 1 year)
    const unusedResult = await sql`
      DELETE FROM tickets 
      WHERE created_at < NOW() - INTERVAL '1 year'
      AND status = 'valid'
      AND event_id IN (
        SELECT id FROM events 
        WHERE date < NOW()
      )
    `

    // Clean up old booking requests (older than 6 months and rejected/completed)
    const bookingResult = await sql`
      DELETE FROM bookings 
      WHERE created_at < NOW() - INTERVAL '6 months'
      AND status IN ('rejected', 'completed')
    `

    console.log(`Cleanup completed:
      - Deleted ${result.rowCount} used tickets from old events
      - Deleted ${unusedResult.rowCount} expired unused tickets  
      - Deleted ${bookingResult.rowCount} old booking requests
    `)

    return NextResponse.json({
      success: true,
      message: 'Cleanup completed successfully',
      deleted: {
        usedTickets: result.rowCount,
        expiredTickets: unusedResult.rowCount,
        oldBookings: bookingResult.rowCount
      }
    })
  } catch (error) {
    console.error('Cleanup cron job error:', error)
    return NextResponse.json(
      { error: 'Cleanup failed' },
      { status: 500 }
    )
  }
}
