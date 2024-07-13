import { ProductType } from '../context/CartContext';

const fetchProductDatabase = async (): Promise<ProductType[]> => {
  try {
    const productDatabase = await fetch('/src/ecommerce/data/database/productDatabase.json');
    return (await productDatabase.json()) as ProductType[];
  } catch (error) {
    console.error('Error fetching product database JSON data', error);
    throw error;
  }
};

export const useProductDatabase: ProductType[] = await fetchProductDatabase();
