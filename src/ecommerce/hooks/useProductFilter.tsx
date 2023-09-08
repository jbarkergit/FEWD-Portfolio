import { ProductDatabase } from '../assets/production-data/product-db/ProductDatabase';
import { useCategoryFilterContext } from '../context/CategoryFilterContext';
import { ProductType } from '../types/ProductType';

const useProductFilter = () => {
  // @ts-ignore:
  const { categoryFilter } = useCategoryFilterContext();

  const getReducedProductArray = ProductDatabase.reduce(
    (result: { filteredData: ProductType[] }, product: ProductType) => {
      switch (categoryFilter) {
        case 'headphones':
        case 'microphones':
        case 'interfaces':
          if (product.category?.includes(categoryFilter)) result.filteredData.push({ ...product });
          break;
        case 'amps-dacs':
          if (product.category?.includes('amps') || product.category?.includes('dacs') || product.category?.includes('amps-dacs'))
            result.filteredData.push({ ...product });
          break;
        default:
          if (product.company?.includes(categoryFilter)) result.filteredData.push({ ...product });
          if (product.wearStyle?.includes(categoryFilter)) result.filteredData.push({ ...product });
          if (product.polarPattern?.includes(categoryFilter)) result.filteredData.push({ ...product });
      }
      return result;
    },
    { filteredData: [] }
  );

  if (categoryFilter === 'products') return ProductDatabase.sort((a: ProductType, b: ProductType) => (a.company > b.company ? 1 : -1));
  else return getReducedProductArray.filteredData.sort((a: ProductType, b: ProductType) => (a.company > b.company ? 1 : -1));
};

export default useProductFilter;
