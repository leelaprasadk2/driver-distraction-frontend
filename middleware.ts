import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === "/login" ||
    path === "/signup" ||
    path === "/verifyemail" ||
    path === "/forgetPassword";

  const token = request.cookies.get("token")?.value || "";

  if (token && isPublicPath) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  return NextResponse.next(); // ✅ IMPORTANT
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/profile/:path*",
    "/verifyemail",
    "/forgetPassword",
    "/dashboard",
    "/video",
  ],
};
