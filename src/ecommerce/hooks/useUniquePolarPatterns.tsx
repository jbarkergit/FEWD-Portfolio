import { ProductDatabase } from '../assets/production-data/ProductDatabase';
import { ProductType } from '../types/ProductType';

const useUniquePolarPatterns = (): string[] => {
  const polarPatternSet: Set<string> = new Set();

  ProductDatabase.forEach((product: ProductType) => {
    if (typeof product.polarPattern === 'string') polarPatternSet.add(product.polarPattern as string);
    else if (Array.isArray(product.polarPattern)) product.polarPattern.forEach((pattern: string) => polarPatternSet.add(pattern));
  });

  const polarPatternArray: string[] = Array.from(polarPatternSet).sort((a, b) => (a > b ? 1 : -1));
  return polarPatternArray;
};

export default useUniquePolarPatterns;
