import { updateDoc } from 'firebase/firestore';
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
import { firebaseAuth } from '~/base/firebase/config/firebaseConfig';
import type { FirestoreUserDocument } from '~/base/firebase/firestore/types/firestoreTypes';
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
  const { user } = useAuth();
  const [userCollections, setUserCollections] = useState<Record<string, UserCollection>>({});

  useEffect(() => {
    /**
     * If the user document has no collection, pre-populate it with film intelligence from clientLoader
     * If the user already has a collection, restore it from their document
     */
    const populateUserCollection = async (): Promise<void> => {
      const userDocument = await getFirestoreUserDocument();

      if (userDocument && userDocument.movies.length === 0) {
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
        // setUserCollections(userDocument?.movies)
      }
      console.log(userDocument);
    };

    populateUserCollection();
  }, []);

  useEffect(() => {
    /** Update user document collection */
    updateFirestoreUserDocument(userCollections);
  }, [userCollections]);

  return <Context.Provider value={{ userCollections, setUserCollections }}>{children}</Context.Provider>;
};

export const useUserCollection = () => {
  const context = useContext(Context);
  if (!context) throw new Error('A provider is required to consume UserCollection.');
  return context;
};

// export const updateFirestoreUserDocumentMovies = async (
//   collectionName: FirestoreCollectionNames,
//   movies: FirestoreMovieListUpdate
// ): Promise<void> => {
//   // If the user is authorized && user exists, create document if it doesn't exist. (We won't be using the return)
//   await getFirestoreUserDocument(collectionName);
//   // getFirestoreUserDocument will fire getUser, so we can safely assume it's available.
//   const user = (await getFirestoreUser()) as User;

//   try {
//     // Get document to spread values
//     const userDoc: FirestoreUserDocument | undefined = await getFirestoreUserDocument(collectionName);
//     if (!userDoc) throw new Error('user document could not be retrieved.');

//     // Create new document reference
//     const docRef: DocumentReference<DocumentData, DocumentData> = doc(database, collectionName, user.uid);

//     // Create new movies object
//     const userMovies =
//       movies.concat && !userDoc.movies.some((movie: number) => movie === movies.movieId)
//         ? [...userDoc.movies, movies.movieId]
//         : userDoc.movies.filter((id: number) => id !== movies.movieId);

//     // Overwrite existing document
//     await updateDoc(docRef, { ...userDoc, movies: userMovies });
//   } catch (error) {
//     console.error('Failed to update document movies: ' + error);
//   }
// };
