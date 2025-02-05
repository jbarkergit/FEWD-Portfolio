import type { ProductType } from '../context/CartContext';
import { ecommerceProducts } from '../data/ecommerceProducts';

/** Filters array string properties from ProductDatabase into sets */
const uniqueDataProps = ecommerceProducts.reduce(
  (
    result: {
      uniqueCompanySet: Set<string>;
      uniquePolarPatternSet: Set<string>;
      uniqueWearStyleSet: Set<string>;
      uniqueHeadphoneCompanies: Set<string>;
      uniqueMicrophoneCompanies: Set<string>;
      uniqueCategories: Set<string>;
    },
    product: ProductType
  ) => {
    // uniqueCompanies
    result.uniqueCompanySet.add(product.company as string);
    // uniquePolarPatterns
    if (Array.isArray(product.polarPattern)) {
      product.polarPattern.forEach((pattern: string) => {
        if (pattern) result.uniquePolarPatternSet.add(pattern);
      });
    } else if (product.polarPattern) result.uniquePolarPatternSet.add(product.polarPattern as string);

    // uniqueWearStyles
    if (product.wearStyle !== undefined) result.uniqueWearStyleSet.add(product.wearStyle as string);
    // uniqueHeadphoneCompanies
    if (product.category === 'headphones') result.uniqueHeadphoneCompanies.add(product.company as string);
    // uniqueMicrophoneCompanies
    if (product.category === 'microphones') result.uniqueMicrophoneCompanies.add(product.company as string);
    // uniqueCategories
    if (product.category) result.uniqueCategories.add(product.category as string);
    // Return accumulator (stores filtered data)
    return result;
  },
  {
    uniqueCompanySet: new Set<string>(),
    uniquePolarPatternSet: new Set<string>(),
    uniqueWearStyleSet: new Set<string>(),
    uniqueHeadphoneCompanies: new Set<string>(),
    uniqueMicrophoneCompanies: new Set<string>(),
    uniqueCategories: new Set<string>(),
  }
);

/** Sort func */
const sort = (data: Set<string>) => {
  return Array.from(data).sort((a, b) => (a > b ? 1 : -1));
};

/** Convert sets to arrays & sorts data in descending order
 * IMPORTANT NOTE: Application routing depend on this data
 */
const useUniqueCompanies = () => sort(uniqueDataProps.uniqueCompanySet);
const useUniquePolarPatterns = () => sort(uniqueDataProps.uniquePolarPatternSet);
const useUniqueWearStyles = () => sort(uniqueDataProps.uniqueWearStyleSet);
const useUniqueHeadphoneCompanies = () => sort(uniqueDataProps.uniqueHeadphoneCompanies);
const useUniqueMicrophoneCompanies = () => sort(uniqueDataProps.uniqueMicrophoneCompanies);
const useUniqueCategories = () => sort(uniqueDataProps.uniqueCategories);

export const useUniqueData = {
  useUniqueCompanies,
  useUniquePolarPatterns,
  useUniqueWearStyles,
  useUniqueHeadphoneCompanies,
  useUniqueMicrophoneCompanies,
  useUniqueCategories,
};
