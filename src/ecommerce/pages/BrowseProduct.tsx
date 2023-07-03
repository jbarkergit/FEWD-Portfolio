import Header from '../components/navigation/header/Header';
import Footer from '../components/navigation/footer/eFooter';
import ProductFilters from '../components/features/filters/ProductFilters';
import ProductProvider from '../context/products/ProductProvider';
import useCart from '../hooks/useCart';
import { ProductType } from '../context/types';
import { ProductDatabase } from '../assets/production-data/ProductDatabase';
import { useCategoryFilterContext } from '../context/products/CategoryFilterContext';

const useProductFilter = (): ProductType[] => {
  // @ts-ignore:
  const { categoryFilter } = useCategoryFilterContext();

  const useMiscProducts = ProductDatabase.reduce((miscProducts: ProductType[], product: ProductType) => {
    if (product.category?.includes(categoryFilter)) {
      miscProducts.push({ ...product });
    }
    return miscProducts;
  }, []);

  const useHeadphones = ProductDatabase.reduce((headphones: ProductType[], product: ProductType) => {
    if (product.wearStyle?.includes(categoryFilter)) {
      headphones.push({ ...product });
    }
    return headphones;
  }, []);

  const useCompanyProducts = ProductDatabase.reduce((companyProducts: ProductType[], product: ProductType) => {
    if (product.company?.includes(categoryFilter)) {
      companyProducts.push({ ...product });
    }
    return companyProducts;
  }, []);

  const useCompanyHeadphones = ProductDatabase.reduce((companyHeadphones: ProductType[], product: ProductType) => {
    if (product.company?.includes(categoryFilter)) {
      companyHeadphones.push({ ...product });
    }
    return companyHeadphones;
  }, []);

  switch (categoryFilter) {
    case '':
    case 'amp':
    case 'dac':
    case 'microphone':
    case 'interface':
      return useMiscProducts;
    case 'headphone':
    case 'openbackheadphone':
    case 'semiopenheadphone':
    case 'closedbackheadphone':
      return useHeadphones;
    default:
      if (useCompanyProducts.length > 0) return useCompanyProducts;
      else if (useCompanyHeadphones.length > 0) return useCompanyHeadphones;
      else return ProductDatabase;
  }
};

const BrowseProduct = (): JSX.Element => {
  const { dispatch, REDUCER_ACTIONS } = useCart();
  return (
    <>
      <Header />
      <section className="browseProduct">
        <ProductFilters />
        <main>
          <ul className="productGrid">
            {useProductFilter()
              .sort((a: ProductType, b: ProductType) => (a.company > b.company ? 1 : -1))
              .map((product: ProductType) => (
                <ProductProvider product={product} dispatch={dispatch} REDUCER_ACTIONS={REDUCER_ACTIONS} />
              ))}
          </ul>
        </main>
      </section>
      <Footer />
    </>
  );
};

export default BrowseProduct;
