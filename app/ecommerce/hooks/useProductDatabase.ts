import { useEffect, useState } from 'react';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { promises as fs } from 'fs';
import type { ProductType } from '../context/CartContext';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function fetchProductDatabase(): Promise<ProductType[]> {
  try {
    const productDatabasePath = join(__dirname, '../data/ecommerceProducts.json');
    const productDatabase = await fs.readFile(productDatabasePath, 'utf-8');
    return JSON.parse(productDatabase) as ProductType[];
  } catch (error) {
    console.error('Error fetching product database JSON data', error);
    throw error;
  }
}

export function useProductDatabase(): ProductType[] | null {
  const [products, setProducts] = useState<ProductType[] | null>(null);

  useEffect(() => {
    fetchProductDatabase().then(setProducts).catch(console.error);
  }, []);

  return products;
}
