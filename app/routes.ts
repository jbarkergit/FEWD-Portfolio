import { type RouteConfig, route, index } from '@react-router/dev/routes';
import { commerceData } from '../app/ecommerce/data/commerceData';

function buildCommercePaths() {
  const { companies, wearStyles, polarPatterns, categories } = commerceData;
  return [...companies, ...wearStyles, ...polarPatterns, ...categories];
}

const commercePaths = buildCommercePaths();

export default [
  index('./portfolio/routes/Portfolio.tsx'),

  route('ecommerce', './ecommerce/pages/Home.tsx'),
  route('ecommerce/products', './ecommerce/pages/ProductCatalog.tsx'),
  route('ecommerce/products/:paramId', './ecommerce/pages/ProductDetailPage.tsx'),
  ...commercePaths.map((path) => {
    return route(`ecommerce/products/${path}`, './ecommerce/pages/ProductCatalog.tsx', { id: `filter-${path}` });
  }),

  route('film-database', './film-database/routes/FilmDatabase.tsx'),
] satisfies RouteConfig;
