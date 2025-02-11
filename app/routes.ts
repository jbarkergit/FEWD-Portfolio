import { type RouteConfig, route, index } from '@react-router/dev/routes';
import { useUniqueData } from './ecommerce/hooks/useUniqueData';

function useEcommercePaths() {
  const { useUniqueCompanies, useUniqueWearStyles, useUniquePolarPatterns, useUniqueCategories } = useUniqueData;
  return [...useUniqueCompanies(), ...useUniqueWearStyles(), ...useUniquePolarPatterns(), ...useUniqueCategories()];
}

export default [
  index('./portfolio/pages/Portfolio.tsx'),

  route('ecommerce', './ecommerce/pages/Home.tsx'),
  route('ecommerce/products', './ecommerce/pages/ProductCatalog.tsx'),
  route('ecommerce/products/:paramId', './ecommerce/pages/ProductDetailPage.tsx'),
  ...useEcommercePaths().map((path) => {
    return route(`ecommerce/products/${path}`, './ecommerce/pages/ProductCatalog.tsx', { id: `filter-${path}` });
  }),

  route('film-database', './film-database/routes/FilmDatabase.tsx'),
] satisfies RouteConfig;
