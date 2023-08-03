import Header from '../components/navigation/header/Header';
import Footer from '../components/navigation/footer/eFooter';
import ProductFilters from '../components/features/product-filters/ProductFilters';
import ProductCatalog from '../components/product/product-catalog/ProductCatalog';

const BrowseProduct = (): JSX.Element => {
  return (
    <div data-theme="eco-light-mode">
      <Header />
      <section className="browseProduct">
        <ProductFilters />
        <main>
          <ProductCatalog />
        </main>
      </section>
      <Footer />
    </div>
  );
};

export default BrowseProduct;
