import {
  type Dispatch,
  type SetStateAction,
  type ReactNode,
  useState,
  useMemo,
  useContext,
  createContext,
} from 'react';

type Route = 'all' | 'music' | 'podcasts' | 'audiobooks';

const Context = createContext<
  | {
      homeRoute: Route;
      setHomeRoute: Dispatch<SetStateAction<Route>>;
    }
  | undefined
>(undefined);

export const HomeRouteProvider = ({ children }: { children: ReactNode }) => {
  const [homeRoute, setHomeRoute] = useState<Route>('all');
  const value = useMemo(() => ({ homeRoute, setHomeRoute }), [homeRoute]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useHomeRouteContext = () => {
  const context = useContext(Context);
  if (!context) throw new Error('A provider is required to consume HomeRoute.');
  return context;
};
