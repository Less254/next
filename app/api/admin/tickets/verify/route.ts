import { NextRequest, NextResponse } from 'next/server'
import { validateTicket } from '@/lib/ticket-generator'

export async function POST(request: NextRequest) {
  try {
    const { ticketNumber, qrData } = await request.json()

    if (!ticketNumber) {
      return NextResponse.json(
        { error: 'Ticket number is required' },
        { status: 400 }
      )
    }

    // In a real app, you would check the database for ticket status
    // For now, we'll simulate the verification process
    
    // Check if ticket exists and is valid
    const isValidFormat = validateTicket(ticketNumber, qrData || '{}')
    
    // Simulate database lookup
    const mockTicketData = {
      ticketNumber,
      status: 'valid', // valid, used, cancelled
      eventTitle: 'Nairobi Nights Festival',
      eventDate: '2024-02-15T20:00:00',
      eventVenue: 'KICC Grounds',
      buyerName: 'John Doe',
      price: 2500,
      usedAt: null,
      createdAt: '2024-01-15T10:30:00'
    }

    // Check if ticket has already been used
    if (mockTicketData.status === 'used') {
      return NextResponse.json({
        success: false,
        error: 'Ticket has already been used',
        ticket: mockTicketData
      })
    }

    if (mockTicketData.status === 'cancelled') {
      return NextResponse.json({
        success: false,
        error: 'Ticket has been cancelled',
        ticket: mockTicketData
      })
    }

    // Mark ticket as used (in real app, update database)
    mockTicketData.status = 'used'
    mockTicketData.usedAt = new Date().toISOString()

    return NextResponse.json({
      success: true,
      message: 'Ticket verified and marked as used',
      ticket: mockTicketData
    })
  } catch (error) {
    console.error('Ticket verification error:', error)
    return NextResponse.json(
      { error: 'Failed to verify ticket' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const ticketNumber = searchParams.get('ticket_number')

  if (!ticketNumber) {
    return NextResponse.json(
      { error: 'Ticket number is required' },
      { status: 400 }
    )
  }

  try {
    // In a real app, fetch from database
    const mockTicketData = {
      ticketNumber,
      status: 'valid',
      eventTitle: 'Nairobi Nights Festival',
      eventDate: '2024-02-15T20:00:00',
      eventVenue: 'KICC Grounds',
      buyerName: 'John Doe',
      buyerEmail: 'john@example.com',
      price: 2500,
      usedAt: null,
      createdAt: '2024-01-15T10:30:00'
    }

    return NextResponse.json({
      success: true,
      ticket: mockTicketData
    })
  } catch (error) {
    console.error('Error fetching ticket:', error)
    return NextResponse.json(
      { error: 'Failed to fetch ticket' },
      { status: 500 }
    )
  }
}
