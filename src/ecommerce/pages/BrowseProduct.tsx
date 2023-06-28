import Header from '../components/navigation/header/Header';
import Footer from '../components/navigation/footer/Footer';
import ProductFilters from '../components/features/filters/ProductFilters';
import ProductProvider from '../context/products/ProductProvider';

const BrowseProduct = () => {
  return (
    <>
      <Header />
      <section className="browseProduct">
        <ProductFilters />
        <main>
          <ul className="productGrid">
            <ProductProvider />
          </ul>
        </main>
      </section>
      <Footer />
    </>
  );
};

export default BrowseProduct;
