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
const ProductCatalog = lazy(() => import('./ecommerce/pages/ProductCatalog'));
const ProductDetailPage = lazy(() => import('./ecommerce/pages/ProductDetailPage'));
import { StateProvider } from './ecommerce/context/CategoryFilterContext';
import { CartProvider } from './ecommerce/context/CartContext';

//Lenis Package
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
              <Route path="/ecommerce/products" element={<ProductCatalog />} />
              <Route path="/ecommerce/headphones" element={<ProductCatalog />} />
              <Route path="/ecommerce/amps-dacs" element={<ProductCatalog />} />
              <Route path="/ecommerce/microphones" element={<ProductCatalog />} />
              <Route path="/ecommerce/interfaces" element={<ProductCatalog />} />
              <Route path="/ecommerce/product/:paramId" element={<ProductDetailPage />} />
            </Routes>
          </CartProvider>
        </StateProvider>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
