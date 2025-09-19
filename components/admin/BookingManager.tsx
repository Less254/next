'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { 
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  PhoneIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline'

// Mock booking requests data
const mockBookings = [
  {
    id: 1,
    name: "Sarah Wanjiku",
    email: "sarah@example.com",
    phone: "+254 712 345 678",
    eventType: "Corporate Event",
    eventDate: "2024-03-15",
    guestCount: 150,
    budget: "200000-500000",
    venue: "Preferred",
    notes: "Annual company retreat. Need catering and entertainment.",
    status: "pending",
    createdAt: "2024-01-20T10:30:00"
  },
  {
    id: 2,
    name: "Michael Ochieng",
    email: "mike@example.com",
    phone: "+254 722 987 654",
    eventType: "Wedding",
    eventDate: "2024-04-20",
    guestCount: 200,
    budget: "500000+",
    venue: "Client Venue",
    notes: "Traditional Luo wedding ceremony. Need DJ and photography.",
    status: "confirmed",
    createdAt: "2024-01-18T14:15:00"
  },
  {
    id: 3,
    name: "Grace Muthoni",
    email: "grace@example.com",
    phone: "+254 733 456 789",
    eventType: "Birthday Party",
    eventDate: "2024-02-28",
    guestCount: 80,
    budget: "50000-100000",
    venue: "Preferred",
    notes: "21st birthday party. Looking for a vibrant Gen Z theme.",
    status: "pending",
    createdAt: "2024-01-19T09:45:00"
  }
]

export default function BookingManager() {
  const [bookings, setBookings] = useState(mockBookings)
  const [selectedBooking, setSelectedBooking] = useState<any>(null)
  const [filterStatus, setFilterStatus] = useState('all')

  const updateBookingStatus = (bookingId: number, newStatus: string) => {
    setBookings(bookings.map(booking => 
      booking.id === bookingId 
        ? { ...booking, status: newStatus }
        : booking
    ))
    toast.success(`Booking ${newStatus} successfully!`)
  }

  const filteredBookings = bookings.filter(booking => 
    filterStatus === 'all' || booking.status === filterStatus
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100'
      case 'confirmed': return 'text-green-600 bg-green-100'
      case 'rejected': return 'text-red-600 bg-red-100'
      case 'completed': return 'text-blue-600 bg-blue-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return ClockIcon
      case 'confirmed': return CheckCircleIcon
      case 'rejected': return XCircleIcon
      case 'completed': return CheckCircleIcon
      default: return ClockIcon
    }
  }

  const getBudgetRange = (budget: string) => {
    switch (budget) {
      case '50000-100000': return 'KSh 50K - 100K'
      case '100000-200000': return 'KSh 100K - 200K'
      case '200000-500000': return 'KSh 200K - 500K'
      case '500000+': return 'KSh 500K+'
      default: return budget
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
          <ClipboardDocumentListIcon className="h-6 w-6 mr-2 text-primary-500" />
          Booking Requests
        </h2>
        
        {/* Status Filter */}
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="all">All Bookings</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="rejected">Rejected</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Total Requests', value: bookings.length, color: 'bg-blue-500' },
          { label: 'Pending', value: bookings.filter(b => b.status === 'pending').length, color: 'bg-yellow-500' },
          { label: 'Confirmed', value: bookings.filter(b => b.status === 'confirmed').length, color: 'bg-green-500' },
          { label: 'This Month', value: bookings.filter(b => new Date(b.createdAt).getMonth() === new Date().getMonth()).length, color: 'bg-purple-500' }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
          >
            <div className="flex items-center">
              <div className={`${stat.color} rounded-lg p-3 mr-4`}>
                <ClipboardDocumentListIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bookings List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Booking Requests ({filteredBookings.length})
          </h3>
        </div>
        
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {filteredBookings.map((booking) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => setSelectedBooking(booking)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {booking.name}
                    </h4>
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                      {booking.status.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Event Type</p>
                      <p className="text-gray-900 dark:text-white font-medium">{booking.eventType}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Event Date</p>
                      <p className="text-gray-900 dark:text-white font-medium">
                        {new Date(booking.eventDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Guests</p>
                      <p className="text-gray-900 dark:text-white font-medium">{booking.guestCount} people</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Budget</p>
                      <p className="text-gray-900 dark:text-white font-medium">{getBudgetRange(booking.budget)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4 mt-3 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center space-x-1">
                      <EnvelopeIcon className="h-4 w-4" />
                      <span>{booking.email}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <PhoneIcon className="h-4 w-4" />
                      <span>{booking.phone}</span>
                    </div>
                  </div>
                </div>
                
                {booking.status === 'pending' && (
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        updateBookingStatus(booking.id, 'confirmed')
                      }}
                      className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        updateBookingStatus(booking.id, 'rejected')
                      }}
                      className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Booking Detail Modal */}
      {selectedBooking && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedBooking(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {selectedBooking.name}
                </h3>
                <div className="flex items-center space-x-2">
                  {(() => {
                    const StatusIcon = getStatusIcon(selectedBooking.status)
                    return <StatusIcon className="h-5 w-5 text-gray-600" />
                  })()}
                  <span className={`px-2 py-1 text-sm font-medium rounded-full ${getStatusColor(selectedBooking.status)}`}>
                    {selectedBooking.status.toUpperCase()}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                <XCircleIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Contact Information */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Contact Information</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <EnvelopeIcon className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-900 dark:text-white">{selectedBooking.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <PhoneIcon className="h-5 w-5 text-gray-500" />
                    <span className="text-gray-900 dark:text-white">{selectedBooking.phone}</span>
                  </div>
                </div>
              </div>

              {/* Event Details */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Event Details</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Event Type</p>
                    <p className="text-gray-900 dark:text-white font-medium">{selectedBooking.eventType}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Event Date</p>
                    <p className="text-gray-900 dark:text-white font-medium">
                      {new Date(selectedBooking.eventDate).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Guest Count</p>
                    <p className="text-gray-900 dark:text-white font-medium">{selectedBooking.guestCount} people</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Budget Range</p>
                    <p className="text-gray-900 dark:text-white font-medium">{getBudgetRange(selectedBooking.budget)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Venue Preference</p>
                    <p className="text-gray-900 dark:text-white font-medium">{selectedBooking.venue}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Submitted</p>
                    <p className="text-gray-900 dark:text-white font-medium">
                      {new Date(selectedBooking.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Additional Notes */}
              {selectedBooking.notes && (
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Additional Notes</h4>
                  <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                    {selectedBooking.notes}
                  </p>
                </div>
              )}

              {/* Actions */}
              {selectedBooking.status === 'pending' && (
                <div className="flex space-x-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={() => {
                      updateBookingStatus(selectedBooking.id, 'confirmed')
                      setSelectedBooking(null)
                    }}
                    className="flex-1 btn-primary"
                  >
                    <CheckCircleIcon className="h-5 w-5 mr-2" />
                    Confirm Booking
                  </button>
                  <button
                    onClick={() => {
                      updateBookingStatus(selectedBooking.id, 'rejected')
                      setSelectedBooking(null)
                    }}
                    className="flex-1 px-6 py-3 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors font-semibold"
                  >
                    <XCircleIcon className="h-5 w-5 mr-2 inline" />
                    Reject Booking
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  )
}
