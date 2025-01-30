import { type RouteConfig, route, index, layout, prefix } from '@react-router/dev/routes';
import { useMemo } from 'react';
import { useUniqueData } from './ecommerce/hooks/useUniqueData';

const useEcommercePaths = useMemo(() => {
  const { useUniqueCompanies, useUniqueWearStyles, useUniquePolarPatterns, useUniqueCategories } = useUniqueData();
  const companyPaths: string[] = useUniqueCompanies.map((company) => `/ecommerce/${company}`);
  const wearStylePaths: string[] = useUniqueWearStyles.map((wearStyle) => `/ecommerce/${wearStyle}`);
  const polarPatternPaths: string[] = useUniquePolarPatterns.map((polarPattern) => `/ecommerce/${polarPattern}`);
  const categoryPaths: string[] = useUniqueCategories.map((category) => `/ecommerce/${category}`);
  return [...companyPaths, ...wearStylePaths, ...polarPatternPaths, ...categoryPaths];
}, []);

export default [index('./portfolio.tsx')];

// export default [
//   index('./home.tsx'),
//   route('about', './about.tsx'),

//   layout('./auth/layout.tsx', [route('login', './auth/login.tsx'), route('register', './auth/register.tsx')]),

//   ...prefix('concerts', [index('./concerts/home.tsx'), route(':city', './concerts/city.tsx'), route('trending', './concerts/trending.tsx')]),
// ] satisfies RouteConfig;
