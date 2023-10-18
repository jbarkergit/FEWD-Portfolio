import { Suspense, lazy, useMemo } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Shared
const NotFound = lazy(() => import('./shared/pages/not-found/NotFound'));
import SuspensePathHandler from './shared/suspense/SuspensePathHandler';

//Portfolio
const Portfolio = lazy(() => import('./portfolio/pages/Portfolio'));

//Ecommerce
const Home = lazy(() => import('./ecommerce/pages/Home'));
const ProductCatalog = lazy(() => import('./ecommerce/pages/ProductCatalog'));
const ProductDetailPage = lazy(() => import('./ecommerce/pages/ProductDetailPage'));
//Ecommerce: Skeletons
import HomeSkeleton from './ecommerce/skeletons/pages/HomeSkeleton';
import ProductCatalogSkeleton from './ecommerce/skeletons/pages/ProductCatalogSkeleton';
import ProductDetailPageSkeleton from './ecommerce/skeletons/pages/ProductDetailPageSkeleton';
//Ecommerce: Context
import { CategoryFilterProvider } from './ecommerce/context/CategoryFilterContext';
import { CartProvider } from './ecommerce/context/CartContext';
//Ecommerce: Hooks
import useUniqueData from './ecommerce/hooks/useUniqueData';

//Application
function App() {
  const uniqueCompanies = useMemo(() => useUniqueData().useUniqueCompanies, [useUniqueData().useUniqueCompanies]);
  const uniqueWearStyles = useMemo(() => useUniqueData().useUniqueWearStyles, [useUniqueData().useUniqueCompanies]);
  const uniquePolarPatterns = useMemo(() => useUniqueData().useUniquePolarPatterns, [useUniqueData().useUniquePolarPatterns]);

  return (
    <BrowserRouter>
      <Suspense fallback={<SuspensePathHandler />}>
        <CategoryFilterProvider>
          <CartProvider>
            <Routes>
              <Route path='*' element={<NotFound />} />

              <Route path='/' element={<Portfolio />} />

              <Route path='/ecommerce' element={<Home />} />
              <Route path='/ecommerce/products' element={<ProductCatalog />} />
              <Route path='/ecommerce/headphones' element={<ProductCatalog />} />
              <Route path='/ecommerce/amps-dacs' element={<ProductCatalog />} />
              <Route path='/ecommerce/microphones' element={<ProductCatalog />} />
              <Route path='/ecommerce/interfaces' element={<ProductCatalog />} />
              <Route path='/ecommerce/product/:paramId' element={<ProductDetailPage />} />
              {uniqueCompanies.map((company: string) => (
                <Route path={`/ecommerce/${company}`} element={<ProductCatalog />} key={company} />
              ))}
              {uniqueWearStyles.map((wearStyle) => (
                <Route path={`/ecommerce/${wearStyle}`} element={<ProductCatalog />} key={wearStyle} />
              ))}
              {uniquePolarPatterns.map((polarPattern) => (
                <Route path={`/ecommerce/${polarPattern}`} element={<ProductCatalog />} key={polarPattern} />
              ))}
              {/* <Route path='/home-skeleton' element={<HomeSkeleton />} /> */}
              {/* <Route path='/product-catalog-skeleton' element={<ProductCatalogSkeleton />} /> */}
              {/* <Route path='/product-detail-page-skeleton' element={<ProductDetailPageSkeleton />} /> */}
            </Routes>
          </CartProvider>
        </CategoryFilterProvider>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
