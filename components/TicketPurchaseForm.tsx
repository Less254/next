'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { 
  CreditCardIcon,
  DevicePhoneMobileIcon,
  EnvelopeIcon,
  PhoneIcon
} from '@heroicons/react/24/outline'

interface Event {
  id: number
  title: string
  date: string
  venue: string
  price: number
}

interface TicketPurchaseFormProps {
  event: Event
  quantity: number
  totalAmount: number
}

export default function TicketPurchaseForm({ event, quantity, totalAmount }: TicketPurchaseFormProps) {
  const [step, setStep] = useState(1) // 1: Details, 2: Payment, 3: Confirmation
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [deliveryMethod, setDeliveryMethod] = useState('email')
  const [isProcessing, setIsProcessing] = useState(false)
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    mpesaPhone: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const validateStep1 = () => {
    const { firstName, lastName, email, phone } = formData
    return firstName && lastName && email && phone
  }

  const validateStep2 = () => {
    if (paymentMethod === 'card') {
      return formData.cardNumber && formData.expiryDate && formData.cvv
    } else {
      return formData.mpesaPhone
    }
  }

  const generateTicketNumber = () => {
    return `SLM${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (step === 1 && validateStep1()) {
      setStep(2)
      return
    }
    
    if (step === 2 && validateStep2()) {
      setIsProcessing(true)
      
      try {
        // Simulate payment processing
        await new Promise(resolve => setTimeout(resolve, 3000))
        
        // Generate tickets
        const tickets = Array.from({ length: quantity }, () => ({
          ticketNumber: generateTicketNumber(),
          event: event.title,
          date: event.date,
          venue: event.venue,
          buyer: `${formData.firstName} ${formData.lastName}`,
          price: event.price
        }))
        
        // Store tickets in localStorage (in real app, this would be saved to database)
        const existingTickets = JSON.parse(localStorage.getItem('userTickets') || '[]')
        localStorage.setItem('userTickets', JSON.stringify([...existingTickets, ...tickets]))
        
        setStep(3)
        toast.success('Payment successful! Tickets will be sent shortly.')
        
        // Simulate ticket delivery
        setTimeout(() => {
          toast.success(`Tickets sent via ${deliveryMethod === 'email' ? 'email' : 'SMS/WhatsApp'}!`)
        }, 2000)
        
      } catch (error) {
        toast.error('Payment failed. Please try again.')
      } finally {
        setIsProcessing(false)
      }
    }
  }

  if (step === 3) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          Payment Successful!
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Your tickets have been purchased successfully. You will receive them via {deliveryMethod === 'email' ? 'email' : 'SMS/WhatsApp'} shortly.
        </p>
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <strong>Order Summary:</strong><br />
            {quantity} × {event.title}<br />
            Total: KSh {totalAmount.toLocaleString()}
          </p>
        </div>
        <button
          onClick={() => window.location.href = '/events'}
          className="btn-primary w-full"
        >
          Browse More Events
        </button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Step Indicator */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center space-x-4">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
            step >= 1 ? 'bg-primary-500 text-white' : 'bg-gray-300 text-gray-600'
          }`}>
            1
          </div>
          <div className={`w-16 h-1 ${step >= 2 ? 'bg-primary-500' : 'bg-gray-300'}`} />
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
            step >= 2 ? 'bg-primary-500 text-white' : 'bg-gray-300 text-gray-600'
          }`}>
            2
          </div>
        </div>
      </div>

      {step === 1 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Personal Details</h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+254 700 123 456"
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>

          {/* Delivery Method */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Ticket Delivery Method
            </label>
            <div className="space-y-2">
              <label className="flex items-center p-3 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                <input
                  type="radio"
                  name="deliveryMethod"
                  value="email"
                  checked={deliveryMethod === 'email'}
                  onChange={(e) => setDeliveryMethod(e.target.value)}
                  className="mr-3"
                />
                <EnvelopeIcon className="h-5 w-5 text-primary-500 mr-3" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">Email</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">PDF ticket with QR code & barcode</p>
                </div>
              </label>
              <label className="flex items-center p-3 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                <input
                  type="radio"
                  name="deliveryMethod"
                  value="sms"
                  checked={deliveryMethod === 'sms'}
                  onChange={(e) => setDeliveryMethod(e.target.value)}
                  className="mr-3"
                />
                <PhoneIcon className="h-5 w-5 text-green-500 mr-3" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">SMS/WhatsApp</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Link to download ticket</p>
                </div>
              </label>
            </div>
          </div>
        </motion.div>
      )}

      {step === 2 && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Payment Details</h3>
          
          {/* Payment Method Selection */}
          <div className="space-y-2 mb-4">
            <label className="flex items-center p-3 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-3"
              />
              <CreditCardIcon className="h-5 w-5 text-primary-500 mr-3" />
              <span className="font-medium text-gray-900 dark:text-white">Credit/Debit Card</span>
            </label>
            <label className="flex items-center p-3 border border-gray-200 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
              <input
                type="radio"
                name="paymentMethod"
                value="mpesa"
                checked={paymentMethod === 'mpesa'}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="mr-3"
              />
              <DevicePhoneMobileIcon className="h-5 w-5 text-green-500 mr-3" />
              <span className="font-medium text-gray-900 dark:text-white">M-Pesa</span>
            </label>
          </div>

          {paymentMethod === 'card' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Card Number *
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Expiry Date *
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    placeholder="MM/YY"
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    CVV *
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    required
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === 'mpesa' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                M-Pesa Phone Number *
              </label>
              <input
                type="tel"
                name="mpesaPhone"
                value={formData.mpesaPhone}
                onChange={handleInputChange}
                placeholder="+254 700 123 456"
                required
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                You will receive an M-Pesa prompt to complete payment
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={() => setStep(1)}
            className="w-full py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Back to Details
          </button>
        </motion.div>
      )}

      <button
        type="submit"
        disabled={isProcessing || (step === 1 && !validateStep1()) || (step === 2 && !validateStep2())}
        className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
          isProcessing || (step === 1 && !validateStep1()) || (step === 2 && !validateStep2())
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'btn-primary'
        }`}
      >
        {isProcessing ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
            Processing Payment...
          </div>
        ) : step === 1 ? (
          'Continue to Payment'
        ) : (
          `Pay KSh ${totalAmount.toLocaleString()}`
        )}
      </button>
    </form>
  )
}
