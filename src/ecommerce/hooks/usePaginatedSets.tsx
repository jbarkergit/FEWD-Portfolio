import { ProductType } from '../types/ProductType';
import { setArrayType } from '../types/SetArrayType';
import useProductFilter from './useProductFilter';

const usePaginatedSets = (): setArrayType[] => {
  const filteredProducts: ProductType[] = useProductFilter().sort((a: ProductType, b: ProductType) => (a.company > b.company ? 1 : -1));
  const paginatedSets: setArrayType[] = [];

  for (let i = 0; i < filteredProducts.length; i += 9) {
    const setItems = filteredProducts.slice(i, i + 9);
    paginatedSets.push({ id: paginatedSets.length + 1, products: setItems });
  }

  return paginatedSets;
};

export default usePaginatedSets;
