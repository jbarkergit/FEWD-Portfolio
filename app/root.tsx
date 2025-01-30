import React, { startTransition, useEffect, useState } from 'react';
import { isRouteErrorResponse, Links, Meta, Outlet, RouterProvider, Scripts, ScrollRestoration } from 'react-router';
import './sass/stylesheets.scss';
import type { Route } from './+types/root';
import { type User, onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from './app/config/firebaseConfig';

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

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details = error.status === 404 ? 'The requested page could not be found.' : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className='pt-16 p-4 container mx-auto'>
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className='w-full p-4 overflow-x-auto'>
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
