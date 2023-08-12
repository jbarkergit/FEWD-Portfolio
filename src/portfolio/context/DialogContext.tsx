import { ReactNode, createContext, useContext, useState } from 'react';

type StoreType = {
  showDialog: boolean | null;
  setShowDialog: React.Dispatch<React.SetStateAction<boolean | null>>;
  dialogTab: string | null;
  setDialogTab: React.Dispatch<React.SetStateAction<string | null>>;
};

const DialogContext = createContext<StoreType | undefined>(undefined); // GUARD: Throws intentional error for Application Context Provider

type ChildrenType = { children?: ReactNode };

export const DialogContextProvider = ({ children }: ChildrenType): JSX.Element => {
  const [showDialog, setShowDialog] = useState<boolean | null>(false);
  const [dialogTab, setDialogTab] = useState<string | null>('contact');

  return <DialogContext.Provider value={{ showDialog, setShowDialog, dialogTab, setDialogTab }}>{children}</DialogContext.Provider>;
};

export const useDialogContext = (): StoreType | undefined => {
  const stateContext = useContext(DialogContext);
  if (stateContext === undefined) console.error('DialogContext Hook must be placed inside of a provider.');
  return stateContext;
};
