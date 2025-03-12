import { doc, DocumentReference, DocumentSnapshot, getDoc, setDoc, type DocumentData } from 'firebase/firestore';
import { database, firebaseAuth } from '../../config/firebaseConfig';
import type { User } from 'firebase/auth';
import isUserAuthorized from '../../authentication/utility/isUserAuthorized';
import type { Type_MovieGenre_Keys } from '~/film-database/composables/tmdb-api/data/tmdbGenres';

type Firestore_CollectionNames = 'users';

type Genre_MovieId_Array = Array<number>;
export type Firestore_MovieList = Record<Type_MovieGenre_Keys, Genre_MovieId_Array> | {};

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
  movies: Firestore_MovieList;
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

const getDocument = async (collectionName: Firestore_CollectionNames) => {
  const user: User | undefined = await getUser();

  // If user is authorized && user exists, otherwise do nothing
  if (user) {
    // Reference to 'users' collection and the user's document
    const docRef: DocumentReference<DocumentData, DocumentData> = doc(database, collectionName, user.uid);
    const docSnap: DocumentSnapshot<unknown, DocumentData> = await getDoc(docRef);

    // If user's document exists, return it
    if (docSnap.exists()) return docSnap.data();

    // If user does not have a document, create then return new document
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
      movies: {},
    };
    await setDoc(docRef, newDocument);
    return docSnap;
  }
};

const addDocumentMovie = async () => {};

export const firestoreUtility = { getUser, getDocument };
