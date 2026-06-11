import { NextResponse, type NextRequest } from "next/server";
import { verifyToken } from "./lib/session";

const PUBLIC_ROUTES = ["/login"];

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("session")?.value;
  const session = token ? await verifyToken(token) : null;
  const isAuthenticated = session !== null;
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  if (isPublicRoute && isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isPublicRoute && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon\\.ico|.*\\.svg$).*)"],
};
