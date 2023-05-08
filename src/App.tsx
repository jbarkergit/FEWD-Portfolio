import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SuspenseLoader from './shared/pages/SuspenseLoader';
const NotFound = lazy(() => import('./shared/pages/NotFound'));

import Portfolio from './portfolio/pages/Portfolio';

const Ecommerce = lazy(() => import('./ecommerce/pages/Home'));
const BrowseProduct = lazy(() => import('./ecommerce/pages/BrowseProduct'));
const ProductPage = lazy(() => import('./ecommerce/pages/ProductPage'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={SuspenseLoader()}>
        <Routes>
          <Route path="/suspense-loader" element={<SuspenseLoader />} />
          <Route path="*" element={<NotFound />} />

          <Route path="/" element={<Portfolio />} />

          <Route path="/ecommerce" element={<Ecommerce />} />
          <Route path="/products" element={<BrowseProduct />} />
          <Route path="/products/:sku" element={<ProductPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
