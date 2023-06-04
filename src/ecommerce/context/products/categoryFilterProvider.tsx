import { createContext, useContext, useState } from 'react';
import { ChildrenType } from '../exports/types';

interface CategoryFilterContextType {
  categoryFilter: string | null;
  setCategoryFilter: React.Dispatch<React.SetStateAction<string | null>>;
}

// GUARD: Throws intentional error for Application Context Provider
const CategoryFilterContext = createContext<CategoryFilterContextType | undefined>(undefined);

export const CategoryFilterProvider: React.FunctionComponent = ({ children }: ChildrenType): JSX.Element => {
  const [categoryFilter, setCategoryFilter] = useState<string | null>('');
  return <CategoryFilterContext.Provider value={{ categoryFilter, setCategoryFilter }}>{children}</CategoryFilterContext.Provider>;
};

export const useCategoryFilterContext = () => {
  const categoryFilterContext = useContext(CategoryFilterContext);
  if (categoryFilterContext === undefined) {
    console.log('Category Context Hook must be placed inside of a provider.');
  }
  return categoryFilterContext;
};
