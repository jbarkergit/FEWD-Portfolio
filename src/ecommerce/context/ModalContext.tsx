import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

const modalContextSessionState = JSON.parse(sessionStorage.getItem('modalState') || '[]');

type StateContextType = {
  ecoModalTab: string | null;
  setEcoModalTab: React.Dispatch<React.SetStateAction<string | null>>;
};

const ModalContext = createContext<StateContextType | undefined>(undefined); // GUARD: Throws intentional error for Application Context Provider

type ChildrenType = { children?: ReactNode };

export const ModalProvider = ({ children }: ChildrenType): JSX.Element => {
  const [ecoModalTab, setEcoModalTab] = useState<string | null>('');

  useEffect(() => {
    sessionStorage.setItem('modalState', JSON.stringify(ecoModalTab));
  }, [ecoModalTab]);

  return <ModalContext.Provider value={{ ecoModalTab, setEcoModalTab }}>{children}</ModalContext.Provider>;
};

export const useModalContext = (): StateContextType | undefined => {
  const modalContext = useContext(ModalContext);
  if (modalContext === undefined) console.log('Modal Context Hook must be placed inside of a provider.');
  return modalContext;
};
