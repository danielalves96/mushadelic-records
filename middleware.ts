import { getToken } from 'next-auth/jwt';
import { withAuth } from 'next-auth/middleware';
import { NextRequest, NextResponse } from 'next/server';

import { env } from '@/env';

function basicAuth(req: NextRequest) {
  const USERNAME = 'admin';
  const PASSWORD = 'admin';

  const authHeader = req.headers.get('authorization');

  if (!authHeader) {
    return new Response('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

  const encodedCredentials = authHeader.split(' ')[1];
  const decodedCredentials = Buffer.from(encodedCredentials, 'base64').toString();
  const [username, password] = decodedCredentials.split(':');

  if (username !== USERNAME || password !== PASSWORD) {
    return new Response('Unauthorized', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

  return NextResponse.next();
}

const authMiddleware = withAuth(
  function middleware() {
    // This function will only run if the user is authenticated
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: '/auth/signin',
    },
  }
);

export default async function middleware(req: NextRequest) {
  const url = req.nextUrl;

  if (url.pathname.startsWith('/api/docs')) {
    return basicAuth(req);
  }

  // Check if it's a STAFF-only route (users management)
  if (url.pathname.startsWith('/admin/users') || url.pathname.startsWith('/api/admin/users')) {
    const token = await getToken({ req, secret: env.NEXTAUTH_SECRET });

    if (!token) {
      if (url.pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      return NextResponse.redirect(new URL('/auth/signin', req.url));
    }

    // Check if user has STAFF role for users management
    if (token.role !== 'STAFF') {
      if (url.pathname.startsWith('/api/')) {
        return NextResponse.json({ error: 'Forbidden - STAFF access required' }, { status: 403 });
      }
      return NextResponse.redirect(new URL('/admin', req.url));
    }
  }

  // Check if it's an admin route
  if (url.pathname.startsWith('/admin')) {
    return (authMiddleware as any)(req);
  }
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
    '/api-docs',
    '/admin/:path*',
  ],
};
