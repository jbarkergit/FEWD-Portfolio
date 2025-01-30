import { useMemo } from 'react';
import { useProductDatabase } from './useProductDatabase';
import { ProductType } from '../context/CartContext';

/** Filters array string properties from ProductDatabase into sets */
const uniqueDataProps = useProductDatabase.reduce(
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

/** Converts sets to arrays & sorts data in descending order */
// IMPORTANT NOTE: Application routes depend on this data
export const useUniqueData = () => {
  const useUniqueCompanies = useMemo(() => {
    return sort(uniqueDataProps.uniqueCompanySet);
  }, [uniqueDataProps.uniqueCompanySet]);

  const useUniquePolarPatterns = useMemo(() => {
    return sort(uniqueDataProps.uniquePolarPatternSet);
  }, [uniqueDataProps.uniquePolarPatternSet]);

  const useUniqueWearStyles = useMemo(() => {
    return sort(uniqueDataProps.uniqueWearStyleSet);
  }, [uniqueDataProps.uniqueWearStyleSet]);

  const useUniqueHeadphoneCompanies = useMemo(() => {
    return sort(uniqueDataProps.uniqueHeadphoneCompanies);
  }, [uniqueDataProps.uniqueHeadphoneCompanies]);

  const useUniqueMicrophoneCompanies = useMemo(() => {
    return sort(uniqueDataProps.uniqueMicrophoneCompanies);
  }, [uniqueDataProps.uniqueMicrophoneCompanies]);

  const useUniqueCategories = useMemo(() => {
    return sort(uniqueDataProps.uniqueCategories);
  }, [uniqueDataProps.uniqueCategories]);

  return {
    useUniqueCompanies,
    useUniquePolarPatterns,
    useUniqueWearStyles,
    useUniqueHeadphoneCompanies,
    useUniqueMicrophoneCompanies,
    useUniqueCategories,
  };
};
