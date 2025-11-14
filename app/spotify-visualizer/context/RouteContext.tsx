import {
  createContext,
  useContext,
  useMemo,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react';
import type { LibraryKeys } from '~/spotify-visualizer/features/library/Library';
import type { NavigationKeys } from '~/spotify-visualizer/features/navigation/Navigation';

type Route = NavigationKeys | LibraryKeys | undefined;

const Context = createContext<
  | {
      route: Route;
      setRoute: Dispatch<SetStateAction<Route>>;
    }
  | undefined
>(undefined);

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [route, setRoute] = useState<Route>(undefined);
  const value = useMemo(() => ({ route, setRoute }), [route]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
};

export const useModalContext = () => {
  const context = useContext(Context);
  if (!context) throw new Error('A provider is required to consume Route.');
  return context;
};
