import { ProductDatabase } from '../assets/production-data/ProductDatabase';
import { useCategoryFilterContext } from '../context/CategoryFilterContext';
import { ProductType } from '../types/ProductType';

const useProductFilter = (): ProductType[] => {
  // @ts-ignore:
  const { categoryFilter } = useCategoryFilterContext();

  const filteredProducts = ProductDatabase.reduce(
    (
      result: {
        categoryProducts: ProductType[];
        ampsDacs: ProductType[];
        wearStyleHeadphones: ProductType[];
        companyProducts: ProductType[];
        companyHeadphones: ProductType[];
        polarPatternMicrophones: ProductType[];
      },
      product: ProductType
    ) => {
      if (product.category?.includes(categoryFilter)) result.categoryProducts.push({ ...product });
      if (product.category?.includes('amps' || 'dacs' || 'amps-dacs')) result.ampsDacs.push({ ...product });
      if (product.wearStyle?.includes(categoryFilter)) result.wearStyleHeadphones.push({ ...product });
      if (product.company?.includes(categoryFilter) && product.wearStyle?.includes(categoryFilter)) result.companyHeadphones.push({ ...product });
      if (product.company?.includes(categoryFilter)) result.companyProducts.push({ ...product });
      if (product.polarPattern?.includes(categoryFilter)) result.polarPatternMicrophones.push({ ...product });
      return result;
    },
    { categoryProducts: [], wearStyleHeadphones: [], ampsDacs: [], companyProducts: [], companyHeadphones: [], polarPatternMicrophones: [] }
  );

  const useCategoryProducts = filteredProducts.categoryProducts;
  const useAmpsDacs = filteredProducts.ampsDacs;
  const useWearStyleHeadphones = filteredProducts.wearStyleHeadphones;
  const useCompanyHeadphones = filteredProducts.companyHeadphones;
  const useCompanyProducts = filteredProducts.companyProducts;
  const usePolarPatternMicrophones = filteredProducts.polarPatternMicrophones;

  switch (categoryFilter) {
    case 'headphones':
    case 'microphones':
    case 'interfaces':
      return useCategoryProducts;
    case 'amps-dacs':
      return useAmpsDacs;
    case 'openbackheadphones':
    case 'semiopenheadphones':
    case 'closedbackheadphones':
      return useWearStyleHeadphones;
    case 'cardioid':
    case 'omni':
    case 'wide cardioid':
    case 'hyper cardioid':
    case 'figure-8':
      return usePolarPatternMicrophones;
    default:
      if (useCompanyProducts.length > 0) return useCompanyProducts; //check if user is filtering by companies
      else if (useCompanyHeadphones.length > 0) return useCompanyHeadphones; //check if user is filtering by headphones wear style
      else return ProductDatabase; //return product database if no condition is met
  }
};

export default useProductFilter;
