import { createContext, useContext, useState } from 'react';
import type { FC, ReactNode } from 'react';
import type { Type_MovieGenre_Keys } from '../composables/tmdb-api/data/tmdbGenres';
import type { Namespace_Tmdb } from '../composables/tmdb-api/hooks/useTmdbFetcher';

export type Type_heroData = Namespace_Tmdb.BaseMedia_Provider | undefined;

type Type_CatalogContext_State_Obj = {
  route: 'home' | Type_MovieGenre_Keys;
  setRoute: React.Dispatch<React.SetStateAction<'home' | Type_MovieGenre_Keys>>;
  heroData: Type_heroData;
  setHeroData: React.Dispatch<React.SetStateAction<Type_heroData>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const CatalogContext = createContext<Type_CatalogContext_State_Obj | undefined>(undefined);

export const CatalogProvider: FC<{ children: ReactNode }> = ({ children }) => {
  /** Routing system, lends to menu navigation */
  const [route, setRoute] = useState<'home' | Type_MovieGenre_Keys>('home');

  /** Details, trailer data */
  const [heroData, setHeroData] = useState<Type_heroData>(undefined);

  /** Movie movie */
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  /** Provider */
  return <CatalogContext.Provider value={{ route, setRoute, heroData, setHeroData, isModalOpen, setIsModalOpen }}>{children}</CatalogContext.Provider>;
};

export const useCatalogProvider = () => {
  const context = useContext(CatalogContext);
  if (context === undefined) throw new Error('CatalogProvider failure: Not within provider scope. Ensure your component is wrapped in the CatalogProvider.');
  return context;
};
