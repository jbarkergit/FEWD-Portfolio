import { ProductDatabase } from '../assets/production-data/ProductDatabase';
import { ProductType } from '../types/ProductType';

const useUniqueWearStyles = (): string[] => {
  const wearStyleSet: Set<string> = new Set();

  ProductDatabase.forEach((product: ProductType) => {
    if (typeof product.wearStyle === 'string') wearStyleSet.add(product.wearStyle as string);
    // else if (Array.isArray(product.wearStyle)) product.wearStyle.forEach((style: string) => wearStyleSet.add(style));
  });

  const wearStyleArray: string[] = Array.from(wearStyleSet).sort((a, b) => (a > b ? 1 : -1));
  return wearStyleArray;
};

export default useUniqueWearStyles;
