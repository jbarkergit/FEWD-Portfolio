import { ProductDatabase } from '../assets/production-data/ProductDatabase';
import { useCategoryFilterContext } from '../context/categoryFilter/StateContextProvider';
import { ProductType } from '../context/types';

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

export default useProductFilter;
