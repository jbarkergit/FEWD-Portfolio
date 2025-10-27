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
      projectSlideIndex: number;
      setProjectSlideIndex: Dispatch<SetStateAction<number>>;
    }
  | undefined
>(undefined);

export const ProjectSlideIndexProvider = ({ children }: { children: ReactNode }) => {
  const [projectSlideIndex, setProjectSlideIndex] = useState<number>(0);
  const value = useMemo(() => ({ projectSlideIndex, setProjectSlideIndex }), [projectSlideIndex]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useProjectSlideIndex = () => {
  const context = useContext(Context);
  if (!context) throw new Error('A provider is required to consume ProjectSlideIndex.');
  return context;
};
