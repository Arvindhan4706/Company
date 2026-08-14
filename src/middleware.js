import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { token } = req.nextauth;
    const { pathname } = req.nextUrl;
    
    if (pathname === "/admin/login" && token) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }

    // Role-based protection for /admin routes
    if (pathname.startsWith("/admin")) {
      if (!token) {
        return NextResponse.redirect(new URL("/admin/login", req.url));
      }
      
      // Customers should not access admin panel
      if (token.role === "CUSTOMER") {
        return NextResponse.redirect(new URL("/portal", req.url));
      }

      // RBAC Checks for restricted admin routes
      if (
        (pathname.startsWith("/admin/users") || 
         pathname.startsWith("/admin/settings") || 
         pathname.startsWith("/admin/activity") ||
         pathname.startsWith("/admin/content")) && 
        token?.role !== "SUPER_ADMIN" && token?.role !== "ADMIN"
      ) {
        return NextResponse.redirect(new URL("/admin/dashboard", req.url));
      }
    }

    // Role-based protection for /portal routes
    if (pathname.startsWith("/portal")) {
      if (!token) {
        return NextResponse.redirect(new URL("/api/auth/signin?callbackUrl=/portal", req.url));
      }
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => true, // We handle authorization logic above to allow redirects instead of generic 401s
    },
    pages: {
      signIn: '/admin/login',
    }
  }
);

export const config = {
  matcher: ['/admin/:path*', '/portal/:path*'],
};
