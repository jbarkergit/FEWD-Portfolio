import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { Dispatch, FC, ReactNode, SetStateAction } from 'react';
import type { Namespace_Tmdb } from '../composables/tmdb-api/hooks/useTmdbFetcher';
import { useLoaderData } from 'react-router';

/**
 * @typedef User_Collection
 * @description Represents a user's media collection in the catalog.
 * Contains details about the collection header, the media items it holds,
 * and the layout mode for displaying the collection (either 'flex' or 'grid').
 */
export type User_Collection = {
  header: string;
  data: Namespace_Tmdb.BaseMedia_Provider[] | null;
  display: 'flex' | 'grid';
};

/**
 * @typedef Context
 * @description Global context for managing catalog state, including media data, modals, and user collections.
 */
type Context = {
  heroData: Namespace_Tmdb.BaseMedia_Provider | undefined;
  setHeroData: Dispatch<SetStateAction<Namespace_Tmdb.BaseMedia_Provider | undefined>>;
  viewportChunkSize: number;
  modalChunkSize: number;
  isMovieModal: boolean;
  setIsMovieModal: Dispatch<SetStateAction<boolean>>;
  isListModal: boolean;
  setIsListModal: Dispatch<SetStateAction<boolean>>;
  userCollections: Record<string, User_Collection>;
  setUserCollections: Dispatch<SetStateAction<Record<string, User_Collection>>>;
  root: React.RefObject<HTMLDivElement | null>;
  modalTrailer: Namespace_Tmdb.BaseMedia_Provider | undefined;
  setModalTrailer: Dispatch<SetStateAction<Namespace_Tmdb.BaseMedia_Provider | undefined>>;
};

const CatalogContext = createContext<Context | undefined>(undefined);

/**
 * @component CatalogProvider
 * @description Provides global catalog state, including featured media, modals, and user collections.
 */
export const CatalogProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { initialHeroData, primaryData } = useLoaderData();

  /** @ref Remove dom traversal requirements for dynamic chunk sizes */
  const root = useRef<HTMLDivElement>(null);
  /** @state Maximum number of carousel items based on the window width. */
  const [viewportChunkSize, setViewportChunkSize] = useState<number>(2);
  /** @state Maximum number of carousel items based on the modal width. */
  const [modalChunkSize, setModalChunkSize] = useState<number>(2);
  /** @state A record of user-defined media collections. */
  const [userCollections, setUserCollections] = useState<Record<string, User_Collection>>({});
  /** @state Indicates whether the movie modal is visible. */
  const [isMovieModal, setIsMovieModal] = useState<boolean>(false);
  /** @state Indicates whether the list modal is visible. */
  const [isListModal, setIsListModal] = useState<boolean>(false);
  /** @state Hero data representing the featured media item. */
  const [heroData, setHeroData] = useState<Namespace_Tmdb.BaseMedia_Provider | undefined>(initialHeroData);
  /** @state Modal trailer data representing the featured media item */
  const [modalTrailer, setModalTrailer] = useState<Namespace_Tmdb.BaseMedia_Provider | undefined>(initialHeroData);

  /**
   * @function getDynamicChunkSize
   * @description Determines the number of carousel items based on the screen width.
   * This ensures that the carousel adapts to different screen sizes for optimal viewing.
   * @returns {number} The number of items to show in the carousel.
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

  useEffect(() => getDynamicChunkSize(), [isMovieModal, isListModal]);

  /**
   * @function initializeUserCollections
   * @description Initializes the user's collections by flattening and using the pre-fetched primary data.
   * It avoids redundant API calls by using the loader data.
   * @returns {Promise<void>} Resolves once collections have been initialized.
   */
  const initializeUserCollections = async (): Promise<void> => {
    let flattenedPrimaryData = (primaryData as Namespace_Tmdb.Response_Union[]).flatMap((entry) =>
      Object.values(entry).flatMap((subEntry) => subEntry.results || [])
    ) as Namespace_Tmdb.BaseMedia_Provider[];

    // Get user's collection document
    // const collection: Firestore_UserDocument | undefined = await useFirestore.getDocument('users');
    // if (!collection) return;

    // Get, filter and set movies from clientLoader's primaryData to prevent api call
    // const moviesArr: Namespace_Tmdb.BaseMedia_Provider[] = flattenedPrimaryData.filter((movie) => collection.movies.some((id) => id === movie.id));

    // Set initial collection
    // if (moviesArr.length > 0 && !carousels.length) {}
    setUserCollections({
      'user-collection-0': {
        header: 'Trailer Queue',
        data: null,
        display: 'flex',
      },
      'user-collection-1': {
        header: 'Unnamed Collection',
        data: flattenedPrimaryData,
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

  useEffect(() => handleModalTrailerQueue(), [userCollections, isListModal]);

  const contextValue = useMemo(
    () => ({
      heroData,
      setHeroData,
      viewportChunkSize,
      modalChunkSize,
      isMovieModal,
      setIsMovieModal,
      isListModal,
      setIsListModal,
      userCollections,
      setUserCollections,
      root,
      modalTrailer,
      setModalTrailer,
    }),
    [heroData, viewportChunkSize, modalChunkSize, isMovieModal, isListModal, userCollections, root, modalTrailer]
  );

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
