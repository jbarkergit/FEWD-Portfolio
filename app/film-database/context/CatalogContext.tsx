import { createContext, useContext, useState } from 'react';
import type { FC, ReactNode } from 'react';
import type { Namespace_Tmdb } from '../composables/tmdb-api/hooks/useTmdbFetcher';
import { useLoaderData } from 'react-router';

export type Type_heroData = Namespace_Tmdb.BaseMedia_Provider | undefined;

type Context = {
  heroData: Type_heroData;
  setHeroData: React.Dispatch<React.SetStateAction<Type_heroData>>;
  isMovieModal: boolean;
  setIsMovieModal: React.Dispatch<React.SetStateAction<boolean>>;
  isListModal: boolean;
  setIsListModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const CatalogContext = createContext<Context | undefined>(undefined);

export const CatalogProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // Details && Trailer data state
  const { initialHeroData } = useLoaderData();
  const [heroData, setHeroData] = useState<Type_heroData>(initialHeroData);

  // Modals state
  const [isMovieModal, setIsMovieModal] = useState<boolean>(false);
  const [isListModal, setIsListModal] = useState<boolean>(false);

  /** Provider */
  return <CatalogContext.Provider value={{ heroData, setHeroData, isMovieModal, setIsMovieModal, isListModal, setIsListModal }}>{children}</CatalogContext.Provider>;
};

export const useCatalogProvider = () => {
  const context = useContext(CatalogContext);
  if (context === undefined) throw new Error('CatalogProvider failure: Not within provider scope. Ensure your component is wrapped in the CatalogProvider.');
  return context;
};
