import { useEffect, useState } from 'react';
import { ProductType } from '../types/ProductType';
import { useProductFilter } from './useProductFilter';

/** Utilizes useProductFilter hook to create product arrays with a length of 7 */
export const usePaginatedProductSets = (): ProductType[][] => {
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
