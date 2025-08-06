import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from './app/lib/auth'

export function middleware(request: NextRequest) {
  // Get token from cookies
  const token = request.cookies.get('auth-token')?.value

  // Protected routes that require authentication
  const protectedRoutes = [
    '/api/cart',
    '/api/auth/me',
    '/profile',
    '/dashboard'
  ]

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  )

  if (isProtectedRoute) {
    if (!token) {
      return NextResponse.json(
        { success: false, message: 'Authentication required' },
        { status: 401 }
      )
    }

    // Verify token
    const payload = verifyToken(token)
    if (!payload) {
      return NextResponse.json(
        { success: false, message: 'Invalid token' },
        { status: 401 }
      )
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/api/cart/:path*',
    '/api/auth/me',
    '/profile/:path*',
    '/dashboard/:path*'
  ]
} 