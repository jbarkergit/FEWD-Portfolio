import Header from '../layouts/navigation/Header';
import Footer from '../layouts/navigation/Footer';
import { ProductProvider } from '../context/ProductProvider';
import ProductFilters from '../features/ProductFilters';

const BrowseProduct = () => {
  return (
    <>
      <Header />
      <section className="flexBox justifyCenter alignUnset">
        <main>
          <ProductFilters />
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
