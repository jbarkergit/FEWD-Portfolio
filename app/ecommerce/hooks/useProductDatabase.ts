import type { ProductType } from '../context/CartContext';
async function fetchProductDatabase(): Promise<ProductType[]> {
  try {
    const productDatabase = await fetch('/app/ecommerce/data/ecommerceProducts.json');
    return (await productDatabase.json()) as ProductType[];
  } catch (error) {
    console.error('Error fetching product database JSON data', error);
    throw error;
  }
}
export const useProductDatabase: ProductType[] = await fetchProductDatabase();
