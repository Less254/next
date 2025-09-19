import { NextRequest, NextResponse } from 'next/server'
import { initiateSTKPush, querySTKStatus } from '@/lib/mpesa'

export async function POST(request: NextRequest) {
  try {
    const { phoneNumber, amount, accountReference, transactionDesc } = await request.json()

    if (!phoneNumber || !amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Phone number and valid amount are required' },
        { status: 400 }
      )
    }

    const callbackUrl = `${process.env.NEXTAUTH_URL}/api/payments/mpesa/callback`

    const response = await initiateSTKPush(
      phoneNumber,
      amount,
      accountReference || 'SLUMPERS_TICKET',
      transactionDesc || 'Event Ticket Purchase',
      callbackUrl
    )

    return NextResponse.json({
      success: true,
      checkoutRequestId: response.CheckoutRequestID,
      responseCode: response.ResponseCode,
      responseDescription: response.ResponseDescription
    })
  } catch (error) {
    console.error('M-Pesa payment error:', error)
    return NextResponse.json(
      { error: 'Failed to initiate M-Pesa payment' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const checkoutRequestId = searchParams.get('checkout_request_id')

  if (!checkoutRequestId) {
    return NextResponse.json(
      { error: 'Checkout request ID is required' },
      { status: 400 }
    )
  }

  try {
    const response = await querySTKStatus(checkoutRequestId)

    return NextResponse.json({
      success: true,
      resultCode: response.ResultCode,
      resultDesc: response.ResultDesc,
      status: response.ResultCode === '0' ? 'completed' : 'failed'
    })
  } catch (error) {
    console.error('Error querying M-Pesa status:', error)
    return NextResponse.json(
      { error: 'Failed to query payment status' },
      { status: 500 }
    )
  }
}
