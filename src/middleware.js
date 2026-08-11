import { NextResponse } from 'next/server';

export function middleware(req) {
  const { nextUrl } = req;
  const isAuthenticated = req.cookies.has('admin_session');
  
  const isAdminRoute = nextUrl.pathname.startsWith('/admin');
  const isLoginRoute = nextUrl.pathname === '/admin/login';

  if (isLoginRoute) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL('/admin/dashboard', nextUrl));
    }
    return NextResponse.next();
  }

  if (isAdminRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL('/admin/login', nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
