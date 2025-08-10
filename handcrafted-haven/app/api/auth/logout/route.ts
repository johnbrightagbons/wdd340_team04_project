import { NextResponse } from 'next/server'
import { removeTokenCookie } from '@/app/lib/auth'

export const runtime = 'nodejs'

export async function POST() {
  try {
    // Remove authentication cookie
    await removeTokenCookie()

    return NextResponse.json({
      success: true,
      message: 'Logged out successfully'
    })

  } catch (error) {
    console.error('Logout error:', error)
    
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
} 