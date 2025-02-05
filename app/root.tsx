import React, { startTransition, useEffect, useState } from 'react';
import { isRouteErrorResponse, Link, Links, Meta, Outlet, Scripts, ScrollRestoration } from 'react-router';
import '/app/base/sass/stylesheets.scss';
import type { Route } from './+types/root';
import { type User, onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from './base/config/firebaseConfig';

export function meta() {
  return [
    { title: 'Justin Barker' },
    { charSet: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'description', content: 'Front End Web Development Portfolio' },
  ];
}

export const links: Route.LinksFunction = () => [
  { rel: 'shortcut icon', href: '#' },
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

export async function clientLoader() {
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

  return { authorizedUser };
}

clientLoader.hydrate = true as const;

export default function App() {
  return <Outlet />;
}

export function HydrateFallback() {
  return (
    <div className='standardSuspenseFallback'>
      <svg xmlns='http://www.w3.org/2000/svg' width='6em' height='6em' viewBox='0 0 24 24'>
        <path fill='currentColor' d='M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z' opacity='.5' />
        <path fill='currentColor' d='M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z'>
          <animateTransform attributeName='transform' dur='1s' from='0 12 12' repeatCount='indefinite' to='360 12 12' type='rotate' />
        </path>
      </svg>
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  const err: { message: string; details: string; stack: string | undefined } = { message: 'Oops!', details: 'An unexpected error occurred.', stack: undefined };

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

// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   <React.StrictMode>
//     <RouterProvider router={router} />
//   </React.StrictMode>
// );
