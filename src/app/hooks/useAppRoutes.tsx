import { useMemo } from 'react';
import { useUniqueData } from '../../ecommerce/hooks/useUniqueData';

export const useAppRoutes = () => {
  const { useUniqueCompanies, useUniqueWearStyles, useUniquePolarPatterns } = useUniqueData();

  const ecommercePaths = useMemo(() => {
    const companyPaths: string[] = useUniqueCompanies.map((company) => `/ecommerce/${company}`);
    const wearStylePaths: string[] = useUniqueWearStyles.map((wearStyle) => `/ecommerce/${wearStyle}`);
    const polarPatternPaths: string[] = useUniquePolarPatterns.map((polarPattern) => `/ecommerce/${polarPattern}`);
    return [...companyPaths, ...wearStylePaths, ...polarPatternPaths];
  }, [useUniqueCompanies, useUniqueWearStyles, useUniquePolarPatterns]);

  const routes = {
    portfolio: { path: '/', dir: './portfolio/pages/Portfolio.tsx' },
    ecommerce: [
      { path: '/ecommerce', dir: './ecommerce/pages/Home' },
      {
        path: ['/ecommerce/products', '/ecommerce/headphones', '/ecommerce/amps-dacs', '/ecommerce/microphones', '/ecommerce/interfaces', ...ecommercePaths],
        dir: '/src/ecommerce/pages/ProductCatalog.tsx',
      },
      { path: '/ecommerce/product/:paramId', dir: './ecommerce/pages/ProductDetailPage' },
    ],
    filmDatabase: { path: '/film-database', dir: './film-database/pages/FilmDatabase' },
  };

  return { routes, ecommercePaths };
};

export type Type_useAppRoutes = ReturnType<typeof useAppRoutes>;
