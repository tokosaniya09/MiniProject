import { NextResponse } from 'next/server';

export function middleware(request) {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get('token')?.value || '';

    const isPublicPath = ['/login', '/signup', '/verifyemail'].includes(path);
    const isProtectedVolunteerRoute = path.startsWith('/volunteer');

    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (isProtectedVolunteerRoute && !token) {
        return NextResponse.redirect(new URL('/login', request.url));
    }
}

export const config = {
    matcher: ['/', '/login', '/signup', '/verifyemail', '/volunteer/:path*'],
};
