import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/app/lib/database'
import Category from '@/app/models/Category'

export async function GET(request: NextRequest) {
  try {
    await connectDB()

    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured')

    // Build query
    const query: any = {}
    if (featured) {
      query.featured = featured === 'true'
    }

    const categories = await Category.find(query)
      .sort({ name: 1 })
      .lean()

    return NextResponse.json({
      success: true,
      data: categories
    })

  } catch (error) {
    console.error('Get categories error:', error)
    
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
} 