import { v4 as uuidv4 } from 'uuid';
import Header from '../components/navigation/header/Header';
import Footer from '../components/navigation/footer/eFooter';
import ProductFilters from '../components/features/product-filters/ProductFilters';
import useProductFilter from '../hooks/useProductFilter';
import useCart from '../hooks/useCart';
import { ProductType } from '../types/ProductType';
import ProductProvider from '../components/product/product-provider/ProductProvider';

const ProductCatalog = (): JSX.Element => {
  const { dispatch, REDUCER_ACTIONS } = useCart();
  return (
    <div data-theme="eco-light-mode">
      <Header />
      <section className="browseProduct">
        <ProductFilters />
        <main>
          <ul className="productGrid">
            {useProductFilter()
              .sort((a: ProductType, b: ProductType) => (a.company > b.company ? 1 : -1))
              .map((product: ProductType) => (
                <ProductProvider key={uuidv4()} product={product} dispatch={dispatch} REDUCER_ACTIONS={REDUCER_ACTIONS} />
              ))}
          </ul>
        </main>
      </section>
      <Footer />
    </div>
  );
};

export default ProductCatalog;
