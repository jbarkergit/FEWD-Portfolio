import Header from '../components/navigation/header/Header';
import Footer from '../components/navigation/footer/eFooter';
import ProductProvider from '../components/product/product-provider/ProductProvider';
import BrandFilter from '../components/features/product-filters/BrandFilter';
import PolarPatternFilter from '../components/features/product-filters/PolarPatternFilter';
import WearStyleFilter from '../components/features/product-filters/WearStyleFilter';
import useBreadcrumbs from '../hooks/useBreadcrumbs';

const ProductCatalog = (): JSX.Element => {
  return (
    <>
      <Header />
      <section className="browseProduct">
        <section className="productFilters">
          <div className="productFilters__panel">{useBreadcrumbs()}</div>
          <div className="productFilters__panel">
            <PolarPatternFilter />
            <WearStyleFilter />
            <BrandFilter />
          </div>
        </section>
        <main>
          <ProductProvider />
        </main>
      </section>
      <Footer />
    </>
  );
};

export default ProductCatalog;
