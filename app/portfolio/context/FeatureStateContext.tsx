import {
  createContext,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react';

const Context = createContext<
  | {
      featureState: Record<string, boolean>;
      setFeatureState: Dispatch<SetStateAction<Record<string, boolean>>>;
    }
  | undefined
>(undefined);

export const FeatureStateProvider = ({ children }: { children: ReactNode }) => {
  const [featureState, setFeatureState] = useState<Record<string, boolean>>({
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
