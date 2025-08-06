import { NextRequest, NextResponse } from 'next/server'
import connectDB from '@/app/lib/database'
import User from '@/app/models/User'
import { getCurrentUser } from '@/app/lib/auth'

export async function GET(request: NextRequest) {
  try {
    const currentUser = getCurrentUser()
    
    if (!currentUser) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      )
    }

    await connectDB()

    // Get user data from database
    const user = await User.findById(currentUser.userId).select('-password')
    
    if (!user) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      success: true,
      data: user
    })

  } catch (error) {
    console.error('Get user error:', error)
    
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
} 