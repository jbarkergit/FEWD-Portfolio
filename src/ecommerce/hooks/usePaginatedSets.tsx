import { ProductType } from '../types/ProductType';
import { setArrayType } from '../types/SetArrayType';
import useProductFilter from './useProductFilter';

const usePaginatedSets = (): setArrayType[] => {
  const filteredProducts: ProductType[] = useProductFilter(); //Pull product data //useMemo not necessary, useProductFilter reruns on navigation.
  const paginatedProducts: setArrayType[] = []; //Initialize empty array for paginated sets

  //Iterate over products, slice into arrays of 7, push to storage array: paginatedProducts
  for (let i = 0; i < filteredProducts.length; i += 7) {
    const setItems = filteredProducts.slice(i, i + 7);
    paginatedProducts.push({ id: paginatedProducts.length + 1, products: setItems });
  }

  return paginatedProducts;
};

export default usePaginatedSets;
