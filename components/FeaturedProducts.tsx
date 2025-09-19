'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { 
  ShoppingBagIcon, 
  StarIcon,
  HeartIcon,
  EyeIcon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'

const featuredProducts = [
  {
    id: 1,
    name: "Slumpers Classic Tee",
    price: 1500,
    originalPrice: 2000,
    image: "/images/product-1.jpg",
    category: "T-Shirt",
    gender: "Unisex",
    sizes: ["S", "M", "L", "XL"],
    rating: 4.8,
    reviews: 124,
    inStock: true,
    featured: true,
    colors: ["Black", "White", "Orange"]
  },
  {
    id: 2,
    name: "Vibes Hoodie",
    price: 3500,
    originalPrice: 4000,
    image: "/images/product-2.jpg",
    category: "Hoodie",
    gender: "Unisex",
    sizes: ["M", "L", "XL", "XXL"],
    rating: 4.9,
    reviews: 89,
    inStock: true,
    featured: true,
    colors: ["Black", "Grey", "Orange"]
  },
  {
    id: 3,
    name: "Slumpers Snapback",
    price: 1200,
    originalPrice: 1500,
    image: "/images/product-3.jpg",
    category: "Cap",
    gender: "Unisex",
    sizes: ["One Size"],
    rating: 4.7,
    reviews: 67,
    inStock: true,
    featured: true,
    colors: ["Black", "White", "Orange"]
  },
  {
    id: 4,
    name: "Festival Wristband Set",
    price: 800,
    originalPrice: 1000,
    image: "/images/product-4.jpg",
    category: "Accessory",
    gender: "Unisex",
    sizes: ["One Size"],
    rating: 4.6,
    reviews: 156,
    inStock: true,
    featured: true,
    colors: ["Multi"]
  }
]

export default function FeaturedProducts() {
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
            Featured <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">Merchandise</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Rep the brand with our exclusive collection of premium streetwear
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 mx-auto mt-6"></div>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="card overflow-hidden">
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
                  {product.originalPrice > product.price && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        SALE
                      </span>
                    </div>
                  )}

                  {/* Quick actions */}
                  <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors">
                      <HeartIcon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    </button>
                    <button className="p-2 bg-white/90 dark:bg-gray-800/90 rounded-full hover:bg-white dark:hover:bg-gray-800 transition-colors">
                      <EyeIcon className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    </button>
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
                        {product.category}
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
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1">
                      {product.sizes.map((size) => (
                        <span
                          key={size}
                          className="px-2 py-1 text-xs border border-gray-300 dark:border-gray-600 rounded text-gray-600 dark:text-gray-400"
                        >
                          {size}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Colors */}
                  <div className="mb-4">
                    <div className="flex space-x-2">
                      {product.colors.map((color) => (
                        <div
                          key={color}
                          className={`w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600 ${
                            color === 'Black' ? 'bg-black' :
                            color === 'White' ? 'bg-white' :
                            color === 'Orange' ? 'bg-orange-500' :
                            color === 'Grey' ? 'bg-gray-500' :
                            'bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500'
                          }`}
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
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                          KSh {product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    
                    <button className="btn-primary text-sm py-2 px-4">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Products CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/shop"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-semibold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <ShoppingBagIcon className="h-5 w-5" />
            <span>Shop All Products</span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
