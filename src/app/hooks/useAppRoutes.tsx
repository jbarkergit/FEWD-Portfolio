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
    portfolio: { path: '/', dir: '/src/portfolio/pages/Portfolio.tsx' },
    ecommerce: [
      { path: '/ecommerce', dir: '/src/ecommerce/pages/Home.tsx' },
      {
        path: ['/ecommerce/products', '/ecommerce/headphones', '/ecommerce/amps-dacs', '/ecommerce/microphones', '/ecommerce/interfaces', ...ecommercePaths],
        dir: '/src/ecommerce/pages/ProductCatalog.tsx',
      },
      { path: '/ecommerce/product/:paramId', dir: '/src/ecommerce/pages/ProductDetailPage.tsx' },
    ],
    filmDatabase: [
      { path: '/film-database', dir: '/src/film-database/pages/FilmDatabase.tsx' },
      { path: '/film-database/:paramId', dir: '/src/film-database/pages/FDMovie.tsx' },
    ],
  };

  return { routes, ecommercePaths };
};

export type Type_useAppRoutes = ReturnType<typeof useAppRoutes>;
