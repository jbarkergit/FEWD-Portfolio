import React, { startTransition, useEffect, useState } from 'react';
import { isRouteErrorResponse, Link, Links, Meta, Outlet, RouterProvider, Scripts, ScrollRestoration } from 'react-router';
import './sass/stylesheets.scss';
import type { Route } from './+types/root';
import { type User, onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from './base/config/firebaseConfig';

export const links: Route.LinksFunction = () => [
  // Preconnect external resources
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  {
    rel: 'preconnect',
    href: 'https://fonts.gstatic.com',
    crossOrigin: 'anonymous',
  },
  // Preload fontshare fonts for ecommerce project
  {
    rel: 'preload',
    href: 'https://cdn.fontshare.com/wf/U2HFRBAHB5SL53RHFEF22BIJZSJRHR2Y/LFPV5QZIFT7V5OMDNHDQPJYOQAHFUE4W/CLVUG765RK3TA3ESG2NBCJJGWFQVIBTA.woff2',
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
  {
    rel: 'preload',
    href: 'https://cdn.fontshare.com/wf/QZRCKFY3YNTSI7ZJRBICCIGOZTP4A7XJ/N5R3WNWTF5UMZX6H7KNBVR5N5PJZCKKX/TJFEEESODHVFXP2MHRXMD2MGSHGGFUZG.woff2',
    as: 'font',
    type: 'font/woff2',
    crossOrigin: 'anonymous',
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <meta name='description' content='Front End Web Development Portfolio' />
        <title>Justin Barker</title>
        <link rel='shortcut icon' href='#' />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const [authorizedUser, setAuthorizedUser] = useState<{
    user: undefined | User;
    verified: boolean;
  }>({
    user: undefined,
    verified: false,
  });

  useEffect(() => {
    const authListener = onAuthStateChanged(firebaseAuth, (user) => {
      startTransition(() => {
        if (!user) setAuthorizedUser({ user: undefined, verified: false });
        else setAuthorizedUser({ user: user, verified: user.emailVerified });
      });
    });

    return () => authListener();
  }, []);

  return <Outlet />;
}

export type ErrorBoundaryErr = { message: string; details: string; stack: string | undefined };

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const err: ErrorBoundaryErr = { message: 'Oops!', details: 'An unexpected error occurred.', stack: undefined };

  if (isRouteErrorResponse(error)) {
    err.message = error.status === 404 ? '404' : 'Error';
    err.details =
      error.status === 404
        ? 'The browser was able to communicate with the server; however, the requested page could not be found.'
        : error.statusText || err.details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    err.details = error.message;
    err.stack = error.stack;
  }

  return (
    <main className='protocolError'>
      <article className='protocolError__article'>
        <h1 className='protocolError__article--h1'>{err.message}</h1>
        <h2 className='protocolError__article--h2'>{err.details}</h2>
        <nav className='protocolError__article--nav'>
          {err.details}
          Please return to the{' '}
          <Link to='/' className='protocolError__article--a' aria-label='Return to landing page'>
            landing page
          </Link>
          &nbsp;to continue browsing.
        </nav>
      </article>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
