'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { 
  QrCodeIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline'

export default function TicketVerifier() {
  const [ticketNumber, setTicketNumber] = useState('')
  const [qrData, setQrData] = useState('')
  const [verificationResult, setVerificationResult] = useState<any>(null)
  const [isVerifying, setIsVerifying] = useState(false)
  const [searchHistory, setSearchHistory] = useState<any[]>([])

  const verifyTicket = async () => {
    if (!ticketNumber.trim()) {
      toast.error('Please enter a ticket number')
      return
    }

    setIsVerifying(true)
    setVerificationResult(null)

    try {
      const response = await fetch('/api/admin/tickets/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ticketNumber: ticketNumber.trim(),
          qrData
        })
      })

      const result = await response.json()
      setVerificationResult(result)

      // Add to search history
      const historyItem = {
        ticketNumber: ticketNumber.trim(),
        result,
        timestamp: new Date().toISOString()
      }
      setSearchHistory(prev => [historyItem, ...prev.slice(0, 9)]) // Keep last 10

      if (result.success) {
        toast.success('Ticket verified and marked as used!')
      } else {
        toast.error(result.error || 'Ticket verification failed')
      }
    } catch (error) {
      console.error('Verification error:', error)
      toast.error('Failed to verify ticket')
    } finally {
      setIsVerifying(false)
    }
  }

  const searchTicket = async (ticketNum: string) => {
    try {
      const response = await fetch(`/api/admin/tickets/verify?ticket_number=${ticketNum}`)
      const result = await response.json()
      
      if (result.success) {
        setVerificationResult({ ...result, searchOnly: true })
        setTicketNumber(ticketNum)
      } else {
        toast.error('Ticket not found')
      }
    } catch (error) {
      console.error('Search error:', error)
      toast.error('Failed to search ticket')
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'valid': return 'text-green-600 bg-green-100'
      case 'used': return 'text-red-600 bg-red-100'
      case 'cancelled': return 'text-gray-600 bg-gray-100'
      default: return 'text-yellow-600 bg-yellow-100'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'valid': return CheckCircleIcon
      case 'used': return XCircleIcon
      case 'cancelled': return XCircleIcon
      default: return ClockIcon
    }
  }

  return (
    <div className="space-y-8">
      {/* Verification Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
          <QrCodeIcon className="h-6 w-6 mr-2 text-primary-500" />
          Ticket Verification
        </h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Ticket Number *
            </label>
            <input
              type="text"
              value={ticketNumber}
              onChange={(e) => setTicketNumber(e.target.value)}
              placeholder="Enter ticket number (e.g., SLM1234567890ABCD)"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && verifyTicket()}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              QR Code Data (Optional)
            </label>
            <textarea
              value={qrData}
              onChange={(e) => setQrData(e.target.value)}
              placeholder="Paste QR code data here for additional verification"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
            />
          </div>

          <div className="flex space-x-4">
            <button
              onClick={verifyTicket}
              disabled={isVerifying || !ticketNumber.trim()}
              className={`flex-1 py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                isVerifying || !ticketNumber.trim()
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'btn-primary'
              }`}
            >
              {isVerifying ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                  Verifying...
                </div>
              ) : (
                <>
                  <CheckCircleIcon className="h-5 w-5 mr-2 inline" />
                  Verify & Mark as Used
                </>
              )}
            </button>

            <button
              onClick={() => searchTicket(ticketNumber)}
              disabled={!ticketNumber.trim()}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <MagnifyingGlassIcon className="h-5 w-5 mr-2 inline" />
              Search Only
            </button>
          </div>
        </div>
      </div>

      {/* Verification Result */}
      {verificationResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Verification Result
          </h3>

          {verificationResult.success || verificationResult.ticket ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  {(() => {
                    const StatusIcon = getStatusIcon(verificationResult.ticket?.status)
                    return <StatusIcon className="h-6 w-6 text-gray-600" />
                  })()}
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {verificationResult.ticket?.ticketNumber}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {verificationResult.searchOnly ? 'Search Result' : 'Verified & Marked as Used'}
                    </p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(verificationResult.ticket?.status)}`}>
                  {verificationResult.ticket?.status?.toUpperCase()}
                </span>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Event</p>
                    <p className="text-gray-900 dark:text-white">{verificationResult.ticket?.eventTitle}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Date & Venue</p>
                    <p className="text-gray-900 dark:text-white">
                      {new Date(verificationResult.ticket?.eventDate).toLocaleDateString()} at {verificationResult.ticket?.eventVenue}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Buyer</p>
                    <p className="text-gray-900 dark:text-white">{verificationResult.ticket?.buyerName}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Price</p>
                    <p className="text-gray-900 dark:text-white">KSh {verificationResult.ticket?.price?.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Created</p>
                    <p className="text-gray-900 dark:text-white">
                      {new Date(verificationResult.ticket?.createdAt).toLocaleString()}
                    </p>
                  </div>
                  {verificationResult.ticket?.usedAt && (
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Used At</p>
                      <p className="text-gray-900 dark:text-white">
                        {new Date(verificationResult.ticket?.usedAt).toLocaleString()}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <XCircleIcon className="h-16 w-16 text-red-500 mx-auto mb-4" />
              <p className="text-lg font-semibold text-red-600 mb-2">Verification Failed</p>
              <p className="text-gray-600 dark:text-gray-400">{verificationResult.error}</p>
            </div>
          )}
        </motion.div>
      )}

      {/* Search History */}
      {searchHistory.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Recent Verifications
          </h3>
          <div className="space-y-2">
            {searchHistory.map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer transition-colors"
                onClick={() => searchTicket(item.ticketNumber)}
              >
                <div className="flex items-center space-x-3">
                  <span className="font-mono text-sm text-gray-900 dark:text-white">
                    {item.ticketNumber}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.result.success ? getStatusColor(item.result.ticket?.status) : 'text-red-600 bg-red-100'
                  }`}>
                    {item.result.success ? item.result.ticket?.status : 'FAILED'}
                  </span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(item.timestamp).toLocaleTimeString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
