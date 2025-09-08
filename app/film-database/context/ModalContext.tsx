import {
  createContext,
  useContext,
  useRef,
  useState,
  type Dispatch,
  type ReactNode,
  type RefObject,
  type SetStateAction,
} from 'react';

const Context = createContext<
  | {
      isModal: 'collections' | 'movie' | 'person' | undefined;
      setIsModal: Dispatch<SetStateAction<'collections' | 'movie' | 'person' | undefined>>;
      personRef: RefObject<number | null>;
    }
  | undefined
>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [isModal, setIsModal] = useState<'collections' | 'movie' | 'person' | undefined>(undefined);
  const personRef = useRef<number>(null);

  return <Context.Provider value={{ isModal, setIsModal, personRef }}>{children}</Context.Provider>;
};

export const useModal = () => {
  const context = useContext(Context);
  if (!context) throw new Error('A provider is required to consume ChunkSize.');
  return context;
};
