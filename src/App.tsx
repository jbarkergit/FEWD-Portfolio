/** Deps */
import { JSX, startTransition, Suspense, useEffect, useMemo, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
/** Firebase */
import { firebaseAuth } from './app/config/firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';
/** App Components */
import ProtocolErrorHandler from './app/components/ProtocolErrorHandler';
import StandardSuspense from './app/components/StandardSuspense';
/** Componenets: Skeletons */
import HomeSkeleton from './ecommerce/skeletons/pages/HomeSkeleton';
import ProductCatalogSkeleton from './ecommerce/skeletons/pages/ProductCatalogSkeleton';
import ProductDetailPageSkeleton from './ecommerce/skeletons/pages/ProductDetailPageSkeleton';
/** Data: Ecommerce Dynamic Routes */
import { useUniqueData } from './ecommerce/hooks/useUniqueData';

/** App Routes */
function useRouteDirectory() {
  const { useEcommercePaths } = useUniqueData();

  const routes = useMemo(() => {
    return {
      portfolio: { path: '/', dir: '/src/portfolio/pages/Portfolio.tsx' },
      ecommerce: [
        { path: '/ecommerce', dir: '/src/ecommerce/pages/Home.tsx' },
        { path: '/ecommerce/product/:paramId', dir: '/src/ecommerce/pages/ProductDetailPage.tsx' },
        { path: '/ecommerce/products', dir: '/src/ecommerce/pages/ProductCatalog.tsx' },
        ...useEcommercePaths.reduce<{ path: string; dir: string }[]>((acc, path) => {
          acc.push({ path, dir: '/src/ecommerce/pages/ProductCatalog.tsx' });
          return acc;
        }, []),
      ],
      filmDatabase: [
        { path: '/film-database', dir: '/src/film-database/pages/FDUserAccount.tsx' },
        { path: '/film-database/browse', dir: '/src/film-database/pages/FDCatalog.tsx' },
      ],
    };
  }, [useEcommercePaths]);

  const paths = useMemo(() => {
    return Object.entries(routes).flatMap(([key, value]) => value);
  }, [routes]);

  return { routes, paths };
}

/** Suspense */
function useSuspense(routeDir: ReturnType<typeof useRouteDirectory>, pathname: string): JSX.Element {
  switch (true) {
    case pathname.startsWith('/ecommerce'):
      if (pathname === '/ecommerce') return <HomeSkeleton />;
      else if (routeDir.routes.ecommerce.flatMap((entries) => entries.path).includes(pathname)) return <ProductCatalogSkeleton />;
      else return <ProductDetailPageSkeleton />;

    default:
      return <StandardSuspense />;
  }
}

/** Application */
const Napp = () => {
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

  /** Route Store */
  type Type_Route = { path: string; element: JSX.Element };
  const [routes, setRoutes] = useState<Array<Type_Route> | undefined>(undefined);

  /** Module Importer
   * Opting out of Promise.all to ensure Modules are loaded as quickly as possible
   * To enable this behavior and reduce readability issues, function loadModules() was implemented
   */
  type Type_ImportModule_Param = { path: string; dir: string };

  async function importModule(pd: Type_ImportModule_Param) {
    const { path, dir } = pd;

    try {
      const Module = await import(/* @vite-ignore */ dir);
      if (!Module) throw new Error(`Module for path '${path}' could not be imported.`);

      const newRoute: Type_Route = { path: path, element: <Module.default /> };

      setRoutes((prevRoutes) => {
        if (!prevRoutes) return [newRoute];
        else if (prevRoutes.some((route) => route.path === path)) return prevRoutes;
        else return [...prevRoutes, newRoute];
      });
    } catch {
      console.error(`Failure during Application Routing: ${Error}`);
    }
  }

  /** Module Loader */
  type Type_LoadModule_Param = { path: string | string[]; dir: string };
  type Type_LoadModule_Params = Type_LoadModule_Param | Array<Type_LoadModule_Param>;

  async function loadModule(pd: Type_LoadModule_Params) {
    // If parameter is an array
    if (Array.isArray(pd)) for (const { path, dir } of pd) importModule({ path, dir } as Type_ImportModule_Param);
    // If parameter is an object
    else importModule(pd as Type_ImportModule_Param);
  }

  /** Queue modules for import */
  const routeDir = useRouteDirectory();

  function queueModule(pathname: string) {
    switch (pathname) {
      // Prioritize landing pages on portfolio mount
      case '/':
        loadModule([routeDir.routes.portfolio, routeDir.routes.filmDatabase[0], routeDir.routes.ecommerce[0]]);
        break;

      default:
        loadModule(routeDir.paths.find(({ path, dir }) => path === pathname)!);
        break;
    }
  }

  const pathname = useLocation().pathname;

  useEffect(() => queueModule(pathname), []);

  /** Router */
  return (
    <Suspense fallback={useSuspense(routeDir, pathname)}>
      <Routes>
        <Route path='*' element={<ProtocolErrorHandler />} />
        {routeDir.paths.map(({ path, dir }, index) => (
          <Route path={path} element={routes?.find((obj) => obj.path === path)?.element} key={`${path}-${index}`} />
        ))}
      </Routes>
    </Suspense>
  );
};

export default Napp;
