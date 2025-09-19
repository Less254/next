'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import BookingCalendar from '@/components/BookingCalendar'
import BookingForm from '@/components/BookingForm'
import { motion } from 'framer-motion'
import { 
  CalendarDaysIcon,
  SparklesIcon,
  CheckCircleIcon,
  ClockIcon,
  UsersIcon,
  StarIcon
} from '@heroicons/react/24/outline'

const eventTypes = [
  {
    name: "Birthday Parties",
    description: "Unforgettable birthday celebrations with custom themes and entertainment",
    icon: "🎂",
    priceRange: "KSh 50,000 - 200,000"
  },
  {
    name: "Weddings",
    description: "Dream wedding receptions with elegant setups and professional coordination",
    icon: "💒",
    priceRange: "KSh 200,000 - 1,000,000"
  },
  {
    name: "Corporate Events",
    description: "Professional corporate functions, team building, and product launches",
    icon: "🏢",
    priceRange: "KSh 100,000 - 500,000"
  },
  {
    name: "Concerts",
    description: "Live music events with full stage setup and sound engineering",
    icon: "🎵",
    priceRange: "KSh 300,000 - 2,000,000"
  },
  {
    name: "Graduations",
    description: "Memorable graduation parties to celebrate academic achievements",
    icon: "🎓",
    priceRange: "KSh 30,000 - 150,000"
  },
  {
    name: "Product Launches",
    description: "Impactful product launch events with media coverage and networking",
    icon: "🚀",
    priceRange: "KSh 150,000 - 800,000"
  }
]

const features = [
  {
    title: "Full Event Planning",
    description: "Complete event management from concept to execution",
    icon: CheckCircleIcon
  },
  {
    title: "Custom Themes",
    description: "Personalized themes and decorations for your unique vision",
    icon: SparklesIcon
  },
  {
    title: "Professional Team",
    description: "Experienced event coordinators and support staff",
    icon: UsersIcon
  },
  {
    title: "Flexible Timing",
    description: "Events scheduled around your convenience and preferences",
    icon: ClockIcon
  }
]

const testimonials = [
  {
    name: "Sarah Mwangi",
    event: "Wedding Reception",
    rating: 5,
    comment: "Slumpers made our wedding day absolutely perfect! The attention to detail was incredible."
  },
  {
    name: "David Kiprotich",
    event: "Corporate Launch",
    rating: 5,
    comment: "Professional, creative, and delivered beyond our expectations. Highly recommend!"
  },
  {
    name: "Grace Wanjiku",
    event: "Birthday Party",
    rating: 5,
    comment: "The team brought our vision to life. Best birthday party ever!"
  }
]

export default function BookingsPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [showBookingForm, setShowBookingForm] = useState(false)

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 via-secondary-600 to-accent-600 py-20 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce-slow" />
          <div className="absolute top-20 right-20 w-16 h-16 bg-yellow-400/20 rounded-full animate-pulse-slow" />
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-white/5 rounded-full animate-bounce-slow" style={{ animationDelay: '1s' }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <div className="flex justify-center mb-6">
              <CalendarDaysIcon className="h-16 w-16 text-yellow-300" />
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Book Your Event
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
              Let us plan your next unforgettable event. From intimate gatherings to massive celebrations, we bring the same energy that makes our events legendary.
            </p>
            <button
              onClick={() => setShowBookingForm(true)}
              className="bg-white text-primary-600 hover:bg-yellow-300 hover:text-black font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              Start Planning Now
            </button>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Event Types */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
              Events We Cater For
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Whatever the occasion, we have the expertise to make it extraordinary
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventTypes.map((eventType, index) => (
              <motion.div
                key={eventType.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6 text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl mb-4">{eventType.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {eventType.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {eventType.description}
                </p>
                <p className="text-primary-600 dark:text-primary-400 font-semibold">
                  {eventType.priceRange}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Calendar and Booking Form */}
        <section className="mb-20">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Calendar */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Check Availability
              </h2>
              <BookingCalendar 
                selectedDate={selectedDate}
                onDateSelect={setSelectedDate}
              />
              <div className="mt-4 flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-500 rounded mr-2" />
                  <span className="text-gray-600 dark:text-gray-400">Busy</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded mr-2" />
                  <span className="text-gray-600 dark:text-gray-400">Available</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-yellow-500 rounded mr-2" />
                  <span className="text-gray-600 dark:text-gray-400">Tentative</span>
                </div>
              </div>
            </motion.div>

            {/* Booking Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Book Your Event
              </h2>
              <BookingForm selectedDate={selectedDate} />
            </motion.div>
          </div>
        </section>

        {/* Features */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
              Why Choose Slumpers?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              We don't just plan events, we create experiences that last a lifetime
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 dark:text-white mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Don't just take our word for it - hear from our satisfied clients
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card p-6"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4 italic">
                  "{testimonial.comment}"
                </p>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {testimonial.event}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl p-12 text-white"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Ready to Plan Your Event?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Get in touch with our team and let's start planning something extraordinary together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowBookingForm(true)}
                className="bg-white text-primary-600 hover:bg-yellow-300 hover:text-black font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                Book Now
              </button>
              <a
                href="tel:+254700123456"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                Call Us: +254 700 123 456
              </a>
            </div>
          </motion.div>
        </section>
      </div>

      <Footer />
    </main>
  )
}
