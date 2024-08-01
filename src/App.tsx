import { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

// 404
const ProtocolErrorHandler = lazy(() => import('./app/ProtocolErrorHandler'));

// Suspense fallback
const HomeSkeleton = lazy(() => import('./ecommerce/skeletons/pages/HomeSkeleton'));
const ProductCatalogSkeleton = lazy(() => import('./ecommerce/skeletons/pages/ProductCatalogSkeleton'));
const ProductDetailPageSkeleton = lazy(() => import('./ecommerce/skeletons/pages/ProductDetailPageSkeleton'));

// Ecommerce routes for dynamic lazy loading
import { useUniqueData } from './ecommerce/hooks/useUniqueData';

function App() {
  /** Data */
  const getEcommerceFilterPaths = () => {
    const { useUniqueCompanies, useUniqueWearStyles, useUniquePolarPatterns } = useUniqueData();
    const companyPaths: string[] = useUniqueCompanies.map((company) => `/ecommerce/${company}`);
    const wearStylePaths: string[] = useUniqueWearStyles.map((wearStyle) => `/ecommerce/${wearStyle}`);
    const polarPatternPaths: string[] = useUniquePolarPatterns.map((polarPattern) => `/ecommerce/${polarPattern}`);
    return [...companyPaths, ...wearStylePaths, ...polarPatternPaths];
  };

  const appRoutes = {
    portfolio: { path: '/', dir: './portfolio/pages/Portfolio.tsx' },
    ecommerce: [
      { path: '/ecommerce', dir: './ecommerce/pages/Home' },
      {
        path: [
          '/ecommerce/products',
          '/ecommerce/headphones',
          '/ecommerce/amps-dacs',
          '/ecommerce/microphones',
          '/ecommerce/interfaces',
          ...getEcommerceFilterPaths(),
        ],
        dir: '/src/ecommerce/pages/ProductCatalog.tsx',
      },
      { path: '/ecommerce/product/:paramId', dir: './ecommerce/pages/ProductDetailPage' },
    ],
    filmDatabase: [
      { path: '/film-database', dir: './film-database/pages/user-account/FDUserAccount' },
      { path: '/film-database/home', dir: './film-database/pages/catalog/FilmDatabase' },
    ],
  };

  /** Component storage */
  type Type_routeComponents_Object = { path: string; component: JSX.Element };
  const [routeComponents, setRouteComponents] = useState<Type_routeComponents_Object[]>([]);

  /** Import module, store route component */
  type Type_createRoute_Param = { path: string; dir: string };

  const createRoute = async (param: Type_createRoute_Param): Promise<void> => {
    const { path, dir } = param;

    if (!routeComponents.some((obj) => obj.path === path)) {
      try {
        const Module = await import(dir);
        if (!Module) throw new Error(`${dir}`);

        const component: JSX.Element = <Module.default />;
        const routeComponentObj: Type_routeComponents_Object = { path, component };

        setRouteComponents((prevRouteComponents) => [...prevRouteComponents, routeComponentObj]);
      } catch (Error) {
        console.error('Failure to load module: ', Error);
      }
    }
  };

  /** Route loading queue */
  const userLocationPathname: string = useLocation().pathname;

  const queueRoute = () => {
    switch (userLocationPathname) {
      // Prioritize landing pages on portfolio mount
      case '/':
        const landingPageRoutes: Type_createRoute_Param[] = [appRoutes.portfolio, appRoutes.filmDatabase[0], appRoutes.ecommerce[0] as Type_createRoute_Param];
        landingPageRoutes.forEach((route) => createRoute(route));
        break;

      // Standard procedure
      default:
        for (const route of [...Object.values(appRoutes)]) {
          // MPA (Routes entry is an array)
          if (Array.isArray(route)) {
            route.forEach(({ path, dir }) => {
              const paths = path;

              // If entry.path is an array, create individual queues
              if (Array.isArray(paths)) {
                paths.forEach((path) => createRoute({ path, dir }));
              } else {
                createRoute({ path, dir } as Type_createRoute_Param);
              }
            });
            // SPA (Routes entry is an object)
          } else {
            createRoute(route);
          }
        }
        break;
    }
  };

  // Queue routes when userLocation().pathname changes
  useEffect(() => queueRoute(), [userLocationPathname]);

  /** Suspense */
  const suspenseFallback = () => {
    if (userLocationPathname === '/ecommerce') {
      return <HomeSkeleton />;
    } else if (appRoutes.ecommerce.flatMap((entries) => entries.path).includes(userLocationPathname)) {
      return <ProductCatalogSkeleton />;
    } else if (userLocationPathname.startsWith('/ecommerce')) {
      return <ProductDetailPageSkeleton />;
    } else {
      return <ProtocolErrorHandler />;
    }
  };

  /** Dynamic route elements */
  const getElementByPath = (path: string) => {
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
        {useUniqueData().useUniqueCompanies.map((company: string) => (
          <Route path={`/ecommerce/${company}`} element={getElementByPath('/ecommerce/products')} key={company} />
        ))}
        {useUniqueData().useUniqueWearStyles.map((wearStyle: string) => (
          <Route path={`/ecommerce/${wearStyle}`} element={getElementByPath('/ecommerce/products')} key={wearStyle} />
        ))}
        {useUniqueData().useUniquePolarPatterns.map((polarPattern: string) => (
          <Route path={`/ecommerce/${polarPattern}`} element={getElementByPath('/ecommerce/products')} key={polarPattern} />
        ))}

        <Route path='/film-database' element={getElementByPath('/film-database')} />
        <Route path='/film-database/home' element={getElementByPath('/film-database/home')} />
      </Routes>
    </Suspense>
  );
}

export default App;
