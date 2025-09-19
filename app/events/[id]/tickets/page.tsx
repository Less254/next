'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import TicketPurchaseForm from '@/components/TicketPurchaseForm'
import { motion } from 'framer-motion'
import { 
  CalendarDaysIcon, 
  MapPinIcon, 
  ClockIcon,
  UsersIcon,
  TicketIcon,
  ShieldCheckIcon,
  CreditCardIcon,
  DevicePhoneMobileIcon
} from '@heroicons/react/24/outline'

// Mock event data - in real app, this would come from API
const getEventById = (id: string) => {
  const events = [
    {
      id: 1,
      title: "Nairobi Nights Festival",
      date: "2024-02-15T20:00:00",
      venue: "KICC Grounds",
      price: 2500,
      capacity: 5000,
      available: 3200,
      image: "/images/event-1.jpg",
      description: "The biggest Gen Z party in East Africa featuring top local and international DJs",
      category: "Festival",
      ageLimit: "18+",
      duration: "8 hours",
      lineup: ["DJ Krowbar", "Bensoul", "Sauti Sol", "Nyashinski"],
      amenities: ["Free WiFi", "Food Court", "VIP Lounge", "Parking"],
      terms: [
        "No outside food or drinks allowed",
        "Valid ID required for entry",
        "Event is rain or shine",
        "No refunds after purchase"
      ]
    }
  ]
  
  return events.find(event => event.id === parseInt(id))
}

export default function TicketPurchasePage() {
  const params = useParams()
  const eventId = params.id as string
  const [event, setEvent] = useState<any>(null)
  const [ticketQuantity, setTicketQuantity] = useState(1)

  useEffect(() => {
    const eventData = getEventById(eventId)
    setEvent(eventData)
  }, [eventId])

  if (!event) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Event not found</h1>
        </div>
        <Footer />
      </main>
    )
  }

  const eventDate = new Date(event.date)
  const totalPrice = event.price * ticketQuantity

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      {/* Header */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Get Your Tickets
            </h1>
            <p className="text-xl text-white/90">
              Secure your spot at {event.title}
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Event Details */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {event.title}
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <CalendarDaysIcon className="h-5 w-5 mr-3 text-primary-500" />
                    <div>
                      <p className="font-medium">{eventDate.toLocaleDateString('en-KE', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <ClockIcon className="h-5 w-5 mr-3 text-primary-500" />
                    <div>
                      <p className="font-medium">{eventDate.toLocaleTimeString('en-KE', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}</p>
                      <p className="text-sm">Duration: {event.duration}</p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <MapPinIcon className="h-5 w-5 mr-3 text-primary-500" />
                    <div>
                      <p className="font-medium">{event.venue}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <UsersIcon className="h-5 w-5 mr-3 text-primary-500" />
                    <div>
                      <p className="font-medium">{event.capacity} capacity</p>
                      <p className="text-sm">Age limit: {event.ageLimit}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {event.description}
                </p>
                
                {/* Lineup */}
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Lineup</h3>
                  <div className="flex flex-wrap gap-2">
                    {event.lineup.map((artist: string) => (
                      <span key={artist} className="bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200 px-3 py-1 rounded-full text-sm">
                        {artist}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Amenities */}
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">What's Included</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {event.amenities.map((amenity: string) => (
                      <div key={amenity} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                        <ShieldCheckIcon className="h-4 w-4 mr-2 text-green-500" />
                        {amenity}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Terms and Conditions */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6"
            >
              <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Terms & Conditions</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                {event.terms.map((term: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3 flex-shrink-0" />
                    {term}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Ticket Purchase Form */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="sticky top-24"
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                <div className="text-center mb-6">
                  <TicketIcon className="h-12 w-12 mx-auto text-primary-500 mb-3" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">Purchase Tickets</h3>
                </div>

                {/* Ticket Quantity */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Number of Tickets
                  </label>
                  <div className="flex items-center justify-between bg-gray-100 dark:bg-gray-700 rounded-lg p-2">
                    <button
                      onClick={() => setTicketQuantity(Math.max(1, ticketQuantity - 1))}
                      className="w-8 h-8 bg-white dark:bg-gray-600 rounded-full flex items-center justify-center font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-500"
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      {ticketQuantity}
                    </span>
                    <button
                      onClick={() => setTicketQuantity(Math.min(10, ticketQuantity + 1))}
                      className="w-8 h-8 bg-white dark:bg-gray-600 rounded-full flex items-center justify-center font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-500"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Maximum 10 tickets per purchase
                  </p>
                </div>

                {/* Price Summary */}
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 dark:text-gray-400">
                      Ticket Price × {ticketQuantity}
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      KSh {(event.price * ticketQuantity).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Service Fee</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      KSh {Math.round(totalPrice * 0.05).toLocaleString()}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-600 pt-2">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                      <span className="text-lg font-bold text-primary-600">
                        KSh {Math.round(totalPrice * 1.05).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Payment Methods</h4>
                  <div className="space-y-2">
                    <div className="flex items-center p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                      <CreditCardIcon className="h-5 w-5 text-primary-500 mr-3" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">Credit/Debit Card</span>
                    </div>
                    <div className="flex items-center p-3 border border-gray-200 dark:border-gray-600 rounded-lg">
                      <DevicePhoneMobileIcon className="h-5 w-5 text-green-500 mr-3" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">M-Pesa</span>
                    </div>
                  </div>
                </div>

                {/* Ticket Delivery */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Ticket Delivery</h4>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    <p className="mb-2">✓ Email (PDF with QR code & barcode)</p>
                    <p>✓ SMS/WhatsApp link</p>
                  </div>
                </div>

                <TicketPurchaseForm 
                  event={event} 
                  quantity={ticketQuantity}
                  totalAmount={Math.round(totalPrice * 1.05)}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
