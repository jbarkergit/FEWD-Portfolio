import { doc, DocumentReference, DocumentSnapshot, getDoc, setDoc, type DocumentData } from 'firebase/firestore';
import { database, firebaseAuth } from '../../config/firebaseConfig';
import type { User } from 'firebase/auth';

export async function createFirestoreCollectionUser() {
  try {
    // Get user
    const user: User | null = firebaseAuth.currentUser;
    if (!user) throw new Error('User missing.');

    // Document name
    const documentName: string = 'users';

    // Reference to 'users' collection and the user's document
    const userDocRef: DocumentReference<DocumentData, DocumentData> = doc(database, documentName, user.uid);
    const userDoc: DocumentSnapshot<unknown, DocumentData> = await getDoc(userDocRef);

    // If document doesn't exist, create it
    if (!userDoc.exists()) {
      // New user object
      type NewUser = {
        email: string | null;
        verified: boolean;
      };

      const newUser: NewUser = {
        email: user.email,
        verified: user.emailVerified,
      };

      // Document creation
      await setDoc(userDocRef, newUser);
    }
  } catch (error) {
    console.error(`Failure to fetch or create user document: ${error}`);
  }
}
