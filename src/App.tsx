import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SuspenseLoader from './shared/pages/SuspenseLoader';
const NotFound = lazy(() => import('./shared/pages/NotFound'));

import Portfolio from './portfolio/pages/Portfolio';
import { CategoryFilterProvider } from './ecommerce/context/CategoryFilterContext';

const Ecommerce = lazy(() => import('./ecommerce/pages/Home'));
const BrowseProduct = lazy(() => import('./ecommerce/pages/BrowseProduct'));
const ProductPage = lazy(() => import('./ecommerce/pages/ProductPage'));

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={SuspenseLoader()}>
          <CategoryFilterProvider>
            <Routes>
              <Route path="/suspense-loader" element={<SuspenseLoader />} />
              <Route path="*" element={<NotFound />} />

              <Route path="/" element={<Portfolio />} />

              <Route path="/ecommerce" element={<Ecommerce />} />
              <Route path="/ecommerce/products" element={<BrowseProduct />} />
              <Route path="/ecommerce/headphones" element={<BrowseProduct />} />
              <Route path="/ecommerce/amps-dacs" element={<BrowseProduct />} />
              <Route path="/ecommerce/amp-dac-combos" element={<BrowseProduct />} />
              <Route path="/ecommerce/microphones" element={<BrowseProduct />} />
              <Route path="/ecommerce/interfaces" element={<BrowseProduct />} />
              <Route path="/ecommerce/products/:sku" element={<ProductPage />} />
            </Routes>
          </CategoryFilterProvider>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
