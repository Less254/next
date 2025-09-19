'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ChevronLeftIcon, 
  ChevronRightIcon 
} from '@heroicons/react/24/outline'

interface BookingCalendarProps {
  selectedDate: Date | null
  onDateSelect: (date: Date) => void
}

// Mock busy dates - in real app, this would come from API
const busyDates = [
  '2024-02-14', // Valentine's Day
  '2024-02-17', // Weekend
  '2024-02-24', // Weekend
  '2024-03-02', // Weekend
  '2024-03-08', // Women's Day
  '2024-03-16', // Weekend
]

const tentativeDates = [
  '2024-02-10',
  '2024-02-18',
  '2024-03-05',
]

export default function BookingCalendar({ selectedDate, onDateSelect }: BookingCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const formatDateString = (date: Date) => {
    return date.toISOString().split('T')[0]
  }

  const isDateBusy = (date: Date) => {
    return busyDates.includes(formatDateString(date))
  }

  const isDateTentative = (date: Date) => {
    return tentativeDates.includes(formatDateString(date))
  }

  const isDatePast = (date: Date) => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return date < today
  }

  const isDateSelected = (date: Date) => {
    return selectedDate && formatDateString(date) === formatDateString(selectedDate)
  }

  const handleDateClick = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
    if (!isDatePast(date) && !isDateBusy(date)) {
      onDateSelect(date)
    }
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev)
      if (direction === 'prev') {
        newMonth.setMonth(prev.getMonth() - 1)
      } else {
        newMonth.setMonth(prev.getMonth() + 1)
      }
      return newMonth
    })
  }

  const daysInMonth = getDaysInMonth(currentMonth)
  const firstDayOfMonth = getFirstDayOfMonth(currentMonth)
  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  // Create array of days
  const days = []
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null)
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day)
  }

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => navigateMonth('prev')}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ChevronLeftIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </button>
        
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {monthName}
        </h3>
        
        <button
          onClick={() => navigateMonth('next')}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <ChevronRightIcon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>

      {/* Week Days Header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-500 dark:text-gray-400 py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((day, index) => {
          if (day === null) {
            return <div key={index} className="h-10" />
          }

          const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
          const isPast = isDatePast(date)
          const isBusy = isDateBusy(date)
          const isTentative = isDateTentative(date)
          const isSelected = isDateSelected(date)
          const isClickable = !isPast && !isBusy

          let cellClasses = "h-10 flex items-center justify-center text-sm font-medium rounded-lg transition-all duration-200 "
          
          if (isPast) {
            cellClasses += "text-gray-300 dark:text-gray-600 cursor-not-allowed"
          } else if (isBusy) {
            cellClasses += "bg-red-500 text-white cursor-not-allowed"
          } else if (isTentative) {
            cellClasses += "bg-yellow-500 text-white cursor-pointer hover:bg-yellow-600"
          } else if (isSelected) {
            cellClasses += "bg-primary-500 text-white"
          } else {
            cellClasses += "text-gray-700 dark:text-gray-300 hover:bg-green-100 dark:hover:bg-green-900 hover:text-green-800 dark:hover:text-green-200 cursor-pointer bg-green-50 dark:bg-green-900/20"
          }

          return (
            <motion.button
              key={day}
              onClick={() => isClickable && handleDateClick(day)}
              className={cellClasses}
              whileHover={isClickable ? { scale: 1.05 } : {}}
              whileTap={isClickable ? { scale: 0.95 } : {}}
              disabled={!isClickable}
            >
              {day}
            </motion.button>
          )
        })}
      </div>

      {/* Selected Date Display */}
      {selectedDate && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-lg"
        >
          <p className="text-sm text-primary-600 dark:text-primary-400 font-medium">
            Selected Date:
          </p>
          <p className="text-lg font-semibold text-primary-800 dark:text-primary-300">
            {selectedDate.toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </motion.div>
      )}

      {/* Instructions */}
      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        <p>• Click on available (green) dates to select</p>
        <p>• Red dates are already booked</p>
        <p>• Yellow dates have tentative bookings</p>
      </div>
    </div>
  )
}
