import { MutableRefObject, ReactElement, createContext, useContext, useEffect, useRef, useState } from 'react';

const categoryFilterSessionState = JSON.parse(sessionStorage.getItem('categoryFilter') || '[]');

interface StateContextType {
  categoryFilter: string | null;
  setCategoryFilter: React.Dispatch<React.SetStateAction<string | null>>;
  closestIndexContext: MutableRefObject<number | null>;
}

// GUARD: Throws intentional error for Application Context Provider
const StateContext = createContext<StateContextType | undefined>(undefined);

type ChildrenType = { children?: ReactElement | ReactElement[] };

export const StateProvider: React.FunctionComponent = ({ children }: ChildrenType): JSX.Element => {
  const [categoryFilter, setCategoryFilter] = useState<string | null>(categoryFilterSessionState);
  const closestIndexContext = useRef<number | null>(0);

  useEffect(() => {
    sessionStorage.setItem('categoryFilter', JSON.stringify(categoryFilter));
  }, [categoryFilter]);

  return <StateContext.Provider value={{ categoryFilter, setCategoryFilter, closestIndexContext }}>{children}</StateContext.Provider>;
};

export const useStateContext = (): StateContextType | undefined => {
  const stateContext = useContext(StateContext);
  if (stateContext === undefined) console.log('Category Context Hook must be placed inside of a provider.');
  return stateContext;
};
