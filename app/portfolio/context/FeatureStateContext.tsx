import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';

type Keys = 'projectDetailsActive' | 'contactFormActive';

type FeatureState = Record<Keys, boolean>;

type Value = {
  featureState: FeatureState;
  setFeatureState: Dispatch<SetStateAction<FeatureState>>;
};

const Context = createContext<Value | undefined>(undefined);

export const FeatureStateProvider = ({ children }: { children: ReactNode }) => {
  const [featureState, setFeatureState] = useState<FeatureState>({
    projectDetailsActive: false,
    contactFormActive: false,
  });

  const value = useMemo(() => ({ featureState, setFeatureState }), [featureState]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useFeatureState = () => {
  const context = useContext(Context);
  if (!context) throw new Error('A provider is required to consume ProjectSlideIndex.');
  return context;
};
