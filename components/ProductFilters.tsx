'use client'

import { useState } from 'react'

interface Filters {
  category: string
  gender: string
  size: string
  priceRange: number[]
  inStock: boolean
}

interface ProductFiltersProps {
  filters: Filters
  setFilters: (filters: Filters) => void
}

const categories = [
  { value: '', label: 'All Categories' },
  { value: 'TSHIRT', label: 'T-Shirts' },
  { value: 'HOODIE', label: 'Hoodies' },
  { value: 'CAP', label: 'Caps' },
  { value: 'ACCESSORY', label: 'Accessories' },
]

const genders = [
  { value: '', label: 'All Genders' },
  { value: 'MEN', label: 'Men' },
  { value: 'WOMEN', label: 'Women' },
  { value: 'UNISEX', label: 'Unisex' },
]

const sizes = [
  { value: '', label: 'All Sizes' },
  { value: 'XS', label: 'XS' },
  { value: 'S', label: 'S' },
  { value: 'M', label: 'M' },
  { value: 'L', label: 'L' },
  { value: 'XL', label: 'XL' },
  { value: 'XXL', label: 'XXL' },
  { value: 'One Size', label: 'One Size' },
]

export default function ProductFilters({ filters, setFilters }: ProductFiltersProps) {
  const [priceRange, setPriceRange] = useState(filters.priceRange)

  const updateFilter = (key: keyof Filters, value: any) => {
    setFilters({
      ...filters,
      [key]: value
    })
  }

  const handlePriceChange = (index: number, value: number) => {
    const newRange = [...priceRange]
    newRange[index] = value
    setPriceRange(newRange)
    updateFilter('priceRange', newRange)
  }

  const clearFilters = () => {
    const clearedFilters = {
      category: '',
      gender: '',
      size: '',
      priceRange: [0, 5000],
      inStock: false
    }
    setFilters(clearedFilters)
    setPriceRange([0, 5000])
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h3>
        <button
          onClick={clearFilters}
          className="text-sm text-primary-600 hover:text-primary-700 font-medium"
        >
          Clear All
        </button>
      </div>

      {/* Category Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Category
        </label>
        <select
          value={filters.category}
          onChange={(e) => updateFilter('category', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          {categories.map((category) => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      {/* Gender Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Gender
        </label>
        <select
          value={filters.gender}
          onChange={(e) => updateFilter('gender', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          {genders.map((gender) => (
            <option key={gender.value} value={gender.value}>
              {gender.label}
            </option>
          ))}
        </select>
      </div>

      {/* Size Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Size
        </label>
        <select
          value={filters.size}
          onChange={(e) => updateFilter('size', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          {sizes.map((size) => (
            <option key={size.value} value={size.value}>
              {size.label}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range Filter */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Price Range (KSh)
        </label>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) => handlePriceChange(0, parseInt(e.target.value) || 0)}
              placeholder="Min"
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
            <span className="text-gray-500 dark:text-gray-400">to</span>
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange(1, parseInt(e.target.value) || 5000)}
              placeholder="Max"
              className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          
          {/* Price Range Slider */}
          <div className="relative">
            <input
              type="range"
              min="0"
              max="5000"
              step="100"
              value={priceRange[0]}
              onChange={(e) => handlePriceChange(0, parseInt(e.target.value))}
              className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
            />
            <input
              type="range"
              min="0"
              max="5000"
              step="100"
              value={priceRange[1]}
              onChange={(e) => handlePriceChange(1, parseInt(e.target.value))}
              className="absolute w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider-thumb"
            />
          </div>
          
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>KSh 0</span>
            <span>KSh 5,000</span>
          </div>
        </div>
      </div>

      {/* In Stock Filter */}
      <div>
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={(e) => updateFilter('inStock', e.target.checked)}
            className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            In Stock Only
          </span>
        </label>
      </div>

      {/* Active Filters */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Active Filters</h4>
        <div className="flex flex-wrap gap-2">
          {filters.category && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
              {categories.find(c => c.value === filters.category)?.label}
              <button
                onClick={() => updateFilter('category', '')}
                className="ml-1 text-primary-600 hover:text-primary-800"
              >
                ×
              </button>
            </span>
          )}
          
          {filters.gender && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary-100 text-secondary-800 dark:bg-secondary-900 dark:text-secondary-200">
              {genders.find(g => g.value === filters.gender)?.label}
              <button
                onClick={() => updateFilter('gender', '')}
                className="ml-1 text-secondary-600 hover:text-secondary-800"
              >
                ×
              </button>
            </span>
          )}
          
          {filters.size && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-accent-100 text-accent-800 dark:bg-accent-900 dark:text-accent-200">
              {filters.size}
              <button
                onClick={() => updateFilter('size', '')}
                className="ml-1 text-accent-600 hover:text-accent-800"
              >
                ×
              </button>
            </span>
          )}
          
          {filters.inStock && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              In Stock
              <button
                onClick={() => updateFilter('inStock', false)}
                className="ml-1 text-green-600 hover:text-green-800"
              >
                ×
              </button>
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
