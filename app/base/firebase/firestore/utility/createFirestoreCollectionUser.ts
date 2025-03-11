import { doc, DocumentReference, DocumentSnapshot, getDoc, setDoc, type DocumentData } from 'firebase/firestore';
import { database, firebaseAuth } from '../../config/firebaseConfig';
import type { User } from 'firebase/auth';
import isUserAuthorized from '../../authentication/utility/isUserAuthorized';

export type Firestore_User_Document = {
  email: string | null;
  verified: boolean;
};

export async function createFirestoreCollectionUser() {
  if (await isUserAuthorized()) {
    try {
      // Get user
      const user: User | null = firebaseAuth.currentUser;
      if (!user) throw new Error('User missing.');

      // Reference to 'users' collection and the user's document
      const userDocRef: DocumentReference<DocumentData, DocumentData> = doc(database, 'users', user.uid);
      const userDoc: DocumentSnapshot<unknown, DocumentData> = await getDoc(userDocRef);

      // If document doesn't exist, create it
      if (!userDoc.exists()) {
        const newUserDocument: Firestore_User_Document = {
          email: user.email,
          verified: user.emailVerified,
        };

        // Document creation
        await setDoc(userDocRef, newUserDocument);
      }
    } catch (error) {
      console.error(`Failure to fetch or create user document: ${error}`);
    }
  }
}
