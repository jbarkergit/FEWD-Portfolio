import { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
// 404
const ProtocolErrorHandler = lazy(() => import('./app/ProtocolErrorHandler'));
// Suspense fallback
const HomeSkeleton = lazy(() => import('./ecommerce/skeletons/pages/HomeSkeleton'));
const ProductCatalogSkeleton = lazy(() => import('./ecommerce/skeletons/pages/ProductCatalogSkeleton'));
const ProductDetailPageSkeleton = lazy(() => import('./ecommerce/skeletons/pages/ProductDetailPageSkeleton'));
// Routes data
import { useAppRoutes } from './app/hooks/useAppRoutes';

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
          appRoutes.routes.filmDatabase,
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

  /** Suspense */
  const suspenseFallback = (): JSX.Element => {
    if (userLocationPathname === '/ecommerce') {
      return <HomeSkeleton />;
    } else if (appRoutes.routes.ecommerce.flatMap((entries) => entries.path).includes(userLocationPathname)) {
      return <ProductCatalogSkeleton />;
    } else if (userLocationPathname.startsWith('/ecommerce')) {
      return <ProductDetailPageSkeleton />;
    } else {
      return (
        <div id='standardSuspenseFallback'>
          <svg xmlns='http://www.w3.org/2000/svg' width='6em' height='6em' viewBox='0 0 24 24'>
            <path fill='currentColor' d='M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z' opacity='.5'></path>
            <path fill='currentColor' d='M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z'>
              <animateTransform attributeName='transform' dur='1s' from='0 12 12' repeatCount='indefinite' to='360 12 12' type='rotate'></animateTransform>
            </path>
          </svg>
        </div>
      );
    }
  };

  /** Dynamic route elements */
  const getElementByPath = (path: string): JSX.Element | undefined => {
    return routeComponents.find((route) => route.path === path)?.component;
  };

  /** Application */
  return (
    <Suspense fallback={suspenseFallback()}>
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
        <Route path='/film-database' element={getElementByPath('/film-database')} />
      </Routes>
    </Suspense>
  );
}

export default App;
