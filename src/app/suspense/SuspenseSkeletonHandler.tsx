import { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

type NetworkSkeletonLoaderType = {
  networkPerformance: {
    script: {
      totalSize: number;
      transferred: number;
    };
    html: {
      totalSize: number;
      transferred: number;
    };
    css: {
      totalSize: number;
      transferred: number;
    };
    img: {
      totalSize: number;
      transferred: number;
    };
    other: {
      totalSize: number;
      transferred: number;
    };
  };
};

/** Network Import Skeleton Loader */
const NetworkSkeletonLoader = ({ networkPerformance }: NetworkSkeletonLoaderType) => {
  const portfolioLandingRef = useRef<HTMLDivElement>(null);
  const [userLanded, setUserLanded] = useState<boolean>(true);

  /** Initialize loading transition */
  useEffect(() => {
    userLanded ? portfolioLandingRef.current?.setAttribute('data-transition', 'true') : portfolioLandingRef.current?.setAttribute('data-transition', 'false');
  }, [userLanded]);

  /** Component */
  if (userLanded)
    return (
      <div className='portfolio__landing' ref={portfolioLandingRef}>
        <div>
          <span>Scripts</span>
          <p>Size: {networkPerformance.script.totalSize}</p>
          <p>Loaded: {networkPerformance.script.transferred}</p>
        </div>
        <br />
        <div>
          <span>HTML</span>
          <p>Size: {networkPerformance.html.totalSize}</p>
          <p>Loaded: {networkPerformance.html.transferred}</p>
        </div>
        <br />
        <div>
          <span>CSS</span>
          <p>Size: {networkPerformance.css.totalSize}</p>
          <p>Loaded: {networkPerformance.css.transferred}</p>
        </div>
        <br />
        <div>
          <span>Assets</span>
          <p>Size: {networkPerformance.img.totalSize}</p>
          <p>Loaded: {networkPerformance.img.transferred}</p>
        </div>
        <br />
        <div>
          <span>Other</span>
          <p>Size: {networkPerformance.other.totalSize}</p>
          <p>Loaded: {networkPerformance.other.transferred}</p>
        </div>
      </div>
    );
};

const SuspenseSkeletonHandler = ({ networkPerformance }: NetworkSkeletonLoaderType) => {
  const path = useLocation().pathname;
  const [Skeleton, setSkeleton] = useState<JSX.Element | null>(null);

  useEffect(() => {
    // Network Loader
    if (path === '/' || path === '/network') {
      setSkeleton(<NetworkSkeletonLoader networkPerformance={networkPerformance} />);
    } // Ecommerce
    else if (path === '/ecommerce') {
      import('../../ecommerce/skeletons/pages/HomeSkeleton').then((module) => setSkeleton(<module.default />));
    } else if (['/ecommerce/products', '/ecommerce/headphones', '/ecommerce/amps-dacs', '/ecommerce/microphones', '/ecommerce/interfaces'].includes(path)) {
      import('../../ecommerce/skeletons/pages/ProductCatalogSkeleton').then((module) => setSkeleton(<module.default />));
    } else if (path.startsWith('/ecommerce')) {
      import('../../ecommerce/skeletons/pages/ProductDetailPageSkeleton').then((module) => setSkeleton(<module.default />));
    } // Portfolio
    else {
      setSkeleton(<div id='defaultSuspense' style={{ height: '100vh', width: '100%', backgroundColor: 'hsl(0, 0%, 10%)' }} />);
    }
  }, [path]);

  return Skeleton;
};

export default SuspenseSkeletonHandler;
