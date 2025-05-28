import { NextResponse } from "next/server";
import localStorage from "redux-persist/lib/storage";

export function middleware(request: any) {
  // const accessToken = request.cookies.get("accessToken")?.value;
  // const accessToken =
  //   localStorage.getItem("accessToken") ||
  //   request.cookies.get("accessToken")?.value;

  // const { pathname } = request.nextUrl;

  // if (pathname === "/dashboard" && !accessToken) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  return NextResponse.next();
}

// Add the matcher to define paths for middleware
export const config = {};
