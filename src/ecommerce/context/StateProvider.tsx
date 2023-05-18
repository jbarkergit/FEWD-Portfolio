import { createContext, useContext, useState } from 'react';

interface CategoryFilterContextType {
  categoryFilter: string | null;
  setCategoryFilter: React.Dispatch<React.SetStateAction<string | null>>;
}

// GUARD: Throws intentional error for Application Context Provider
const CategoryFilterContext = createContext<CategoryFilterContextType | undefined>(undefined);

// Modern dependencies altered the children parameter, creating numerous Type errors: { children } param: interface & React.FunctionalComponent.
// The following packages can be downgraded to bypass Type errors, or the errors can be ignored manually.
// "@types/react": => "17.0.2", // "@types/react-dom": => "17.0.2",
//@ts-ignore:
export const CategoryFilterProvider: React.FunctionComponent = ({ children }): JSX.Element => {
  const [categoryFilter, setCategoryFilter] = useState<string | null>('');
  return <CategoryFilterContext.Provider value={{ categoryFilter, setCategoryFilter }}>{children}</CategoryFilterContext.Provider>;
};

export const useCategoryFilterContext = () => {
  const categoryFilterContext = useContext(CategoryFilterContext);
  if (categoryFilterContext === undefined) {
    console.log('Context Hook must be placed inside of a provider.');
  }
  return categoryFilterContext;
};
