import { Product, Category, Review } from '../types'

export const categories: Category[] = [
  {
    id: '1',
    name: 'Pottery',
    slug: 'pottery',
    icon: '🏺',
    count: 150,
    description: 'Handcrafted ceramics and pottery',
    featured: true
  },
  {
    id: '2',
    name: 'Jewelry',
    slug: 'jewelry',
    icon: '💎',
    count: 89,
    description: 'Unique handmade jewelry',
    featured: true
  },
  {
    id: '3',
    name: 'Textiles',
    slug: 'textiles',
    icon: '🧵',
    count: 234,
    description: 'Woven fabrics and textiles'
  },
  {
    id: '4',
    name: 'Woodwork',
    slug: 'woodwork',
    icon: '🪵',
    count: 67,
    description: 'Carved wood creations'
  },
  {
    id: '5',
    name: 'Glass Art',
    slug: 'glass-art',
    icon: '🪟',
    count: 45,
    description: 'Blown glass art pieces'
  },
  {
    id: '6',
    name: 'Metalwork',
    slug: 'metalwork',
    icon: '⚒️',
    count: 78,
    description: 'Forged metal artwork'
  }
]

export const featuredProducts: Product[] = [
  {
    id: '1',
    name: 'Handwoven Ceramic Bowl',
    category: 'Pottery',
    price: 89,
    originalPrice: 120,
    artisan: 'Maria Rodriguez',
    description: 'A beautiful handwoven ceramic bowl perfect for serving or decoration.',
    featured: true,
    rating: 4.8,
    reviews: 24,
    inStock: true,
    tags: ['ceramic', 'bowl', 'handwoven', 'kitchen']
  },
  {
    id: '2',
    name: 'Silver Wire Earrings',
    category: 'Jewelry',
    price: 45,
    artisan: 'John Smith',
    description: 'Elegant silver wire earrings crafted with attention to detail.',
    premium: true,
    rating: 4.9,
    reviews: 18,
    inStock: true,
    tags: ['silver', 'earrings', 'elegant', 'jewelry']
  },
  {
    id: '3',
    name: 'Wooden Cutting Board',
    category: 'Woodwork',
    price: 65,
    artisan: 'David Chen',
    description: 'Premium wooden cutting board made from sustainable bamboo.',
    rating: 4.7,
    reviews: 31,
    inStock: true,
    tags: ['wood', 'kitchen', 'cutting board', 'sustainable']
  },
  {
    id: '4',
    name: 'Hand-blown Glass Vase',
    category: 'Glass Art',
    price: 120,
    originalPrice: 150,
    artisan: 'Isabella Martinez',
    description: 'Stunning hand-blown glass vase with unique color patterns.',
    featured: true,
    rating: 4.9,
    reviews: 12,
    inStock: true,
    tags: ['glass', 'vase', 'hand-blown', 'decorative']
  },
  {
    id: '5',
    name: 'Leather Journal',
    category: 'Textiles',
    price: 35,
    artisan: 'Ahmed Hassan',
    description: 'Premium leather journal with handmade paper pages.',
    rating: 4.6,
    reviews: 45,
    inStock: true,
    tags: ['leather', 'journal', 'writing', 'notebook']
  },
  {
    id: '6',
    name: 'Forged Steel Sculpture',
    category: 'Metalwork',
    price: 280,
    artisan: 'Robert Johnson',
    description: 'Abstract steel sculpture perfect for modern home decor.',
    premium: true,
    rating: 4.8,
    reviews: 8,
    inStock: true,
    tags: ['steel', 'sculpture', 'art', 'modern']
  }
]

// Additional sample data for future use
export const sampleArtisans = [
  {
    id: '1',
    name: 'Maria Rodriguez',
    bio: 'Master potter with 20 years of experience in traditional ceramic techniques.',
    location: 'Santa Fe, New Mexico',
    specialties: ['Pottery', 'Ceramics'],
    verified: true,
    rating: 4.9,
    totalSales: 156
  },
  {
    id: '2',
    name: 'John Smith',
    bio: 'Jewelry designer specializing in contemporary silver work.',
    location: 'Portland, Oregon',
    specialties: ['Jewelry', 'Metalwork'],
    verified: true,
    rating: 4.8,
    totalSales: 89
  },
  {
    id: '3',
    name: 'David Chen',
    bio: 'Sustainable woodworker creating functional art from reclaimed materials.',
    location: 'Seattle, Washington',
    specialties: ['Woodwork', 'Furniture'],
    verified: true,
    rating: 4.7,
    totalSales: 234
  }
]

// Sample reviews data
export const sampleReviews: Review[] = [
  {
    id: '1',
    productId: '1',
    userId: 'user-1',
    userName: 'Sarah Johnson',
    rating: 5,
    comment: 'Absolutely beautiful! The craftsmanship is outstanding and the bowl is perfect for serving. Highly recommend!',
    createdAt: new Date('2024-01-15'),
    helpful: 12,
    verified: true
  },
  {
    id: '2',
    productId: '1',
    userId: 'user-2',
    userName: 'Michael Chen',
    rating: 4,
    comment: 'Great quality and beautiful design. The size is perfect for my kitchen. Would buy again!',
    createdAt: new Date('2024-01-10'),
    helpful: 8,
    verified: true
  },
  {
    id: '3',
    productId: '2',
    userId: 'user-3',
    userName: 'Emily Davis',
    rating: 5,
    comment: 'These earrings are stunning! They\'re lightweight and comfortable to wear. Perfect gift!',
    createdAt: new Date('2024-01-20'),
    helpful: 15,
    verified: true
  },
  {
    id: '4',
    productId: '3',
    userId: 'user-4',
    userName: 'Robert Wilson',
    rating: 4,
    comment: 'Excellent cutting board. The wood quality is top-notch and it\'s very durable. Great purchase!',
    createdAt: new Date('2024-01-05'),
    helpful: 6,
    verified: true
  },
  {
    id: '5',
    productId: '4',
    userId: 'user-5',
    userName: 'Lisa Thompson',
    rating: 5,
    comment: 'This vase is absolutely gorgeous! The colors are vibrant and it\'s become the centerpiece of my living room.',
    createdAt: new Date('2024-01-12'),
    helpful: 9,
    verified: true
  }
]