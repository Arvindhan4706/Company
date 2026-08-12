import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { token } = req.nextauth;
    const { pathname } = req.nextUrl;
    if (pathname === "/admin/login" && token) {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
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
  },
  {
    pages: {
      signIn: '/admin/login',
    }
  }
);

export const config = {
  matcher: ['/admin/((?!login).*)'],
};
