import { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

/**
 * Suspense Skeleton Route Path Handler
 * Protocol Error Handler
 * Lazy load hook required for ecommerce dynamic routes
 */
import SuspenseSkeletonHandler from './app/suspense/SuspenseSkeletonHandler';
const ProtocolErrorHandler = lazy(() => import('./app/protocol-error/ProtocolErrorHandler'));
import { useUniqueData } from './ecommerce/hooks/useUniqueData';

/** Key value pair arrays */
const portfolioKeyValuePairs = [{ path: '/', element: './portfolio/application/Portfolio' }];

const ecommerceKeyValuePairs = [
  { path: '/ecommerce', element: './ecommerce/pages/Home' },
  {
    path: ['/ecommerce/products', '/ecommerce/headphones', '/ecommerce/amps-dacs', '/ecommerce/microphones', '/ecommerce/interfaces'],
    element: './ecommerce/pages/ProductCatalog',
  },
  { path: '/ecommerce/product/:paramId', element: './ecommerce/pages/ProductDetailPage' },
];

const discordCloneKeyValuePairs = [{ path: '/discord-clone', element: './discord-clone/pages/DiscordClone' }];

const initialKeyValuePairs = [portfolioKeyValuePairs[0], ecommerceKeyValuePairs[0], discordCloneKeyValuePairs[0]];

type GlobalKeyValuePairsType = (
  | {
      path: string;
      element: string;
    }
  | {
      path: string[];
      element: string;
    }
)[];

const globalKeyValuePairs: GlobalKeyValuePairsType = [...portfolioKeyValuePairs, ...ecommerceKeyValuePairs, ...discordCloneKeyValuePairs];

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

/** Application */
function App() {
  /** Dynamic Route Setter */
  const location = useLocation().pathname as string;
  const [routes, setRoutes] = useState<RoutesType[]>([]);

  /** Route setter */
  const useRouteSetter = (keyValuePairs: GlobalKeyValuePairsType): void => {
    for (const keyValuePair of keyValuePairs) {
      useModuleLoader(keyValuePair.element as string).then((Module: JSX.Element) => {
        setRoutes((previousRoutes) => [
          ...previousRoutes,
          ...(Array.isArray(keyValuePair.path)
            ? keyValuePair.path.map((path: string) => ({ path: path, module: Module }))
            : [{ path: keyValuePair.path, module: Module }]),
        ]);
      });
    }
  };

  /** Dynamic module loader queue */
  useEffect(() => {
    let routeKeyValuePairs: GlobalKeyValuePairsType = [];

    // Prioritize importation of project landing pages on initial load
    if (location === '/') {
      routeKeyValuePairs = initialKeyValuePairs;
    } // Handle individual landing page imports if user didn't visit '/'
    else {
      routeKeyValuePairs = globalKeyValuePairs.filter(
        (keyValuePair) => keyValuePair.path === location || (Array.isArray(keyValuePair.path) && keyValuePair.path.includes(location))
      );
    }

    // Check if all modules have been imported and stored in routes State to prevent useEffect from firing without cause
    if (!globalKeyValuePairs.every((globalKeyValuePair) => routes.some((route) => route.path === globalKeyValuePair.path))) {
      // Check if route module has been imported and stored in routes state to prevent unnecessary fires
      if (!routes.some((route: RoutesType) => route.path === location))
        // Pass arrays of route paths and elements from routeKeyValuePairs to useRouteSetter
        // useRouteSetter then invokes useModuleLoader to store modules as JSX.Elements (async await promise conversion) in routes state
        useRouteSetter(routeKeyValuePairs);
      // Background Loading Queue order
      // Note: Portfolio && Discord Clone handle their imports locally because they're SPAs
      // IMPORTANT NOTE: DON'T FORGET TO SLICE LANDING PAGES!

      // TO DO: PORTFOLIO IS NO LONGER AN SPA -- NEED TO QUEUE BACKGROUND LOADER
      if (location.startsWith('/ecommerce')) useRouteSetter(ecommerceKeyValuePairs.slice(0));
    }
  }, [location]);

  /** Simple hook to fetch JSX element from route state */
  const useModule = (path: string) => routes.find((route) => route.path === path);

  /** Application */
  // Note: Minimizing all logic variable storage for optimal memory usage
  return (
    <Suspense fallback={<SuspenseSkeletonHandler />}>
      <Routes>
        <Route path='*' element={<ProtocolErrorHandler />} />

        <Route path='/' element={useModule('/')?.module} />

        <Route path='/ecommerce' element={useModule('/ecommerce')?.module} />
        <Route path='/ecommerce/products' element={useModule('/ecommerce/products')?.module} />
        <Route path='/ecommerce/headphones' element={useModule('/ecommerce/headphones')?.module} />
        <Route path='/ecommerce/amps-dacs' element={useModule('/ecommerce/amps-dacs')?.module} />
        <Route path='/ecommerce/microphones' element={useModule('/ecommerce/microphones')?.module} />
        <Route path='/ecommerce/interfaces' element={useModule('/ecommerce/interfaces')?.module} />
        <Route path='/ecommerce/product/:paramId' element={useModule('/ecommerce/product/:paramId')?.module} />
        {useUniqueData().useUniqueCompanies.map((company: string) => (
          <Route path={`/ecommerce/${company}`} element={useModule('/ecommerce/products')?.module} key={company} />
        ))}
        {useUniqueData().useUniqueWearStyles.map((wearStyle: string) => (
          <Route path={`/ecommerce/${wearStyle}`} element={useModule('/ecommerce/products')?.module} key={wearStyle} />
        ))}
        {useUniqueData().useUniquePolarPatterns.map((polarPattern: string) => (
          <Route path={`/ecommerce/${polarPattern}`} element={useModule('/ecommerce/products')?.module} key={polarPattern} />
        ))}

        <Route path='/ecommerce/discord-clone' element={useModule('/ecommerce/discord-clone')?.module} />
      </Routes>
    </Suspense>
  );
}

export default App;
