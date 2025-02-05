import type { ProductType } from '../context/CartContext';
import { ecommerceProducts } from '../data/ecommerceProducts';

export const useProductSearch = (searchTerm: string) => {
  let productSearchResults: ProductType[] = [];
  let count = 0;

  for (const product of ecommerceProducts) {
    if (product.sku.toLowerCase().includes(searchTerm.toLowerCase())) {
      productSearchResults.push(product);
      count++;

      if (count === 9) break;
    }
  }

  return productSearchResults;
};
