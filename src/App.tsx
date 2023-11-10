import { Suspense, lazy, useEffect, useMemo, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

/** 404 Error */
const NotFound = lazy(() => import('./protocol-errors/404/NotFound'));

/** Portfolio */
const Portfolio = lazy(() => import('./portfolio/pages/Portfolio'));

/** Ecommerce */
const Home = lazy(() => import('./ecommerce/pages/Home'));
const ProductCatalog = lazy(() => import('./ecommerce/pages/ProductCatalog'));
const ProductDetailPage = lazy(() => import('./ecommerce/pages/ProductDetailPage'));
// Pathing via Hooks
import useUniqueData from './ecommerce/hooks/useUniqueData';
// Context
import { CategoryFilterProvider } from './ecommerce/context/CategoryFilterContext';
import { CartProvider } from './ecommerce/context/CartContext';

/** Discord Clone */
const DiscordClone = lazy(() => import('./discord-clone/pages/DiscordClone'));

/** Suspense */
function SuspensePathHandler() {
  const path = useLocation().pathname;
  const [Skeleton, setSkeleton] = useState<JSX.Element | null>(null);

  useEffect(() => {
    // Ecommerce
    if (path === '/ecommerce') {
      import('./ecommerce/skeletons/pages/HomeSkeleton').then((module) => setSkeleton(<module.default />));
    } else if (['/ecommerce/products', '/ecommerce/headphones', '/ecommerce/amps-dacs', '/ecommerce/microphones', '/ecommerce/interfaces'].includes(path)) {
      import('./ecommerce/skeletons/pages/ProductCatalogSkeleton').then((module) => setSkeleton(<module.default />));
    } else if (path.startsWith('/ecommerce')) {
      import('./ecommerce/skeletons/pages/ProductDetailPageSkeleton').then((module) => setSkeleton(<module.default />));
    } else {
      // Portfolio
      setSkeleton(<div id='defaultSuspense' style={{ height: '100vh', width: '100%', backgroundColor: 'hsl(0, 0%, 10%)' }} />);
    }
  }, [path]);

  return Skeleton;
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

          <Route path='/ecommerce/discord-clone' element={<DiscordClone />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
