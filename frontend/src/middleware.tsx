import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Get the token from the cookies
  const token = request.cookies.get('token')?.value

  // List of protected routes
  const protectedRoutes = ['/dashboard', '/profile', '/settings']

  // Check if the user is on the root path
  if (request.nextUrl.pathname === '/') {
    // If the user is authenticated, redirect to dashboard
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    // If not authenticated, allow access to the root path
    return NextResponse.next()
  }

  // For protected routes, redirect to login if not authenticated
  if (!token && protectedRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/dashboard', '/profile', '/settings'],
}