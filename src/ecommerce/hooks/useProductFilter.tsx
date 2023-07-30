import { ProductDatabase } from '../assets/production-data/ProductDatabase';
import { useCategoryFilterContext } from '../context/categoryFilter/StateContextProvider';
import { ProductType } from '../context/types';

const useProductFilter = (): ProductType[] => {
  // @ts-ignore:
  const { categoryFilter } = useCategoryFilterContext();

  const filteredProducts = ProductDatabase.reduce(
    (result: { miscProducts: ProductType[]; headphones: ProductType[]; companyProducts: ProductType[]; companyHeadphones: ProductType[] }, product: ProductType) => {
      if (product.category?.includes(categoryFilter)) {
        result.miscProducts.push({ ...product });
      }
      if (product.wearStyle?.includes(categoryFilter)) {
        result.headphones.push({ ...product });
      }
      if (product.company?.includes(categoryFilter)) {
        result.companyProducts.push({ ...product });
      }
      if (product.company?.includes(categoryFilter) && product.wearStyle?.includes(categoryFilter)) {
        result.companyHeadphones.push({ ...product });
      }
      return result;
    },
    { miscProducts: [], headphones: [], companyProducts: [], companyHeadphones: [] }
  );

  const useMiscProducts = filteredProducts.miscProducts;
  const useHeadphones = filteredProducts.headphones;
  const useCompanyProducts = filteredProducts.companyProducts;
  const useCompanyHeadphones = filteredProducts.companyHeadphones;

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
