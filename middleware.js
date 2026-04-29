import { NextResponse } from 'next/server';
import { decrypt } from '@/lib/auth';

export async function middleware(request) {
  const path = request.nextUrl.pathname;
  
  const isUnderAdmin = path.startsWith('/admin');
  const isUnderApiAdmin = path.startsWith('/api/admin');
  
  if (!isUnderAdmin && !isUnderApiAdmin) {
    return NextResponse.next();
  }

  const isLoginRoute = path === '/admin/login';
  const isApiLoginRoute = path === '/api/admin/login';

  const session = request.cookies.get('session')?.value;
  const decoded = session ? await decrypt(session) : null;

  if (!decoded) {
    if (isLoginRoute || isApiLoginRoute) {
      return NextResponse.next();
    }
    
    if (isUnderApiAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return NextResponse.redirect(new URL('/admin/login', request.url));
  } else {
    if (isLoginRoute) {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
    
    if (path === '/admin') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }

    return NextResponse.next();
  }
}

export const config = {
  matcher: ['/admin', '/admin/:path*', '/api/admin/:path*'],
};
