import Header from '../layouts/navigation/Header';
import Footer from '../layouts/navigation/Footer';
import { ProductProvider } from '../context/ProductProvider';
import ProductDisplayFilter from '../features/ProductDisplayFilter';
import ProductFiltersProps from '../components/props/features/ProductFiltersProps';

const BrowseProduct = () => {
  return (
    <>
      <Header />
      <section className="flexBox justifyCenter alignUnset">
        <main>
          <ProductDisplayFilter />
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
