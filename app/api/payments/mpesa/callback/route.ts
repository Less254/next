import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const callbackData = await request.json()
    
    // Log the callback for debugging
    console.log('M-Pesa Callback Data:', JSON.stringify(callbackData, null, 2))

    const { Body } = callbackData
    const { stkCallback } = Body

    if (stkCallback) {
      const { ResultCode, ResultDesc, CheckoutRequestID, CallbackMetadata } = stkCallback

      if (ResultCode === 0) {
        // Payment successful
        const metadata = CallbackMetadata?.Item || []
        const paymentData = {
          checkoutRequestId: CheckoutRequestID,
          resultCode: ResultCode,
          resultDesc: ResultDesc,
          amount: metadata.find((item: any) => item.Name === 'Amount')?.Value,
          mpesaReceiptNumber: metadata.find((item: any) => item.Name === 'MpesaReceiptNumber')?.Value,
          transactionDate: metadata.find((item: any) => item.Name === 'TransactionDate')?.Value,
          phoneNumber: metadata.find((item: any) => item.Name === 'PhoneNumber')?.Value,
        }

        // Here you would typically:
        // 1. Update the payment status in your database
        // 2. Generate and send tickets
        // 3. Send confirmation emails/SMS
        
        console.log('Payment successful:', paymentData)
        
        // Store payment data (in real app, this would go to database)
        // For now, we'll just log it
        
      } else {
        // Payment failed
        console.log('Payment failed:', { ResultCode, ResultDesc, CheckoutRequestID })
      }
    }

    // Always return success to M-Pesa
    return NextResponse.json({ ResultCode: 0, ResultDesc: 'Success' })
  } catch (error) {
    console.error('M-Pesa callback error:', error)
    // Still return success to avoid retries
    return NextResponse.json({ ResultCode: 0, ResultDesc: 'Success' })
  }
}
