import { prisma } from './prisma'

export async function seedDatabase() {
  try {
    console.log('Starting database seeding...')

    // Clear existing data
    await prisma.cartItem.deleteMany()
    await prisma.cart.deleteMany()
    await prisma.productTag.deleteMany()
    await prisma.product.deleteMany()
    await prisma.artisanSpecialty.deleteMany()
    await prisma.artisanProfile.deleteMany()
    await prisma.category.deleteMany()
    await prisma.user.deleteMany()

    console.log('Cleared existing data')

    // Create categories
    const categories = await Promise.all([
      prisma.category.create({
        data: {
          name: 'Jewelry',
          slug: 'jewelry',
          icon: '💍',
          description: 'Handcrafted jewelry and accessories',
          featured: true,
          productCount: 0
        }
      }),
      prisma.category.create({
        data: {
          name: 'Pottery',
          slug: 'pottery',
          icon: '🏺',
          description: 'Ceramic and pottery items',
          featured: true,
          productCount: 0
        }
      }),
      prisma.category.create({
        data: {
          name: 'Woodwork',
          slug: 'woodwork',
          icon: '🪵',
          description: 'Handcrafted wooden items',
          featured: false,
          productCount: 0
        }
      }),
      prisma.category.create({
        data: {
          name: 'Textiles',
          slug: 'textiles',
          icon: '🧵',
          description: 'Handwoven textiles and fabrics',
          featured: false,
          productCount: 0
        }
      }),
      prisma.category.create({
        data: {
          name: 'Glasswork',
          slug: 'glasswork',
          icon: '🪟',
          description: 'Hand-blown glass items',
          featured: false,
          productCount: 0
        }
      }),
      prisma.category.create({
        data: {
          name: 'Metalwork',
          slug: 'metalwork',
          icon: '⚒️',
          description: 'Metal crafted items',
          featured: false,
          productCount: 0
        }
      })
    ])

    console.log('Created categories')

    // Create artisans with profiles
    const artisans = await Promise.all([
      prisma.user.create({
        data: {
          name: 'Elena Rodriguez',
          email: 'elena@artisanhub.com',
          password: '$2a$10$example.hash.for.testing',
          isArtisan: true,
          artisanProfile: {
            create: {
              bio: 'Elena carries on a 300-year family tradition of Talavera pottery, creating vibrant hand-painted ceramics using techniques passed down through generations. Her work celebrates the rich cultural heritage of Spanish pottery.',
              location: 'Talavera, Spain',
              rating: 4.9,
              totalSales: 45,
              verified: true,
              specialties: {
                create: [
                  { specialty: 'Pottery' },
                  { specialty: 'Ceramics' },
                  { specialty: 'Traditional Glazing' }
                ]
              }
            }
          }
        }
      }),
      prisma.user.create({
        data: {
          name: 'Marcus Thompson',
          email: 'marcus@artisanhub.com',
          password: '$2a$10$example.hash.for.testing',
          isArtisan: true,
          artisanProfile: {
            create: {
              bio: 'Marcus is a master woodworker who transforms locally sourced hardwoods into functional art pieces. His sustainable approach and attention to natural wood grain patterns make each piece truly unique.',
              location: 'Asheville, North Carolina',
              rating: 4.8,
              totalSales: 32,
              verified: true,
              specialties: {
                create: [
                  { specialty: 'Woodwork' },
                  { specialty: 'Furniture' },
                  { specialty: 'Wood Carving' }
                ]
              }
            }
          }
        }
      }),
      prisma.user.create({
        data: {
          name: 'Maria Rodriguez',
          email: 'maria@artisanhub.com',
          password: '$2a$10$example.hash.for.testing',
          isArtisan: true,
          artisanProfile: {
            create: {
              bio: 'Maria is a skilled glass artist specializing in hand-blown glass vases and decorative pieces. Her work combines traditional techniques with modern design sensibilities.',
              location: 'Mexico City, Mexico',
              rating: 4.7,
              totalSales: 28,
              verified: true,
              specialties: {
                create: [
                  { specialty: 'Glasswork' },
                  { specialty: 'Glass Blowing' },
                  { specialty: 'Decorative Glass' }
                ]
              }
            }
          }
        }
      })
    ])

    console.log('Created artisans')

    // Create products
    const products = await Promise.all([
      prisma.product.create({
        data: {
          name: 'Hand-blown Glass Vase',
          price: 120.00,
          originalPrice: 150.00,
          description: 'Beautiful hand-blown glass vase with intricate patterns. Each piece is unique and crafted with care.',
          imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop',
          featured: true,
          premium: false,
          rating: 4.5,
          reviews: 12,
          inStock: true,
          categoryId: categories[4].id, // Glasswork
          artisanId: artisans[2].id, // Maria Rodriguez
          tags: {
            create: [
              { tag: 'Hand-blown' },
              { tag: 'Glass' },
              { tag: 'Vase' },
              { tag: 'Decorative' }
            ]
          }
        }
      }),
      prisma.product.create({
        data: {
          name: 'Handwoven Ceramic Bowl',
          price: 89.00,
          description: 'Traditional handwoven ceramic bowl with beautiful glaze patterns. Perfect for serving or display.',
          imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop',
          featured: true,
          premium: false,
          rating: 4.3,
          reviews: 24,
          inStock: true,
          categoryId: categories[1].id, // Pottery
          artisanId: artisans[0].id, // Elena Rodriguez
          tags: {
            create: [
              { tag: 'Handwoven' },
              { tag: 'Ceramic' },
              { tag: 'Bowl' },
              { tag: 'Traditional' }
            ]
          }
        }
      }),
      prisma.product.create({
        data: {
          name: 'Silver Jewelry Set',
          price: 150.00,
          description: 'Elegant silver jewelry set with traditional designs. Handcrafted with attention to detail.',
          imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop',
          featured: false,
          premium: true,
          rating: 4.8,
          reviews: 8,
          inStock: true,
          categoryId: categories[0].id, // Jewelry
          artisanId: artisans[0].id, // Elena Rodriguez
          tags: {
            create: [
              { tag: 'Silver' },
              { tag: 'Jewelry' },
              { tag: 'Handcrafted' },
              { tag: 'Traditional' }
            ]
          }
        }
      }),
      prisma.product.create({
        data: {
          name: 'Wooden Coffee Table',
          price: 299.00,
          description: 'Handcrafted wooden coffee table made from sustainable hardwoods. Beautiful grain patterns.',
          imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop',
          featured: false,
          premium: true,
          rating: 4.6,
          reviews: 15,
          inStock: true,
          categoryId: categories[2].id, // Woodwork
          artisanId: artisans[1].id, // Marcus Thompson
          tags: {
            create: [
              { tag: 'Wooden' },
              { tag: 'Furniture' },
              { tag: 'Sustainable' },
              { tag: 'Handcrafted' }
            ]
          }
        }
      }),
      prisma.product.create({
        data: {
          name: 'Handwoven Textile Scarf',
          price: 45.00,
          description: 'Beautiful handwoven textile scarf with natural dyes. Soft and lightweight.',
          imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop',
          featured: false,
          premium: false,
          rating: 4.4,
          reviews: 31,
          inStock: true,
          categoryId: categories[3].id, // Textiles
          artisanId: artisans[0].id, // Elena Rodriguez
          tags: {
            create: [
              { tag: 'Handwoven' },
              { tag: 'Textile' },
              { tag: 'Scarf' },
              { tag: 'Natural Dyes' }
            ]
          }
        }
      }),
      prisma.product.create({
        data: {
          name: 'Bronze Sculpture',
          price: 450.00,
          description: 'Handcrafted bronze sculpture with intricate details. Limited edition piece.',
          imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop',
          featured: true,
          premium: true,
          rating: 4.9,
          reviews: 6,
          inStock: true,
          categoryId: categories[5].id, // Metalwork
          artisanId: artisans[1].id, // Marcus Thompson
          tags: {
            create: [
              { tag: 'Bronze' },
              { tag: 'Sculpture' },
              { tag: 'Handcrafted' },
              { tag: 'Limited Edition' }
            ]
          }
        }
      })
    ])

    console.log('Created products')

    // Update category product counts
    await Promise.all([
      prisma.category.update({
        where: { id: categories[0].id },
        data: { productCount: 1 }
      }),
      prisma.category.update({
        where: { id: categories[1].id },
        data: { productCount: 1 }
      }),
      prisma.category.update({
        where: { id: categories[2].id },
        data: { productCount: 1 }
      }),
      prisma.category.update({
        where: { id: categories[3].id },
        data: { productCount: 1 }
      }),
      prisma.category.update({
        where: { id: categories[4].id },
        data: { productCount: 1 }
      }),
      prisma.category.update({
        where: { id: categories[5].id },
        data: { productCount: 1 }
      })
    ])

    console.log('Updated category product counts')

    console.log('Database seeded successfully!')
    console.log(`Created ${categories.length} categories`)
    console.log(`Created ${artisans.length} artisans`)
    console.log(`Created ${products.length} products`)

  } catch (error) {
    console.error('Error seeding database:', error)
    throw error
  }
} 