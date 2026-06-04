import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { Role_Routes, UserRole } from './lib/Role_Routes';

export async function proxy(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXT_JWT_SECRET,
  });

  const pathname = request.nextUrl.pathname;

  if (!token) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  const role = token.role as UserRole;

  const allowedRoutes = Role_Routes[role] || [];

  const isAllowed = allowedRoutes.some((route) => pathname.startsWith(route));

  if (!isAllowed) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: '/dashboard/:path*',
};
