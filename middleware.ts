import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === "/" ||
    path === "/login" ||
    path === "/signup" ||
    path === "/verifyemail" ||
    path === "/forgetPassword" ||
    path === "/about";
    
  const token = request.cookies.get("token")?.value || "";

  if (
  token &&
  (path === "/login" ||
   path === "/signup" ||
   path === "/forgetPassword" ||
   path === "/verifyemail")
) {
  return NextResponse.redirect(new URL("/profile", request.url));
}

  // Not logged in user cannot access protected pages
  if (!token && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/about",
    "/login",
    "/signup",
    "/profile/:path*",
    "/verifyemail",
    "/forgetPassword",
    "/image/:path*",
    "/video/:path*",
  ],
};