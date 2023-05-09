import { createContext, useContext, useState } from 'react';

interface CategoryFilterContextType {
  children?: any;
  categoryFilter?: string | null;
  setCategoryFilter?: React.Dispatch<React.SetStateAction<string | null>>;
}

const CategoryFilterContext = createContext<CategoryFilterContextType | undefined>(undefined);

export const CategoryFilterProvider = ({ children }: CategoryFilterContextType): JSX.Element => {
  const [categoryFilter, setCategoryFilter] = useState<string | null>('headphones');
  return (
    <CategoryFilterContext.Provider value={{ children, categoryFilter, setCategoryFilter }}>
      <>{children}</>
    </CategoryFilterContext.Provider>
  );
};

export const useCategoryFilterContext = () => {
  const categoryFilterContext = useContext(CategoryFilterContext);
  if (categoryFilterContext === undefined) {
    console.log('CategoryFilterContext Hook must be placed inside of a provider.');
  }
  return categoryFilterContext;
};
