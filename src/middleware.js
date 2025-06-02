// middleware.js
import { NextResponse } from 'next/server';
import { getSession } from './lib/session';

export async function middleware(req) {

    const publicRoutes = ['/'];
    const protectedRoutes = ['/home'];
    const apiRoutes = ['/api/generate'];
    const path = req.nextUrl.pathname;

    const payload = await getSession(req);        

    if (!payload && protectedRoutes.includes(path)) {
        // If the user is not authenticated and trying to access a protected route, redirect to the login page
        return NextResponse.redirect(new URL('/', req.url));
    }
    if (payload && publicRoutes.includes(path)) {
        // If the user is authenticated and trying to access a public route, redirect to the home page
        return NextResponse.redirect(new URL('/home', req.url));
    }

    if (payload && apiRoutes.includes(path)) {
        const id = payload.id;
        console.log('User ID:', id);
        const requestHeaders = new Headers(req.headers);
        requestHeaders.set('user-id', id);
        return NextResponse.next({
            request: {
                headers: requestHeaders
            }
        });
    }
    return NextResponse.next();
}

