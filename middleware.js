import { NextResponse } from 'next/server';
import { decrypt } from '@/lib/auth';

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  
  // Only protect /admin routes (except login) and /api/admin
  const isAdminRoute = path.startsWith('/admin') && !path.startsWith('/admin/login');
  const isAdminApiRoute = path.startsWith('/api/admin') && !path.startsWith('/api/admin/login');

  if (isAdminRoute || isAdminApiRoute) {
    const session = request.cookies.get('session')?.value;
    const decoded = session ? await decrypt(session) : null;
    
    if (!decoded) {
      if (isAdminApiRoute) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  // Redirect /admin directly to /admin/dashboard
  if (path === '/admin') {
    return NextResponse.redirect(new URL('/admin/dashboard', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*'],
};
