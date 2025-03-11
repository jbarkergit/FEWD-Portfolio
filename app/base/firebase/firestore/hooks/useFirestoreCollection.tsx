import { getDocs, collection } from 'firebase/firestore';
import { database } from '../../config/firebaseConfig';
import isUserAuthorized from '../../authentication/utility/isUserAuthorized';

export async function useFirestoreCollection(docs: string) {
  const isUserAuth = await isUserAuthorized();
  if (!isUserAuth) return undefined;

  try {
    const querySnapshot = await getDocs(collection(database, docs));
    if (!querySnapshot) throw new Error('Failure to retrieve collection from Firestore.');
    const users = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data }));
    return users;
  } catch (error) {
    console.error(error);
    return undefined;
  }
}
