'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  ShoppingBagIcon, 
  StarIcon,
  HeartIcon,
  EyeIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import toast from 'react-hot-toast'

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  gender: string
  sizes: string[]
  rating: number
  reviews: number
  inStock: boolean
  colors: string[]
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [selectedSize, setSelectedSize] = useState('')

  const addToCart = () => {
    if (product.sizes.length > 1 && !selectedSize) {
      toast.error('Please select a size')
      return
    }

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      size: selectedSize || product.sizes[0],
      quantity: 1
    }

    // Get existing cart
    const existingCart = JSON.parse(localStorage.getItem('cart') || '[]')
    
    // Check if item already exists
    const existingItemIndex = existingCart.findIndex(
      (item: any) => item.id === product.id && item.size === (selectedSize || product.sizes[0])
    )

    if (existingItemIndex > -1) {
      existingCart[existingItemIndex].quantity += 1
    } else {
      existingCart.push(cartItem)
    }

    localStorage.setItem('cart', JSON.stringify(existingCart))
    toast.success('Added to cart!')
    
    // Trigger cart update event
    window.dispatchEvent(new Event('cartUpdated'))
  }

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted)
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist')
  }

  const getColorClass = (color: string) => {
    switch (color.toLowerCase()) {
      case 'black': return 'bg-black'
      case 'white': return 'bg-white border border-gray-300'
      case 'orange': return 'bg-orange-500'
      case 'grey': case 'gray': return 'bg-gray-500'
      case 'pink': return 'bg-pink-500'
      case 'multi': return 'bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500'
      default: return 'bg-gray-400'
    }
  }

  return (
    <div className="group card overflow-hidden">
      {/* Product Image */}
      <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-secondary-500/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-gray-600 dark:text-gray-400">
            <ShoppingBagIcon className="h-16 w-16 mx-auto mb-2 opacity-50" />
            <p className="text-sm opacity-75">Product Image</p>
          </div>
        </div>
        
        {/* Sale badge */}
        {product.originalPrice && product.originalPrice > product.price && (
          <div className="absolute top-4 left-4">
            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              SALE
            </span>
          </div>
        )}

        {/* Quick actions */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            onClick={toggleWishlist}
            className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors"
          >
            {isWishlisted ? (
              <HeartSolidIcon className="h-4 w-4 text-red-500" />
            ) : (
              <HeartIcon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            )}
          </button>
          <Link
            href={`/shop/product/${product.id}`}
            className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors"
          >
            <EyeIcon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
          </Link>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link
            href={`/shop/product/${product.id}`}
            className="bg-white text-gray-900 px-6 py-2 rounded-full font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
          >
            Quick View
          </Link>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-6">
        <div className="mb-3">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wide">
              {product.category.replace('_', ' ')}
            </span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {product.gender}
            </span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
        </div>

        {/* Rating */}
        <div className="flex items-center mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Sizes */}
        {product.sizes.length > 1 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-2 py-1 text-xs border rounded transition-colors ${
                    selectedSize === size
                      ? 'border-primary-500 bg-primary-500 text-white'
                      : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-primary-500'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Colors */}
        <div className="mb-4">
          <div className="flex space-x-2">
            {product.colors.map((color) => (
              <div
                key={color}
                className={`w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600 ${getColorClass(color)}`}
                title={color}
              />
            ))}
          </div>
        </div>

        {/* Price and CTA */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              KSh {product.price.toLocaleString()}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                KSh {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          
          <button 
            onClick={addToCart}
            disabled={!product.inStock}
            className={`text-sm py-2 px-4 rounded-lg font-semibold transition-all duration-300 ${
              product.inStock
                ? 'btn-primary'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </div>
      </div>
    </div>
  )
}
