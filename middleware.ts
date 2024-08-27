import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest){
    const path = request.nextUrl.pathname;

    const isPublicPath = path === '/login' || path === '/signup';

    const token = request.cookies.get("Auth")?.value || "";

    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login', request.url));
    };
    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/dashboard', request.url));
    };
}


export const config = {
    matcher: [
        '/',
        '/login',
        '/signup',
        '/dashboard', 
        '/product',
        '/api/product/create',
        '/api/product/update'
    ]
};