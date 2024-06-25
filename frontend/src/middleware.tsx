import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // Get the token from the cookies
  const token = request.cookies.get('token')?.value

  // List of protected routes
  const protectedRoutes = ['/dashboard']

  if (!token && protectedRoutes.includes(request.nextUrl.pathname)) {
    // Redirect to login page if the user is not authenticated
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard', '/profile', '/settings'],
}