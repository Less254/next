'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import TicketVerifier from '@/components/admin/TicketVerifier'
import EventManager from '@/components/admin/EventManager'
import BookingManager from '@/components/admin/BookingManager'
import { motion } from 'framer-motion'
import { 
  TicketIcon,
  CalendarDaysIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'

const adminTabs = [
  { id: 'verify', name: 'Ticket Verification', icon: TicketIcon },
  { id: 'events', name: 'Event Management', icon: CalendarDaysIcon },
  { id: 'bookings', name: 'Booking Requests', icon: ClipboardDocumentListIcon },
  { id: 'analytics', name: 'Analytics', icon: ChartBarIcon },
]

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('verify')

  const renderTabContent = () => {
    switch (activeTab) {
      case 'verify':
        return <TicketVerifier />
      case 'events':
        return <EventManager />
      case 'bookings':
        return <BookingManager />
      case 'analytics':
        return <div className="text-center py-16 text-gray-500">Analytics dashboard coming soon...</div>
      default:
        return <TicketVerifier />
    }
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      {/* Header */}
      <section className="bg-gradient-to-r from-gray-800 to-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Admin Dashboard
            </h1>
            <p className="text-xl text-white/90">
              Manage events, verify tickets, and oversee operations
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-8">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {adminTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          {renderTabContent()}
        </motion.div>
      </div>

      <Footer />
    </main>
  )
}
