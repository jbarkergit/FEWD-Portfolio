import { createContext, useContext, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';

const Context = createContext<
  | {
      isModal: 'collections' | 'movie' | 'person' | undefined;
      setIsModal: Dispatch<SetStateAction<'collections' | 'movie' | 'person' | undefined>>;
      person: number | undefined;
      setPerson: Dispatch<SetStateAction<number | undefined>>;
    }
  | undefined
>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModal, setIsModal] = useState<'collections' | 'movie' | 'person' | undefined>(undefined);
  const [person, setPerson] = useState<number | undefined>(undefined);

  return <Context.Provider value={{ isModal, setIsModal, person, setPerson }}>{children}</Context.Provider>;
};

export const useModal = () => {
  const context = useContext(Context);
  if (!context) throw new Error('A provider is required to consume ChunkSize.');
  return context;
};
