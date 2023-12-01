import { useProductDatabase } from './useProductDatabase';
import { ProductType } from '../types/ProductType';

export const useProductSearch = (searchTerm: string) => {
  let productSearchResults: ProductType[] = [];
  let count = 0;

  for (const product of useProductDatabase) {
    if (product.sku.toLowerCase().includes(searchTerm.toLowerCase())) {
      productSearchResults.push(product);
      count++;

      if (count === 9) break;
    }
  }

  return productSearchResults;
};
