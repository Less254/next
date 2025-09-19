import nodemailer from 'nodemailer'
import { TicketData } from './ticket-generator'

const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

export const sendTicketEmail = async (
  recipientEmail: string,
  recipientName: string,
  tickets: any[],
  eventTitle: string
) => {
  try {
    const attachments = tickets.map((ticket, index) => ({
      filename: `ticket-${ticket.ticketNumber}.pdf`,
      content: Buffer.from(ticket.pdfBase64, 'base64'),
      contentType: 'application/pdf'
    }))

    const ticketList = tickets.map(ticket => `
      <div style="border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 8px;">
        <h3>Ticket #${ticket.ticketNumber}</h3>
        <p><strong>Event:</strong> ${eventTitle}</p>
        <p><strong>QR Code:</strong></p>
        <img src="${ticket.qrCode}" alt="QR Code" style="width: 150px; height: 150px;">
        <p><strong>Barcode:</strong></p>
        <img src="${ticket.barcode}" alt="Barcode" style="width: 200px; height: 60px;">
      </div>
    `).join('')

    const mailOptions = {
      from: `"Slumpers Events" <${process.env.EMAIL_USER}>`,
      to: recipientEmail,
      subject: `Your Tickets for ${eventTitle} - Slumpers`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Your Event Tickets</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #f97316, #ef4444); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🎉 Your Tickets Are Ready!</h1>
            <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Get ready for an unforgettable experience</p>
          </div>
          
          <div style="background: white; padding: 30px; border: 1px solid #ddd; border-top: none;">
            <p style="font-size: 18px; margin-bottom: 20px;">Hi ${recipientName},</p>
            
            <p>Thank you for purchasing tickets for <strong>${eventTitle}</strong>! We're excited to have you join us for what's going to be an absolutely legendary event.</p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #f97316; margin-top: 0;">📱 How to Use Your Tickets</h2>
              <ul style="padding-left: 20px;">
                <li>Show the QR code or barcode at the entrance</li>
                <li>Keep your tickets safe - screenshots work too!</li>
                <li>Arrive early to avoid queues</li>
                <li>Bring valid ID for verification</li>
              </ul>
            </div>

            <h2 style="color: #f97316;">🎫 Your Tickets</h2>
            ${ticketList}
            
            <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 0; color: #856404;"><strong>⚠️ Important:</strong> Each ticket can only be used once. Please don't share your QR codes or barcodes with others.</p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <p style="font-size: 18px; color: #f97316; font-weight: bold;">Can't wait to see you there! 🔥</p>
            </div>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            
            <div style="text-align: center; color: #666; font-size: 14px;">
              <p><strong>Need help?</strong></p>
              <p>📞 +254 700 123 456 | 📧 support@slumpers.co.ke</p>
              <p>Follow us: Instagram @slumpers | TikTok @slumpers</p>
            </div>
          </div>
          
          <div style="background: #333; color: white; padding: 20px; text-align: center; border-radius: 0 0 10px 10px;">
            <p style="margin: 0; font-size: 14px;">© 2024 Slumpers - Taking Over The Scene</p>
          </div>
        </body>
        </html>
      `,
      attachments
    }

    const result = await transporter.sendMail(mailOptions)
    return { success: true, messageId: result.messageId }
  } catch (error) {
    console.error('Error sending ticket email:', error)
    throw error
  }
}

export const sendBookingConfirmation = async (
  recipientEmail: string,
  recipientName: string,
  bookingDetails: any
) => {
  try {
    const mailOptions = {
      from: `"Slumpers Events" <${process.env.EMAIL_USER}>`,
      to: recipientEmail,
      subject: `Booking Confirmation - ${bookingDetails.eventType} - Slumpers`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Booking Confirmation</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #f97316, #ef4444); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🎉 Booking Confirmed!</h1>
            <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">We're excited to plan your event</p>
          </div>
          
          <div style="background: white; padding: 30px; border: 1px solid #ddd; border-top: none;">
            <p style="font-size: 18px; margin-bottom: 20px;">Hi ${recipientName},</p>
            
            <p>Thank you for choosing Slumpers for your ${bookingDetails.eventType}! We've received your booking request and our team is already excited to start planning something extraordinary for you.</p>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h2 style="color: #f97316; margin-top: 0;">📋 Booking Details</h2>
              <ul style="list-style: none; padding: 0;">
                <li style="padding: 5px 0;"><strong>Event Type:</strong> ${bookingDetails.eventType}</li>
                <li style="padding: 5px 0;"><strong>Date:</strong> ${new Date(bookingDetails.eventDate).toLocaleDateString()}</li>
                <li style="padding: 5px 0;"><strong>Guest Count:</strong> ${bookingDetails.guestCount || 'TBD'}</li>
                <li style="padding: 5px 0;"><strong>Budget:</strong> ${bookingDetails.budget || 'TBD'}</li>
                <li style="padding: 5px 0;"><strong>Venue:</strong> ${bookingDetails.venue || 'TBD'}</li>
              </ul>
            </div>

            ${bookingDetails.notes ? `
            <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #1976d2; margin-top: 0;">📝 Your Notes</h3>
              <p style="margin: 0;">${bookingDetails.notes}</p>
            </div>
            ` : ''}
            
            <div style="background: #d4edda; border: 1px solid #c3e6cb; padding: 15px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #155724; margin-top: 0;">🚀 What's Next?</h3>
              <ul style="color: #155724; padding-left: 20px;">
                <li>Our event coordinator will contact you within 24 hours</li>
                <li>We'll discuss your vision and requirements in detail</li>
                <li>You'll receive a custom quote and timeline</li>
                <li>Once approved, we'll start bringing your event to life!</li>
              </ul>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <p style="font-size: 18px; color: #f97316; font-weight: bold;">Let's create something unforgettable together! ✨</p>
            </div>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            
            <div style="text-align: center; color: #666; font-size: 14px;">
              <p><strong>Questions? We're here to help!</strong></p>
              <p>📞 +254 700 123 456 | 📧 bookings@slumpers.co.ke</p>
              <p>WhatsApp: +254 711 987 654</p>
            </div>
          </div>
          
          <div style="background: #333; color: white; padding: 20px; text-align: center; border-radius: 0 0 10px 10px;">
            <p style="margin: 0; font-size: 14px;">© 2024 Slumpers - Taking Over The Scene</p>
          </div>
        </body>
        </html>
      `
    }

    const result = await transporter.sendMail(mailOptions)
    return { success: true, messageId: result.messageId }
  } catch (error) {
    console.error('Error sending booking confirmation email:', error)
    throw error
  }
}
