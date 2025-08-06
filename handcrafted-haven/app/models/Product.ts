import mongoose, { Schema, Document } from 'mongoose'

export interface IProduct extends Document {
  name: string
  category: string
  price: number
  originalPrice?: number
  artisanId: mongoose.Types.ObjectId
  artisanName: string
  description: string
  imageUrl?: string
  featured: boolean
  premium: boolean
  rating: number
  reviews: number
  inStock: boolean
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

const ProductSchema = new Schema<IProduct>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  originalPrice: {
    type: Number,
    min: 0
  },
  artisanId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  artisanName: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  imageUrl: {
    type: String,
    default: null
  },
  featured: {
    type: Boolean,
    default: false
  },
  premium: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  reviews: {
    type: Number,
    default: 0,
    min: 0
  },
  inStock: {
    type: Boolean,
    default: true
  },
  tags: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
})

// Indexes for efficient queries
ProductSchema.index({ category: 1 })
ProductSchema.index({ artisanId: 1 })
ProductSchema.index({ featured: 1 })
ProductSchema.index({ premium: 1 })
ProductSchema.index({ inStock: 1 })
ProductSchema.index({ tags: 1 })
ProductSchema.index({ name: 'text', description: 'text' })

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema) 