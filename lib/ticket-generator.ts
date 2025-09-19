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

export const generateTicketNumber = (): string => {
  const timestamp = Date.now()
  const random = Math.random().toString(36).substr(2, 4).toUpperCase()
  return `SLM${timestamp}${random}`
}

export const generateQRCode = async (ticketData: TicketData): Promise<string> => {
  try {
    const qrData = JSON.stringify({
      ticketNumber: ticketData.ticketNumber,
      event: ticketData.eventTitle,
      date: ticketData.eventDate,
      venue: ticketData.eventVenue,
      buyer: ticketData.buyerName,
      price: ticketData.price,
      timestamp: Date.now()
    })

    const qrCodeDataURL = await QRCode.toDataURL(qrData, {
      width: 300,
      margin: 2,
      color: {
        dark: '#000000',
        light: '#FFFFFF'
      }
    })

    return qrCodeDataURL
  } catch (error) {
    console.error('Error generating QR code:', error)
    throw error
  }
}

export const generateBarcode = async (ticketNumber: string): Promise<string> => {
  try {
    const barcodeBuffer = await bwipjs.toBuffer({
      bcid: 'code128',
      text: ticketNumber,
      scale: 3,
      height: 10,
      includetext: true,
      textxalign: 'center',
    })

    const barcodeDataURL = `data:image/png;base64,${barcodeBuffer.toString('base64')}`
    return barcodeDataURL
  } catch (error) {
    console.error('Error generating barcode:', error)
    throw error
  }
}

export const generateTicketPDF = async (ticketData: TicketData): Promise<Buffer> => {
  // This would typically use a PDF generation library like jsPDF or PDFKit
  // For now, we'll return a placeholder
  try {
    const qrCode = await generateQRCode(ticketData)
    const barcode = await generateBarcode(ticketData.ticketNumber)
    
    // In a real implementation, you would generate a proper PDF here
    // For now, we'll return the ticket data as a JSON buffer
    const ticketContent = {
      ...ticketData,
      qrCode,
      barcode,
      generatedAt: new Date().toISOString()
    }
    
    return Buffer.from(JSON.stringify(ticketContent, null, 2))
  } catch (error) {
    console.error('Error generating ticket PDF:', error)
    throw error
  }
}

export const validateTicket = (ticketNumber: string, qrData: string): boolean => {
  try {
    const parsedQRData = JSON.parse(qrData)
    return parsedQRData.ticketNumber === ticketNumber
  } catch (error) {
    console.error('Error validating ticket:', error)
    return false
  }
}
