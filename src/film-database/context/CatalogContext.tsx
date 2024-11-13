import { createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';
import { Type_MovieGenre_Keys } from '../composables/tmdb-api/data/tmdbGenres';
import { Namespace_Tmdb } from '../composables/tmdb-api/hooks/useTmdbFetcher';

type Type_CatalogContext_State_Obj = {
  route: 'home' | Type_MovieGenre_Keys;
  setRoute: React.Dispatch<React.SetStateAction<'home' | Type_MovieGenre_Keys>>;
  isMenuOpen: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  itemsPerPage: number;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
  heroData: Namespace_Tmdb.BaseMedia_Provider | undefined;
  setHeroData: React.Dispatch<React.SetStateAction<Namespace_Tmdb.BaseMedia_Provider | undefined>>;
};

const CatalogContext = createContext<Type_CatalogContext_State_Obj | undefined>(undefined);

export const CatalogProvider: FC<{ children: ReactNode }> = ({ children }) => {
  /** Routing system, lends to menu navigation */
  const [route, setRoute] = useState<'home' | Type_MovieGenre_Keys>('home');

  /** Menu toggle boolean */
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  /** Maximum posters per page */
  const [itemsPerPage, setItemsPerPage] = useState<number>(7);

  useEffect(() => {
    const root = document.body.querySelector('.filmDatabase') as HTMLElement;

    const getItemsPerPage = (): void => {
      const styles: CSSStyleDeclaration = getComputedStyle(root);
      const value: number = parseInt(styles.getPropertyValue('--fd-carousel-items-per-page'));
      setItemsPerPage(value);
    };

    // Init fetch
    getItemsPerPage();

    // Observe changes to data-attribute
    const observer = new MutationObserver(() => getItemsPerPage());
    observer.observe(root, { attributes: true });

    // Cleanup
    return () => observer.disconnect();
  }, []);

  /** Details, trailer data */
  const [heroData, setHeroData] = useState<Namespace_Tmdb.BaseMedia_Provider | undefined>(undefined);

  /** Provider */
  return (
    <CatalogContext.Provider value={{ route, setRoute, isMenuOpen, setIsMenuOpen, itemsPerPage, setItemsPerPage, heroData, setHeroData }}>
      {children}
    </CatalogContext.Provider>
  );
};

export const useCatalogProvider = () => {
  const context = useContext(CatalogContext);
  if (context === undefined) throw new Error('CatalogProvider failure: Not within provider scope. Ensure your component is wrapped in the CatalogProvider.');
  return context;
};
