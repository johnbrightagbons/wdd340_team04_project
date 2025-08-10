import { NextRequest, NextResponse } from 'next/server'
import { seedDatabase } from '@/app/lib/seed'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    await seedDatabase()
    
    return NextResponse.json({
      success: true,
      message: 'Database seeded successfully'
    })

  } catch (error) {
    console.error('Seed error:', error)
    
    return NextResponse.json(
      { success: false, message: 'Failed to seed database' },
      { status: 500 }
    )
  }
} 