import { createContext, useContext, useEffect, useState } from 'react';
import { ChildrenType } from './types';

const categoryFilterSessionState = JSON.parse(sessionStorage.getItem('categoryFilter') || '[]');

interface CategoryFilterContextType {
  categoryFilter: string | null;
  setCategoryFilter: React.Dispatch<React.SetStateAction<string | null>>;
  styleFilter: boolean | null;
  setStyleFilter: React.Dispatch<React.SetStateAction<boolean | null>>;
}

// GUARD: Throws intentional error for Application Context Provider
const CategoryFilterContext = createContext<CategoryFilterContextType | undefined>(undefined);

export const CategoryFilterProvider: React.FunctionComponent = ({ children }: ChildrenType): JSX.Element => {
  const [categoryFilter, setCategoryFilter] = useState<string | null>(categoryFilterSessionState);
  const [styleFilter, setStyleFilter] = useState<boolean | null>(false);

  useEffect(() => {
    sessionStorage.setItem('categoryFilter', JSON.stringify(categoryFilter));
  }, [categoryFilter]);

  return <CategoryFilterContext.Provider value={{ categoryFilter, setCategoryFilter, styleFilter, setStyleFilter }}>{children}</CategoryFilterContext.Provider>;
};

export const useCategoryFilterContext = () => {
  const categoryFilterContext = useContext(CategoryFilterContext);
  if (categoryFilterContext === undefined) {
    console.log('Category Context Hook must be placed inside of a provider.');
  }
  return categoryFilterContext;
};
