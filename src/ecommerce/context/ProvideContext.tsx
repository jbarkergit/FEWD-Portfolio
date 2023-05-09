import { CategoryFilterProvider } from './CategoryFilterContext';
import { ProductProvider } from './ProductProvider';
import Header from '../layouts/navigation/Header';

export default function ProvideContext() {
  return (
    <CategoryFilterProvider>
      <ProductProvider />
      <Header />
    </CategoryFilterProvider>
  );
}
