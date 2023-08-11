import { ProductDatabase } from '../assets/production-data/ProductDatabase';
import { ProductType } from '../types/ProductType';

const useUniqueWearStyles = () => {
  const wearStyles = [...new Set(ProductDatabase.map((product: ProductType) => product.wearStyle!))].sort((a, b) => (a > b ? 1 : -1));
  console.log(wearStyles);
  return wearStyles;
};
export default useUniqueWearStyles;
