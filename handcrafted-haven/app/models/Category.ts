import mongoose, { Schema, Document } from 'mongoose'

export interface ICategory extends Document {
  name: string
  slug: string
  icon: string
  description: string
  featured: boolean
  imageUrl?: string
  productCount: number
  createdAt: Date
  updatedAt: Date
}

const CategorySchema = new Schema<ICategory>({
  name: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  icon: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  imageUrl: {
    type: String,
    default: null
  },
  productCount: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true
})

// Indexes
CategorySchema.index({ slug: 1 })
CategorySchema.index({ featured: 1 })

export default mongoose.models.Category || mongoose.model<ICategory>('Category', CategorySchema) 