import {
  createContext,
  useContext,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react';
import { useAuth } from '~/base/firebase/authentication/context/authProvider';
import isUserAuthorized from '~/base/firebase/authentication/utility/isUserAuthorized';
import { getFirestoreUserDocument } from '~/base/firebase/firestore/utility/getFirestoreUserDocument';
import { updateFirestoreUserDocument } from '~/base/firebase/firestore/utility/updateFirestoreUserDocument';
import type { TmdbMovieProvider } from '~/film-database/composables/types/TmdbResponse';
import { useFLoader } from '~/film-database/routes/FilmDatabase';

/**
 * Represents a user's media collection in the catalog.
 * Contains the collection header and the media items it holds.
 */
export type UserCollection = {
  header: string;
  data: TmdbMovieProvider[];
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
  const [userCollections, setUserCollections] = useState<Record<string, UserCollection>>({
    'user-collection-0': {
      header: 'Trailer Queue',
      data: [],
    },
    'user-collection-1': {
      header: 'Unnamed Collection',
      data: primaryData[0]?.response.results!,
    },
  });

  useEffect(() => {
    if (!isUserAuthorized()) return;

    /**
     * If the user document has no collection, pre-populate it with film intelligence from clientLoader
     * If the user already has a collection, restore it from their document
     */
    const populateUserCollection = async (): Promise<void> => {
      const userDocument = await getFirestoreUserDocument();

      if (userDocument && Object.entries(userDocument.movies).length === 0) {
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
      } else {
        setUserCollections(
          Object.fromEntries(
            Object.entries(userDocument?.movies ?? {}).map(([key, movieCollection]) => [
              key,
              {
                header: movieCollection.header,
                data: movieCollection.data ?? [],
              },
            ])
          )
        );
      }
    };

    populateUserCollection();
  }, []);

  useEffect(() => {
    if (!isUserAuthorized()) return;

    /** Update user document collection */
    updateFirestoreUserDocument({ movies: userCollections });
  }, [userCollections]);

  return <Context.Provider value={{ userCollections, setUserCollections }}>{children}</Context.Provider>;
};

export const useUserCollection = () => {
  const context = useContext(Context);
  if (!context) throw new Error('A provider is required to consume UserCollection.');
  return context;
};
