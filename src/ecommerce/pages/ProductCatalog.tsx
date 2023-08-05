import Header from '../components/navigation/header/Header';
import Footer from '../components/navigation/footer/eFooter';
import ProductFilters from '../components/features/product-filters/ProductFilters';
import ProductProvider from '../components/product/product-provider/ProductProvider';

const ProductCatalog = (): JSX.Element => {
  return (
    <div data-theme="eco-light-mode">
      <Header />
      <section className="browseProduct">
        <ProductFilters />
        <main>
          <ProductProvider />
        </main>
      </section>
      <Footer />
    </div>
  );
};

export default ProductCatalog;
