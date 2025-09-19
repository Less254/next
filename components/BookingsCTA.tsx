'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  CalendarDaysIcon, 
  PhoneIcon, 
  EnvelopeIcon,
  SparklesIcon
} from '@heroicons/react/24/outline'

const eventTypes = [
  "Birthday Parties",
  "Weddings", 
  "Corporate Events",
  "Concerts",
  "Graduations",
  "Product Launches",
  "Private Parties",
  "Festival Organization"
]

export default function BookingsCTA() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce-slow" />
        <div className="absolute top-20 right-20 w-16 h-16 bg-yellow-400/20 rounded-full animate-pulse-slow" />
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-white/5 rounded-full animate-bounce-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-10 right-10 w-12 h-12 bg-pink-400/20 rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <div className="mb-8">
              <div className="flex items-center space-x-2 mb-4">
                <SparklesIcon className="h-8 w-8 text-yellow-300" />
                <span className="text-yellow-300 font-semibold text-lg">Event Planning</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">
                Let Us Plan Your Next
                <span className="block text-yellow-300">Unforgettable Event</span>
              </h2>
              
              <p className="text-xl text-white/90 leading-relaxed mb-8">
                From intimate gatherings to massive celebrations, we bring the same energy and attention to detail that makes our events legendary.
              </p>
            </div>

            {/* Event types */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">We Cater For:</h3>
              <div className="grid grid-cols-2 gap-3">
                {eventTypes.map((type, index) => (
                  <motion.div
                    key={type}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-2"
                  >
                    <div className="w-2 h-2 bg-yellow-300 rounded-full" />
                    <span className="text-white/90">{type}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Contact info */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <PhoneIcon className="h-5 w-5 text-yellow-300" />
                <span className="text-white/90">+254 700 123 456</span>
              </div>
              <div className="flex items-center space-x-3">
                <EnvelopeIcon className="h-5 w-5 text-yellow-300" />
                <span className="text-white/90">bookings@slumpers.co.ke</span>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              href="/bookings"
              className="inline-flex items-center space-x-2 bg-white text-primary-600 hover:bg-yellow-300 hover:text-black font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              <CalendarDaysIcon className="h-5 w-5" />
              <span>Book Your Event</span>
            </Link>
          </motion.div>

          {/* Right side - Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative">
              {/* Main booking card */}
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                <div className="text-center text-white mb-6">
                  <CalendarDaysIcon className="h-16 w-16 mx-auto mb-4 text-yellow-300" />
                  <h3 className="text-2xl font-bold mb-2">Quick Booking</h3>
                  <p className="text-white/80">
                    Get a quote for your event in minutes
                  </p>
                </div>

                {/* Quick stats */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-300">500+</div>
                    <div className="text-xs text-white/70">Events Planned</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-300">24hr</div>
                    <div className="text-xs text-white/70">Response Time</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-300">100%</div>
                    <div className="text-xs text-white/70">Success Rate</div>
                  </div>
                </div>

                {/* Process steps */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-yellow-300 text-black rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    <span className="text-white/90">Tell us about your event</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-yellow-300 text-black rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <span className="text-white/90">Get a custom quote</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-yellow-300 text-black rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <span className="text-white/90">Let us handle the rest</span>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce-slow">
                <CalendarDaysIcon className="h-8 w-8 text-yellow-900" />
              </div>
              
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-pink-400 rounded-full flex items-center justify-center animate-pulse-slow">
                <SparklesIcon className="h-6 w-6 text-pink-900" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
