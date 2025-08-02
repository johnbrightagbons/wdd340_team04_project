'use client'

import { useState } from 'react'
import { Star, ThumbsUp, MessageCircle, Calendar } from 'lucide-react'
import { Review } from '../types'

interface ReviewListProps {
  reviews: Review[]
  productId: string
}

export default function ReviewList({ reviews, productId }: ReviewListProps) {
  const [helpfulReviews, setHelpfulReviews] = useState<Set<string>>(new Set())

  const handleHelpful = (reviewId: string) => {
    setHelpfulReviews(prev => {
      const newSet = new Set(prev)
      if (newSet.has(reviewId)) {
        newSet.delete(reviewId)
      } else {
        newSet.add(reviewId)
      }
      return newSet
    })
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date)
  }

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h3 className="text-xl font-semibold text-primary">Customer Reviews</h3>
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={`avg-star-${i}`} 
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
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className="text-center py-8">
          <MessageCircle className="w-12 h-12 text-secondary mx-auto mb-4" />
          <p className="text-secondary">No reviews yet. Be the first to review this product!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-tertiary rounded-lg p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">
                      {review.userName.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-primary">{review.userName}</p>
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={`review-star-${review.id}-${i}`} 
                            className={`w-3 h-3 ${
                              i < review.rating 
                                ? 'text-yellow-400 fill-current' 
                                : 'text-gray-300'
                            }`} 
                          />
                        ))}
                      </div>
                      <span className="text-xs text-secondary">
                        {formatDate(review.createdAt)}
                      </span>
                      {review.verified && (
                        <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              <p className="text-secondary leading-relaxed">{review.comment}</p>
              
              <div className="flex items-center justify-between">
                <button
                  onClick={() => handleHelpful(review.id)}
                  className={`flex items-center space-x-1 text-xs ${
                    helpfulReviews.has(review.id)
                      ? 'text-accent'
                      : 'text-secondary hover:text-primary'
                  }`}
                >
                  <ThumbsUp className={`w-3 h-3 ${
                    helpfulReviews.has(review.id) ? 'fill-current' : ''
                  }`} />
                  <span>
                    Helpful ({review.helpful + (helpfulReviews.has(review.id) ? 1 : 0)})
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 