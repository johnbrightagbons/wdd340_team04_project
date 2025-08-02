'use client'

import { useState } from 'react'
import { Star, Send, ThumbsUp } from 'lucide-react'
import { Review } from '../types'

interface ReviewFormProps {
  productId: string
  onSubmit: (review: Omit<Review, 'id' | 'createdAt' | 'helpful' | 'verified'>) => void
  onCancel: () => void
}

export default function ReviewForm({ productId, onSubmit, onCancel }: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [userName, setUserName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (rating === 0) {
      alert('Please select a rating')
      return
    }
    
    if (!comment.trim()) {
      alert('Please write a review comment')
      return
    }
    
    if (!userName.trim()) {
      alert('Please enter your name')
      return
    }

    setIsSubmitting(true)
    
    // Simulate API call
    setTimeout(() => {
      onSubmit({
        productId,
        userId: 'user-' + Date.now(), // In real app, this would come from auth
        userName: userName.trim(),
        rating,
        comment: comment.trim()
      })
      
      setIsSubmitting(false)
      setRating(0)
      setComment('')
      setUserName('')
    }, 1000)
  }

  return (
    <div className="bg-tertiary rounded-lg p-6 space-y-4">
      <h3 className="text-xl font-semibold text-primary">Write a Review</h3>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-primary mb-2">
            Your Name *
          </label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-3 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            placeholder="Enter your name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-primary mb-2">
            Rating *
          </label>
          <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="focus:outline-none"
              >
                <Star
                  className={`w-6 h-6 ${
                    star <= rating
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300 hover:text-yellow-400'
                  }`}
                />
              </button>
            ))}
            <span className="ml-2 text-sm text-secondary">
              {rating > 0 && `${rating} star${rating > 1 ? 's' : ''}`}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-primary mb-2">
            Your Review *
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent resize-none"
            placeholder="Share your experience with this product..."
            required
          />
        </div>

        <div className="flex space-x-3">
          <button
            type="submit"
            disabled={isSubmitting || rating === 0 || !comment.trim() || !userName.trim()}
            className="flex items-center space-x-2 px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
            <span>{isSubmitting ? 'Submitting...' : 'Submit Review'}</span>
          </button>
          
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-secondary text-secondary rounded-lg hover:bg-tertiary"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
} 