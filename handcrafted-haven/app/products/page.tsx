'use client'

import { useState, useMemo } from 'react'
import { Search, Grid3X3, List, SlidersHorizontal } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { featuredProducts, categories } from '../data/sampleData'

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [priceRange, setPriceRange] = useState([0, 500])
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  const allProducts = featuredProducts

  const filteredProducts = useMemo(() => {
    const filtered = allProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.artisan.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.category.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory
      
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
      
      return matchesSearch && matchesCategory && matchesPrice
    })

    switch (sortBy) {
      case 'price-low':
        return filtered.sort((a, b) => a.price - b.price)
      case 'price-high':
        return filtered.sort((a, b) => b.price - a.price)
      case 'rating':
        return filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0))
      case 'newest':
        return filtered.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
      default:
        return filtered.sort((a, b) => a.name.localeCompare(b.name))
    }
  }, [allProducts, searchTerm, selectedCategory, sortBy, priceRange])

  return (
    <div className="min-h-screen bg-primary">
      <div className="bg-secondary border-b border-tertiary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Product Catalog</h1>
          <p className="text-secondary">Discover unique handcrafted products made with love</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className={`lg:w-64 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="card">
              <h3 className="font-semibold text-primary mb-4">Filters</h3>
              
              <div className="mb-6">
                <label htmlFor="search-input" className="block text-sm font-medium text-secondary mb-2">
                  Search products
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted w-4 h-4" />
                  <input
                    id="search-input"
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-tertiary border border-tertiary rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-primary"
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="category-select" className="block text-sm font-medium text-secondary mb-2">
                  Category
                </label>
                <select
                  id="category-select"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 bg-tertiary border border-tertiary rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-primary"
                >
                  <option value="all">All categories</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.name}>
                      {category.icon} {category.name} ({category.count})
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-6">
                <label htmlFor="price-range" className="block text-sm font-medium text-secondary mb-2">
                  Price range
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    id="price-range"
                    type="number"
                    placeholder="Min"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                    className="w-full px-3 py-2 bg-tertiary border border-tertiary rounded-lg text-sm text-primary"
                  />
                  <span className="text-muted">-</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                    className="w-full px-3 py-2 bg-tertiary border border-tertiary rounded-lg text-sm text-primary"
                  />
                </div>
              </div>

              <button
                onClick={() => {
                  setSearchTerm('')
                  setSelectedCategory('all')
                  setPriceRange([0, 500])
                }}
                className="w-full px-4 py-2 text-sm text-secondary border border-tertiary rounded-lg hover:bg-tertiary transition-colors"
              >
                Clear filters
              </button>
            </div>
          </div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center px-4 py-2 text-sm font-medium text-secondary bg-tertiary border border-tertiary rounded-lg hover:bg-hover-bg"
                >
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                </button>
                
                <div className="text-sm text-muted">
                  {filteredProducts.length} products found
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 text-sm bg-tertiary border border-tertiary rounded-lg focus:ring-2 focus:ring-accent focus:border-transparent text-primary"
                >
                  <option value="name">Name A-Z</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Best Rating</option>
                  <option value="newest">Newest</option>
                </select>

                <div className="flex border border-tertiary rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 ${viewMode === 'grid' ? 'bg-accent text-white' : 'text-muted hover:text-secondary'}`}
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 ${viewMode === 'list' ? 'bg-accent text-white' : 'text-muted hover:text-secondary'}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {filteredProducts.length > 0 ? (
              <div className={`${
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-4'
              }`}>
                {filteredProducts.map(product => (
                  <div key={product.id} className={viewMode === 'list' ? 'w-full' : ''}>
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-muted mb-4">
                  <Search className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-primary mb-2">
                  No products found
                </h3>
                <p className="text-secondary">
                  Try adjusting your search filters
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
