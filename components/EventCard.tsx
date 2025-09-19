'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  CalendarDaysIcon, 
  MapPinIcon, 
  TicketIcon,
  ClockIcon,
  UsersIcon,
  StarIcon
} from '@heroicons/react/24/outline'
import toast from 'react-hot-toast'

interface Event {
  id: number
  title: string
  date: string
  venue: string
  price: number
  capacity: number
  available: number
  image: string
  description: string
  featured?: boolean
  category: string
  ageLimit: string
  duration: string
}

interface EventCardProps {
  event: Event
  featured?: boolean
}

export default function EventCard({ event, featured = false }: EventCardProps) {
  const [isInterested, setIsInterested] = useState(false)

  const eventDate = new Date(event.date)
  const isUpcoming = eventDate > new Date()
  const isSoldOut = event.available === 0
  const isAlmostSoldOut = event.available < event.capacity * 0.1

  const getAvailabilityStatus = () => {
    if (isSoldOut) return { color: 'bg-red-500', text: 'Sold Out' }
    if (isAlmostSoldOut) return { color: 'bg-yellow-500', text: `Only ${event.available} left!` }
    if (event.available > event.capacity * 0.5) return { color: 'bg-green-500', text: `${event.available} available` }
    return { color: 'bg-orange-500', text: `${event.available} left` }
  }

  const availability = getAvailabilityStatus()

  const toggleInterest = () => {
    setIsInterested(!isInterested)
    toast.success(isInterested ? 'Removed from interested' : 'Added to interested events')
  }

  return (
    <div className={`group card overflow-hidden ${featured ? 'ring-2 ring-primary-500' : ''}`}>
      {/* Event Image */}
      <div className="relative h-48 bg-gradient-to-br from-primary-500 to-secondary-500 overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <CalendarDaysIcon className="h-16 w-16 mx-auto mb-2 opacity-50" />
            <p className="text-sm opacity-75">Event Image</p>
          </div>
        </div>
        
        {/* Featured badge */}
        {featured && (
          <div className="absolute top-4 left-4">
            <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-xs font-bold flex items-center">
              <StarIcon className="h-3 w-3 mr-1" />
              FEATURED
            </span>
          </div>
        )}

        {/* Availability badge */}
        <div className="absolute top-4 right-4">
          <span className={`${availability.color} text-white px-3 py-1 rounded-full text-xs font-semibold`}>
            {availability.text}
          </span>
        </div>

        {/* Category badge */}
        <div className="absolute bottom-4 left-4">
          <span className="bg-black/50 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
            {event.category}
          </span>
        </div>

        {/* Interest button */}
        <button
          onClick={toggleInterest}
          className="absolute bottom-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors"
        >
          <svg 
            className={`h-5 w-5 ${isInterested ? 'text-red-500 fill-current' : 'text-white'}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      {/* Event Details */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 transition-colors">
            {event.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
            {event.description}
          </p>
        </div>

        {/* Event Info */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <CalendarDaysIcon className="h-4 w-4 mr-2 text-primary-500" />
            <span>{eventDate.toLocaleDateString('en-KE', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <ClockIcon className="h-4 w-4 mr-2 text-primary-500" />
            <span>{eventDate.toLocaleTimeString('en-KE', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })} • {event.duration}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <MapPinIcon className="h-4 w-4 mr-2 text-primary-500" />
            <span>{event.venue}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <UsersIcon className="h-4 w-4 mr-2 text-primary-500" />
            <span>{event.capacity} capacity • {event.ageLimit}</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
            <span>Tickets Sold</span>
            <span>{Math.round(((event.capacity - event.available) / event.capacity) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((event.capacity - event.available) / event.capacity) * 100}%` }}
            />
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
          
          {isUpcoming ? (
            <Link
              href={`/events/${event.id}/tickets`}
              className={`text-sm py-2 px-4 rounded-lg font-semibold transition-all duration-300 ${
                isSoldOut 
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'btn-primary'
              }`}
            >
              <TicketIcon className="h-4 w-4 mr-1 inline" />
              {isSoldOut ? 'Sold Out' : 'Get Tickets'}
            </Link>
          ) : (
            <span className="text-sm py-2 px-4 bg-gray-300 text-gray-500 rounded-lg">
              Event Ended
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
