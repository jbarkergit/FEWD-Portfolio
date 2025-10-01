import { createContext, useContext, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';

const Context = createContext<
  | {
      person: number | undefined;
      setPerson: Dispatch<SetStateAction<number | undefined>>;
    }
  | undefined
>(undefined);

export const PersonProvider = ({ children }: { children: ReactNode }) => {
  const [person, setPerson] = useState<number | undefined>(undefined);

  return <Context.Provider value={{ person, setPerson }}>{children}</Context.Provider>;
};

export const usePersonContext = () => {
  const context = useContext(Context);
  if (!context) throw new Error('A provider is required to consume ChunkSize.');
  return context;
};
