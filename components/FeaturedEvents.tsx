'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  CalendarDaysIcon, 
  MapPinIcon, 
  TicketIcon,
  ClockIcon,
  UsersIcon
} from '@heroicons/react/24/outline'

const featuredEvents = [
  {
    id: 1,
    title: "Nairobi Nights Festival",
    date: "2024-02-15",
    time: "8:00 PM",
    venue: "KICC Grounds",
    price: 2500,
    capacity: 5000,
    available: 3200,
    image: "/images/event-1.jpg",
    description: "The biggest Gen Z party in East Africa featuring top local and international DJs",
    featured: true
  },
  {
    id: 2,
    title: "Campus Vibes Concert",
    date: "2024-02-22",
    time: "6:00 PM",
    venue: "University of Nairobi",
    price: 1500,
    capacity: 2000,
    available: 1800,
    image: "/images/event-2.jpg",
    description: "Exclusive university concert with live performances and DJ sets",
    featured: true
  },
  {
    id: 3,
    title: "Rooftop Sessions",
    date: "2024-03-01",
    time: "7:00 PM",
    venue: "Westlands Rooftop",
    price: 3000,
    capacity: 500,
    available: 150,
    image: "/images/event-3.jpg",
    description: "Intimate rooftop experience with sunset views and premium vibes",
    featured: true
  }
]

export default function FeaturedEvents() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6">
            Featured <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Events</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Don't miss out on the hottest events that are defining the culture
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mt-6"></div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="card overflow-hidden">
                {/* Event Image */}
                <div className="relative h-48 bg-gradient-to-br from-primary-500 to-secondary-500 overflow-hidden">
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white">
                      <CalendarDaysIcon className="h-16 w-16 mx-auto mb-2 opacity-50" />
                      <p className="text-sm opacity-75">Event Image</p>
                    </div>
                  </div>
                  
                  {/* Availability badge */}
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      event.available > event.capacity * 0.5 
                        ? 'bg-green-500 text-white' 
                        : event.available > event.capacity * 0.2
                        ? 'bg-yellow-500 text-black'
                        : 'bg-red-500 text-white'
                    }`}>
                      {event.available} left
                    </span>
                  </div>
                </div>

                {/* Event Details */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {event.description}
                    </p>
                  </div>

                  {/* Event Info */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <CalendarDaysIcon className="h-4 w-4 mr-2 text-primary-500" />
                      <span>{new Date(event.date).toLocaleDateString('en-KE', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <ClockIcon className="h-4 w-4 mr-2 text-primary-500" />
                      <span>{event.time}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <MapPinIcon className="h-4 w-4 mr-2 text-primary-500" />
                      <span>{event.venue}</span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <UsersIcon className="h-4 w-4 mr-2 text-primary-500" />
                      <span>{event.capacity} capacity</span>
                    </div>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        KSh {event.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">per ticket</span>
                    </div>
                    
                    <Link
                      href={`/events/${event.id}`}
                      className="btn-primary text-sm py-2 px-4"
                    >
                      <TicketIcon className="h-4 w-4 mr-1" />
                      Get Tickets
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Events CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/events"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <CalendarDaysIcon className="h-5 w-5" />
            <span>View All Events</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
