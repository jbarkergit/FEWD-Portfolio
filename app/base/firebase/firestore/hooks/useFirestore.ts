import { doc, DocumentReference, DocumentSnapshot, getDoc, setDoc, updateDoc, type DocumentData } from 'firebase/firestore';
import { database, firebaseAuth } from '../../config/firebaseConfig';
import type { User } from 'firebase/auth';
import isUserAuthorized from '../../authentication/utility/isUserAuthorized';

type Firestore_CollectionNames = 'users';

type Firestore_Movies = Array<number>;
type Firestore_MovieList_Update = { movieId: number; concat: boolean };

type Firestore_UserDocument = {
  credentials: {
    isAnonymous: User['isAnonymous'];
    email: User['email'];
    emailVerified: User['emailVerified'];
    displayName: User['displayName'];
  };
  metadata: {
    uid: User['uid'];
    creationTime: User['metadata']['creationTime'];
    lastSignInTime: User['metadata']['lastSignInTime'];
  };
  movies: Firestore_Movies | [];
};

const getUser = async (): Promise<User | undefined> => {
  try {
    // If user is authenticated
    if (!(await isUserAuthorized())) throw new Error('User is not authorized.');
    // Get and return user
    const user: User | null = firebaseAuth.currentUser;
    if (!user) throw new Error('User missing.');
    return user;
  } catch (error) {
    console.error('Failure to identify user: ' + error);
  }
};

/** @todo memoize with real time updates */
const getDocument = async (collectionName: Firestore_CollectionNames): Promise<Firestore_UserDocument | undefined> => {
  // Get user
  const user: User | undefined = await getUser();

  // If user is authorized && user exists, otherwise do nothing
  if (user) {
    // Reference to 'users' collection and the user's document
    const docRef: DocumentReference<DocumentData, DocumentData> = doc(database, collectionName, user.uid);
    const docSnap: DocumentSnapshot<unknown, DocumentData> = await getDoc(docRef);

    // If the user's document does not exist, create it
    if (!docSnap.exists()) {
      const newDocument: Firestore_UserDocument = {
        credentials: {
          isAnonymous: user.isAnonymous,
          email: user.email,
          emailVerified: user.emailVerified,
          displayName: user.displayName,
        },
        metadata: {
          uid: user.uid,
          creationTime: user.metadata.creationTime,
          lastSignInTime: user.metadata.lastSignInTime,
        },
        movies: [],
      };
      await setDoc(docRef, newDocument);
    }

    // Return user document
    return docSnap.data() as Firestore_UserDocument;
  }
};

const updateDocumentMovies = async (collectionName: Firestore_CollectionNames, movies: Firestore_MovieList_Update): Promise<void> => {
  // If the user is authorized && user exists, create document if it doesn't exist. (We won't be using the return)
  await getDocument(collectionName);
  // getDocument will fire getUser, so we can safely assume it's available.
  const user = (await getUser()) as User;

  try {
    // Get document to spread values
    const userDoc: Firestore_UserDocument | undefined = await getDocument(collectionName);
    if (!userDoc) throw new Error('user document could not be retrieved.');

    // Create new document reference
    const docRef: DocumentReference<DocumentData, DocumentData> = doc(database, collectionName, user.uid);

    // Create new movies object
    const userMovies = movies.concat ? [...userDoc.movies, movies.movieId] : userDoc.movies.filter((id) => id !== movies.movieId);

    // Overwrite existing document
    await updateDoc(docRef, { ...userDoc, movies: userMovies });
  } catch (error) {
    console.error('Failed to update document movies: ' + error);
  }
};

export const useFirestore = { getUser, getDocument, updateDocumentMovies };
