import connectDB from './database'
import Category from '../models/Category'
import Product from '../models/Product'
import User from '../models/User'
import { hashPassword } from './auth'

export async function seedDatabase() {
  try {
    await connectDB()

    // Clear existing data
    await Category.deleteMany({})
    await Product.deleteMany({})
    await User.deleteMany({})

    // Create categories
    const categories = [
      {
        name: 'Pottery',
        slug: 'pottery',
        icon: '🏺',
        description: 'Handcrafted ceramics and pottery',
        featured: true,
        productCount: 0
      },
      {
        name: 'Jewelry',
        slug: 'jewelry',
        icon: '💎',
        description: 'Unique handmade jewelry',
        featured: true,
        productCount: 0
      },
      {
        name: 'Textiles',
        slug: 'textiles',
        icon: '🧵',
        description: 'Woven fabrics and textiles',
        featured: false,
        productCount: 0
      },
      {
        name: 'Woodwork',
        slug: 'woodwork',
        icon: '🪵',
        description: 'Carved wood creations',
        featured: false,
        productCount: 0
      },
      {
        name: 'Glass Art',
        slug: 'glass-art',
        icon: '🪟',
        description: 'Blown glass art pieces',
        featured: false,
        productCount: 0
      },
      {
        name: 'Metalwork',
        slug: 'metalwork',
        icon: '⚒️',
        description: 'Forged metal artwork',
        featured: false,
        productCount: 0
      }
    ]

    const createdCategories = await Category.insertMany(categories)

    // Create sample artisans
    const hashedPassword = await hashPassword('password123')
    
    const artisans = [
      {
        name: 'Maria Rodriguez',
        email: 'maria@example.com',
        password: hashedPassword,
        isArtisan: true,
        artisanProfile: {
          bio: 'Master potter with 20 years of experience in traditional ceramic techniques.',
          location: 'Santa Fe, New Mexico',
          specialties: ['Pottery', 'Ceramics'],
          verified: true,
          rating: 4.9,
          totalSales: 156
        }
      },
      {
        name: 'John Smith',
        email: 'john@example.com',
        password: hashedPassword,
        isArtisan: true,
        artisanProfile: {
          bio: 'Jewelry designer specializing in contemporary silver work.',
          location: 'Portland, Oregon',
          specialties: ['Jewelry', 'Metalwork'],
          verified: true,
          rating: 4.8,
          totalSales: 89
        }
      },
      {
        name: 'David Chen',
        email: 'david@example.com',
        password: hashedPassword,
        isArtisan: true,
        artisanProfile: {
          bio: 'Sustainable woodworker creating functional art from reclaimed materials.',
          location: 'Seattle, Washington',
          specialties: ['Woodwork', 'Furniture'],
          verified: true,
          rating: 4.7,
          totalSales: 234
        }
      }
    ]

    const createdArtisans = await User.insertMany(artisans)

    // Create sample products
    const products = [
      {
        name: 'Handwoven Ceramic Bowl',
        category: 'Pottery',
        price: 89,
        originalPrice: 120,
        artisanId: createdArtisans[0]._id,
        artisanName: 'Maria Rodriguez',
        description: 'A beautiful handwoven ceramic bowl perfect for serving or decoration.',
        featured: true,
        premium: false,
        rating: 4.8,
        reviews: 24,
        inStock: true,
        tags: ['ceramic', 'bowl', 'handwoven', 'kitchen']
      },
      {
        name: 'Silver Wire Earrings',
        category: 'Jewelry',
        price: 45,
        artisanId: createdArtisans[1]._id,
        artisanName: 'John Smith',
        description: 'Elegant silver wire earrings crafted with attention to detail.',
        featured: false,
        premium: true,
        rating: 4.9,
        reviews: 18,
        inStock: true,
        tags: ['silver', 'earrings', 'elegant', 'jewelry']
      },
      {
        name: 'Wooden Cutting Board',
        category: 'Woodwork',
        price: 65,
        artisanId: createdArtisans[2]._id,
        artisanName: 'David Chen',
        description: 'Premium wooden cutting board made from sustainable bamboo.',
        featured: false,
        premium: false,
        rating: 4.7,
        reviews: 31,
        inStock: true,
        tags: ['wood', 'kitchen', 'cutting board', 'sustainable']
      },
      {
        name: 'Hand-blown Glass Vase',
        category: 'Glass Art',
        price: 120,
        originalPrice: 150,
        artisanId: createdArtisans[0]._id,
        artisanName: 'Maria Rodriguez',
        description: 'Stunning hand-blown glass vase with unique color patterns.',
        featured: true,
        premium: false,
        rating: 4.9,
        reviews: 12,
        inStock: true,
        tags: ['glass', 'vase', 'hand-blown', 'decorative']
      },
      {
        name: 'Leather Journal',
        category: 'Textiles',
        price: 35,
        artisanId: createdArtisans[1]._id,
        artisanName: 'John Smith',
        description: 'Premium leather journal with handmade paper pages.',
        featured: false,
        premium: false,
        rating: 4.6,
        reviews: 45,
        inStock: true,
        tags: ['leather', 'journal', 'writing', 'notebook']
      },
      {
        name: 'Forged Steel Sculpture',
        category: 'Metalwork',
        price: 280,
        artisanId: createdArtisans[2]._id,
        artisanName: 'David Chen',
        description: 'Abstract steel sculpture perfect for modern home decor.',
        featured: false,
        premium: true,
        rating: 4.8,
        reviews: 8,
        inStock: true,
        tags: ['steel', 'sculpture', 'art', 'modern']
      }
    ]

    await Product.insertMany(products)

    // Update category product counts
    for (const category of createdCategories) {
      const count = await Product.countDocuments({ category: category.name })
      await Category.findByIdAndUpdate(category._id, { productCount: count })
    }

    console.log('Database seeded successfully!')
    console.log(`Created ${createdCategories.length} categories`)
    console.log(`Created ${createdArtisans.length} artisans`)
    console.log(`Created ${products.length} products`)

  } catch (error) {
    console.error('Seeding error:', error)
    throw error
  }
} 