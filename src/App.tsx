import { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

/** Suspense Path Handler, Protocol Error Handler */
import { SuspenseSkeletonHandler } from './app/suspense/SuspensePathHandler';
const ProtocolErrorHandler = lazy(() => import('./app/protocol-error/ProtocolErrorHandler'));

/** Lazy load hooks required for ecommerce dynamic routes */
import useUniqueData from './ecommerce/hooks/useUniqueData';
const ProductCatalog = lazy(() => import('./ecommerce/pages/ProductCatalog'));

/** Array of Portfolio key value pairs */
const portfolioKeyValuePairs = [
  { path: '/', element: './portfolio/pages/Portfolio' },
  { path: '/contact', element: './portfolio/pages/ContactForm' },
];

/** Array of Ecommerce key value pairs */
const ecommerceKeyValuePairs = [
  { path: '/ecommerce', element: './ecommerce/pages/Home' },
  {
    path: ['/ecommerce/products', '/ecommerce/headphones', '/ecommerce/amps-dacs', '/ecommerce/microphones', '/ecommerce/interfaces'],
    element: './ecommerce/pages/ProductCatalog',
  },
  { path: '/ecommerce/product/:paramId', element: './ecommerce/pages/ProductDetailPage' },
];

/** Array of Discord Clone key value pairs */
const discordCloneKeyValuePairs = [{ path: '/discord-clone', element: './discord-clone/pages/DiscordClone' }];

/** Array of project landing pages */
const initialKeyValuePairs = [portfolioKeyValuePairs[0], ecommerceKeyValuePairs[0], discordCloneKeyValuePairs[0]];

/** Array of all project key value pairs */
type GlobalKeyValuePairsType = typeof portfolioKeyValuePairs | typeof ecommerceKeyValuePairs | typeof discordCloneKeyValuePairs;
const globalKeyValuePairs: GlobalKeyValuePairsType = [...portfolioKeyValuePairs, ...ecommerceKeyValuePairs, ...discordCloneKeyValuePairs];

/** Handle queue later */

/** routes state type */
type RoutesType = { path: string; module: JSX.Element };

/** Module loader hook */
const useModuleLoader = async (element: string): Promise<JSX.Element> => {
  try {
    const Module = await import(element);
    return (<Module.default />) as JSX.Element;
  } catch (error) {
    console.error(`Error returning route path ${element}`, error);
    throw error;
  }
};

/** Initial key value paths getter hook for useKeyValuePairs hook conditionals */
const useInitialKeyValuePaths = (): string[] => {
  const initialKeyValuePaths: string[] = [];

  initialKeyValuePairs.forEach((keyValuePair) => {
    if (!initialKeyValuePaths.includes(keyValuePair.path as string)) initialKeyValuePaths.push(keyValuePair.path as string);
  });

  return initialKeyValuePaths;
};

/** Application */
function App() {
  const [routes, setRoutes] = useState<RoutesType[]>([]);
  const location: string = useLocation().pathname;

  /** Key value pair getter hook */
  const useKeyValuePairs = (): GlobalKeyValuePairsType => {
    const mappedRoutePaths: boolean = !!sessionStorage.getItem('mappedRoutePaths');
    const initialKeyValuePaths = useInitialKeyValuePaths();
    let routeKeyValuePairs: GlobalKeyValuePairsType = [];

    if (!mappedRoutePaths && initialKeyValuePaths.includes(location)) {
      routeKeyValuePairs = initialKeyValuePairs;
      sessionStorage.setItem('mappedRoutePaths', JSON.stringify(true));
    } else {
      globalKeyValuePairs.map((keyValuePair) => {
        if (Array.isArray(keyValuePair.path)) {
          keyValuePair.path.forEach((path: string) => {
            if (path === (location as string)) routeKeyValuePairs = [keyValuePair];
          });
        } else {
          if (keyValuePair.path === (location as string)) routeKeyValuePairs = [keyValuePair];
        }
      });
    }

    return routeKeyValuePairs;
  };

  /** Route setter */
  const useRouteSetter = (keyValuePairs: GlobalKeyValuePairsType): void => {
    keyValuePairs.map((keyValuePair) => {
      const getModule: Promise<JSX.Element> = useModuleLoader(keyValuePair.element as string);

      getModule.then((Module: JSX.Element) => {
        setRoutes((previousRoutes) => [
          ...previousRoutes,
          ...(Array.isArray(keyValuePair.path)
            ? keyValuePair.path.map((path: string) => ({ path: path, module: Module }))
            : [{ path: keyValuePair.path, module: Module }]),
        ]);
      });
    });
  };

  useEffect(() => {
    useRouteSetter(useKeyValuePairs());

    if (location.startsWith('/ecommerce')) useRouteSetter(ecommerceKeyValuePairs.slice(0));
    else if (location.startsWith('/discord-clone')) useRouteSetter(discordCloneKeyValuePairs.slice(0));
    else if (location === '/') useRouteSetter(portfolioKeyValuePairs.slice(0));
    else null;
  }, [useLocation()]);

  useEffect(() => {
    const useClearSessionStorageFlag = () => sessionStorage.clear();
    window.addEventListener('beforeunload', useClearSessionStorageFlag);
    return () => window.removeEventListener('beforeunload', useClearSessionStorageFlag);
  }, []);

  return (
    <Suspense fallback={<SuspenseSkeletonHandler />}>
      <Routes>
        <Route path='*' element={<ProtocolErrorHandler />} />
        {routes.map((NewRoute: RoutesType) => (
          <Route path={NewRoute.path} element={NewRoute.module} key={NewRoute.path} />
        ))}
        {useUniqueData().useUniqueCompanies.map((company: string) => (
          <Route path={`/ecommerce/${company}`} element={<ProductCatalog />} key={company} />
        ))}
        {useUniqueData().useUniqueWearStyles.map((wearStyle: string) => (
          <Route path={`/ecommerce/${wearStyle}`} element={<ProductCatalog />} key={wearStyle} />
        ))}
        {useUniqueData().useUniquePolarPatterns.map((polarPattern: string) => (
          <Route path={`/ecommerce/${polarPattern}`} element={<ProductCatalog />} key={polarPattern} />
        ))}
      </Routes>
    </Suspense>
  );
}

export default App;
