export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/admin/dashboard/:path*",
    "/admin/services/:path*",
    "/admin/projects/:path*",
    "/admin/industries/:path*",
    "/admin/clients/:path*",
    "/admin/inquiries/:path*",
    "/admin/testimonials/:path*",
    "/admin/media/:path*",
    "/admin/certifications/:path*",
    "/admin/users/:path*",
    "/admin/settings/:path*",
    "/admin/activity/:path*",
  ],
};
