import { ReactNode, createContext, useContext, useState } from 'react';

type StateContextType = {
  closestIndexContext: number | null;
  setClosestIndexContext: React.Dispatch<React.SetStateAction<number | null>>;
};

const ClosestIndexContext = createContext<StateContextType | undefined>(undefined); // GUARD: Throws intentional error for Application Context Provider

type ChildrenType = { children?: ReactNode };

export const ClosestIndexContextProvider = ({ children }: ChildrenType): JSX.Element => {
  const [closestIndexContext, setClosestIndexContext] = useState<number | null>(0);

  return <ClosestIndexContext.Provider value={{ closestIndexContext, setClosestIndexContext }}>{children}</ClosestIndexContext.Provider>;
};

export const useClosestIndexContext = (): StateContextType | undefined => {
  const closestIndexContext = useContext(ClosestIndexContext);
  if (closestIndexContext === undefined) console.log('ClosestIndex Context Hook must be placed inside of a provider.');
  return closestIndexContext;
};
