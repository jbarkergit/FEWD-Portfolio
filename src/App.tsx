import { Suspense, lazy, useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

/**
 * Suspense Skeleton Route Path Handler
 * Protocol Error Handler
 * Lazy load hook required for ecommerce dynamic routes
 */
import SuspenseSkeletonHandler from './app/suspense/SuspenseSkeletonHandler';
const ProtocolErrorHandler = lazy(() => import('./app/protocol-error/ProtocolErrorHandler'));
import useUniqueData from './ecommerce/hooks/useUniqueData';

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

type GlobalKeyValuePairsType = typeof portfolioKeyValuePairs | typeof ecommerceKeyValuePairs | typeof discordCloneKeyValuePairs;
const globalKeyValuePairs: GlobalKeyValuePairsType = [...portfolioKeyValuePairs, ...ecommerceKeyValuePairs, ...discordCloneKeyValuePairs];

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

type RoutesType = { path: string; module: JSX.Element };

/** Application */
function App() {
  /** Network Performance Loader
   * https://developer.mozilla.org/en-US/docs/Web/API/PerformanceObserver
   * https://microsoft.github.io/PowerBI-JavaScript/modules/_node_modules__types_node_perf_hooks_d_._perf_hooks_.html#entrytype
   */
  const [networkPerformance, setNetworkPerformance] = useState({
    script: { totalSize: 0, transferred: 0 },
    html: { totalSize: 0, transferred: 0 },
    css: { totalSize: 0, transferred: 0 },
    img: { totalSize: 0, transferred: 0 },
    other: { totalSize: 0, transferred: 0 },
  });

  useEffect(() => {
    const perfObserver = (list: PerformanceObserverEntryList): void => {
      list.getEntries().forEach((entry: PerformanceEntry) => {
        const resourceEntry = entry as PerformanceResourceTiming;
        const stateKey = resourceEntry.initiatorType as keyof typeof networkPerformance;

        setNetworkPerformance((prevState) => ({
          ...prevState,
          [stateKey]: {
            totalSize: resourceEntry.transferSize,
            transferred: resourceEntry.transferSize,
          },
        }));
      });
    };

    const observer: PerformanceObserver = new PerformanceObserver(perfObserver);
    observer.observe({ entryTypes: ['resource'] });

    return () => observer.disconnect();
  }, []);

  /** Dynamic Route Setter */
  const [routes, setRoutes] = useState<RoutesType[]>([]);
  const location: string = useLocation().pathname;

  const useRouteSetter = (keyValuePairs: GlobalKeyValuePairsType): void => {
    keyValuePairs.map((keyValuePair) => {
      useModuleLoader(keyValuePair.element as string).then((Module: JSX.Element) => {
        setRoutes((previousRoutes) => [
          ...previousRoutes,
          ...(Array.isArray(keyValuePair.path)
            ? keyValuePair.path.map((path: string) => ({ path: path, module: Module }))
            : [{ path: keyValuePair.path, module: Module }]),
        ]);
      });
    });
  };

  /** Key value pair getter hook */
  const useKeyValuePairs = (): GlobalKeyValuePairsType => {
    const sessionStoredRoutePaths = JSON.parse(sessionStorage.getItem('sessionStoredRoutePaths') || '[]');
    const initialKeyValuePaths: string[] = initialKeyValuePairs.map((keyValuePair) => keyValuePair.path as string);
    let routeKeyValuePairs: GlobalKeyValuePairsType = [];

    // Prioritize all project landing pages during initial load if pathname is '/'
    if (location === '/' && !sessionStoredRoutePaths.includes(location) && initialKeyValuePaths.includes(location)) {
      routeKeyValuePairs = initialKeyValuePairs;
      sessionStorage.setItem('sessionStoredRoutePaths', JSON.stringify([...initialKeyValuePaths]));
    } else {
      // Handle anything else
      if (!sessionStoredRoutePaths.includes(location)) {
        routeKeyValuePairs = globalKeyValuePairs.filter((keyValuePair) => {
          keyValuePair.path === location || (Array.isArray(keyValuePair.path) && keyValuePair.path.includes(location));
        });
        if (!sessionStoredRoutePaths.includes(location)) sessionStorage.setItem('sessionStoredRoutePaths', JSON.stringify([...sessionStoredRoutePaths, location]));
      }
    }

    return routeKeyValuePairs;
  };

  /**
   * Grab key value pairs from useKeyValuePairs hook utilizing useLocation()
   * Send data to useRouteSetter
   * Invokes useModuleLoader to get <Module.default /> as JSX.Elements (async await promise conversion)
   * Then map new array of Routes to JSX component
   */
  useEffect(() => {
    useRouteSetter(useKeyValuePairs());
    if (location.startsWith('/ecommerce') && ecommerceKeyValuePairs.length > 1) useRouteSetter(ecommerceKeyValuePairs.slice(0));
    else if (location.startsWith('/discord-clone') && discordCloneKeyValuePairs.length > 1) useRouteSetter(discordCloneKeyValuePairs.slice(0));
    else if (location === '/' && portfolioKeyValuePairs.length > 1) useRouteSetter(portfolioKeyValuePairs.slice(0));
    else null;
  }, [location]);

  /** Clear sessionStorage in the event that the page is refreshed to ensure users aren't greeted with a failed importation */
  useEffect(() => {
    const useClearSessionStorageFlag = () => sessionStorage.clear();
    window.addEventListener('beforeunload', useClearSessionStorageFlag);
    return () => window.removeEventListener('beforeunload', useClearSessionStorageFlag);
  }, []);

  /** useModule hook */
  const useModule = (path: string) => routes.find((route) => route.path === path);

  return (
    <Suspense fallback={<SuspenseSkeletonHandler networkPerformance={networkPerformance} />}>
      <Routes>
        <Route path='*' element={<ProtocolErrorHandler />} />

        <Route path='/' element={useModule('/')?.module} />
        <Route path='/contact' element={useModule('/')?.module} />

        <Route path='/ecommerce' element={useModule('/ecommerce')?.module} />
        <Route path='/ecommerce/products' element={useModule('/ecommerce/products')?.module} />
        <Route path='/ecommerce/headphones' element={useModule('/ecommerce/headphones')?.module} />
        <Route path='/ecommerce/amps-dacs' element={useModule('/ecommerce/amps-dacs')?.module} />
        <Route path='/ecommerce/microphones' element={useModule('/ecommerce/microphones')?.module} />
        <Route path='/ecommerce/interfaces' element={useModule('/ecommerce/interfaces')?.module} />
        <Route path='/ecommerce/product/:paramId' element={useModule('/ecommerce/product/:paramId')?.module} />
        {useUniqueData().useUniqueCompanies.map((company: string) => (
          <Route path={`/ecommerce/${company}`} key={company} />
        ))}
        {useUniqueData().useUniqueWearStyles.map((wearStyle: string) => (
          <Route path={`/ecommerce/${wearStyle}`} key={wearStyle} />
        ))}
        {useUniqueData().useUniquePolarPatterns.map((polarPattern: string) => (
          <Route path={`/ecommerce/${polarPattern}`} key={polarPattern} />
        ))}

        <Route path='/ecommerce/discord-clone' element={useModule('/ecommerce/discord-clone')?.module} />

        {/* {routes.map((NewRoute: RoutesType) => (
          <Route path={NewRoute.path} element={NewRoute.module} key={uuidv4()} />
        ))} */}
      </Routes>
    </Suspense>
  );
}

export default App;
