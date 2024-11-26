import { Suspense, lazy, startTransition, useEffect, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
// 404
const ProtocolErrorHandler = lazy(() => import('./app/features/ProtocolErrorHandler'));
// Routes data
import { useAppRoutes } from './app/hooks/useAppRoutes';
import { useSuspense } from './app/hooks/useSuspense';
// Firebase
import { onAuthStateChanged, User } from 'firebase/auth';
import { firebaseAuth } from './app/config/firebaseConfig';

function App() {
  const appRoutes = useAppRoutes();

  /** Component storage */
  type Type_routeComponents_Object = { path: string; component: JSX.Element };
  const [routeComponents, setRouteComponents] = useState<Type_routeComponents_Object[]>([]);

  /** Import module, store route component */
  type Type_createRoute_Param = { path: string; dir: string };

  const createRoute = async (param: Type_createRoute_Param): Promise<void> => {
    const { path, dir } = param;

    if (!routeComponents.some((obj) => obj.path === path)) {
      try {
        const Module = await import(/* @vite-ignore */ dir);
        if (!Module) throw new Error(`${dir}`);

        const component: JSX.Element = <Module.default />;
        const routeComponentObj: Type_routeComponents_Object = { path: path, component };

        // Use functional update to avoid closure issues
        setRouteComponents((prevRouteComponents) => {
          if (!prevRouteComponents.some((obj) => obj.path === path)) {
            return [...prevRouteComponents, routeComponentObj];
          }
          return prevRouteComponents;
        });
      } catch (Error) {
        console.error('Failure to load module: ', Error);
      }
    }
  };

  /** Route loading queue */
  const userLocationPathname: string = useLocation().pathname;

  const queueRoute = (): void => {
    switch (userLocationPathname) {
      // Prioritize landing pages on portfolio mount
      case '/':
        const landingPageRoutes: Type_createRoute_Param[] = [
          appRoutes.routes.portfolio,
          appRoutes.routes.filmDatabase[0],
          appRoutes.routes.ecommerce[0] as Type_createRoute_Param,
        ];
        landingPageRoutes.forEach((route) => createRoute(route));
        break;

      // Standard procedure
      default:
        for (const route of Object.values(appRoutes.routes)) {
          // MPA (Routes entry is an array)
          Array.isArray(route)
            ? // If entry.path is an array, create individual queues
              route.forEach(({ path, dir }) => {
                const paths = path;
                Array.isArray(paths) ? paths.forEach((path) => createRoute({ path, dir })) : createRoute({ path, dir } as Type_createRoute_Param);
              }) // SPA (Routes entry is an object)
            : createRoute(route);
        }
        break;
    }
  };

  // Queue routes when userLocation().pathname changes
  useEffect(() => queueRoute(), [userLocationPathname]);

  /** Dynamic route elements */
  const getElementByPath = (path: string): JSX.Element | undefined => {
    return routeComponents.find((route) => route.path === path)?.component;
  };

  /** Firebase Authentication */
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

  /** Application */
  return (
    <Suspense fallback={useSuspense(appRoutes, userLocationPathname)}>
      <Routes>
        <Route path='*' element={<ProtocolErrorHandler />} />
        <Route path='/' element={getElementByPath('/')} />
        <Route path='/ecommerce' element={getElementByPath('/ecommerce')} />
        <Route path='/ecommerce/products' element={getElementByPath('/ecommerce/products')} />
        <Route path='/ecommerce/headphones' element={getElementByPath('/ecommerce/headphones')} />
        <Route path='/ecommerce/amps-dacs' element={getElementByPath('/ecommerce/amps-dacs')} />
        <Route path='/ecommerce/microphones' element={getElementByPath('/ecommerce/microphones')} />
        <Route path='/ecommerce/interfaces' element={getElementByPath('/ecommerce/interfaces')} />
        <Route path='/ecommerce/product/:paramId' element={getElementByPath('/ecommerce/product/:paramId')} />
        {appRoutes.ecommercePaths.map((path) => (
          <Route path={path} element={getElementByPath('/ecommerce/products')} key={path} />
        ))}
        <Route
          path='/film-database'
          element={!authorizedUser.user || !authorizedUser.verified ? getElementByPath('/film-database') : <Navigate to='/film-database/browse' />}
        />
        <Route
          path='/film-database/browse'
          element={authorizedUser.user && authorizedUser.verified ? getElementByPath('/film-database/browse') : <Navigate to='/film-database' />}
        />
      </Routes>
    </Suspense>
  );
}

export default App;
