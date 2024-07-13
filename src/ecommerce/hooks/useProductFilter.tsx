import { ProductType } from '../context/CartContext';
import { useProductDatabase } from './useProductDatabase';

export const useProductFilter = () => {
  const location = window.location.pathname.replace('/ecommerce/', '');

  const getReducedProductArray = useProductDatabase.reduce(
    (result: { filteredData: ProductType[] }, product: ProductType) => {
      switch (location) {
        case 'headphones':
        case 'microphones':
        case 'interfaces':
          if (product.category?.includes(location)) result.filteredData.push({ ...product });
          break;
        case 'amps-dacs':
          if (product.category?.includes('amps') || product.category?.includes('dacs') || product.category?.includes('amps-dacs'))
            result.filteredData.push({ ...product });
          break;
        default:
          if (product.company?.includes(location)) result.filteredData.push({ ...product });
          if (product.wearStyle?.includes(location)) result.filteredData.push({ ...product });
          if (product.polarPattern?.includes(location)) result.filteredData.push({ ...product });
      }
      return result;
    },
    { filteredData: [] }
  );

  if (location === 'products') return useProductDatabase.sort((a: ProductType, b: ProductType) => (a.company > b.company ? 1 : -1));
  else return getReducedProductArray.filteredData.sort((a: ProductType, b: ProductType) => (a.company > b.company ? 1 : -1));
};
