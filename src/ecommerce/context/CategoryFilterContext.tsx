import { createContext, useContext, useEffect, useState } from 'react';
import { ChildrenType } from '../types/ChildrenType';

const categoryFilterSessionState = JSON.parse(sessionStorage.getItem('categoryFilter') || '[]');

type StateContextType = {
  categoryFilter: string | null;
  setCategoryFilter: React.Dispatch<React.SetStateAction<string | null>>;
};

const CategoryFilterContext = createContext<StateContextType | undefined>(undefined); // GUARD: Throws intentional error for Application Context Provider

export const CategoryFilterProvider = ({ children }: ChildrenType): JSX.Element => {
  const [categoryFilter, setCategoryFilter] = useState<string | null>(categoryFilterSessionState);

  useEffect(() => {
    sessionStorage.setItem('categoryFilter', JSON.stringify(categoryFilter));
  }, [categoryFilter]);

  return <CategoryFilterContext.Provider value={{ categoryFilter, setCategoryFilter }}>{children}</CategoryFilterContext.Provider>;
};

export const useCategoryFilterContext = (): StateContextType | undefined => {
  const categoryFilterContext = useContext(CategoryFilterContext);
  if (categoryFilterContext === undefined) console.log('CategoryFilter Context Hook must be placed inside of a provider.');
  return categoryFilterContext;
};
