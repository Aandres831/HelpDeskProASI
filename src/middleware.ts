import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;

    // If user is authenticated but tries to access login, redirect to dashboard
    if (path === "/auth/login" && token) {
      if (token.role === "agent") {
        return NextResponse.redirect(new URL("/agent/dashboard", req.url));
      } else {
        return NextResponse.redirect(new URL("/client/dashboard", req.url));
      }
    }

    // Protect Agent routes
    if (path.startsWith("/agent") && token?.role !== "agent") {
      return NextResponse.redirect(new URL("/client/dashboard", req.url));
    }

    // Protect Client routes
    if (path.startsWith("/client") && token?.role !== "client") {
      return NextResponse.redirect(new URL("/agent/dashboard", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const path = req.nextUrl.pathname;
        // Allow access to login page without token
        if (path === "/auth/login") return true;
        // Require token for all other protected routes
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ["/agent/:path*", "/client/:path*", "/auth/login"],
};
