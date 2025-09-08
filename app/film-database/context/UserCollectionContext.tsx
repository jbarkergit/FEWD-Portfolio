import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react';
import type { TmdbMovieProvider } from '~/film-database/composables/types/TmdbResponse';
import { useFLoader } from '~/film-database/routes/FilmDatabase';

/**
 * Represents a user's media collection in the catalog.
 * Contains the collection header and the media items it holds.
 */
export type UserCollection = {
  header: string;
  data: TmdbMovieProvider[] | null;
};

const Context = createContext<
  | {
      userCollections: Record<string, UserCollection>;
      setUserCollections: Dispatch<SetStateAction<Record<string, UserCollection>>>;
    }
  | undefined
>(undefined);

export const UserCollectionProvider = ({ children }: { children: ReactNode }) => {
  const { primaryData } = useFLoader();
  const [userCollections, setUserCollections] = useState<Record<string, UserCollection>>({});

  useEffect(() => {
    /**
     * Initializes user collections utilizing client loader's primary data.
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
        },
        'user-collection-1': {
          header: 'Unnamed Collection',
          data: primaryData[0]?.response.results!,
        },
      });
    };

    initializeUserCollections();
  }, []);

  return <Context.Provider value={{ userCollections, setUserCollections }}>{children}</Context.Provider>;
};

export const useUserCollection = () => {
  const context = useContext(Context);
  if (!context) throw new Error('A provider is required to consume UserCollection.');
  return context;
};
