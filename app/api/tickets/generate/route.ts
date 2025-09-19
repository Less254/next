import { NextRequest, NextResponse } from 'next/server'
import { generateTicketNumber, generateQRCode, generateBarcode, generateTicketPDF, TicketData } from '@/lib/ticket-generator'

export async function POST(request: NextRequest) {
  try {
    const { 
      eventId, 
      eventTitle, 
      eventDate, 
      eventVenue, 
      buyerName, 
      buyerEmail, 
      price, 
      quantity = 1 
    } = await request.json()

    if (!eventTitle || !eventDate || !eventVenue || !buyerName || !buyerEmail || !price) {
      return NextResponse.json(
        { error: 'Missing required ticket information' },
        { status: 400 }
      )
    }

    const tickets = []

    for (let i = 0; i < quantity; i++) {
      const ticketNumber = generateTicketNumber()
      
      const ticketData: TicketData = {
        ticketNumber,
        eventTitle,
        eventDate,
        eventVenue,
        buyerName,
        buyerEmail,
        price,
        qrData: JSON.stringify({
          ticketNumber,
          event: eventTitle,
          date: eventDate,
          venue: eventVenue,
          buyer: buyerName,
          price,
          timestamp: Date.now()
        })
      }

      const qrCode = await generateQRCode(ticketData)
      const barcode = await generateBarcode(ticketNumber)
      const pdfBuffer = await generateTicketPDF(ticketData)

      tickets.push({
        ticketNumber,
        qrCode,
        barcode,
        ticketData,
        pdfBase64: pdfBuffer.toString('base64')
      })
    }

    return NextResponse.json({
      success: true,
      tickets,
      totalTickets: quantity
    })
  } catch (error) {
    console.error('Ticket generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate tickets' },
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
    // In a real app, you would fetch ticket data from database
    // For now, we'll return a mock response
    return NextResponse.json({
      success: true,
      ticket: {
        ticketNumber,
        status: 'valid',
        used: false,
        eventTitle: 'Sample Event',
        eventDate: '2024-02-15T20:00:00',
        eventVenue: 'KICC Grounds'
      }
    })
  } catch (error) {
    console.error('Error fetching ticket:', error)
    return NextResponse.json(
      { error: 'Failed to fetch ticket' },
      { status: 500 }
    )
  }
}
