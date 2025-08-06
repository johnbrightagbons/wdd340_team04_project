import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const artisanId = params.id

    const artisan = await prisma.user.findUnique({
      where: {
        id: artisanId,
        isArtisan: true
      },
      include: {
        artisanProfile: {
          include: {
            specialties: true
          }
        },
        products: {
          include: {
            category: true,
            tags: true
          }
        },
        _count: {
          select: {
            products: true
          }
        }
      }
    })

    if (!artisan) {
      return NextResponse.json(
        { success: false, message: 'Artisan not found' },
        { status: 404 }
      )
    }

    // Transform the data to match the frontend expectations
    const transformedArtisan = {
      id: artisan.id,
      name: artisan.name,
      location: artisan.artisanProfile?.location || 'Unknown',
      specialties: artisan.artisanProfile?.specialties.map(s => s.specialty) || [],
      bio: artisan.artisanProfile?.bio || '',
      image: artisan.artisanProfile?.image || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      rating: Number(artisan.artisanProfile?.rating || 0),
      totalProducts: artisan._count.products,
      yearsExperience: Math.floor(Math.random() * 20) + 5, // Placeholder for now
      featured: artisan.artisanProfile?.verified || false,
      verified: artisan.artisanProfile?.verified || false,
      totalSales: artisan.artisanProfile?.totalSales || 0,
      products: artisan.products.map(product => ({
        id: product.id,
        name: product.name,
        price: Number(product.price),
        originalPrice: product.originalPrice ? Number(product.originalPrice) : undefined,
        description: product.description,
        imageUrl: product.imageUrl,
        featured: product.featured,
        premium: product.premium,
        rating: Number(product.rating),
        reviews: product.reviews,
        inStock: product.inStock,
        category: product.category,
        tags: product.tags.map(tag => tag.tag),
        createdAt: product.createdAt,
        updatedAt: product.updatedAt
      }))
    }

    return NextResponse.json({
      success: true,
      data: transformedArtisan
    })

  } catch (error) {
    console.error('Error fetching artisan:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch artisan' },
      { status: 500 }
    )
  }
} 