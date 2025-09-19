'use client'

import { motion } from 'framer-motion'
import { 
  SparklesIcon, 
  FireIcon, 
  MusicalNoteIcon, 
  HeartIcon 
} from '@heroicons/react/24/outline'

export default function AboutSection() {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6">
            About <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Slumpers</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mb-8"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <p className="text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                Slumpers is the event company taking over the scene with fresh vibes, unforgettable experiences, and the kind of energy that keeps the crowd coming back for more.
              </p>
              
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                We're not just another event company - we're a movement. Born from the vibrant streets of Kenya, we bring that authentic Gen Z energy to every event we touch. From intimate gatherings to massive concerts, we create moments that matter.
              </p>
            </div>

            {/* Features */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                  <SparklesIcon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Fresh Vibes</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Cutting-edge experiences that define the culture</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-lg flex items-center justify-center">
                  <FireIcon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">High Energy</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Non-stop excitement from start to finish</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-accent-500 to-accent-600 rounded-lg flex items-center justify-center">
                  <MusicalNoteIcon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Perfect Sound</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Crystal clear audio that moves your soul</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-pink-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <HeartIcon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">Unforgettable</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Memories that last a lifetime</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right side - Visual element */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative">
              {/* Main card */}
              <div className="bg-gradient-to-br from-primary-500 via-secondary-500 to-accent-500 rounded-3xl p-8 text-white">
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center mx-auto mb-4">
                      <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                        <span className="text-2xl font-bold text-white">S</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Our Mission</h3>
                    <p className="text-white/90">
                      To create experiences that bring people together, celebrate culture, and build lasting memories through the power of music and community.
                    </p>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/20">
                    <div className="text-center">
                      <div className="text-2xl font-bold">5+</div>
                      <div className="text-xs text-white/80">Years Experience</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">24/7</div>
                      <div className="text-xs text-white/80">Support</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">100%</div>
                      <div className="text-xs text-white/80">Satisfaction</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce-slow">
                <SparklesIcon className="h-8 w-8 text-yellow-900" />
              </div>
              
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-pink-400 rounded-full flex items-center justify-center animate-pulse-slow">
                <HeartIcon className="h-6 w-6 text-pink-900" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
