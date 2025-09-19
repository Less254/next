// SMS/WhatsApp delivery using Twilio
import twilio from 'twilio'

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

export const sendTicketSMS = async (
  phoneNumber: string,
  recipientName: string,
  tickets: any[],
  eventTitle: string
) => {
  try {
    const ticketLinks = tickets.map(ticket => 
      `Ticket #${ticket.ticketNumber}: ${process.env.NEXTAUTH_URL}/ticket/${ticket.ticketNumber}`
    ).join('\n')

    const message = `🎉 Hi ${recipientName}!

Your tickets for ${eventTitle} are ready!

${ticketLinks}

📱 Show the QR code or barcode at the entrance
⚠️ Keep your tickets safe - each can only be used once
🆔 Bring valid ID for verification

Questions? Call +254 700 123 456

Can't wait to see you there! 🔥
- Slumpers Team`

    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber
    })

    return { success: true, messageSid: result.sid }
  } catch (error) {
    console.error('Error sending ticket SMS:', error)
    throw error
  }
}

export const sendBookingConfirmationSMS = async (
  phoneNumber: string,
  recipientName: string,
  bookingDetails: any
) => {
  try {
    const message = `🎉 Hi ${recipientName}!

Your ${bookingDetails.eventType} booking is confirmed for ${new Date(bookingDetails.eventDate).toLocaleDateString()}.

Our team will contact you within 24 hours to discuss details and provide a custom quote.

Questions? Call +254 700 123 456 or WhatsApp +254 711 987 654

Let's create something unforgettable! ✨
- Slumpers Team`

    const result = await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber
    })

    return { success: true, messageSid: result.sid }
  } catch (error) {
    console.error('Error sending booking confirmation SMS:', error)
    throw error
  }
}

export const sendWhatsAppMessage = async (
  phoneNumber: string,
  message: string
) => {
  try {
    const result = await client.messages.create({
      body: message,
      from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
      to: `whatsapp:${phoneNumber}`
    })

    return { success: true, messageSid: result.sid }
  } catch (error) {
    console.error('Error sending WhatsApp message:', error)
    throw error
  }
}
