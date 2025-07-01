import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import environment from "./config/environment";
import type { JWTExtended } from "./types/Auth";

export async function middleware(request: NextRequest) {
  const token: JWTExtended | null = await getToken({
    req: request,
    secret: environment.AUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  // Prevent access to login/register if already logged in
  if (pathname === "/auth/login" || pathname === "/auth/register") {
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // Protect /admin routes
  if (pathname.startsWith("/admin")) {
    if (!token || token?.user?.role !== "admin") {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  // Protect /member routes
  if (pathname.startsWith("/member")) {
    if (!token || token?.user?.role !== "member") {
      return NextResponse.redirect(new URL("/auth/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/:path*", "/admin/:path*", "/member/:path*"],
};
