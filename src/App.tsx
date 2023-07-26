import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';

import SuspenseLoader from './shared/pages/SuspenseLoader';
const NotFound = lazy(() => import('./shared/pages/NotFound'));
import { StateProvider } from './shared/context/StateContextProvider';

const Portfolio = lazy(() => import('./portfolio/pages/Portfolio'));

const Ecommerce = lazy(() => import('./ecommerce/pages/Home'));
import BrowseProduct from './ecommerce/pages/BrowseProduct';
const ProductPage = lazy(() => import('./ecommerce/pages/ProductPage'));
import { CartProvider } from './ecommerce/context/cart/CartContext';

function App() {
  const lenis = new Lenis();
  function raf(time: any) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  return (
    <BrowserRouter>
      <Suspense fallback={SuspenseLoader()}>
        {/* @ts-ignore */}
        <StateProvider>
          <CartProvider>
            <Routes>
              <Route path="*" element={<NotFound />} />
              <Route path="/" element={<Portfolio />} />
              <Route path="/ecommerce" element={<Ecommerce />} />
              <Route path="/ecommerce/products" element={<BrowseProduct />} />
              <Route path="/ecommerce/headphones" element={<BrowseProduct />} />
              <Route path="/ecommerce/amps-dacs" element={<BrowseProduct />} />
              <Route path="/ecommerce/microphones" element={<BrowseProduct />} />
              <Route path="/ecommerce/interfaces" element={<BrowseProduct />} />
              <Route path="/ecommerce/product/:paramId" element={<ProductPage />} />{' '}
            </Routes>
          </CartProvider>
        </StateProvider>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
