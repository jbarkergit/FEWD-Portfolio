import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

const categoryFilterSessionState = JSON.parse(sessionStorage.getItem('categoryFilter') || '[]');

type StateContextType = {
  categoryFilter: string | null;
  setCategoryFilter: React.Dispatch<React.SetStateAction<string | null>>;
};

const StateContext = createContext<StateContextType | undefined>(undefined); // GUARD: Throws intentional error for Application Context Provider

type ChildrenType = { children?: ReactNode };

export const StateProvider = ({ children }: ChildrenType): JSX.Element => {
  const [categoryFilter, setCategoryFilter] = useState<string | null>(categoryFilterSessionState);

  useEffect(() => {
    sessionStorage.setItem('categoryFilter', JSON.stringify(categoryFilter));
  }, [categoryFilter]);

  return <StateContext.Provider value={{ categoryFilter, setCategoryFilter }}>{children}</StateContext.Provider>;
};

export const useStateContext = (): StateContextType | undefined => {
  const stateContext = useContext(StateContext);
  if (stateContext === undefined) console.log('Global StateContextProvider Context Hook must be placed inside of a provider.');
  return stateContext;
};
