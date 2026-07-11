import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;
const SUPPORTED_LOCALES = ["en", "kh", "cn", "zh"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip public assets and internal next paths
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // Check if pathname starts with a supported locale
  const segments = pathname.split("/");
  const possibleLocale = segments[1];

  if (SUPPORTED_LOCALES.includes(possibleLocale)) {
    // Reconstruct route path without the prefix
    const activePath = segments.slice(2).join("/");
    const url = request.nextUrl.clone();
    url.pathname = `/${activePath}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
