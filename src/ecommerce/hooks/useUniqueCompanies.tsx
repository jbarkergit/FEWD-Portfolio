import { ProductDatabase } from '../assets/production-data/ProductDatabase';
import { ProductType } from '../types/ProductType';

const useUniqueCompanies = (): string[] => {
  const uniqueCompanies = [...new Set(ProductDatabase.map((product: ProductType) => product.company))].sort((a, b) => (a > b ? 1 : -1));
  return uniqueCompanies;
};

export default useUniqueCompanies;
