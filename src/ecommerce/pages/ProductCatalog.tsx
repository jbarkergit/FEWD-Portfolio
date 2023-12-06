import { useLocation } from 'react-router-dom';

// Context
import { CartProvider } from '../context/CartContext';

// Components
import Header from '../components/navigation/header/EcoHeader';
import EFooter from '../components/navigation/footer/eFooter';
import ProductProvider from '../components/product/product-provider/ProductProvider';
import ProductFilterConstructor from '../components/features/product-filters/ProductFilterConstructor';
import { useUniqueData } from '../hooks/useUniqueData';
import ConditionallyRenderedProductFilters from '../components/features/product-filters/ConditionallyRenderedProductFilters';

const ProductCatalog = (): JSX.Element => {
  const CompanyFilter = (): JSX.Element => ProductFilterConstructor('Filter by Company', useUniqueData().useUniqueCompanies);
  const breadcrumb: string = useLocation().pathname.replace(/(ecommerce|\W)+/g, ' ');
  return (
    <CartProvider>
      <div id='ecommerce'>
        <Header />
        <section className='browseProduct'>
          <section className='productCatalogTopper'>
            <div className='productCatalogTopper__panel breadCrumbs' aria-label={breadcrumb} tabIndex={0}>
              <h1>{breadcrumb}</h1>
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
      </div>
    </CartProvider>
  );
};
export default ProductCatalog;
