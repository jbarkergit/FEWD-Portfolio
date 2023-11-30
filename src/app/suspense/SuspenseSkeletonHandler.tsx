import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SuspenseSkeletonHandler = () => {
  const path = useLocation().pathname;
  const [Skeleton, setSkeleton] = useState<JSX.Element | null>(null);

  useEffect(() => {
    // Ecommerce
    if (path === '/ecommerce') {
      import('../../ecommerce/skeletons/pages/HomeSkeleton').then((module) => setSkeleton(<module.default />));
    } else if (['/ecommerce/products', '/ecommerce/headphones', '/ecommerce/amps-dacs', '/ecommerce/microphones', '/ecommerce/interfaces'].includes(path)) {
      import('../../ecommerce/skeletons/pages/ProductCatalogSkeleton').then((module) => setSkeleton(<module.default />));
    } else if (path.startsWith('/ecommerce')) {
      import('../../ecommerce/skeletons/pages/ProductDetailPageSkeleton').then((module) => setSkeleton(<module.default />));
    } else {
      setSkeleton(<div id='defaultSuspense' style={{ height: '100vh', width: '100%', backgroundColor: 'hsl(0, 0%, 10%)' }} />);
    }
  }, [path]);

  return Skeleton;
};

export default SuspenseSkeletonHandler;
