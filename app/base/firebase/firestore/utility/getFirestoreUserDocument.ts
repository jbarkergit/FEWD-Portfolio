import type { User } from 'firebase/auth';
import { DocumentReference, type DocumentData, doc, DocumentSnapshot, getDoc, setDoc } from 'firebase/firestore';
import { database } from '../../config/firebaseConfig';
import type { FirestoreCollectionNames, FirestoreUserDocument } from '../types/firestoreTypes';
import { getFirestoreUser } from './getFirestoreUser';

/** @todo memoize with real time updates */
export const getFirestoreUserDocument = async (collectionName: FirestoreCollectionNames): Promise<FirestoreUserDocument | undefined> => {
  // Get user
  const user: User | undefined = await getFirestoreUser();

  // If user is authorized && user exists, otherwise do nothing
  if (user) {
    // Reference to 'users' collection and the user's document
    const docRef: DocumentReference<DocumentData, DocumentData> = doc(database, collectionName, user.uid);
    const docSnap: DocumentSnapshot<unknown, DocumentData> = await getDoc(docRef);

    // If the user's document does not exist, create it
    if (!docSnap.exists()) {
      const newDocument: FirestoreUserDocument = {
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
    return docSnap.data() as FirestoreUserDocument;
  }
};
