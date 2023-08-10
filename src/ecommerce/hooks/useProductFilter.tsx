import { ProductDatabase } from '../assets/production-data/ProductDatabase';
import { useCategoryFilterContext } from '../context/CategoryFilterContext';
import { ProductType } from '../types/ProductType';

const useProductFilter = (): ProductType[] => {
  // @ts-ignore:
  const { categoryFilter } = useCategoryFilterContext();

  const filteredProducts = ProductDatabase.reduce(
    (
      result: { miscProducts: ProductType[]; headphones: ProductType[]; ampsDacs: ProductType[]; companyProducts: ProductType[]; companyHeadphones: ProductType[] },
      product: ProductType
    ) => {
      if (product.category?.includes(categoryFilter)) result.miscProducts.push({ ...product });
      if (product.wearStyle?.includes(categoryFilter)) result.headphones.push({ ...product });
      if (product.category?.includes('amps' || 'dacs' || 'amps-dacs')) result.ampsDacs.push({ ...product });
      if (product.company?.includes(categoryFilter)) result.companyProducts.push({ ...product });
      if (product.company?.includes(categoryFilter) && product.wearStyle?.includes(categoryFilter)) result.companyHeadphones.push({ ...product });
      return result;
    },
    { miscProducts: [], headphones: [], ampsDacs: [], companyProducts: [], companyHeadphones: [] }
  );

  const useMiscProducts = filteredProducts.miscProducts;
  const useHeadphones = filteredProducts.headphones;
  const useAmpsDacs = filteredProducts.ampsDacs;
  const useCompanyProducts = filteredProducts.companyProducts;
  const useCompanyHeadphones = filteredProducts.companyHeadphones;

  switch (categoryFilter) {
    case '':
    case 'amps':
    case 'dacs':
    case 'microphones':
    case 'interfaces':
      return useMiscProducts;
    case 'amps-dacs':
      return useAmpsDacs;
    case 'headphones':
    case 'openbackheadphones':
    case 'semiopenheadphones':
    case 'closedbackheadphones':
      return useHeadphones;
    default:
      if (useCompanyProducts.length > 0) return useCompanyProducts;
      else if (useCompanyHeadphones.length > 0) return useCompanyHeadphones;
      else return ProductDatabase;
  }
};

export default useProductFilter;
