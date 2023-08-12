import Header from '../components/navigation/header/Header';
import Footer from '../components/navigation/footer/eFooter';
import ProductProvider from '../components/product/product-provider/ProductProvider';
import ProductFilterConstructor from '../components/features/product-filters/ProductFilterConstructor';
import useUniqueData from '../hooks/useUniqueData';
import ConditionallyRenderedProductFilters from '../components/features/product-filters/ConditionallyRenderedProductFilters';
import useBreadCrumbs from '../hooks/useBreadcrumbs';

const ProductCatalog = (): JSX.Element => {
  const CompanyFilter = (): JSX.Element => ProductFilterConstructor('Filter by Company', useUniqueData().useUniqueCompanies);
  return (
    <>
      <Header />
      <section className="browseProduct">
        <section className="productFilters">
          <div className="productFilters__panel">{useBreadCrumbs()}</div>
          <div className="productFilters__panel">
            <ConditionallyRenderedProductFilters />
            <CompanyFilter />
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
