import { NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')
    const specialty = searchParams.get('specialty')
    const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : undefined

    // Build where clause
    const where: any = {
      isArtisan: true,
      artisanProfile: {
        isNot: null
      }
    }

    if (featured === 'true') {
      where.artisanProfile = {
        ...where.artisanProfile,
        verified: true
      }
    }

    if (specialty) {
      where.artisanProfile = {
        ...where.artisanProfile,
        specialties: {
          some: {
            specialty: {
              contains: specialty,
              mode: 'insensitive'
            }
          }
        }
      }
    }

    const artisans = await prisma.user.findMany({
      where,
      include: {
        artisanProfile: {
          include: {
            specialties: true
          }
        },
        _count: {
          select: {
            products: true
          }
        }
      },
      take: limit,
      orderBy: {
        artisanProfile: {
          rating: 'desc'
        }
      }
    })

    // Transform the data to match the frontend expectations
    const transformedArtisans = artisans.map(artisan => ({
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
      totalSales: artisan.artisanProfile?.totalSales || 0
    }))

    return NextResponse.json({
      success: true,
      data: transformedArtisans
    })

  } catch (error) {
    console.error('Error fetching artisans:', error)
    return NextResponse.json(
      { success: false, message: 'Failed to fetch artisans' },
      { status: 500 }
    )
  }
} 