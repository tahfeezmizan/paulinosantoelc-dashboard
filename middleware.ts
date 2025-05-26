import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const isPublicPath = path === "/login" || path === "/register" || path === "/";

  // Define protected paths that require authentication
  const isProtectedPath = path.startsWith("/dashboard") || path.startsWith("/account") || path.startsWith("/profile");

  // Check for authentication from multiple sources
  const hasAuthCookie = request.cookies.has("isAuthenticated");
  const hasAuthHeader = request.headers.get("authorization");
  const hasTokenCookie = request.cookies.has("authToken") || request.cookies.has("token");
  
  // You can also check for specific cookie values if needed
  const authCookieValue = request.cookies.get("isAuthenticated")?.value;
  const isAuthCookieValid = authCookieValue === "true" || authCookieValue === "1";

  // Consider user authenticated if any of these conditions are met
  const isAuthenticated = hasAuthCookie || hasAuthHeader || hasTokenCookie || isAuthCookieValid;

  console.log("Middleware Check:", {
    path,
    isPublicPath,
    isProtectedPath,
    hasAuthCookie,
    hasAuthHeader,
    hasTokenCookie,
    authCookieValue,
    isAuthenticated
  });

  // Redirect authenticated users away from login/register pages
  if (isAuthenticated && (path === "/login" || path === "/register")) {
    console.log("Redirecting authenticated user to dashboard");
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Redirect unauthenticated users away from protected routes
  if (!isAuthenticated && isProtectedPath) {
    console.log("Redirecting unauthenticated user to login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // For root path, redirect based on authentication status
  if (path === "/") {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    } else {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Continue with the request for all other cases
  return NextResponse.next();
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    "/",
    "/dashboard/:path*",
    "/account/:path*",
    "/profile/:path*",
    "/login",
    "/register"
  ],
};