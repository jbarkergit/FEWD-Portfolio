import { doc, updateDoc } from 'firebase/firestore';
import { firebaseAuth, database } from '~/base/firebase/config/firebaseConfig';
import { getFirestoreUserDocument } from './getFirestoreUserDocument';
import type { FirestoreUserDocument } from '~/base/firebase/firestore/types/firestoreTypes';

export const updateFirestoreUserDocument = async (
  partialUpdate: Partial<FirestoreUserDocument>
): Promise<FirestoreUserDocument | undefined> => {
  const userDoc = await getFirestoreUserDocument();
  if (!userDoc) return undefined;

  const user = firebaseAuth.currentUser;
  if (!user) throw new Error('No current user');

  const docRef = doc(database, 'users', user.uid);
  await updateDoc(docRef, partialUpdate);

  return { ...userDoc, ...partialUpdate };
};
