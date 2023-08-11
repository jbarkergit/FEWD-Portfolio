import { ProductDatabase } from '../assets/production-data/ProductDatabase';
import { ProductType } from '../types/ProductType';

const useUniquePolarPatterns = (): string[] => {
  const polarPatternSet: Set<string> = new Set();

  ProductDatabase.forEach((product: ProductType) => {
    if (typeof product.polarPattern === 'string') polarPatternSet.add(product.polarPattern as string);
    else if (Array.isArray(product.polarPattern)) product.polarPattern.forEach((pattern) => polarPatternSet.add(pattern));
  });

  const polarPatternArray: string[] = Array.from(polarPatternSet);
  return polarPatternArray;
};

export default useUniquePolarPatterns;
