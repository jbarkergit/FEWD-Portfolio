// Params
import { lazy } from 'react';
import { Type_useAppRoutes } from './useAppRoutes';
// Ecommerce suspense fallback
const HomeSkeleton = lazy(() => import('../../ecommerce/skeletons/pages/HomeSkeleton'));
const ProductCatalogSkeleton = lazy(() => import('../../ecommerce/skeletons/pages/ProductCatalogSkeleton'));
const ProductDetailPageSkeleton = lazy(() => import('../../ecommerce/skeletons/pages/ProductDetailPageSkeleton'));

export const useSuspense = (appRoutes: Type_useAppRoutes, pathname: string): JSX.Element => {
  if (pathname === '/ecommerce') {
    return <HomeSkeleton />;
  } else if (appRoutes.routes.ecommerce.flatMap((entries) => entries.path).includes(pathname)) {
    return <ProductCatalogSkeleton />;
  } else if (pathname.startsWith('/ecommerce')) {
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
