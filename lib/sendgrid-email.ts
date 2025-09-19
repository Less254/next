import sgMail from '@sendgrid/mail'

// Initialize SendGrid
if (process.env.SENDGRID_API_KEY) {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
}

export const sendTicketEmailViaSendGrid = async (
  recipientEmail: string,
  recipientName: string,
  tickets: any[],
  eventTitle: string,
  pdfBuffer?: Buffer
) => {
  try {
    const ticketList = tickets.map(ticket => `
      <div style="background: #f8f9fa; padding: 15px; margin: 10px 0; border-radius: 8px; border-left: 4px solid #00A651;">
        <h4 style="margin: 0 0 10px 0; color: #000;">Ticket #${ticket.ticketNumber}</h4>
        <p style="margin: 5px 0; color: #666;">Price: KSh ${ticket.price.toLocaleString()}</p>
        <p style="margin: 5px 0; color: #666;">Status: Valid</p>
      </div>
    `).join('')

    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Your Slumpers Tickets</title>
    </head>
    <body style="font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #000 0%, #FF0000 50%, #00A651 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">SLUMPERS</h1>
        <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Your Event Tickets</p>
      </div>

      <!-- Content -->
      <div style="background: white; padding: 30px; border: 1px solid #ddd; border-top: none;">
        <h2 style="color: #000; margin-top: 0;">Jambo ${recipientName}! 🎉</h2>
        
        <p style="font-size: 16px; margin-bottom: 20px;">
          Your tickets for <strong>${eventTitle}</strong> are ready! We can't wait to see you there.
        </p>

        <div style="background: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #000; margin-top: 0;">📱 How to Use Your Tickets</h3>
          <ul style="margin: 10px 0; padding-left: 20px;">
            <li>Show the QR code or barcode at the entrance</li>
            <li>Bring a valid ID for verification</li>
            <li>Arrive early to avoid queues</li>
            <li>Each ticket can only be used once</li>
          </ul>
        </div>

        <h3 style="color: #000;">Your Tickets:</h3>
        ${ticketList}

        <div style="background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 0; color: #856404;">
            <strong>⚠️ Important:</strong> Keep your tickets safe and don't share screenshots. 
            Our security team will verify each ticket at the entrance.
          </p>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <p style="font-size: 18px; color: #00A651; font-weight: bold;">
            See you on the dance floor! 🕺💃
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div style="background: #000; color: white; padding: 20px; text-align: center; border-radius: 0 0 10px 10px;">
        <p style="margin: 0 0 10px 0; font-size: 14px;">Need help? We're here for you!</p>
        <p style="margin: 0; font-size: 14px;">
          📞 +254 700 123 456 | 📧 support@slumpers.co.ke | 💬 WhatsApp: +254 711 987 654
        </p>
        <p style="margin: 15px 0 0 0; font-size: 12px; color: #ccc;">
          © 2024 Slumpers Kenya. Bringing Gen Z vibes to life! 🇰🇪
        </p>
      </div>
    </body>
    </html>
    `

    const msg: any = {
      to: recipientEmail,
      from: {
        email: process.env.EMAIL_USER || 'noreply@slumpers.co.ke',
        name: 'Slumpers Team'
      },
      subject: `🎫 Your tickets for ${eventTitle} are ready!`,
      html: htmlContent,
      text: `Hi ${recipientName}! Your tickets for ${eventTitle} are ready. Please find them attached as a PDF. Show the QR code or barcode at the entrance. Need help? Contact us at +254 700 123 456.`
    }

    // Add PDF attachment if provided
    if (pdfBuffer) {
      msg.attachments = [{
        content: pdfBuffer.toString('base64'),
        filename: `slumpers-tickets-${Date.now()}.pdf`,
        type: 'application/pdf',
        disposition: 'attachment'
      }]
    }

    await sgMail.send(msg)
    return { success: true, messageId: 'sendgrid-sent' }
  } catch (error) {
    console.error('SendGrid email error:', error)
    throw error
  }
}

export const sendBookingConfirmationViaSendGrid = async (
  recipientEmail: string,
  recipientName: string,
  bookingDetails: any
) => {
  try {
    const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Booking Confirmation - Slumpers</title>
    </head>
    <body style="font-family: 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
      
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #000 0%, #FF0000 50%, #00A651 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
        <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">SLUMPERS</h1>
        <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">Booking Confirmation</p>
      </div>

      <!-- Content -->
      <div style="background: white; padding: 30px; border: 1px solid #ddd; border-top: none;">
        <h2 style="color: #000; margin-top: 0;">Asante ${recipientName}! 🙏</h2>
        
        <p style="font-size: 16px; margin-bottom: 20px;">
          Your booking request for <strong>${bookingDetails.eventType}</strong> has been received and confirmed!
        </p>

        <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #00A651;">
          <h3 style="color: #000; margin-top: 0;">📋 Booking Details</h3>
          <p><strong>Event Type:</strong> ${bookingDetails.eventType}</p>
          <p><strong>Date:</strong> ${new Date(bookingDetails.eventDate).toLocaleDateString()}</p>
          <p><strong>Guest Count:</strong> ${bookingDetails.guestCount} people</p>
          <p><strong>Budget Range:</strong> ${bookingDetails.budget}</p>
          ${bookingDetails.venue ? `<p><strong>Venue:</strong> ${bookingDetails.venue}</p>` : ''}
        </div>

        <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #000; margin-top: 0;">🚀 What's Next?</h3>
          <ul style="margin: 10px 0; padding-left: 20px;">
            <li>Our team will contact you within 24 hours</li>
            <li>We'll discuss your requirements in detail</li>
            <li>You'll receive a custom quote and proposal</li>
            <li>We'll finalize all arrangements together</li>
          </ul>
        </div>

        ${bookingDetails.notes ? `
        <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h4 style="color: #856404; margin-top: 0;">📝 Your Notes:</h4>
          <p style="margin: 0; color: #856404;">${bookingDetails.notes}</p>
        </div>
        ` : ''}

        <div style="text-align: center; margin: 30px 0;">
          <p style="font-size: 18px; color: #00A651; font-weight: bold;">
            Let's create something unforgettable together! ✨
          </p>
        </div>
      </div>

      <!-- Footer -->
      <div style="background: #000; color: white; padding: 20px; text-align: center; border-radius: 0 0 10px 10px;">
        <p style="margin: 0 0 10px 0; font-size: 14px;">Questions? We're here to help!</p>
        <p style="margin: 0; font-size: 14px;">
          📞 +254 700 123 456 | 📧 bookings@slumpers.co.ke | 💬 WhatsApp: +254 711 987 654
        </p>
        <p style="margin: 15px 0 0 0; font-size: 12px; color: #ccc;">
          © 2024 Slumpers Kenya. Your event, our passion! 🇰🇪
        </p>
      </div>
    </body>
    </html>
    `

    const msg = {
      to: recipientEmail,
      from: {
        email: process.env.EMAIL_USER || 'bookings@slumpers.co.ke',
        name: 'Slumpers Bookings Team'
      },
      subject: `✅ Booking confirmed for ${bookingDetails.eventType}`,
      html: htmlContent,
      text: `Hi ${recipientName}! Your booking for ${bookingDetails.eventType} on ${new Date(bookingDetails.eventDate).toLocaleDateString()} has been confirmed. Our team will contact you within 24 hours. Questions? Call +254 700 123 456.`
    }

    await sgMail.send(msg)
    return { success: true, messageId: 'sendgrid-sent' }
  } catch (error) {
    console.error('SendGrid booking email error:', error)
    throw error
  }
}
