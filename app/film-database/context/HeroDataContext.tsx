import { createContext, type Dispatch, type ReactNode, type SetStateAction, useContext, useState } from 'react';
import type { TmdbMovieProvider } from '~/film-database/composables/types/TmdbResponse';
import { useFLoader } from '~/film-database/routes/FilmDatabase';

const Context = createContext<
  | {
      heroData: TmdbMovieProvider | undefined;
      setHeroData: Dispatch<SetStateAction<TmdbMovieProvider | undefined>>;
    }
  | undefined
>(undefined);

export const HeroDataProvider = ({ children }: { children: ReactNode }) => {
  const { primaryData } = useFLoader();

  const [heroData, setHeroData] = useState<TmdbMovieProvider | undefined>(
    primaryData[0] ? primaryData[0].response.results[0] : undefined
  );

  return <Context.Provider value={{ heroData, setHeroData }}>{children}</Context.Provider>;
};

export const useHeroData = () => {
  const context = useContext(Context);
  if (!context) throw new Error('A provider is required to consume HeroData.');
};
