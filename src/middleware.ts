import { NextResponse, NextRequest } from 'next/server';
export { default } from 'next-auth/middleware';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
  });
  const url = request.nextUrl;
  if (
    token &&
    (url.pathname === '/signin' ||
      url.pathname === '/signup' ||
      url.pathname === '/')
  ) {
    console.log('Redirecting authenticated user to /home');
    return NextResponse.redirect(new URL('/home', request.url));
  }

  if (
    !token &&
    (url.pathname === '/home' || url.pathname.startsWith('/home/'))
  ) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/home/:path*', '/signin', '/signup', '/'],
};
