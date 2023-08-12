import { createContext, useContext, useEffect, useState } from 'react';
import { ChildrenType } from '../types/ChildrenType';

type StateContextType = {
  categoryFilter: string | null;
  setCategoryFilter: React.Dispatch<React.SetStateAction<string | null>>;
};

const CategoryFilterContext = createContext<StateContextType | undefined>(undefined); // GUARD: Throws intentional error for Application Context Provider

export const CategoryFilterProvider = ({ children }: ChildrenType): JSX.Element => {
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  return <CategoryFilterContext.Provider value={{ categoryFilter, setCategoryFilter }}>{children}</CategoryFilterContext.Provider>;
};

export const useCategoryFilterContext = (): StateContextType | undefined => {
  const categoryFilterContext = useContext(CategoryFilterContext);
  if (categoryFilterContext === undefined) console.error('CategoryFilter Context Hook must be placed inside of a provider.');
  return categoryFilterContext;
};
