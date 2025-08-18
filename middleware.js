import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

export async function middleware(req) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  
  // Tenant resolution
  const hostname = req.headers.get('host')
  const subdomain = hostname?.split('.')[0]
  
  if (subdomain && subdomain !== 'www' && subdomain !== 'appointmentbookings') {
    res.headers.set('x-tenant-subdomain', subdomain)
  }
  
  // Auth check for protected routes
  if (req.nextUrl.pathname.startsWith('/dashboard') || req.nextUrl.pathname.startsWith('/admin')) {
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session) {
      return NextResponse.redirect(new URL('/login', req.url))
    }
  }
  
  return res
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}