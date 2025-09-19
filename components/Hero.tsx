'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  PlayIcon, 
  SparklesIcon, 
  TicketIcon, 
  ShoppingBagIcon,
  CalendarDaysIcon 
} from '@heroicons/react/24/outline'

const heroImages = [
  '/images/hero-1.jpg',
  '/images/hero-2.jpg',
  '/images/hero-3.jpg',
]

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-600/90 via-secondary-600/80 to-accent-600/90" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-yellow-400/20 rounded-full animate-bounce-slow" />
        <div className="absolute top-40 right-20 w-16 h-16 bg-green-400/20 rounded-full animate-pulse-slow" />
        <div className="absolute bottom-40 left-20 w-24 h-24 bg-red-400/20 rounded-full animate-bounce-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 right-10 w-12 h-12 bg-blue-400/20 rounded-full animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Logo/Brand */}
          <div className="flex justify-center mb-8">
            <div className="w-32 h-32 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20">
              <div className="w-24 h-24 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-4xl font-bold text-white">S</span>
              </div>
            </div>
          </div>

          {/* Main heading */}
          <div className="space-y-4">
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-display font-black text-white leading-tight"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              SLUMPERS
            </motion.h1>
            
            <motion.div
              className="flex items-center justify-center space-x-2 text-2xl md:text-3xl font-bold text-yellow-300"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <SparklesIcon className="h-8 w-8" />
              <span>Taking Over The Scene</span>
              <SparklesIcon className="h-8 w-8" />
            </motion.div>
          </div>

          {/* Tagline */}
          <motion.p 
            className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Fresh vibes, unforgettable experiences, and the kind of energy that keeps the crowd coming back for more.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link
              href="/events"
              className="group bg-white text-primary-600 hover:bg-yellow-400 hover:text-black font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center space-x-2"
            >
              <TicketIcon className="h-5 w-5" />
              <span>Get Tickets</span>
            </Link>
            
            <Link
              href="/shop"
              className="group bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary-600 font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <ShoppingBagIcon className="h-5 w-5" />
              <span>Shop Merch</span>
            </Link>
            
            <Link
              href="/bookings"
              className="group bg-gradient-to-r from-accent-500 to-accent-600 hover:from-accent-600 hover:to-accent-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center space-x-2"
            >
              <CalendarDaysIcon className="h-5 w-5" />
              <span>Book Event</span>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div 
            className="grid grid-cols-3 gap-8 pt-16 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">500+</div>
              <div className="text-white/80 text-sm md:text-base">Events Hosted</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">50K+</div>
              <div className="text-white/80 text-sm md:text-base">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-white">100%</div>
              <div className="text-white/80 text-sm md:text-base">Vibes Guaranteed</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce" />
        </div>
      </motion.div>
    </section>
  )
}
