import jsPDF from 'jspdf'
import QRCode from 'qrcode'
import bwipjs from 'bwip-js'

export interface TicketData {
  ticketNumber: string
  eventTitle: string
  eventDate: string
  eventVenue: string
  buyerName: string
  buyerEmail: string
  price: number
  qrData: string
}

export const generateTicketPDF = async (ticketData: TicketData): Promise<Buffer> => {
  try {
    // Create new PDF document
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    })

    // Set up colors (Kenyan flag theme)
    const colors = {
      black: '#000000',
      red: '#FF0000',
      green: '#00A651',
      white: '#FFFFFF',
      gray: '#666666'
    }

    // Add background
    pdf.setFillColor(255, 255, 255)
    pdf.rect(0, 0, 210, 297, 'F')

    // Header with Slumpers branding
    pdf.setFillColor(0, 0, 0) // Black
    pdf.rect(0, 0, 210, 40, 'F')
    
    pdf.setTextColor(255, 255, 255)
    pdf.setFontSize(28)
    pdf.setFont('helvetica', 'bold')
    pdf.text('SLUMPERS', 105, 25, { align: 'center' })
    
    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'normal')
    pdf.text('EVENT TICKET', 105, 35, { align: 'center' })

    // Ticket border
    pdf.setDrawColor(0, 166, 81) // Green
    pdf.setLineWidth(2)
    pdf.rect(10, 50, 190, 200)

    // Event details section
    pdf.setTextColor(0, 0, 0)
    pdf.setFontSize(20)
    pdf.setFont('helvetica', 'bold')
    pdf.text('EVENT DETAILS', 20, 70)

    pdf.setFontSize(14)
    pdf.setFont('helvetica', 'normal')
    
    // Event title
    pdf.setFont('helvetica', 'bold')
    pdf.text('Event:', 20, 85)
    pdf.setFont('helvetica', 'normal')
    pdf.text(ticketData.eventTitle, 50, 85)

    // Event date
    pdf.setFont('helvetica', 'bold')
    pdf.text('Date:', 20, 100)
    pdf.setFont('helvetica', 'normal')
    pdf.text(new Date(ticketData.eventDate).toLocaleDateString('en-GB', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }), 50, 100)

    // Event time
    pdf.setFont('helvetica', 'bold')
    pdf.text('Time:', 20, 115)
    pdf.setFont('helvetica', 'normal')
    pdf.text(new Date(ticketData.eventDate).toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit'
    }), 50, 115)

    // Venue
    pdf.setFont('helvetica', 'bold')
    pdf.text('Venue:', 20, 130)
    pdf.setFont('helvetica', 'normal')
    pdf.text(ticketData.eventVenue, 50, 130)

    // Ticket holder section
    pdf.setFontSize(16)
    pdf.setFont('helvetica', 'bold')
    pdf.text('TICKET HOLDER', 20, 150)

    pdf.setFontSize(14)
    pdf.setFont('helvetica', 'normal')
    
    pdf.setFont('helvetica', 'bold')
    pdf.text('Name:', 20, 165)
    pdf.setFont('helvetica', 'normal')
    pdf.text(ticketData.buyerName, 50, 165)

    pdf.setFont('helvetica', 'bold')
    pdf.text('Email:', 20, 180)
    pdf.setFont('helvetica', 'normal')
    pdf.text(ticketData.buyerEmail, 50, 180)

    // Price
    pdf.setFont('helvetica', 'bold')
    pdf.text('Price:', 20, 195)
    pdf.setFont('helvetica', 'normal')
    pdf.text(`KSh ${ticketData.price.toLocaleString()}`, 50, 195)

    // Generate QR Code
    const qrCodeDataURL = await QRCode.toDataURL(ticketData.qrData, {
      width: 150,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    })

    // Add QR Code to PDF
    pdf.addImage(qrCodeDataURL, 'PNG', 130, 80, 50, 50)
    pdf.setFontSize(10)
    pdf.text('QR CODE', 155, 140, { align: 'center' })

    // Generate Barcode
    const barcodeCanvas = document.createElement('canvas')
    bwipjs.toCanvas(barcodeCanvas, {
      bcid: 'code128',
      text: ticketData.ticketNumber,
      scale: 3,
      height: 10,
      includetext: true,
      textxalign: 'center'
    })
    
    const barcodeDataURL = barcodeCanvas.toDataURL('image/png')
    pdf.addImage(barcodeDataURL, 'PNG', 20, 210, 170, 25)

    // Ticket number
    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'bold')
    pdf.text(`Ticket #: ${ticketData.ticketNumber}`, 105, 245, { align: 'center' })

    // Footer
    pdf.setFillColor(255, 0, 0) // Red
    pdf.rect(0, 260, 210, 37, 'F')
    
    pdf.setTextColor(255, 255, 255)
    pdf.setFontSize(10)
    pdf.setFont('helvetica', 'normal')
    pdf.text('Present this ticket at the venue entrance', 105, 275, { align: 'center' })
    pdf.text('Valid ID required for entry', 105, 285, { align: 'center' })
    pdf.text('For support: +254 700 123 456 | tech@slumpers.co.ke', 105, 295, { align: 'center' })

    // Convert to buffer
    const pdfBuffer = Buffer.from(pdf.output('arraybuffer'))
    return pdfBuffer
  } catch (error) {
    console.error('Error generating ticket PDF:', error)
    throw new Error('Failed to generate ticket PDF')
  }
}

export const generateMultipleTicketsPDF = async (tickets: TicketData[]): Promise<Buffer> => {
  try {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    })

    for (let i = 0; i < tickets.length; i++) {
      if (i > 0) {
        pdf.addPage()
      }
      
      // Generate each ticket on a separate page
      const ticketBuffer = await generateTicketPDF(tickets[i])
      // Note: In a real implementation, you'd need to merge the PDFs
      // For now, we'll generate them separately
    }

    return Buffer.from(pdf.output('arraybuffer'))
  } catch (error) {
    console.error('Error generating multiple tickets PDF:', error)
    throw new Error('Failed to generate tickets PDF')
  }
}
