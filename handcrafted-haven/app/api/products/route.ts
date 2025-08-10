import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/app/lib/prisma'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Pagination
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '12')
    const skip = (page - 1) * limit

    // Filters
    const category = searchParams.get('category')
    const artisan = searchParams.get('artisan')
    const featured = searchParams.get('featured')
    const premium = searchParams.get('premium')
    const inStock = searchParams.get('inStock')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const search = searchParams.get('search')
    const sortBy = searchParams.get('sortBy') || 'createdAt'
    const sortOrder = searchParams.get('sortOrder') || 'desc'

    // Build where clause
    const where: any = {}

    if (category) {
      where.category = { name: category }
    }
    
    if (artisan) {
      where.artisan = { name: { contains: artisan, mode: 'insensitive' } }
    }
    
    if (featured) {
      where.featured = featured === 'true'
    }
    
    if (premium) {
      where.premium = premium === 'true'
    }
    
    if (inStock) {
      where.inStock = inStock === 'true'
    }
    
    if (minPrice || maxPrice) {
      where.price = {}
      if (minPrice) where.price.gte = parseFloat(minPrice)
      if (maxPrice) where.price.lte = parseFloat(maxPrice)
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }

    // Build orderBy
    const orderBy: any = {}
    orderBy[sortBy] = sortOrder

    // Execute query
    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy,
        skip,
        take: limit,
        include: {
          category: true,
          artisan: true,
          tags: true
        }
      }),
      prisma.product.count({ where })
    ])

    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      success: true,
      data: products,
      pagination: {
        page,
        limit,
        total,
        totalPages
      }
    })

  } catch (error) {
    console.error('Get products error:', error)
    
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
} 