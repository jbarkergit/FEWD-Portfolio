import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SuspenseLoader from './shared/pages/SuspenseLoader';

import Portfolio from './portfolio/pages/Portfolio';

const Ecommerce = lazy(() => import('./ecommerce/pages/main/Home'));
const Headphones = lazy(() => import('./ecommerce/pages/products/Headphones'));
const Microphones = lazy(() => import('./ecommerce/pages/products/Microphones'));
const Interfaces = lazy(() => import('./ecommerce/pages/products/Interfaces'));
const AmpsDacs = lazy(() => import('./ecommerce/pages/products/AmpsDacs'));
const ProductPage = lazy(() => import('./ecommerce/pages/main/ProductPage'));

const NotFound = lazy(() => import('./shared/pages/NotFound'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={SuspenseLoader()}>
        <Routes>
          <Route path="/" element={<Portfolio />} />

          <Route path="/ecommerce" element={<Ecommerce />} />
          <Route path="/headphones" element={<Headphones />} />
          <Route path="/headphones/:productId" element={<ProductPage />} />
          <Route path="/amps-dacs" element={<AmpsDacs />} />
          <Route path="/amps-dacs/:productId" element={<ProductPage />} />
          <Route path="/microphones" element={<Microphones />} />
          <Route path="/microphones/:productId" element={<ProductPage />} />
          <Route path="/interfaces" element={<Interfaces />} />
          <Route path="/interfaces/:productId" element={<ProductPage />} />

          <Route path="*" element={<NotFound />} />
          <Route path="/suspense-loader" element={<SuspenseLoader />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
