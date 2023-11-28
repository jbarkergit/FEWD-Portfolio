import { useLocation } from 'react-router-dom';

// Context
import { CategoryFilterProvider } from '../context/CategoryFilterContext';
import { CartProvider } from '../context/CartContext';

// Components
import Header from '../components/navigation/header/Header';
import EFooter from '../components/navigation/footer/eFooter';
import ProductProvider from '../components/product/product-provider/ProductProvider';
import ProductFilterConstructor from '../components/features/product-filters/ProductFilterConstructor';
import { useUniqueData } from '../hooks/useUniqueData';
import ConditionallyRenderedProductFilters from '../components/features/product-filters/ConditionallyRenderedProductFilters';

const ProductCatalog = (): JSX.Element => {
  const CompanyFilter = (): JSX.Element => ProductFilterConstructor('Filter by Company', useUniqueData().useUniqueCompanies);
  return (
    <CategoryFilterProvider>
      <CartProvider>
        <Header />
        <section className='browseProduct'>
          <section className='productCatalogTopper'>
            <div className='productCatalogTopper__panel breadCrumbs' aria-label={useLocation().pathname.replace(/(ecommerce|\W)+/g, ' ')} tabIndex={0}>
              <h1>{useLocation().pathname.replace(/(ecommerce|\W)+/g, ' ')}</h1>
            </div>
            <div className='productCatalogTopper__panel'>
              <ConditionallyRenderedProductFilters />
              <CompanyFilter />
            </div>
          </section>
          <main>
            <ProductProvider />
          </main>
        </section>
        <EFooter />
      </CartProvider>
    </CategoryFilterProvider>
  );
};

export default ProductCatalog;
