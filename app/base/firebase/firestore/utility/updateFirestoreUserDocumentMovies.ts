import type { User } from 'firebase/auth';
import { DocumentReference, type DocumentData, doc, updateDoc } from 'firebase/firestore';
import { database } from '../../config/firebaseConfig';
import type { FirestoreCollectionNames, FirestoreMovieListUpdate, FirestoreUserDocument } from '../types/firestoreTypes';
import { getFirestoreUser } from './getFirestoreUser';
import { getFirestoreUserDocument } from './getFirestoreUserDocument';

export const updateFirestoreUserDocumentMovies = async (collectionName: FirestoreCollectionNames, movies: FirestoreMovieListUpdate): Promise<void> => {
  // If the user is authorized && user exists, create document if it doesn't exist. (We won't be using the return)
  await getFirestoreUserDocument(collectionName);
  // getFirestoreUserDocument will fire getUser, so we can safely assume it's available.
  const user = (await getFirestoreUser()) as User;

  try {
    // Get document to spread values
    const userDoc: FirestoreUserDocument | undefined = await getFirestoreUserDocument(collectionName);
    if (!userDoc) throw new Error('user document could not be retrieved.');

    // Create new document reference
    const docRef: DocumentReference<DocumentData, DocumentData> = doc(database, collectionName, user.uid);

    // Create new movies object
    const userMovies =
      movies.concat && !userDoc.movies.some((movie: number) => movie === movies.movieId)
        ? [...userDoc.movies, movies.movieId]
        : userDoc.movies.filter((id: number) => id !== movies.movieId);

    // Overwrite existing document
    await updateDoc(docRef, { ...userDoc, movies: userMovies });
  } catch (error) {
    console.error('Failed to update document movies: ' + error);
  }
};
