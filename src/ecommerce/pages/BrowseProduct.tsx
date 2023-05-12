import Header from '../layouts/navigation/Header';
import Footer from '../layouts/navigation/Footer';
import ProductDisplayFilter from '../components/features/ProductDisplayFilter';
import ProductFilters from '../components/features/ProductFilters';
import ProductProvider from '../context/ProductProvider';

const BrowseProduct = () => {
  return (
    <>
      <Header />
      <section className="flexBox justifyCenter alignUnset">
        <main>
          <ProductDisplayFilter />
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
