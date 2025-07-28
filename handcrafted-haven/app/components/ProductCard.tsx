import Link from 'next/link'
import { Star, Heart, ShoppingCart, Award, Crown } from 'lucide-react'
import { Product } from '../types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  // Determine if product should have special styling
  const isFeatured = product.featured || false
  const isPremium = product.premium || false
  const isOnSale = product.originalPrice && product.originalPrice > product.price
  
  // Dynamic card styling
  const cardClass = isPremium 
    ? "card card-premium premium-glow" 
    : isFeatured 
      ? "card card-featured" 
      : "card"
  
  return (
    <Link href={`/products/${product.id}`} className="group">
      <div className={`${cardClass} group-hover:scale-105 transform transition-all duration-300`}>
        {/* Badges and Heart */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex flex-col space-y-2">
            {isPremium && (
              <span className="featured-badge bg-gradient-gold">
                <Crown className="w-3 h-3 mr-1" />
                Premium
              </span>
            )}
            {isFeatured && !isPremium && (
              <span className="featured-badge bg-gradient-primary">
                <Award className="w-3 h-3 mr-1" />
                Featured
              </span>
            )}
            {isOnSale && (
              <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full font-semibold">
                Sale
              </span>
            )}
          </div>
          <button className="p-2 hover:bg-hover-bg rounded-full transition-colors group-hover:text-red-400">
            <Heart className="w-4 h-4" />
          </button>
        </div>

        {/* Product Image Placeholder */}
        <div className="relative h-48 bg-tertiary rounded-lg mb-4 overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center text-muted group-hover:text-accent transition-colors">
            <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button className="btn-primary px-4 py-2 text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              Quick View
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-3">
          {/* Product Name */}
          <h3 className="font-semibold text-primary group-hover:text-accent transition-colors line-clamp-2">
            {product.name}
          </h3>
          
          {/* Category and Artisan */}
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted">{product.category}</span>
            <span className="text-secondary font-medium">by {product.artisan}</span>
          </div>
          
          {/* Rating (if available) */}
          {product.rating && (
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating!) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-400'
                    }`} 
                  />
                ))}
              </div>
              {product.reviews && (
                <span className="text-xs text-muted">({product.reviews})</span>
              )}
            </div>
          )}

          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gold">${product.price}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm text-muted line-through">${product.originalPrice}</span>
              )}
            </div>
            {isOnSale && product.originalPrice && (
              <span className="text-xs text-green-400 font-semibold">
                Save ${(product.originalPrice - product.price).toFixed(0)}
              </span>
            )}
          </div>

          {/* Add to Cart Button */}
          <button className="w-full btn-primary flex items-center justify-center space-x-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ShoppingCart className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </Link>
  )
}