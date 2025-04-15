import { createContext, useContext, useEffect, useState } from 'react';
import type { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import type { Namespace_Tmdb } from '../composables/tmdb-api/hooks/useTmdbFetcher';
import { useLoaderData } from 'react-router';

export type User_Collection = {
  header: string;
  data: Namespace_Tmdb.BaseMedia_Provider[] | undefined;
  display: 'flex' | 'grid';
};

export type Type_heroData = Namespace_Tmdb.BaseMedia_Provider | undefined;

type Context = {
  heroData: Type_heroData;
  setHeroData: Dispatch<SetStateAction<Type_heroData>>;
  maxCarouselNodes: number;
  isMovieModal: boolean;
  setIsMovieModal: Dispatch<SetStateAction<boolean>>;
  isListModal: boolean;
  setIsListModal: Dispatch<SetStateAction<boolean>>;
  userCollections: Record<string, User_Collection>;
  setUserCollections: Dispatch<SetStateAction<Record<string, User_Collection>>>;
};

const CatalogContext = createContext<Context | undefined>(undefined);

export const CatalogProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // Details && Trailer data state
  const { initialHeroData } = useLoaderData();
  const [heroData, setHeroData] = useState<Type_heroData>(initialHeroData);

  // Dynamic carousel integer
  const [maxCarouselNodes, setMaxCarouselNodes] = useState<number>(getMaxCarouselNodes());

  function getMaxCarouselNodes() {
    const width: number = window.innerWidth;

    if (width >= 2561) return 8;
    if (width <= 2560 && width > 1920) return 7;
    if (width <= 1920 && width > 1024) return 6;
    if (width <= 1024 && width > 834) return 4;
    if (width <= 834 && width > 601) return 3;
    if (width <= 601) return 2;
    return 8;
  }

  useEffect(() => {
    const handleResize = () => setMaxCarouselNodes(getMaxCarouselNodes());
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Modals state
  const [isMovieModal, setIsMovieModal] = useState<boolean>(false);
  const [isListModal, setIsListModal] = useState<boolean>(false);

  // User movie collections
  const [userCollections, setUserCollections] = useState<Record<string, User_Collection>>({});

  /** Provider */
  return (
    <CatalogContext.Provider
      value={{ heroData, setHeroData, maxCarouselNodes, isMovieModal, setIsMovieModal, isListModal, setIsListModal, userCollections, setUserCollections }}>
      {children}
    </CatalogContext.Provider>
  );
};

export const useCatalogProvider = () => {
  const context = useContext(CatalogContext);
  if (context === undefined) throw new Error('CatalogProvider failure: Not within provider scope. Ensure your component is wrapped in the CatalogProvider.');
  return context;
};
