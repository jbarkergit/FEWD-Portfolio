import { Suspense, lazy, useMemo } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

/** 404 Error */
const NotFound = lazy(() => import('./protocol-errors/404/NotFound'));

/** Portfolio */
const Portfolio = lazy(() => import('./portfolio/pages/Portfolio'));
const ThreeSlider = lazy(() => import('./portfolio/components/main/ThreeSlider'));

/** Ecommerce */
const Home = lazy(() => import('./ecommerce/pages/Home'));
const ProductCatalog = lazy(() => import('./ecommerce/pages/ProductCatalog'));
const ProductDetailPage = lazy(() => import('./ecommerce/pages/ProductDetailPage'));
// Skeletons
import HomeSkeleton from './ecommerce/skeletons/pages/HomeSkeleton';
import ProductCatalogSkeleton from './ecommerce/skeletons/pages/ProductCatalogSkeleton';
import ProductDetailPageSkeleton from './ecommerce/skeletons/pages/ProductDetailPageSkeleton';
// Context
import { CategoryFilterProvider } from './ecommerce/context/CategoryFilterContext';
import { CartProvider } from './ecommerce/context/CartContext';
// Pathing via Hooks
import useUniqueData from './ecommerce/hooks/useUniqueData';

/** Suspense */
function SuspensePathHandler() {
  switch (useLocation().pathname) {
    case '/ecommerce':
      return <HomeSkeleton />;
    case '/ecommerce/products':
    case '/ecommerce/headphones':
    case '/ecommerce/amps-dacs':
    case '/ecommerce/microphones':
    case '/ecommerce/interfaces':
      return <ProductCatalogSkeleton />;
    default:
      return <ProductDetailPageSkeleton />;
  }
}

/** Application */
function App() {
  /** Ecommerce Route mapping hooks */
  const uniqueCompanies = useMemo(() => useUniqueData().useUniqueCompanies, [useUniqueData().useUniqueCompanies]);
  const uniqueWearStyles = useMemo(() => useUniqueData().useUniqueWearStyles, [useUniqueData().useUniqueCompanies]);
  const uniquePolarPatterns = useMemo(() => useUniqueData().useUniquePolarPatterns, [useUniqueData().useUniquePolarPatterns]);

  return (
    <BrowserRouter>
      <Suspense fallback={<SuspensePathHandler />}>
        <Routes>
          <Route path='*' element={<NotFound />} />
          <Route path='/' element={<Portfolio />} />
          <Route path='/three' element={<ThreeSlider />} />

          <Route
            path='/ecommerce'
            element={
              <CategoryFilterProvider>
                <CartProvider>
                  <Home />
                </CartProvider>
              </CategoryFilterProvider>
            }
          />
          <Route
            path='/ecommerce/products'
            element={
              <CategoryFilterProvider>
                <CartProvider>
                  <ProductCatalog />
                </CartProvider>
              </CategoryFilterProvider>
            }
          />
          <Route
            path='/ecommerce/headphones'
            element={
              <CategoryFilterProvider>
                <CartProvider>
                  <ProductCatalog />
                </CartProvider>
              </CategoryFilterProvider>
            }
          />
          <Route
            path='/ecommerce/amps-dacs'
            element={
              <CategoryFilterProvider>
                <CartProvider>
                  <ProductCatalog />
                </CartProvider>
              </CategoryFilterProvider>
            }
          />
          <Route
            path='/ecommerce/microphones'
            element={
              <CategoryFilterProvider>
                <CartProvider>
                  <ProductCatalog />
                </CartProvider>
              </CategoryFilterProvider>
            }
          />
          <Route
            path='/ecommerce/interfaces'
            element={
              <CategoryFilterProvider>
                <CartProvider>
                  <ProductCatalog />
                </CartProvider>
              </CategoryFilterProvider>
            }
          />
          <Route
            path='/ecommerce/product/:paramId'
            element={
              <CategoryFilterProvider>
                <CartProvider>
                  <ProductDetailPage />
                </CartProvider>
              </CategoryFilterProvider>
            }
          />
          {uniqueCompanies.map((company: string) => (
            <Route
              path={`/ecommerce/${company}`}
              element={
                <CategoryFilterProvider>
                  <CartProvider>
                    <ProductCatalog />
                  </CartProvider>
                </CategoryFilterProvider>
              }
              key={company}
            />
          ))}
          {uniqueWearStyles.map((wearStyle) => (
            <Route
              path={`/ecommerce/${wearStyle}`}
              element={
                <CategoryFilterProvider>
                  <CartProvider>
                    <ProductCatalog />
                  </CartProvider>
                </CategoryFilterProvider>
              }
              key={wearStyle}
            />
          ))}
          {uniquePolarPatterns.map((polarPattern) => (
            <Route
              path={`/ecommerce/${polarPattern}`}
              element={
                <CategoryFilterProvider>
                  <CartProvider>
                    <ProductCatalog />
                  </CartProvider>
                </CategoryFilterProvider>
              }
              key={polarPattern}
            />
          ))}
          {/* <Route path='/home-skeleton' element={<HomeSkeleton />} /> */}
          {/* <Route path='/product-catalog-skeleton' element={<ProductCatalogSkeleton />} /> */}
          {/* <Route path='/product-detail-page-skeleton' element={<ProductDetailPageSkeleton />} /> */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
