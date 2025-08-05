'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import { Star, Heart, ShoppingCart, Share2, Award, Crown, MessageCircle, Plus } from 'lucide-react'
import ReviewForm from '../../components/ReviewForm'
import ReviewList from '../../components/ReviewList'
import { featuredProducts, sampleReviews } from '../../data/sampleData'
import { Review } from '../../types'

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string
  
  // En una aplicación real, esto vendría de una API
  const product = featuredProducts.find(p => p.id === productId)
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [reviews, setReviews] = useState<Review[]>(
    sampleReviews.filter(review => review.productId === productId)
  )

  if (!product) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-2">Product not found</h1>
          <p className="text-secondary">The product you&apos;re looking for doesn&apos;t exist or has been removed.</p>
        </div>
      </div>
    )
  }

  // Imagen placeholder - en una app real vendría del producto
  const productImages = [
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop',
    'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop'
  ]

  const isPremium = product.premium || false
  const isFeatured = product.featured || false
  const isOnSale = product.originalPrice && product.originalPrice > product.price

  const handleReviewSubmit = (reviewData: Omit<Review, 'id' | 'createdAt' | 'helpful' | 'verified'>) => {
    const newReview: Review = {
      ...reviewData,
      id: `review-${Date.now()}`,
      createdAt: new Date(),
      helpful: 0,
      verified: false
    }
    
    setReviews(prev => [newReview, ...prev])
    setShowReviewForm(false)
  }

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : product.rating || 0

  return (
    <div className="min-h-screen bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <div className="aspect-square bg-tertiary rounded-lg overflow-hidden">
              <Image 
                src={productImages[selectedImageIndex]} 
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex space-x-2">
              {productImages.map((image, index) => (
                <button
                  key={`thumbnail-${index}`}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImageIndex === index 
                      ? 'border-accent' 
                      : 'border-tertiary hover:border-secondary'
                  }`}
                >
                  <Image 
                    src={image} 
                    alt={`${product.name} vista ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
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

            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">{product.name}</h1>
              <p className="text-secondary">By <span className="text-accent">{product.artisan}</span></p>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={`star-${i}`} 
                    className={`w-4 h-4 ${
                      i < Math.floor(averageRating) 
                        ? 'text-yellow-400 fill-current' 
                        : 'text-gray-300'
                    }`} 
                  />
                ))}
              </div>
              <span className="text-sm text-secondary">
                {averageRating.toFixed(1)} ({reviews.length} reviews)
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-3xl font-bold text-primary">${product.price}</span>
              {product.originalPrice && (
                <span className="text-xl text-muted line-through">${product.originalPrice}</span>
              )}
              {isOnSale && (
                <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded-full">
                  {Math.round((1 - product.price / product.originalPrice!) * 100)}% OFF
                </span>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold text-primary mb-2">Description</h3>
              <p className="text-secondary leading-relaxed">
                {product.description || 'This is a beautiful handcrafted piece made with high-quality materials. Each product is unique and reflects the dedication and talent of the artisan.'}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-primary mb-2">Details</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="text-secondary">Category:</span>
                  <span className="text-primary">{product.category}</span>
                </div>
                {product.tags && (
                  <div className="flex items-start space-x-2">
                    <span className="text-secondary">Tags:</span>
                    <div className="flex flex-wrap gap-1">
                      {product.tags.map(tag => (
                        <span key={tag} className="text-xs bg-tertiary text-secondary px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <span className="text-secondary">Stock:</span>
                  <span className={`${product.inStock ? 'text-green-400' : 'text-red-400'}`}>
                    {product.inStock ? 'Available' : 'Out of Stock'}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <span className="text-secondary">Quantity:</span>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 bg-tertiary border border-tertiary rounded-lg text-primary hover:bg-hover-bg"
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-primary">{quantity}</span>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 bg-tertiary border border-tertiary rounded-lg text-primary hover:bg-hover-bg"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex space-x-4">
                <button 
                  disabled={!product.inStock}
                  className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
                
                <button 
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-3 rounded-lg border transition-colors ${
                    isFavorite 
                      ? 'bg-red-500 border-red-500 text-white' 
                      : 'bg-tertiary border-tertiary text-secondary hover:text-red-400'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                </button>
                
                <button className="p-3 bg-tertiary border border-tertiary rounded-lg text-secondary hover:text-primary">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-primary">Customer Reviews</h2>
            <button
              onClick={() => setShowReviewForm(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90"
            >
              <Plus className="w-4 h-4" />
              <span>Write a Review</span>
            </button>
          </div>

          {showReviewForm && (
            <div className="mb-8">
              <ReviewForm
                productId={productId}
                onSubmit={handleReviewSubmit}
                onCancel={() => setShowReviewForm(false)}
              />
            </div>
          )}

          <ReviewList reviews={reviews} productId={productId} />
        </div>
      </div>
    </div>
  )
}
