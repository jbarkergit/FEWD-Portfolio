import { ProductDatabase } from '../assets/production-data/ProductDatabase';
import { useCategoryFilterContext } from '../context/CategoryFilterContext';
import { ProductType } from '../types/ProductType';

const useProductFilter = (): ProductType[] | null => {
  // @ts-ignore:
  const { categoryFilter } = useCategoryFilterContext();

  const filteredProducts = ProductDatabase.reduce(
    (
      result: {
        categoryProducts: ProductType[];
        ampsDacs: ProductType[];
        companyProducts: ProductType[];
        wearStyleHeadphones: ProductType[];
        polarPatternMicrophones: ProductType[];
      },
      product: ProductType
    ) => {
      if (product.category?.includes(categoryFilter)) result.categoryProducts.push({ ...product });
      if (product.category?.includes('amps') || product.category?.includes('dacs') || product.category?.includes('amps-dacs')) result.ampsDacs.push({ ...product });
      if (product.company?.includes(categoryFilter)) result.companyProducts.push({ ...product });
      if (product.wearStyle?.includes(categoryFilter)) result.wearStyleHeadphones.push({ ...product });
      if (product.polarPattern?.includes(categoryFilter)) result.polarPatternMicrophones.push({ ...product });
      return result;
    },
    { categoryProducts: [], wearStyleHeadphones: [], ampsDacs: [], companyProducts: [], polarPatternMicrophones: [] }
  );

  //Main navigation
  const useCategoryProducts = filteredProducts.categoryProducts.sort((a: ProductType, b: ProductType) => (a.company > b.company ? 1 : -1));
  //Amps & Dacs (union page)
  const useAmpsDacs = filteredProducts.ampsDacs.sort((a: ProductType, b: ProductType) => (a.company > b.company ? 1 : -1));
  //COMPANY FILTER
  const useCompanyProducts = filteredProducts.companyProducts.sort((a: ProductType, b: ProductType) => (a.company > b.company ? 1 : -1));
  //WEAR STYLE HEADPHONE FILTER
  const useWearStyleHeadphones = filteredProducts.wearStyleHeadphones.sort((a: ProductType, b: ProductType) => (a.company > b.company ? 1 : -1));
  //POLAR PATTERN MICROPHONE FILTER
  const usePolarPatternMicrophones = filteredProducts.polarPatternMicrophones.sort((a: ProductType, b: ProductType) => (a.company > b.company ? 1 : -1));

  if (!categoryFilter) return null; //Performance safety net: prevent switch from firing early causing default case to render

  //Conditionally render product arrays
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
    case 'wide-cardioid':
    case 'hyper-cardioid':
    case 'figure-8':
      return usePolarPatternMicrophones;
    case 'closed-back':
    case 'open-back':
    case 'semi-open':
      return useWearStyleHeadphones;
    default:
      if (useCompanyProducts.length > 0) return useCompanyProducts; //User Company Filter interaction check
      else return ProductDatabase; //Return all products if no condition is satisfied
  }
};

export default useProductFilter;
