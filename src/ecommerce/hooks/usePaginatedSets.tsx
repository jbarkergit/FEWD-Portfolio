import { useEffect, useState } from 'react';
import { ProductType } from '../types/ProductType';
import { useProductFilter } from './useProductFilter';

/**
 * Iterates over filteredProducts
 * Slices products into arrays with a length of 7
 * Pushes to storage array state
 */
export const usePaginatedSets = (): ProductType[][] => {
  const filteredData: ProductType[] = useProductFilter();
  const [paginatedProducts, setPaginatedProducts] = useState<ProductType[][]>([]);

  useEffect(() => {
    const paginatedData: ProductType[][] = [];
    for (let i = 0; i < filteredData.length; i += 7) {
      const setItems = filteredData.slice(i, i + 7);
      paginatedData.push(setItems);
    }
    setPaginatedProducts(paginatedData);
  }, [window.location.pathname]);

  return paginatedProducts;
};
