import Header from '../components/navigation/header/Header';
import Footer from '../components/navigation/footer/eFooter';
import ProductProvider from '../components/product/product-provider/ProductProvider';
import useBreadcrumbs from '../hooks/useBreadcrumbs';
import ProductFilterConstructor from '../components/features/product-filters/ProductFilterConstructor';
import useUniqueData from '../hooks/useUniqueData';

const ProductCatalog = (): JSX.Element => {
  //Filter Components built with ProductFilterConstructor: takes initial filter name and custom hook that returns data
  //Data filtered via reduce method using useUniqueData custom hook
  const CompanyFilter = (): JSX.Element => ProductFilterConstructor('Filter by Company', useUniqueData().useUniqueCompanies);
  const PolarPatternFilter = (): JSX.Element => ProductFilterConstructor('Filter by Polar Pattern', useUniqueData().useUniquePolarPatterns);
  const WearStyleFilter = (): JSX.Element => ProductFilterConstructor('Filter by Wear Style', useUniqueData().useUniqueWearStyles);
  return (
    <>
      <Header />
      <section className="browseProduct">
        <section className="productFilters">
          <div className="productFilters__panel">{useBreadcrumbs()}</div>
          <div className="productFilters__panel">
            <WearStyleFilter />
            <PolarPatternFilter />
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
