'use client'

import { useState, useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import ProductFilters from '@/components/ProductFilters'
import { motion } from 'framer-motion'
import { 
  AdjustmentsHorizontalIcon,
  XMarkIcon
} from '@heroicons/react/24/outline'

// Mock products data
const products = [
  {
    id: 1,
    name: "Slumpers Classic Tee",
    price: 1500,
    originalPrice: 2000,
    image: "/images/product-1.jpg",
    category: "TSHIRT",
    gender: "UNISEX",
    sizes: ["S", "M", "L", "XL"],
    rating: 4.8,
    reviews: 124,
    inStock: true,
    colors: ["Black", "White", "Orange"]
  },
  {
    id: 2,
    name: "Vibes Hoodie",
    price: 3500,
    originalPrice: 4000,
    image: "/images/product-2.jpg",
    category: "HOODIE",
    gender: "UNISEX",
    sizes: ["M", "L", "XL", "XXL"],
    rating: 4.9,
    reviews: 89,
    inStock: true,
    colors: ["Black", "Grey", "Orange"]
  },
  {
    id: 3,
    name: "Slumpers Snapback",
    price: 1200,
    originalPrice: 1500,
    image: "/images/product-3.jpg",
    category: "CAP",
    gender: "UNISEX",
    sizes: ["One Size"],
    rating: 4.7,
    reviews: 67,
    inStock: true,
    colors: ["Black", "White", "Orange"]
  },
  {
    id: 4,
    name: "Festival Wristband Set",
    price: 800,
    originalPrice: 1000,
    image: "/images/product-4.jpg",
    category: "ACCESSORY",
    gender: "UNISEX",
    sizes: ["One Size"],
    rating: 4.6,
    reviews: 156,
    inStock: true,
    colors: ["Multi"]
  },
  {
    id: 5,
    name: "Ladies Crop Top",
    price: 1800,
    originalPrice: 2200,
    image: "/images/product-5.jpg",
    category: "TSHIRT",
    gender: "WOMEN",
    sizes: ["XS", "S", "M", "L"],
    rating: 4.5,
    reviews: 93,
    inStock: true,
    colors: ["Black", "White", "Pink"]
  },
  {
    id: 6,
    name: "Men's Tank Top",
    price: 1300,
    originalPrice: 1600,
    image: "/images/product-6.jpg",
    category: "TSHIRT",
    gender: "MEN",
    sizes: ["M", "L", "XL", "XXL"],
    rating: 4.4,
    reviews: 78,
    inStock: true,
    colors: ["Black", "Grey", "White"]
  }
]

export default function ShopPage() {
  const [filteredProducts, setFilteredProducts] = useState(products)
  const [filters, setFilters] = useState({
    category: '',
    gender: '',
    size: '',
    priceRange: [0, 5000],
    inStock: false
  })
  const [sortBy, setSortBy] = useState('featured')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    let filtered = products.filter(product => {
      if (filters.category && product.category !== filters.category) return false
      if (filters.gender && product.gender !== filters.gender) return false
      if (filters.size && !product.sizes.includes(filters.size)) return false
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) return false
      if (filters.inStock && !product.inStock) return false
      return true
    })

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        filtered.sort((a, b) => b.id - a.id)
        break
      default:
        // Featured - keep original order
        break
    }

    setFilteredProducts(filtered)
  }, [filters, sortBy])

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
              Shop Slumpers
            </h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Rep the brand with our exclusive collection of premium streetwear and accessories
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 bg-white dark:bg-gray-800 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600"
            >
              <AdjustmentsHorizontalIcon className="h-5 w-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Filters Sidebar */}
          <div className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6 lg:hidden">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button
                  onClick={() => setShowFilters(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
              
              <ProductFilters 
                filters={filters}
                setFilters={setFilters}
              />
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort and Results */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <p className="text-gray-600 dark:text-gray-400">
                Showing {filteredProducts.length} of {products.length} products
              </p>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Products Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>

            {/* No Results */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <div className="text-gray-400 mb-4">
                  <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2M4 13h2m13-8l-4 4m0 0l-4-4m4 4V3" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  No products found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Try adjusting your filters to see more products
                </p>
                <button
                  onClick={() => setFilters({
                    category: '',
                    gender: '',
                    size: '',
                    priceRange: [0, 5000],
                    inStock: false
                  })}
                  className="btn-primary"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
