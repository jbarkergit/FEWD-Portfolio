import { createContext, useContext, useState } from 'react';
import { ChildrenType } from '../types/ChildrenType';

type StateContextType = {
  ecoModalTab: string | null;
  setEcoModalTab: React.Dispatch<React.SetStateAction<string | null>>;
};

const ModalContext = createContext<StateContextType | undefined>(undefined); // GUARD: Throws intentional error for Application Context Provider

export const ModalProvider = ({ children }: ChildrenType): JSX.Element => {
  const [ecoModalTab, setEcoModalTab] = useState<string | null>('');
  return <ModalContext.Provider value={{ ecoModalTab, setEcoModalTab }}>{children}</ModalContext.Provider>;
};

export const useModalContext = (): StateContextType | undefined => {
  const modalContext = useContext(ModalContext);
  if (modalContext === undefined) console.error('Modal Context Hook must be placed inside of a provider.');
  return modalContext;
};
