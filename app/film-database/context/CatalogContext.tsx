import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import { useFLoader } from '../routes/FilmDatabase';
import type { TmdbMovieProvider } from '~/film-database/composables/types/TmdbResponse';

/**
 * @typedef User_Collection
 * @description Represents a user's media collection in the catalog.
 * Contains details about the collection header, the media items it holds,
 * and the layout mode for displaying the collection (either 'flex' or 'grid').
 */
export type User_Collection = {
  header: string;
  data: TmdbMovieProvider[] | null;
  display: 'flex' | 'grid';
};

/**
 * @typedef Context
 * @description Global context for managing catalog state, including media data, modals, and user collections.
 */
type Context = {
  heroData: TmdbMovieProvider | undefined;
  setHeroData: Dispatch<SetStateAction<TmdbMovieProvider | undefined>>;
  viewportChunkSize: number;
  modalChunkSize: number;
  isModal: 'collections' | 'movie' | 'person' | undefined;
  setIsModal: Dispatch<SetStateAction<'collections' | 'movie' | 'person' | undefined>>;
  modalTrailer: TmdbMovieProvider | undefined;
  setModalTrailer: Dispatch<SetStateAction<TmdbMovieProvider | undefined>>;
  personRef: React.RefObject<number | null>;
  userCollections: Record<string, User_Collection>;
  setUserCollections: Dispatch<SetStateAction<Record<string, User_Collection>>>;
  root: React.RefObject<HTMLDivElement | null>;
};

const CatalogContext = createContext<Context | undefined>(undefined);

/**
 * @component CatalogProvider
 * @description Provides global catalog state, including featured media, modals, and user collections.
 */
export const CatalogProvider: FC<{ children: ReactNode }> = ({ children }) => {
  /** @clientLoader */
  const { primaryData } = useFLoader();

  /** @ref Remove dom traversal requirements for dynamic chunk sizes */
  const root = useRef<HTMLDivElement>(null);

  /** @state Maximum number of carousel items based on the window width. */
  const [viewportChunkSize, setViewportChunkSize] = useState<number>(2);

  /** @state Maximum number of carousel items based on the modal width. */
  const [modalChunkSize, setModalChunkSize] = useState<number>(2);

  /** @state A record of user-defined media collections. */
  const [userCollections, setUserCollections] = useState<Record<string, User_Collection>>({});

  /** @state Indicates whether the modal is visible. */
  const [isModal, setIsModal] = useState<'collections' | 'movie' | 'person' | undefined>(undefined);
  const personRef = useRef<number>(null);

  /** @state Hero data representing the featured media item. */
  const [heroData, setHeroData] = useState<TmdbMovieProvider | undefined>(
    primaryData[0] ? primaryData[0].response.results[0] : undefined
  );

  /** @state Modal trailer data representing the featured media item */
  const [modalTrailer, setModalTrailer] = useState<TmdbMovieProvider | undefined>(undefined);

  /**
   * @function getDynamicChunkSize
   * @description Determines the number of carousel items based on the screen width.
   * This ensures that the carousel adapts to different screen sizes for optimal viewing.
   */
  function getDynamicChunkSize(): void {
    if (!root.current) return;

    const styles: CSSStyleDeclaration = getComputedStyle(root.current);

    function getQuantity(value: string): number {
      return parseInt(styles.getPropertyValue(value).trim());
    }

    const carouselQuantity: number = getQuantity('--fd-carousel-items-per-page');
    const collectionQuantity: number = getQuantity('--fd-collection-items-per-page');

    setViewportChunkSize(isNaN(carouselQuantity) ? 2 : carouselQuantity);
    setModalChunkSize(isNaN(collectionQuantity) ? 2 : collectionQuantity);
  }

  useEffect(() => {
    getDynamicChunkSize();
    window.addEventListener('resize', getDynamicChunkSize);
    return () => window.removeEventListener('resize', getDynamicChunkSize);
  }, [root.current]);

  useEffect(() => getDynamicChunkSize(), [isModal]);

  /**
   * @function initializeUserCollections
   * @description Initializes the user's collections by flattening and using the pre-fetched primary data.
   * It avoids redundant API calls by using the loader data.
   * @returns {Promise<void>} Resolves once collections have been initialized.
   */
  const initializeUserCollections = async (): Promise<void> => {
    // Get user's collection document
    // const collection: Firestore_UserDocument | undefined = await useFirestore.getDocument('users');
    // if (!collection) return;

    // Get, filter and set movies from clientLoader's primaryData to prevent api call
    // const moviesArr: TmdbMovieProvider[] = flattenedPrimaryData.filter((movie) => collection.movies.some((id) => id === movie.id));

    // Set initial collection
    // if (moviesArr.length > 0 && !carousels.length) {}
    setUserCollections({
      'user-collection-0': {
        header: 'Trailer Queue',
        data: [],
        display: 'flex',
      },
      'user-collection-1': {
        header: 'Unnamed Collection',
        data: primaryData[0]?.response.results!,
        display: 'flex',
      },
    });
  };

  useEffect(() => {
    initializeUserCollections();
  }, []);

  /**
   * @function handleModalTrailerQueue
   * @description Sets the modal trailer data for the featured media item.
   */
  const handleModalTrailerQueue = (): void => {
    if (userCollections) {
      const collection = userCollections['user-collection-0'];
      if (!collection) return;

      const data = collection.data;
      if (!data) return;

      setModalTrailer(data[0]);
    }
  };

  useEffect(() => handleModalTrailerQueue(), [userCollections, isModal]);

  const contextValue = {
    heroData,
    setHeroData,
    viewportChunkSize,
    modalChunkSize,
    isModal,
    setIsModal,
    modalTrailer,
    setModalTrailer,
    userCollections,
    setUserCollections,
    personRef,
    root,
  };

  return <CatalogContext.Provider value={contextValue}>{children}</CatalogContext.Provider>;
};

/**
 * @hook useCatalogProvider
 * @description Custom hook to access the catalog context. Throws an error if used outside the CatalogProvider.
 * This ensures that components can only access the catalog state when they are wrapped inside the provider.
 */
export const useCatalogProvider = () => {
  const context = useContext(CatalogContext);
  if (!context) throw new Error('CatalogProvider is required');
  return context;
};
