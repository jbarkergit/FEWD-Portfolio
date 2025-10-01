import { createContext, useContext, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react';

const Context = createContext<
  | {
      modal: 'collections' | 'movie' | 'person' | undefined;
      setModal: Dispatch<SetStateAction<'collections' | 'movie' | 'person' | undefined>>;
    }
  | undefined
>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modal, setModal] = useState<'collections' | 'movie' | 'person' | undefined>(undefined);
  return <Context.Provider value={{ modal, setModal }}>{children}</Context.Provider>;
};

export const useModalContext = () => {
  const context = useContext(Context);
  if (!context) throw new Error('A provider is required to consume ChunkSize.');
  return context;
};
