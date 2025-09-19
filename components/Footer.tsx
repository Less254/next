'use client'

import Link from 'next/link'
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon,
  HeartIcon
} from '@heroicons/react/24/outline'

const socialLinks = [
  { name: 'Instagram', href: 'https://instagram.com/slumpers', icon: '📸' },
  { name: 'TikTok', href: 'https://tiktok.com/@slumpers', icon: '🎵' },
  { name: 'Twitter', href: 'https://twitter.com/slumpers', icon: '🐦' },
  { name: 'WhatsApp', href: 'https://wa.me/254700123456', icon: '💬' },
]

const quickLinks = [
  { name: 'About Us', href: '/about' },
  { name: 'Events', href: '/events' },
  { name: 'Shop', href: '/shop' },
  { name: 'Bookings', href: '/bookings' },
  { name: 'Contact', href: '/contact' },
]

const supportLinks = [
  { name: 'FAQ', href: '/faq' },
  { name: 'Shipping Info', href: '/shipping' },
  { name: 'Returns', href: '/returns' },
  { name: 'Size Guide', href: '/size-guide' },
  { name: 'Privacy Policy', href: '/privacy' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <div>
                <h3 className="text-2xl font-display font-bold bg-gradient-to-r from-primary-400 to-secondary-400 bg-clip-text text-transparent">
                  Slumpers
                </h3>
                <p className="text-sm text-gray-400">Taking Over The Scene</p>
              </div>
            </div>
            
            <p className="text-gray-400 mb-6 leading-relaxed">
              The event company taking over the scene with fresh vibes, unforgettable experiences, and the kind of energy that keeps the crowd coming back for more.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-lg">{social.icon}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Support</h4>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors duration-300"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Get In Touch</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <PhoneIcon className="h-5 w-5 text-primary-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-400">+254 700 123 456</p>
                  <p className="text-gray-400">+254 711 987 654</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <EnvelopeIcon className="h-5 w-5 text-primary-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-400">info@slumpers.co.ke</p>
                  <p className="text-gray-400">bookings@slumpers.co.ke</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPinIcon className="h-5 w-5 text-primary-400 mt-1 flex-shrink-0" />
                <p className="text-gray-400">
                  Westlands, Nairobi<br />
                  Kenya
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
            <p className="text-gray-400 mb-6">Get the latest updates on events, new merch, and exclusive offers.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-primary-500 text-white"
              />
              <button className="bg-primary-600 hover:bg-primary-700 px-6 py-3 rounded-r-lg font-semibold transition-colors duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 Slumpers. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-1 text-gray-400 text-sm">
            <span>Made with</span>
            <HeartIcon className="h-4 w-4 text-red-500 fill-current" />
            <span>in Kenya</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
