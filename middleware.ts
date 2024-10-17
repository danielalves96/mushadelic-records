import { NextRequest, NextResponse } from 'next/server';

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

export default function middleware(req: NextRequest) {
  const url = req.nextUrl;

  if (url.pathname.startsWith('/api/docs')) {
    return basicAuth(req);
  }
}

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
    '/api-docs',
  ],
};
