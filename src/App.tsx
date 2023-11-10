import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

/** 404 Error */
const NotFound = lazy(() => import('./app/protocol-error-404/NotFound'));

/** Portfolio */
const Portfolio = lazy(() => import('./portfolio/pages/Portfolio'));

/** Ecommerce */
const Home = lazy(() => import('./ecommerce/pages/Home'));
const ProductCatalog = lazy(() => import('./ecommerce/pages/ProductCatalog'));
const ProductDetailPage = lazy(() => import('./ecommerce/pages/ProductDetailPage'));
import useUniqueData from './ecommerce/hooks/useUniqueData';

/** Discord Clone */
const DiscordClone = lazy(() => import('./discord-clone/pages/DiscordClone'));

/** Suspense Path Handler */
import { SuspensePathHandler } from './app/suspense/SuspensePathHandler';

/** Application */
function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<SuspensePathHandler />}>
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
          {useUniqueData().useUniqueCompanies.map((company: string) => (
            <Route path={`/ecommerce/${company}`} element={<ProductCatalog />} key={company} />
          ))}
          {useUniqueData().useUniqueWearStyles.map((wearStyle: string) => (
            <Route path={`/ecommerce/${wearStyle}`} element={<ProductCatalog />} key={wearStyle} />
          ))}
          {useUniqueData().useUniquePolarPatterns.map((polarPattern: string) => (
            <Route path={`/ecommerce/${polarPattern}`} element={<ProductCatalog />} key={polarPattern} />
          ))}

          <Route path='/ecommerce/discord-clone' element={<DiscordClone />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
