import { useEffect, useState } from 'react';
import { ProductType } from '../types/ProductType';
import useProductFilter from './useProductFilter';
import { useCategoryFilterContext } from '../context/CategoryFilterContext';

export const usePaginatedSets = (): ProductType[][] => {
  // @ts-ignore
  const { categoryFilter } = useCategoryFilterContext();
  const filteredData: ProductType[] = useProductFilter(); //Localize variable in FC, pass to useEffect

  //Iterate over filteredProducts, slice into arrays of 7, push to storage array, setPaginatedProducts(storage array)
  const [paginatedProducts, setPaginatedProducts] = useState<ProductType[][]>([]);

  useEffect(() => {
    const paginatedData: ProductType[][] = [];
    for (let i = 0; i < filteredData.length; i += 7) {
      const setItems = filteredData.slice(i, i + 7);
      paginatedData.push(setItems);
    }
    setPaginatedProducts(paginatedData);
  }, [categoryFilter]);

  return paginatedProducts;
};
