import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  email: string
  password: string
  name: string
  profileImage?: string
  isArtisan: boolean
  artisanProfile?: {
    bio?: string
    location?: string
    specialties: string[]
    verified: boolean
    rating: number
    totalSales: number
  }
  preferences?: {
    favoriteCategories: string[]
    priceRange: {
      min: number
      max: number
    }
    notifications: {
      email: boolean
      push: boolean
    }
  }
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  profileImage: {
    type: String,
    default: null
  },
  isArtisan: {
    type: Boolean,
    default: false
  },
  artisanProfile: {
    bio: String,
    location: String,
    specialties: [String],
    verified: {
      type: Boolean,
      default: false
    },
    rating: {
      type: Number,
      default: 0
    },
    totalSales: {
      type: Number,
      default: 0
    }
  },
  preferences: {
    favoriteCategories: [String],
    priceRange: {
      min: {
        type: Number,
        default: 0
      },
      max: {
        type: Number,
        default: 1000
      }
    },
    notifications: {
      email: {
        type: Boolean,
        default: true
      },
      push: {
        type: Boolean,
        default: true
      }
    }
  }
}, {
  timestamps: true
})

// Index for email lookups
UserSchema.index({ email: 1 })

// Index for artisan searches
UserSchema.index({ isArtisan: 1, 'artisanProfile.verified': 1 })

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema) 