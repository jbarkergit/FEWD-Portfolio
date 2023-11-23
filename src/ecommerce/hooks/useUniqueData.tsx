import { useEffect, useMemo, useState } from 'react';
import { ProductType } from '../types/ProductType';

const useUniqueData: () => {
  useUniqueCompanies: string[];
  useUniquePolarPatterns: string[];
  useUniqueWearStyles: string[];
  useUniqueHeadphoneCompanies: string[];
  useUniqueMicrophoneCompanies: string[];
} = () => {
  /**
   * This hook utilizes ProductDatabase; therefore, it needs to be removed from Network Queue until called upon.
   * Note: This hook returns data to dynamically map PRODUCT FILTERS && ECOMMERCE ROUTES
   */
  const [productDatabase, setProductDatabase] = useState<ProductType[]>([]);

  const fetchData = async () => {
    const { ProductDatabase } = await import('../database/product-db/ProductDatabase');
    setProductDatabase(ProductDatabase);
  };

  useEffect(() => {
    if ((window.location.pathname as string).startsWith('/ecommerce')) fetchData();
  }, [location]);

  /** Filters array string properties from productDatabase state into sets */
  const uniqueDataProps = productDatabase.reduce(
    (
      result: {
        uniqueCompanySet: Set<string>;
        uniquePolarPatternSet: Set<string>;
        uniqueWearStyleSet: Set<string>;
        uniqueHeadphoneCompanies: Set<string>;
        uniqueMicrophoneCompanies: Set<string>;
      },
      product: ProductType
    ) => {
      result.uniqueCompanySet.add(product.company as string); // uniqueCompanies

      // uniquePolarPatterns: handles string props AND array props
      if (typeof product.polarPattern === 'string') result.uniquePolarPatternSet.add(product.polarPattern as string);
      else if (Array.isArray(product.polarPattern)) product.polarPattern.forEach((pattern: string) => result.uniquePolarPatternSet.add(pattern as string));

      if (product.wearStyle !== undefined) result.uniqueWearStyleSet.add(product.wearStyle as string); //uniqueWearStyles

      if (product.category === 'headphones') result.uniqueHeadphoneCompanies.add(product.company as string); //uniqueHeadphoneCompanies

      if (product.category === 'microphones') result.uniqueMicrophoneCompanies.add(product.company as string); //uniqueMicrophoneCompanies

      return result; // Return accumulator (stores filtered data)
    },
    // Initialize new Sets
    {
      uniqueCompanySet: new Set<string>(),
      uniquePolarPatternSet: new Set<string>(),
      uniqueWearStyleSet: new Set<string>(),
      uniqueHeadphoneCompanies: new Set<string>(),
      uniqueMicrophoneCompanies: new Set<string>(),
    }
  );

  // Converts sets to arrays & sorts data in descending order
  const useUniqueCompanies = useMemo(() => {
    return Array.from(uniqueDataProps.uniqueCompanySet).sort((a, b) => (a > b ? 1 : -1));
  }, [uniqueDataProps.uniqueCompanySet]);

  const useUniquePolarPatterns = useMemo(() => {
    return Array.from(uniqueDataProps.uniquePolarPatternSet).sort((a, b) => (a > b ? 1 : -1));
  }, [uniqueDataProps.uniquePolarPatternSet]);

  const useUniqueWearStyles = useMemo(() => {
    return Array.from(uniqueDataProps.uniqueWearStyleSet).sort((a, b) => (a > b ? 1 : -1));
  }, [uniqueDataProps.uniqueWearStyleSet]);

  const useUniqueHeadphoneCompanies = useMemo(() => {
    return Array.from(uniqueDataProps.uniqueHeadphoneCompanies).sort((a, b) => (a > b ? 1 : -1));
  }, [uniqueDataProps.uniqueHeadphoneCompanies]);

  const useUniqueMicrophoneCompanies = useMemo(() => {
    return Array.from(uniqueDataProps.uniqueMicrophoneCompanies).sort((a, b) => (a > b ? 1 : -1));
  }, [uniqueDataProps.uniqueMicrophoneCompanies]);

  // Returns sorted arrays
  return { useUniqueCompanies, useUniquePolarPatterns, useUniqueWearStyles, useUniqueHeadphoneCompanies, useUniqueMicrophoneCompanies };
};

export default useUniqueData;
