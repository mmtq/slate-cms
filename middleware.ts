import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

const protectedRoutes = ["/create", ];
const authRoutes = ["/auth/login", "/auth/register"];

export async function middleware(req: NextRequest) {
    const { nextUrl } = req
    const sessionCookie = getSessionCookie(req)

    const res = NextResponse.next()

    const isLoggedIn = !!sessionCookie
    const isOnProtectedRoute = protectedRoutes.includes(nextUrl.pathname)
    const isOnAuthRoute = authRoutes.includes(nextUrl.pathname)

    if (isOnProtectedRoute && !isLoggedIn) {
        return NextResponse.rewrite(new URL("/auth/login", req.url))
    }

    if (isOnAuthRoute && isLoggedIn) {
        return NextResponse.rewrite(new URL("/", req.url))
    }

    return res
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    ],
}