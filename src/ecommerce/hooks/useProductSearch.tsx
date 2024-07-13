import { ProductType } from '../context/CartContext';
import { useProductDatabase } from './useProductDatabase';

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
