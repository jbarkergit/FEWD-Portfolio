import { useMemo } from 'react';
import { ProductType } from '../types/ProductType';
import { setArrayType } from '../types/SetArrayType';
import useProductFilter from './useProductFilter';

const usePaginatedSets = (): setArrayType[] => {
  const useFilteredProducts: ProductType[] = useProductFilter(); //Pull product data
  const filteredProducts: ProductType[] = useFilteredProducts; //useMemo not necessary, useProductFilter reruns on navigation.
  const paginatedProducts: setArrayType[] = []; //Initialize empty array for paginated sets

  //Iterate over products, slice into arrays of 9, push to storage array: paginatedProducts
  for (let i = 0; i < filteredProducts.length; i += 9) {
    const setItems = filteredProducts.slice(i, i + 9);
    paginatedProducts.push({ id: paginatedProducts.length + 1, products: setItems });
  }

  return paginatedProducts;
};

export default usePaginatedSets;
