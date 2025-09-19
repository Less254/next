import { NextRequest, NextResponse } from 'next/server'
import { createPaymentIntent } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  try {
    const { amount, currency = 'usd' } = await request.json()

    if (!amount || amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      )
    }

    const paymentIntent = await createPaymentIntent(amount, currency)

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    })
  } catch (error) {
    console.error('Stripe payment error:', error)
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const paymentIntentId = searchParams.get('payment_intent_id')

  if (!paymentIntentId) {
    return NextResponse.json(
      { error: 'Payment intent ID is required' },
      { status: 400 }
    )
  }

  try {
    const { confirmPayment } = await import('@/lib/stripe')
    const paymentIntent = await confirmPayment(paymentIntentId)

    return NextResponse.json({
      status: paymentIntent.status,
      paymentIntent
    })
  } catch (error) {
    console.error('Error retrieving payment intent:', error)
    return NextResponse.json(
      { error: 'Failed to retrieve payment intent' },
      { status: 500 }
    )
  }
}
