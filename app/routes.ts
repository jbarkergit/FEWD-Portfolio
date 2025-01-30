import { type RouteConfig, route, index, layout, prefix } from '@react-router/dev/routes';
import { useUniqueData } from './ecommerce/hooks/useUniqueData';

function useEcommercePaths() {
  const { useUniqueCompanies, useUniqueWearStyles, useUniquePolarPatterns, useUniqueCategories } = useUniqueData();
  const companyPaths: string[] = useUniqueCompanies.map((company) => `${company}`);
  const wearStylePaths: string[] = useUniqueWearStyles.map((wearStyle) => `${wearStyle}`);
  const polarPatternPaths: string[] = useUniquePolarPatterns.map((polarPattern) => `${polarPattern}`);
  const categoryPaths: string[] = useUniqueCategories.map((category) => `${category}`);
  return [...companyPaths, ...wearStylePaths, ...polarPatternPaths, ...categoryPaths];
}

export default [
  index('./portfolio/pages/Portfolio.tsx'),
  route('/ecommerce', './ecommerce/pages/Home.tsx'),
  route('/ecommerce/products', './ecommerce/pages/ProductCatalog.tsx'),
  route('/ecommerce/products/:paramId', './ecommerce/pages/ProductDetailPage.tsx'),
  ...useEcommercePaths().map((path) => {
    return {
      path: `/ecommerce/products/filter/${path}`,
      file: './ecommerce/pages/ProductCatalog.tsx',
    };
  }),
  route('/film-database', './film-database/pages/FDUserAccount.tsx'),
  route('/film-database/browse', './film-database/pages/FDCatalog.tsx'),
] satisfies RouteConfig;
