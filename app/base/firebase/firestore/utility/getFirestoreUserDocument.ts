import { DocumentReference, type DocumentData, doc, DocumentSnapshot, getDoc, setDoc } from 'firebase/firestore';
import { database, firebaseAuth } from '../../config/firebaseConfig';
import type { FirestoreCollectionNames, FirestoreUserDocument } from '../types/firestoreTypes';
import isUserAuthorized from '~/base/firebase/authentication/utility/isUserAuthorized';

/** @todo memoize with real time updates */
export const getFirestoreUserDocument = async (
  collectionName: FirestoreCollectionNames
): Promise<FirestoreUserDocument | undefined> => {
  try {
    const isAuth = await isUserAuthorized();
    if (!isAuth) throw new Error('Failed to retrieve document. User is not authorized.');

    const user = firebaseAuth.currentUser;
    if (!user) throw new Error('Failed to identify user.');

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

    // Return requested document
    return docSnap.data() as FirestoreUserDocument;
  } catch (error) {
    console.error(error);
  }
};
