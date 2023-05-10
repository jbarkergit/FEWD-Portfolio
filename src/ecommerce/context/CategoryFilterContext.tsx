import { createContext, useContext, useState } from 'react';

interface CategoryFilterContextType {
  categoryFilter: string | null;
  setCategoryFilter: React.Dispatch<React.SetStateAction<string | null>>;
}

// GUARD: Throws intentional error for Application Context Provider
const CategoryFilterContext = createContext<CategoryFilterContextType | undefined>(undefined);

// React 18 introduced changes to the children parameter which resulted in multiple errors when passing interface in conjuction with casting FunctionalComponent.
// Due to varying numerous errors regarding types the following packages were downgraded:
// "@types/react": "^18.0.28" => "@types/react": "17.0.2",
// "@types/react-dom": "^18.0.10" => "@types/react-dom": "17.0.2",

export const CategoryFilterProvider: React.FunctionComponent = ({ children }): JSX.Element => {
  const [categoryFilter, setCategoryFilter] = useState<string | null>('microphone');
  return <CategoryFilterContext.Provider value={{ categoryFilter, setCategoryFilter }}>{children}</CategoryFilterContext.Provider>;
};

export const useCategoryFilterContext = () => {
  const categoryFilterContext = useContext(CategoryFilterContext);
  if (categoryFilterContext === undefined) {
    console.log('Context Hook must be placed inside of a provider.');
  }
  return categoryFilterContext;
};
