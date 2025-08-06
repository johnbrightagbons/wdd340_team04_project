import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from './app/lib/auth'

export function middleware(request: NextRequest) {
  // Get the pathname of the request (e.g. /, /protected)
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath = path === '/' || 
                      path === '/login' || 
                      path === '/signup' || 
                      path === '/products' ||
                      path.startsWith('/products/') ||
                      path === '/cart' ||
                      path === '/artisans' ||
                      path.startsWith('/artisans/') ||
                      path === '/categories' ||
                      path.startsWith('/categories/') ||
                      path === '/about' ||
                      path.startsWith('/api/products') ||
                      path.startsWith('/api/categories') ||
                      path.startsWith('/api/artisans') ||
                      path.startsWith('/api/seed')

  // Define paths that require authentication (checkout, orders, profile, etc.)
  const requiresAuth = path === '/checkout' ||
                      path === '/orders' ||
                      path === '/profile' ||
                      path === '/my-orders' ||
                      path.startsWith('/api/cart') ||
                      path.startsWith('/api/orders') ||
                      path.startsWith('/api/profile')

  // Get token from cookies
  const token = request.cookies.get('auth-token')?.value

  // If the path is public, allow access
  if (isPublicPath) {
    return NextResponse.next()
  }

  // If the path requires authentication but there's no token, redirect to login
  if (requiresAuth && !token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // If there's a token, verify it for protected routes
  if (requiresAuth && token) {
    const payload = verifyToken(token)
    if (!payload) {
      // Invalid token, redirect to login
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Allow access for all other cases
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
} 