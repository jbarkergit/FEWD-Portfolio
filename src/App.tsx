import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';

//Shared
import SuspenseLoader from './shared/pages/SuspenseLoader';
const NotFound = lazy(() => import('./shared/pages/NotFound'));
//Portfolio
const Portfolio = lazy(() => import('./portfolio/pages/Portfolio'));
//Ecommerce
const Home = lazy(() => import('./ecommerce/pages/Home'));
const BrowseProduct = lazy(() => import('./ecommerce/pages/BrowseProduct'));
const ProductPage = lazy(() => import('./ecommerce/pages/ProductPage'));
import { StateProvider } from './ecommerce/context/categoryFilter/StateContextProvider';
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
        <StateProvider>
          <CartProvider>
            <Routes>
              <Route path="*" element={<NotFound />} />
              <Route path="/" element={<Portfolio />} />
              <Route path="/ecommerce" element={<Home />} />
              <Route path="/ecommerce/products" element={<BrowseProduct />} />
              <Route path="/ecommerce/headphones" element={<BrowseProduct />} />
              <Route path="/ecommerce/amps-dacs" element={<BrowseProduct />} />
              <Route path="/ecommerce/microphones" element={<BrowseProduct />} />
              <Route path="/ecommerce/interfaces" element={<BrowseProduct />} />
              <Route path="/ecommerce/product/:paramId" element={<ProductPage />} />
            </Routes>
          </CartProvider>
        </StateProvider>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
