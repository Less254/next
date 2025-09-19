'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import EventCard from '@/components/EventCard'
import { motion } from 'framer-motion'
import { 
  CalendarDaysIcon,
  MagnifyingGlassIcon,
  AdjustmentsHorizontalIcon
} from '@heroicons/react/24/outline'

// Mock events data
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
    featured: true,
    category: "Festival",
    ageLimit: "18+",
    duration: "8 hours"
  },
  {
    id: 2,
    title: "Campus Vibes Concert",
    date: "2024-02-22T18:00:00",
    venue: "University of Nairobi",
    price: 1500,
    capacity: 2000,
    available: 1800,
    image: "/images/event-2.jpg",
    description: "Exclusive university concert with live performances and DJ sets",
    featured: true,
    category: "Concert",
    ageLimit: "18+",
    duration: "6 hours"
  },
  {
    id: 3,
    title: "Rooftop Sessions",
    date: "2024-03-01T19:00:00",
    venue: "Westlands Rooftop",
    price: 3000,
    capacity: 500,
    available: 150,
    image: "/images/event-3.jpg",
    description: "Intimate rooftop experience with sunset views and premium vibes",
    featured: true,
    category: "Party",
    ageLimit: "21+",
    duration: "5 hours"
  },
  {
    id: 4,
    title: "Throwback Thursday",
    date: "2024-02-08T21:00:00",
    venue: "Carnivore Grounds",
    price: 2000,
    capacity: 3000,
    available: 2500,
    image: "/images/event-4.jpg",
    description: "Nostalgic night with the best throwback hits and classic vibes",
    featured: false,
    category: "Party",
    ageLimit: "18+",
    duration: "6 hours"
  },
  {
    id: 5,
    title: "Afrobeats Night",
    date: "2024-02-29T20:30:00",
    venue: "Uhuru Gardens",
    price: 1800,
    capacity: 4000,
    available: 3800,
    image: "/images/event-5.jpg",
    description: "Celebrate African music with the hottest Afrobeats artists",
    featured: false,
    category: "Concert",
    ageLimit: "16+",
    duration: "7 hours"
  },
  {
    id: 6,
    title: "New Year Countdown",
    date: "2024-12-31T22:00:00",
    venue: "KICC Grounds",
    price: 5000,
    capacity: 10000,
    available: 8500,
    image: "/images/event-6.jpg",
    description: "Ring in the new year with the biggest celebration in Nairobi",
    featured: false,
    category: "Festival",
    ageLimit: "18+",
    duration: "10 hours"
  }
]

const categories = ['All', 'Festival', 'Concert', 'Party']

export default function EventsPage() {
  const [filteredEvents, setFilteredEvents] = useState(events)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('date')

  useEffect(() => {
    let filtered = events.filter(event => {
      const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           event.description.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory
      
      return matchesSearch && matchesCategory
    })

    // Sort events
    switch (sortBy) {
      case 'date':
        filtered.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        break
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'popularity':
        filtered.sort((a, b) => (b.capacity - b.available) - (a.capacity - a.available))
        break
      default:
        break
    }

    setFilteredEvents(filtered)
  }, [searchTerm, selectedCategory, sortBy])

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      {/* Header */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
              Events & Tickets
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Don't miss out on the hottest events that are defining the culture
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8 shadow-lg">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search events, venues, or descriptions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-primary-100 dark:hover:bg-gray-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="date">Sort by Date</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="popularity">Most Popular</option>
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Showing {filteredEvents.length} of {events.length} events
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <EventCard event={event} />
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <CalendarDaysIcon className="h-16 w-16 mx-auto" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              No events found
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Try adjusting your search or filters to find more events
            </p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedCategory('All')
                setSortBy('date')
              }}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Featured Events Section */}
        {searchTerm === '' && selectedCategory === 'All' && (
          <div className="mt-16">
            <h2 className="text-3xl font-display font-bold text-gray-900 dark:text-white mb-8 text-center">
              Featured Events
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.filter(event => event.featured).map((event, index) => (
                <motion.div
                  key={`featured-${event.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <EventCard event={event} featured />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  )
}
